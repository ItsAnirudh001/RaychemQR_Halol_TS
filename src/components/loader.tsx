"use client";

import useAppStore from "@/store/app-store";
import { FadeLoader } from "react-spinners";
import AppModal from "./material-ui/modal";

export default function Loader() {
  const { loading } = useAppStore();

  return (
    <AppModal open={loading}>
      <div className="flex flex-col gap-[2.25vh] text-white items-center outline-none!">
        <FadeLoader color="white" />
        <span className="font-semibold text-[2.5vh]">Loading...........</span>
      </div>
    </AppModal>
  );
}
