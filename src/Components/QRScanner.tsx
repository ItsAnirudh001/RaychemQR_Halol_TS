import { Scanner } from "@yudiel/react-qr-scanner";
import React from "react";

type QRScannerProps = {
  onScan?: (result?: string | null) => void;
  onError?: (error?: unknown) => void;
  sound?: boolean;
};

export default function QRScanner({ onScan, onError, sound }: QRScannerProps) {

  return (
    <Scanner
      onScan={onScan}
      onError={onError}
      sound={sound}
      constraints={{
        facingMode: "environment",
      }}
      components={{
        onOff: true,
        tracker: (qrCodes, ctx) => {
          qrCodes.forEach((qrCode) => {
            const { boundingBox, cornerPoints } = qrCode;

            // bounding box
            ctx.strokeStyle = "blue";
            ctx.lineWidth = 4;

            ctx.strokeRect(
              boundingBox.x,
              boundingBox.y,
              boundingBox.width,
              boundingBox.height
            );

            // corner points
            ctx.fillStyle = "blue";
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
