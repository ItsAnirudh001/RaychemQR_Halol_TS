// import { Close } from "@mui/icons-material";
import { Bounce, toast } from "react-toastify";
import { toastData } from "../Data/toastData";
import { ToastType } from "@/Types/toastTypes";

export function toastify(type: ToastType, message: string, duration?: number) {
  const { background, color } =
    toastData.find((data) => data.type === type) || {};

  if (color)
    document.documentElement.style.setProperty("--toast-progress", color);

  return toast(message, {
    position: "bottom-center",
    className: "break-words whitespace-normal leading-[2.2rem]",
    type: type,
    transition: Bounce,
    autoClose: duration,
    closeOnClick: !Boolean(duration),
    hideProgressBar: false,
    draggable: true,
    pauseOnHover: false,
    // icon: <Icon color={color} />,
    // closeButton: duration && <Close color={color} />,
    // onClose:() => logConsole("Toast Closed"),
    style: {
      backgroundColor: background,
      color: color,
      fontWeight: 500,
      borderRadius: 12,
      minWidth: "22.5rem",
      fontSize: "0.92rem",
    },
    progressClassName: "toast-bar",
  });
}
