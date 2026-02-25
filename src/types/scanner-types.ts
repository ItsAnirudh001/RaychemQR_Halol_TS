import { IDetectedBarcode } from "@yudiel/react-qr-scanner";

export type QRScannerProps = {
  onScan: (detectedCodes: IDetectedBarcode[]) => void;
  onError: (error?: unknown) => void;
  sound: boolean;
};