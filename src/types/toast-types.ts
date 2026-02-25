import { IconType } from "react-icons/lib";

export type ToastType = "success" | "warning" | "error" | undefined;

export interface ToastItem {
  type: string;
  background: string;
  color: string;
  Icon: IconType;
}
