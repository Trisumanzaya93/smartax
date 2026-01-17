export type Materi = {
  cluster: number,
  question: string,
  answer: string,
  keywords: Array<string>,
  link?: string,
}

export type MateriPreview = Pick<Materi, "answer" | "question" | "link">;