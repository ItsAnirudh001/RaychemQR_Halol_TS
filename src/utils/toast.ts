"use client";

// import { Close } from "@mui/icons-material";
import { Bounce, toast } from "react-toastify";
import { toastData } from "../constants/toast-data";
import { ToastType } from "@/types/toast-types";

export function toastify(type: ToastType, message: string) {
  const { background, color } =
    toastData.find((data) => data.type === type) || {};

  // console.log("back",background);
  const duration: number = Number(
    process.env.NEXT_PUBLIC_TOAST_TIMEOUT || 4000,
  );

  if (color)
    document.documentElement.style.setProperty("--toast-progress", color);

  return toast(message, {
    position: "top-center",
    className: `toast-${type} flex m-2! rounded-xl! w-[69vw]! lg:w-[27vw]! text-[0.85rem]!`,
    type,
    transition: Bounce,
    autoClose: duration ? false : duration,
    closeOnClick: !Boolean(duration),
    hideProgressBar: false,
    draggable: true,
    pauseOnHover: false,
    // icon:Icon,
    // closeButton: duration && <Close color={color} />,
    // onClose:() => logConsole("Toast Closed"),
    style: {
      backgroundColor: background,
      color: color,
      fontFamily: "inherit",
    },
    progressClassName: "toast-bar",
  });
}
