import { FileText } from "lucide-react";

type EmptyStateProps = {
  title?: string;
};

export function EmptyState({
  title = "Belum ada data"
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
        <FileText className="h-7 w-7" />
      </div>

      <h3 className="text-lg font-semibold text-foreground">
        {title}
      </h3>
    </div>
  );
}
