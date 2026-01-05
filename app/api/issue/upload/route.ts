import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/response";
import { parse } from "csv-parse/sync";

type CsvRow = {
  Masalah?: string;
};

type ValidationError = {
  row: number;
  reason: string;
};

type Seminar = {
  id: number;
  title: string;
};

type MLResult = {
  raw_text: string;
  clean_text: string;
  cluster: number;
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return errorResponse("CSV file is required", 400);
    }

    // 1️⃣ Read CSV
    const buffer = Buffer.from(await file.arrayBuffer());
    const rows: CsvRow[] = parse(buffer, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    if (!rows.length) {
      return errorResponse("CSV is empty", 400);
    }

    if (!("Masalah" in rows[1])) {
      return errorResponse("CSV must contain 'Masalah' column", 400);
    }

    // 2️⃣ Validate rows
    const errors: ValidationError[] = [];
    const validTexts: string[] = [];
    const seen = new Set<string>();

    rows.forEach((row, index) => {
      const text = row.Masalah;

      if (!text || typeof text !== "string") {
        errors.push({ row: index + 1, reason: "Masalah is missing or invalid" });
        return;
      }

      const trimmed = text.trim();

      if (trimmed.length < 3) {
        errors.push({ row: index + 1, reason: "Text too short" });
        return;
      }

      if (trimmed.length > 500) {
        errors.push({ row: index + 1, reason: "Text too long" });
        return;
      }

      if (seen.has(trimmed)) return;

      seen.add(trimmed);
      validTexts.push(trimmed);
    });
    
    if (!validTexts.length) {
      return errorResponse("No valid rows found in CSV", 400, errors);
    }

    // 3️⃣ Call ML API (batch)
    const mlRes = await fetch("http://localhost:8000/predict/batch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texts: validTexts }),
    });

    if (!mlRes.ok) {
      throw new Error("ML service error");
    }

    const predictions: MLResult[] = await mlRes.json();

    // 4️⃣ Save issues
    const createdIssues = await Promise.all(
      predictions.map((p) =>
        prisma.issue.create({
          data: {
            rawText: p.raw_text,
            cleanText: p.clean_text,
            cluster: p.cluster,
          },
        })
      )
    );

    // 5️⃣ Group by cluster
    const clusterMap: Record<
      number,
      {
        cluster: number;
        count: number;
        issues: { id: number; rawText: string }[];
        seminars: Array<Seminar>;
      }
    > = {};

    createdIssues.forEach((issue) => {
      if (!clusterMap[issue.cluster]) {
        clusterMap[issue.cluster] = {
          cluster: issue.cluster,
          count: 0,
          issues: [],
          seminars: [],
        };
      }

      clusterMap[issue.cluster].count++;
      clusterMap[issue.cluster].issues.push({
        id: issue.id,
        rawText: issue.rawText,
      });
    });

    // 6️⃣ Attach seminars (no duplicates)
    const clusterIds = Object.keys(clusterMap).map(Number);

    // const seminars = await prisma.seminar.findMany({
    //   where: {
    //     cluster: { in: clusterIds },
    //   },
    // });

    // MOCKED DATA SEMINAR
    const seminars = [
            {
              id: 1,
              title: 'Seminar Pajak 101',
              cluster: 0
            },
            {
              id: 2,
              title: 'Seminar Pajak 102',
              cluster: 1
            },
            {
              id: 3,
              title: 'Pengantar Perpajakan,Asas pemungutan pajak",Microlearning,Template PPT sosialisasi SPT WP OP',
              cluster: 2
            },
            {
              id: 4,
              title: 'Seminar Pajak 104',
              cluster: 3
            },
            {
              id: 5,
              title: 'Microlearning Pajak',
              cluster: 4
            },
            {
              id: 6,
              title: 'Microlearning Pajak',
              cluster: 5
            }
          ]

    seminars.forEach((seminar) => {
      clusterMap[seminar.cluster].seminars.push({
        id: seminar.id,
        title: seminar.title,
      });
    });

    // 7️⃣ Final response
    return successResponse(
      {
        totalRows: rows.length,
        validRows: validTexts.length,
        invalidRows: errors.length,
        errors,
        data: Object.values(clusterMap),
      },
      "CSV processed successfully"
    );
  } catch (error) {
    console.error(error);
    return errorResponse("Failed to process CSV", 500, error);
  }
}
