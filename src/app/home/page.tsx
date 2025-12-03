"use client";

import QRScanner from "@/Components/QRScanner";
import { toastify } from "@/Utils/toast";
import { IDetectedBarcode } from "@yudiel/react-qr-scanner";
import Image from "next/image";

export default function Home() {
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

  return (
    <>
      <Image
        className="dark:invert"
        src="/apple-touch-icon.png"
        alt="Next.js logo"
        width={100}
        height={20}
        priority
      />

      <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
        <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          Home
        </h1>

        <button className="flex text-center p-2 bg-purple-900 rounded-2xl overflow-hidden h-60 w-80">
          <QRScanner onScan={handleQRScan} onError={handleQRFail} sound />
        </button>
      </div>
    </>
  );
}
