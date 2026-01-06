"use client";

import Image from "next/image";
import { PlaceholdersAndVanishInput } from "../../components/ui/placeholders-and-vanish-input";
import { ClusterTable } from "@/components/ui/clusterTable";
import { ClusterFilter } from "@/components/ui/clusterFilter";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportClustersToCSV } from "@/lib/exportCsv";
import { createIssueFromText } from "./home.handler";
import { ClusterResult } from "./home.type";
import { toast } from "sonner";

export default function Home() {
  const [search, setSearch] = useState("");
  const [text, setText] = useState("");
  const [selectedCluster, setSelectedCluster] = useState("all");
  const [firstLoad, setFirstLoad] = useState(true);
  const [data, setData] = useState<ClusterResult[]>([]);

  const clusters = useMemo(
    () => (data.map((d: ClusterResult) => d.cluster)),
    [data]
  );

  const filteredData = useMemo(() => {
    return data.filter((cluster) => {
      // filter cluster
      if (
        selectedCluster !== "all" &&
        cluster.cluster !== Number(selectedCluster)
      ) {
        return false;
      }

      // search
      if (!search) return true;

      const s = search.toLowerCase();

      const issueMatch = cluster.issues.some((i) =>
        i.rawText.toLowerCase().includes(s)
      );

      const seminarMatch = cluster.seminars.some((sem) =>
        sem.title.toLowerCase().includes(s)
      );

      return issueMatch || seminarMatch;
    });
  }, [data, search, selectedCluster]);

  const placeholders = [
    "Kesulitan memahami aturan perpajakan terbaru?",
    "Tidak mengetahui cara menghitung PPh?",
    "Tidak memahami tarif PPh final UMKM?",
    "Kesulitan memahami istilah pajak",
    "Tidak tahu tata cara pembayaran?",
  ];

  const mappedErrorMessages = (errorMessages: string) => {
    switch (errorMessages) {
      case "text_required":
        toast.error("input text wajib diisi",{ position: "top-right" });
        break;

      case "text_too_short":
        toast.warning("input text terlalu pendek, jelaskan lebih detail",{ position: "top-right" });
        break;

      case "text_too_long":
        toast.warning("input text terlalu panjang, mohon diringkas",{ position: "top-right" });
        break;

      case "text_ml_service_error":
        toast.error(
          "Layanan analisis sedang bermasalah, coba lagi nanti"
        );
        break;

      default:
        toast.error("Terjadi kesalahan yang tidak diketahui");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const result = await createIssueFromText(text);
      setData(result.clusters);
      
      setFirstLoad(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      mappedErrorMessages(message);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center relative">
      <div className="w-full h-full max-w-360">
        <div className="w-full max-w-360 h-full flex flex-col justify-center items-center relative">
          <Image src="/djp-logo.png" alt="city" className="absolute w-48 h-16 mt-5 top-0 left-0 z-10" width={500} height={500} />
          {firstLoad ? <div className="h-160 flex flex-col justify-center  items-center px-4">
            <h1 className="mb-1 text-6xl text-center sm:text-5xl dark:text-white text-black">
              SMARTAX
            </h1>
            <h2 className="mb-10 sm:mb-20 text-lg text-center sm:text-5xl dark:text-white text-black">
              Let the data teach smarter.
            </h2>
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={handleChange}
              onSubmit={onSubmit}
              setData={setData}
              setFirstLoad={setFirstLoad}
            />
          </div> :
            <div className="  h-full w-full flex flex-col px-10 mt-20">
                <div className="w-full absolute top-28 right-0 left-0 px-10 flex justify-between bg-white  z-10">
                  <ClusterFilter
                    clusters={clusters}
                    search={search}
                    selectedCluster={selectedCluster}
                    onSearchChange={setSearch}
                    onClusterChange={setSelectedCluster}

                  />

                  <Button
                    className="bg-[#06275D]"
                    variant="default"
                    onClick={() => exportClustersToCSV(search || selectedCluster !== "all" ? filteredData : data)}
                    disabled={filteredData.length === 0 || data.length === 0}
                  >
                    <Download className="mr-2 h-4 w-4 " />
                    Export CSV
                  </Button>
                </div>
              <div className=" h-full w-full max-w-360 mt-32">
                <div className="w-full h-[70%]  flex overflow-scroll">
                  <ClusterTable data={search || selectedCluster !== "all" ? filteredData : data} />
                </div>
              </div>

              <div className="w-full flex justify-center">
              <div className="absolute bottom-20 w-1/2">
                <PlaceholdersAndVanishInput
                  placeholders={placeholders}
                  onChange={handleChange}
                  onSubmit={onSubmit}
                  setData={setData}
                  setFirstLoad={setFirstLoad}
                />
              </div>
            </div>
            </div>
          }

        </div>

      </div>
        <div className="w-full absolute bottom-0 bg-[#06275D] text-white font-bold p-3 flex justify-center">
          <div className="w-full max-w-360 pl-5">
            <p>LATSAR 2025-BDK MALANG KEMENTRIAN KEUANGAN</p>
          </div>
        </div>
    </div>
  );
}
