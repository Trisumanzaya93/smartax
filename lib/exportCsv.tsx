type Issue = {
  id: number;
  rawText: string;
};

type Seminar = {
  id: number;
  answer: string;
};

type ClusterResult = {
  cluster: number;
  issues: Issue[];
  seminars: Array<Seminar>;
};

export function exportClustersToCSV(data: ClusterResult[]) {
  const rows: string[] = [];

  rows.push(
    ["cluster", "issue_id", "masalah", "materi_metode_media"].join(",")
  );

  data.forEach((cluster) => {
    const seminarTitles = cluster.seminars
      .map((s) => s.answer)
      .join("; ");

    cluster.issues.forEach((issue) => {
      rows.push(
        [
          cluster.cluster + 1,
          issue.id,
          `"${issue.rawText.replace(/"/g, '""')}"`,
          `"${seminarTitles.replace(/"/g, '""')}"`
        ].join(",")
      );
    });
  });

  const blob = new Blob([rows.join("\n")], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `cluster-result-${Date.now()}.csv`;
  link.click();

  URL.revokeObjectURL(url);
}
