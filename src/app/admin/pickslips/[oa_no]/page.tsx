"use client"

import PickslipItemsTable from "@/components/admin/tables/pickslip-items-table";
import { FiDownload } from "react-icons/fi";

export default function PickslipItemsPage() {
  return (
    <div className="page gap-[3vh]">
      <button className="animated hover-shadow flex py-[1.5vh] px-[1.5vw] bg-primary-heading rounded-xl self-end text-white font-semibold items-center gap-[1vw] cursor-pointer">
        <FiDownload className="text-[1.25rem]"/>
        <span className="text-[0.91rem]">Download</span>
      </button>
      
      <PickslipItemsTable />
    </div>
  );
}
