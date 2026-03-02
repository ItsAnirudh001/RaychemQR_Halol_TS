"use client";

import LottieView from "./lottie";
import noDataAnimation from "../../public/no-data-anim.json";
import useAppStore from "@/store/app-store";

export default function NoData() {
  const { loading } = useAppStore();

  return (
    <>
      {!loading && (
        <div className="flex flex-col items-center justify-center">
          <LottieView animation={noDataAnimation} />
          <h1 className="text-[1.5rem] font-bold">No Data Available</h1>
        </div>
      )}
    </>
  );
}
