"use client";

import { GetAllPickslips } from "@/api/common-utils";
import AdminPageHead from "@/components/admin/page-head";
import PickslipTable from "@/components/admin/tables/pickslip-table";
import NoData from "@/components/no-data";
import useAppStore from "@/store/app-store";
import { Pickslip } from "@/types/pickslip-type";
import { searchParam, timestamp } from "@/utils/helpers";
import { useEffect, useLayoutEffect, useState } from "react";

export default function PickslipsPage() {
  const { loading, setLoading } = useAppStore();
  const [pickslips, setPickslips] = useState<Pickslip[]>();
  const [searchVal, setSearchVal] = useState<string>("");

  useLayoutEffect(() => {
    setLoading(true);
  }, []);

  async function fetchPickslips() {
    setLoading(true);
    try {
      const data = await GetAllPickslips(setLoading);
      setPickslips(data);
    } catch (error) {
      console.error("Error fetching pickslips", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPickslips();
  }, []);

  function searchedData() {
    const data = pickslips;

    if (!searchVal) return data;

    const searched = data?.filter(
      (d) =>
        searchParam(d.oa_no).includes(searchParam(searchVal)) ||
        searchParam(d.po_no).includes(searchParam(searchVal)) ||
        searchParam(timestamp(d.created_at)).includes(searchParam(searchVal)) ||
        searchParam(d.status).includes(searchParam(searchVal)),
    );

    return searched;
  }

  // console.log("Pickslips",pickslips);

  const finalData = searchedData();
  const validData = Array.isArray(finalData) && finalData.length > 0;

  const tableProps = { pickslips: searchedData() };

  const headProps = {
    title: "Pickslip details",
    handleRefresh: fetchPickslips,
    setSearchVal,
  };

  if (loading) return <></>;

  return (
    <div className="page gap-6">
      <AdminPageHead {...headProps} />

      {validData ? <PickslipTable {...tableProps} /> : <NoData />}
    </div>
  );
}
