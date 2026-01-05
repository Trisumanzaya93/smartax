export interface Seminar {
  id: number;
  title: string;
}

export interface Issue {
  id: number;
  rawText: string;
  cleanText: string;
}

export interface ClusterResult {
  cluster: number;
  count: number;
  issues: Issue[];
  seminars: Seminar[];
}

export interface DataResponse {
  clusters: ClusterResult[];
}

export interface IssueResult {
  data: DataResponse;
  success: boolean;
  message: string;
}

export interface ErrorResponse {
  message: string;
}
