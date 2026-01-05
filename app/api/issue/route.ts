import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/response";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text } = body;

    if (!text || typeof text !== "string") {
      return errorResponse("text_required", 400);
    }
    if (text.length <= 5) {
      return errorResponse("text_too_short", 400);
    }
    if (text.length >= 500) {
      return errorResponse("text_too_long", 400);
    }

    // 1️⃣ Call Python ML API
    const mlRes = await fetch("http://localhost:8000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!mlRes.ok) {
      return errorResponse("text_ml_service_error", 400);
    }

    const mlResult = await mlRes.json();
    const { clean_text, cluster } = mlResult;

    // 2️⃣ Save Issue
    const issue = await prisma.issue.create({
      data: {
        rawText: text,
        cleanText: clean_text,
        cluster,
      },
    });

    // 3️⃣ Get seminars for this cluster
    const seminars = await prisma.seminar.findMany({
      where: { cluster },
      select: {
        id: true,
        title: true,
      },
    });

    // 4️⃣ Unified response (SAMA DENGAN CSV)
    const response = {
      clusters: [
        {
          cluster,
          count: 1,
          issues: [
            {
              id: issue.id,
              rawText: issue.rawText,
              cleanText: issue.cleanText,
            },
          ],
          seminars: [
            ...seminars, // data masih mocked
            {
              id: 1,
              title: 'Seminar Pajak 101'
            },
            {
              id: 2,
              title: 'Seminar Pajak 102'
            },
            {
              id: 3,
              title: 'Pengantar Perpajakan,Asas pemungutan pajak",Microlearning,Template PPT sosialisasi SPT WP OP'
            },
            {
              id: 4,
              title: 'Seminar Pajak 104'
            },
            {
              id: 5,
              title: 'Microlearning Pajak'
            }
          ],
        },
      ],
    };

    return successResponse(response, "issue created successfully");
  } catch (error) {
    console.error(error);
    return errorResponse("Failed to create issue", 500, error);
  }
}
