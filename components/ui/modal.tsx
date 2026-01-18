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
import { uploadCSV } from "@/lib/uploadCsv"
import { useDispatch } from "react-redux";
import { setData, setFirstLoad } from "@/store/homeSlice"

export function AlertDialogDemo() {
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useDispatch();

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

               dispatch(setData(result.data))
              dispatch(setFirstLoad(false))
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
