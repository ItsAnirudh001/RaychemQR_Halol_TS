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
import { RefObject, useRef } from "react";
import { IoChevronBackCircle } from "react-icons/io5";

export default function ItemScanPage() {
  const { back } = useRouter();
  const { setLoading } = useAppStore();
  const item = getStoredScanItem();

  const scanPostRef = useRef(false);
  const scanSuccessRef = useRef(false);
  const scanErrorRef = useRef(false);

  const scanSuccessVal = useRef("");

  function resetRef(ref: RefObject<boolean>) {
    setTimeout(() => {
      ref.current = false;
    }, 3000);
  }

  async function postScanItem(scannedItem: ScannedItem, scanned_qty: number) {
    if (scanPostRef.current) return;
    scanPostRef.current = true;

    const { item_id, requested_qty, item_code } = item;
    const { serial_no, batch_no, box_type, pcn, weight } = scannedItem;

    console.log("scanned item", scannedItem);
    console.log("original item", item);

    console.log("scanned_qty", scanned_qty);

    const mismatches: string[] = [];

    if (pcn !== item_code) mismatches.push("Item Code");
    if (scanned_qty !== requested_qty) mismatches.push("Quantity");

    if (mismatches.length > 0)
      return toastify("warning", `${mismatches.join(", ")} mismatch`);

    setLoading(true);

    const reqBody = {
      session_id: getStoredScanSessionID(),
      pick_slip_item_id: item_id,
      item_code: pcn,
      serial_number: serial_no,
      batch: batch_no,
      box_type,
      weight,
      notes: "ok",
    };

    console.log("scanBody", reqBody);

    try {
      const { data } = await customAxios.post(useroutes.scanItem, reqBody);

      const { status, message } = data;

      console.log("scan-item response data", data);
      const success = isAPISuccess(status);
      toastify(
        success ? "success" : "warning",
        qtyAlert + message + " for item code " + pcn,
      );

      if (!success) return;

      back();
    } catch (error) {
      console.error("Error in scanItem", error);
      toastify("error", "Error in posting scanned item");
    } finally {
      setLoading(false);
      resetRef(scanPostRef);
    }
  }

  async function handleQRScan(
    detectedCodes: IDetectedBarcode[],
  ): Promise<void> {
    try {
      if (scanSuccessRef.current) return;

      const value = detectedCodes[0].rawValue;

      // if (scanSuccessVal.current === value) return toastify("warning", "Avoid Duplicate Scanning");

      console.log("QR Scan Result", value);
      scanSuccessRef.current = true;
      scanSuccessVal.current = value;

      // toastify("success", `QR Scan successful for "${value}"`);

      const scanned = value.split(" ").filter(Boolean);

      console.log("scanned", scanned);

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
        serial_no: multiLot
          ? `${scanned[2]} ${scanned[3]} ${scanned[4]}`
          : scanned[2],
        box_type: multiLot ? scanned[9] : scanned[7],
        weight: multiLot ? scanned[5] : scanned[3],
      };

      await postScanItem(scannedItem, serials.length);
    } finally {
      resetRef(scanSuccessRef);
    }
  }

  function handleQRFail(error: unknown): void {
    if (scanErrorRef.current) return;

    scanErrorRef.current = true;
    try {
      const message: string =
        error instanceof Error ? error.message : String(error);

      console.error("QR Scan Error", message);
      toastify("error", "QR Scan Failed");
    } finally {
      resetRef(scanErrorRef);
    }
  }

  // console.log("scansuccessreff", scanSuccessRef);

  return (
    <>
      <UserAuthHeader>
        <div className="flex items-center gap-2 text-[rgba(64,108,175,1)]">
          <button className="animated2 text-3xl" onClick={back}>
            <IoChevronBackCircle />
          </button>

          <div className="flex flex-col font-medium">
            <span className="text-[rgba(144,161,185,1)] text-xs">
              Item Code
            </span>
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
