"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ChangeEvent } from "react";

type Props = {
  clusters: number[];
  search: string;
  selectedCluster: string;
  onSearchChange: (v: string) => void;
  onClusterChange: (v: string) => void;
};

export function ClusterFilter({
  clusters,
  search,
  selectedCluster,
  onSearchChange,
  onClusterChange,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <Input
        placeholder="Search issue or seminar..."
        value={search}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
        className="md:max-w-sm"
      />

      <Select value={selectedCluster} onValueChange={onClusterChange}>
        <SelectTrigger className="md:w-[200px]">
          <SelectValue placeholder="Filter cluster" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Clusters</SelectItem>
          {clusters.map((c) => (
            <SelectItem key={c} value={String(c)}>
              Cluster #{c + 1}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
