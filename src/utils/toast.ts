// import { Close } from "@mui/icons-material";
import { Bounce, toast } from "react-toastify";
import { toastData } from "../constants/toast-data";
import { ToastType } from "@/types/toast-types";

export function toastify(type: ToastType, message: string, duration?: number) {
  const { background, color, Icon } =
    toastData.find((data) => data.type === type) || {};

  // console.log("back",background);

  if (color)
    document.documentElement.style.setProperty("--toast-progress", color);

  return toast(message, {
    position: "top-center",
    className: `toast-${type} flex text-base! m-6! rounded-xl! w-[80vw]! md:w-[30vw]!`,
    type: type,
    transition: Bounce,
    autoClose: duration || false,
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
