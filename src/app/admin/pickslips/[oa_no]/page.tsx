"use client";

import { GetFileForDownload } from "@/api/common-utils";
import PickslipItemsTable from "@/components/admin/tables/pickslip-items-table";
import useAppStore from "@/store/app-store";
import { getStoredPickslip } from "@/utils/session-utils";
import { useRouter } from "next/navigation";
import { FiDownload } from "react-icons/fi";
import { IoChevronBackCircle } from "react-icons/io5";

export default function PickslipItemsPage() {
  const { back } = useRouter();
  const { setLoading } = useAppStore();

  function usePickslip() {
    return getStoredPickslip();
  }

  const pickslip = usePickslip();

  function directToPickslips() {
    back();
    setTimeout(() => {
      sessionStorage.removeItem("pickslip");
    }, 1000);
  }

  async function handleDownloadReport() {
    try {
      await GetFileForDownload(pickslip, setLoading);
    } catch (error) {
      console.error("Error in downloadFile for admin", error);
    }
  }

  return (
    <div className="page gap-[3vh]">
      <div className="flex items-center gap-[0.5vw]">
        <button className="animated text-3xl cursor-pointer" onClick={directToPickslips}>
          <IoChevronBackCircle />
        </button>
        <h1 className="font-semibold">{`${pickslip?.oa_no} - Items`}</h1>
      </div>
      {pickslip?.status === "submitted" && (
        <button
          className="animated hover-shadow flex py-[1.5vh] px-[1.5vw] bg-primary-heading rounded-xl self-end text-white font-semibold items-center gap-[1vw] cursor-pointer"
          onClick={handleDownloadReport}
        >
          <FiDownload className="text-[1.25rem]" />
          <span className="text-[0.91rem]">Download</span>
        </button>
      )}

      <PickslipItemsTable />
    </div>
  );
}
