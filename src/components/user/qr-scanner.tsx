"use client";

import { QRScannerProps } from "@/types/scanner-types";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";

export default function QRScanner({ onScan, onError, sound }: QRScannerProps) {
  const [scannerKey, setScannerKey] = useState<number>(0);

  function updateScanner() {
    setTimeout(() => {
      setScannerKey((prev) => prev + 1);
    }, 2000);
  }

  return (
    <Scanner
      onScan={(detectedCodes: IDetectedBarcode[]) => {
        onScan(detectedCodes);
        updateScanner();
      }}
      onError={(error: unknown) => {
        onError(error);
        updateScanner();
      }}
      key={scannerKey}
      sound={sound}
      scanDelay={6000}
      constraints={{
        facingMode: "environment",
      }}
      components={{
        onOff: true,
        tracker: (qrCodes, ctx) => {
          qrCodes.forEach((qrCode) => {
            const { boundingBox, cornerPoints } = qrCode;

            // bounding box
            ctx.strokeStyle = "white";
            ctx.lineWidth = 4;

            ctx.strokeRect(
              boundingBox.x,
              boundingBox.y,
              boundingBox.width,
              boundingBox.height,
            );

            // corner points
            ctx.fillStyle = "aquamarine";
            cornerPoints.forEach((point) => {
              ctx.beginPath();
              ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
              ctx.fill();
            });
          });
        },
      }}
    />
  );
}
