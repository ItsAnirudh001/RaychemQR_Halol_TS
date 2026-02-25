"use client";

import UserAuthHeader from "@/components/user/authd-header";
import QRScanner from "@/components/user/qr-scanner";
import { toastify } from "@/utils/toast";
import { IDetectedBarcode } from "@yudiel/react-qr-scanner";

export default function ScanItemPage() {
  function handleQRFail(error: unknown): void {
    const message: string =
      error instanceof Error ? error.message : String(error);

    console.error("QR Scan Error", message);

    // toastify("error", "QR Scan Failed");
  }

  function handleQRScan(detectedCodes: IDetectedBarcode[]): void {
    console.log("QR Scan Result", detectedCodes);
    toastify("success", "QR Scan successful", 3300);
  }


  return (
    <>
      <UserAuthHeader />

       <div className="flex flex-col p-[2vh] gap-[2vh] h-[80vh] items-center justify-center">
        <div className="flex rounded-2xl overflow-hidden h-[35vh] max-w-[75vw]">
          <QRScanner onScan={handleQRScan} onError={handleQRFail} sound />
        </div>
      </div>
    </>
  );
}
