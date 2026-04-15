"use client";

import { GetFileForDownload, GetPickslipItems } from "@/api/common-utils";
import AdminPageHead from "@/components/admin/page-head";
import PickslipItemsTable from "@/components/admin/tables/pickslip-items-table";
import NoData from "@/components/no-data";
import useAppStore from "@/store/app-store";
import { PickslipItem } from "@/types/pickslip-type";
import { searchParam } from "@/utils/helpers";
import { getStoredPickslip } from "@/utils/session-utils";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FiDownload } from "react-icons/fi";
import { IoChevronBackCircle } from "react-icons/io5";

export default function PickslipItemsPage() {
  const { back } = useRouter();
  const { setLoading } = useAppStore();
  const [searchVal, setSearchVal] = useState<string>("");
  const [pickslipItems, setPickslipItems] = useState<PickslipItem[]>();

  const downloadRef = useRef<boolean>(false);

  useLayoutEffect(() => {
    setLoading(true);
  }, []);

  async function fetchPickslipItems() {
    setLoading(true);
    const { pickslip_id } = pickslip;

    try {
      const items = await GetPickslipItems(pickslip_id, setLoading);
      setPickslipItems(items);
    } catch (error) {
      console.error("Error in fetchPickslipItems", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPickslipItems();
  }, []);

  function usePickslip() {
    return getStoredPickslip();
  }

  const pickslip = usePickslip();

  function directToPickslips() {
    new Promise((resolve) => {
      back();
      resolve(() => {});
    }).then(() => sessionStorage.removeItem("pickslip"));
  }

  async function handleDownloadReport() {
    await GetFileForDownload(pickslip, setLoading, downloadRef);
  }

  function searchedData() {
    const data = pickslipItems;

    if (!searchVal) return data;

    const searched = data?.filter(
      (d) =>
        searchParam(d.material_description).includes(searchParam(searchVal)) ||
        searchParam(d.item_code).includes(searchParam(searchVal)) ||
        searchParam(d.serial_no).includes(searchParam(searchVal)),
    );

    return searched;
  }

  const finalData = searchedData();
  const validData = Array.isArray(finalData) && finalData.length > 0;

  const tableProps = { pickslipItems: searchedData() };

  const headProps = {
    title: `${pickslip?.oa_no} - Items`,
    handleRefresh: fetchPickslipItems,
    setSearchVal,
    searchVal,
  };

  return (
    <div className="page gap-[3vh]">
      <div className="flex items-center gap-[0.5vw]">
        <button
          className="animated text-[2.2rem] cursor-pointer text-gray-600"
          onClick={directToPickslips}
        >
          <IoChevronBackCircle />
        </button>
        <AdminPageHead {...headProps} />
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

      {validData ? <PickslipItemsTable {...tableProps} /> : <NoData />}
    </div>
  );
}
