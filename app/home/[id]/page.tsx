"use client";
import { useEffect, useState } from "react";
import { getDetail } from "./handler";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MateriPreview } from "./type";

export default function Detail() {
  const [materi, setMateri] = useState<MateriPreview>()
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    getDetail(id)
      .then((result) => {
        setMateri(result)
      })
  }, [])


  return (
    <main className="min-h-screen flex justify-center bg-white relative overflow-hidden">
      <div className="w-full max-w-360 relative z-10">

        {/* Header */}
        <header className="flex items-center justify-between px-10 py-6">
          <div className="flex items-center gap-3">
            <Image src="/djp-logo.png" alt="city" className="absolute w-48 h-16 mt-5 top-0 left-0 z-10" width={500} height={500} />
          </div>

          {/* <div className="text-3xl font-extrabold tracking-wide">
            SMART<span className="text-black">AX</span>
          </div> */}

          <div className="flex">
            <Image src="/icon-tax.png" alt="bee" className="w-10 mr-3" width={50} height={50} />
            <Image src="/icon-smartax.png" alt="city" className="w-56" width={300} height={100} />
          </div>
        </header>

        {/* Content */}
        <section className="h-full px-10 py-12 max-w-360">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="">Rekomendasi</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell className="max-w-md whitespace-normal wrap-break-word">
                  {materi?.answer}
                </TableCell>
                <TableCell className="max-w-md whitespace-normal wrap-break-word">
                  {materi?.link && <Button
                    onClick={() => {
                      if(materi.link) {
                        window.location.href = materi.link;
                      }
                    }}
                    className="bg-[#06275D] text-white px-12 py-4 rounded-xl shadow hover:opacity-80 transition font-bold"
                  >
                    Link
                  </Button>}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </section>
        <div className="w-full max-w-360 relative">
          <Image src="/bee.png" alt="bee" className="w-24 drop-shadow-xl absolute bottom-36 right-10  animate-bounce" width={300} height={300} />
        </div>
      </div>


      <div className="w-full absolute bottom-0 bg-[#06275D] text-white font-bold p-3 flex justify-center">
        <div className="w-full max-w-360 pl-5">
          <p>LATSAR 2025-BDK MALANG KEMENTRIAN KEUANGAN</p>
        </div>
      </div>
    </main>
  );
}
