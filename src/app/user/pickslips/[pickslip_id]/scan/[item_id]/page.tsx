"use client";

import { useroutes } from "@/api/user/user-routes";
import UserAuthHeader from "@/components/user/authd-header";
import QRScanner from "@/components/user/qr-scanner";
import useAppStore from "@/store/app-store";
import { ScannedItem } from "@/types/pickslip-type";
import { customAxios } from "@/utils/axios";
import { isAPISuccess } from "@/utils/helpers";
import {
  getStoredScanItem,
  getStoredScanSessionID,
} from "@/utils/session-utils";
import { toastify } from "@/utils/toast";
import { IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { useRouter } from "next/navigation";
import { IoChevronBackCircle } from "react-icons/io5";

export default function ItemScanPage() {
  const { back } = useRouter();
  const { setLoading } = useAppStore();
  const item = getStoredScanItem();

  async function postScanItem(scannedItem: ScannedItem, scanned_qty: number) {
    setLoading(true);

    const { item_id, requested_qty } = item;
    const { serial_no, batch_no, box_type, pcn } = scannedItem;

    if (scanned_qty !== requested_qty)
      return toastify(
        "warning",
        "Scanned quantity not matching Requested quantity",
      );

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
    const value = detectedCodes[0].rawValue;

    console.log("QR Scan Result", value);
    toastify("success", `QR Scan successful for "${value}"`);

    const scanned =
      // "RAYCHEM RPG L125079858 TO L125079860 16.865 Kg. 16725009896 AAA2429093 EK-16"
      // "RAYCHEM RPG L225000884  17.115 Kg.  167012293  AAA2729029  J7"
      value.split(" ").filter(Boolean);

    const multiLot = scanned[3] === "TO";

    const serials: string[] = [];

    if (multiLot) {
      let first = Number(scanned[2]?.replace("L", ""));
      const last = Number(scanned[4]?.replace("L", ""));

      while (first <= last) {
        serials.push("L" + first);
        first += 1;
      }
    } else serials.push(scanned[2]);

    const scannedItem: ScannedItem = {
      pcn: multiLot ? scanned[8] : scanned[6],
      batch_no: multiLot ? scanned[7] : scanned[5],
      serial_no: multiLot ? scanned[2] + scanned[3] + scanned[4] : scanned[2],
      box_type: multiLot ? scanned[9] : scanned[7],
      weight: multiLot ? scanned[5] : scanned[3],
    };

    await postScanItem(scannedItem, serials.length);
  }

  return (
    <>
      <UserAuthHeader>
        <div className="flex items-center gap-2 text-[rgba(64,108,175,1)]">
          <button className="animated2 text-3xl" onClick={back}>
            <IoChevronBackCircle />
          </button>

          <div className="flex flex-col font-medium">
            <span className="text-[rgba(144,161,185,1)] text-xs">Item Code</span>
            <textarea
              disabled
              className="text-[3.25vw] w-[24vw] field-sizing-content"
              value={item?.item_code}
            />
          </div>
        </div>
      </UserAuthHeader>

      <div className="flex flex-col p-[2vh] gap-[2vh] h-[80vh] items-center justify-center">
        <div className="flex rounded-2xl overflow-hidden h-[35vh] max-w-[75vw]">
          <QRScanner onScan={handleQRScan} onError={handleQRFail} sound />
        </div>
      </div>
    </>
  );
}
