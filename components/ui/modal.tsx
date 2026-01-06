"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { FileUpload } from "./file-upload"
import { validateCSVFile } from "@/lib/validationCsv"
import { toast } from "sonner"
import { useState } from "react"
import { ClusterResult } from "@/app/home/home.type"
import { uploadCSV } from "@/lib/uploadCsv"

export function AlertDialogDemo({ setData, setFirstLoad }: { setData: React.Dispatch<React.SetStateAction<ClusterResult[]>>; setFirstLoad: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [file, setFile] = useState<File | null>(null);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="text-neutral-700 rounded-full text-xl p-0 w-8 h-8 flex justify-center items-center">+</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="sr-only" />
          <div>
            <FileUpload
              onChange={(files) => {
                const file = files[0]
                const error = validateCSVFile(file)

                if (error) {
                  toast.error(error, { position: "top-right" })
                  return
                }

                // lanjut upload / parse
                setFile(file)
                // handleUpload(file)
              }} />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction disabled={!file} onClick={async () => {
            try {
              if (!file) return;
              const result = await uploadCSV(file);

              setData(result.data);
              setFirstLoad(false);
            } catch (error) {
              const message = error instanceof Error ? error.message : String(error);
              toast.error(message, { position: "top-right" })
            }
          }}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
