import { Materi } from "./type";

export async function getDetail(id: string): Promise<Materi> {
  const res = await fetch(`/api/issue?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to get issue");
  }

  const json = await res.json();
  return json.data; // ⬅️ karena successResponse
}