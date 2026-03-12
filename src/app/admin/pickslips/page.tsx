"use client";

import { GetAllPickslips } from "@/api/common-utils";
import AdminPageHead from "@/components/admin/page-head";
import PickslipTable from "@/components/admin/tables/pickslip-table";
import NoData from "@/components/no-data";
import useAppStore from "@/store/app-store";
import { Pickslip } from "@/types/pickslip-type";
import { validData } from "@/utils/helpers";
import { useEffect, useLayoutEffect, useState } from "react";

export default function PickslipsPage() {
  const { loading, setLoading } = useAppStore();
  const [pickslips, setPickslips] = useState<Pickslip[]>();

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

  // console.log("Pickslips",pickslips);

  const tableProps = { pickslips };

  const headProps = {
    title: "Pickslip details",
    handleRefresh: fetchPickslips,
  };

  if (loading) return <></>;

  return (
    <div className="page gap-6">
      <AdminPageHead {...headProps} />

      {validData(pickslips) ? <PickslipTable {...tableProps} /> : <NoData />}
    </div>
  );
}
