
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";
import { EmptyState } from "./emptyData";

export type UploadResult = {
  totalRows: number;
  validRows: number;
  invalidRows: number;
  data: ClusterResult[];
};

type Issue = {
  id: number;
  rawText: string;
  cleanText: string;
};

type Seminar = {
  id: number;
  title: string;
};

type ClusterResult = {
  cluster: number;
  count: number;
  issues: Issue[];
  seminars: Seminar[];
};



export function ClusterTable({ data }: { data: ClusterResult[] }) {
  const [openCluster, setOpenCluster] = useState<number | null>(null);
  console.log(data);

  return (
    <div className="w-full rounded-xl border bg-white">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">Cluster</TableHead>
            <TableHead>Jumlah Masalah</TableHead>
            <TableHead>Materi Metode Media Rekomendasi</TableHead>
            <TableHead className="w-20" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((cluster, i) => {
            const isOpen = openCluster === cluster.cluster;

            return (
              <React.Fragment key={i}>
                {/* MAIN ROW */}
                <TableRow key={cluster.cluster}>
                  <TableCell>
                    <Badge variant="outline">
                      #{cluster.cluster + 1}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {cluster.count} masalah
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {cluster.seminars.map((s) => (
                        <Badge key={s.id} variant="secondary">
                          {s.title}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>

                  <TableCell>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() =>
                        setOpenCluster(isOpen ? null : cluster.cluster)
                      }
                    >
                      {isOpen ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>

                {/* EXPANDED ROW */}
                {isOpen && (
                  <TableRow>
                    <TableCell colSpan={4} className="bg-muted/40">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          Issues dalam cluster #{cluster.cluster + 1}
                        </p>

                        <ul className="list-disc pl-6 text-sm space-y-1">
                          {cluster.issues.map((issue) => (
                            <li key={issue.id}>
                              {issue.rawText}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            );
          })}

          {data.length === 0 && (
            <TableRow className="w-full rounded-lg border">
              <TableCell colSpan={4}>
                <EmptyState
                  title="Data tidak tersedia"
                />
              </TableCell>
            </TableRow>)}
        </TableBody>
      </Table>
    </div>
  );
}

