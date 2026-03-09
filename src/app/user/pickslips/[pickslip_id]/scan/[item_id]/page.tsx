"use client";

import { useroutes } from "@/api/user/user-routes";
import UserAuthHeader from "@/components/user/authd-header";
import QRScanner from "@/components/user/qr-scanner";
import useAppStore from "@/store/app-store";
import { PickslipItem, ScannedItem } from "@/types/pickslip-type";
import { customAxios } from "@/utils/axios";
import { getStoredScanSessionID, isAPISuccess } from "@/utils/helpers";
import { toastify } from "@/utils/toast";
import { IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { useRouter } from "next/navigation";

export default function ItemScanPage() {
  const { back } = useRouter();
  const { setLoading } = useAppStore();

  const item = typeof sessionStorage !== "undefined" ? JSON.parse(sessionStorage.getItem("scan_item")!) : {};

  async function postScanItem(scannedItem: ScannedItem) {
    setLoading(true);

    const { item_id } = item;
    const { serial_no, batch_no, box_type, pcn } = scannedItem;

    try {
      const { data } = await customAxios.post(useroutes.scanItem, {
        session_id: getStoredScanSessionID(),
        pick_slip_item_id: item_id,
        item_code: pcn,
        serial_number: serial_no,
        batch: batch_no,
        box_type,
        notes: "",
      });

      const { status, message } = data;
      const success = isAPISuccess(status);
      toastify(success ? "success" : "warning", message);

      if (!success) return;

      sessionStorage.removeItem("reset_token");
      back();
    } catch (error) {
      console.error("Error in scanItem", error);
      toastify("error", "Unable to scan item");
    } finally {
      setLoading(false);
    }
  }

  function handleQRFail(error: unknown): void {
    const message: string =
      error instanceof Error ? error.message : String(error);

    console.error("QR Scan Error", message);
    toastify("error", "QR Scan Failed");
  }

  async function handleQRScan(
    detectedCodes: IDetectedBarcode[],
  ): Promise<void> {
    console.log("QR Scan Result", detectedCodes);
    toastify("success", "QR Scan successful");

    const scanned =
      // "RAYCHEM RPG L225000884  17.115 Kg.  167012293  AAA2729029  J7"
      detectedCodes[0].rawValue.split(" ").filter(Boolean);

    const scannedItem: ScannedItem = {
      pcn: scanned[6],
      lot_no: scanned[2],
      serial_no: scanned[5],
      box_type: scanned[7],
      weight: scanned[4],
    };

    await postScanItem(scannedItem);
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
