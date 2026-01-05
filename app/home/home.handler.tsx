import { DataResponse } from "./home.type";

export async function createIssueFromText(text: string): Promise<DataResponse> {
  const res = await fetch("/api/issue", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to create issue");
  }

  const json = await res.json();
  return json.data; // ⬅️ karena successResponse
}
