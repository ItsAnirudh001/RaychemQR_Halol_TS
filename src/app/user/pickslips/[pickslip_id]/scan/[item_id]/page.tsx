"use client";

import { useroutes } from "@/api/user/user-routes";
import UserAuthHeader from "@/components/user/authd-header";
import QRScanner from "@/components/user/qr-scanner";
import { PickslipItem } from "@/types/pickslip-type";
import { customAxios } from "@/utils/axios";
import { getStoredScanSessionID, isAPISuccess } from "@/utils/helpers";
import { toastify } from "@/utils/toast";
import { IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { useRouter } from "next/navigation";

export default function ScanItemPage() {
  const { back } = useRouter();
  const pickslip = JSON.parse(sessionStorage.getItem("pickslip_details")!);
  const item = JSON.parse(sessionStorage.getItem("scan_item")!);

  async function postScanItem() {
    const { item_id, item_code, serial_no, batch_no, box_type } = item;

    try {
      const { data } = await customAxios.post(useroutes.scanItem, {
        session_id: getStoredScanSessionID(),
        pick_slip_item_id: item_id,
        item_code,
        serial_number: serial_no,
        batch: batch_no,
        box_type,
        notes: "",
      });

      const { status, message } = data;
      const success = isAPISuccess(status);
      toastify(success ? "success" : "warning", message, 1500);

      if (!success) return;

      back();
    } catch (error) {
      console.error("Error in scanItem", error);
      toastify("error", "Unable to scan item", 1500);
    }
  }

  function handleQRFail(error: unknown): void {
    const message: string =
      error instanceof Error ? error.message : String(error);

    console.error("QR Scan Error", message);
    toastify("error", "QR Scan Failed", 1500);
  }

  async function handleQRScan(
    detectedCodes: IDetectedBarcode[],
  ): Promise<void> {
    console.log("QR Scan Result", detectedCodes);
    toastify("success", "QR Scan successful", 1500);

    await postScanItem();
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
