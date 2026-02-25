import { ToastItem } from "@/types/toast-types";
import { RiErrorWarningLine } from "react-icons/ri";

export const toastData: ToastItem[] = [
  {
    type: "success",
    background: "rgb(250, 248, 241)",
    color: "black",
    Icon: RiErrorWarningLine
  },
  {
    type: "warning",
    background: "rgb(37, 103, 30)",
    color: "aquamarine",
    Icon: RiErrorWarningLine
  },
  {
    type: "error",
    background: "rgb(217, 44, 84)",
    color: "white",
    Icon: RiErrorWarningLine
  },
];
