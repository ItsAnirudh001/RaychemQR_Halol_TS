import { JSXElementConstructor, ReactElement } from "react";
import { Modal } from "@mui/material";

export default function AppModal({
  children,
  open,
  onClose,
}: {
  children: ReactElement<unknown, string | JSXElementConstructor<unknown>>;
  open: boolean;
  onClose?: () => void;
}) {

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      className="flex h-full w-full items-center justify-center p-4"
      slotProps={{
        backdrop: {
          className: "bg-[rgba(0,0,0,0.5)]!",
        },
      }}
    >
      {children}
    </Modal>
  );
}