"use client";

import QRScanner from "@/Components/QRScanner";
import { toastify } from "@/Utils/toast";
import { IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { useState } from "react";

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);

  function handleQRFail(error: unknown): void {
    const message: string =
      error instanceof Error ? error.message : String(error);

    console.error("QR Scan Error", message);

    toastify("error", "QR Scan Failed");
  }

  function handleQRScan(detectedCodes: IDetectedBarcode[]): void {
    console.log("QR Scan Result", detectedCodes);
    toastify("success", "QR Scan successful", 3300);
  }

  // File system upload: read file locally, do not upload to API
  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target?.files;

    console.log("files input", files);

    if (!files?.[0]) return toastify("warning", "No Files Detected");

    try {
      const file_list = Object.values(files).filter(
        (value) => typeof value === "object"
      );

      setFiles(file_list);
      console.log("file_list", file_list);

      toastify(
        "success",
        `Successfully Uploaded Files ${file_list
          .map((file) => file.name)
          .join(", ")}`
      );
    } catch (error) {
      console.error("Error uploading file", error);
      toastify("error", "File Upload Failed");
    }
  }

  console.log("filestate2", files);

  function handleDownloadFile() {
    if (!files[0]) return;
    const url = URL.createObjectURL(files[0]);
    const a = document.createElement('a');
    a.href = url;
    a.download = files[0].name;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
      a.remove();
    }, 100);
  };

  return (
    <div className="flex flex-col items-center gap-6 text-center self-center m-auto sm:items-start sm:text-left">
      <button className="flex text-center p-2 bg-purple-900 rounded-2xl overflow-hidden h-60 w-80">
        <QRScanner onScan={handleQRScan} onError={handleQRFail} sound />
      </button>
      <button className="flex text-center bg-purple-900 rounded-2xl overflow-hidden p-4">
        <input
          type="file"
          accept="*"
          onChange={handleFileUpload}
          multiple
        />
      </button>
      {files[0] && (
        <button
          className="mt-2 p-2 bg-blue-600 text-white rounded-2xl"
          onClick={handleDownloadFile}
        >
          Download First Uploaded File
        </button>
      )}
    </div>
  );
}
