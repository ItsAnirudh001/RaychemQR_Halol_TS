"use client";

import { GetAllPickslips } from "@/api/common-utils";
import PickslipTable from "@/components/admin/tables/pickslip-table";
import useAppStore from "@/store/app-store";
import { Pickslip } from "@/types/pickslip-type";
import { useEffect, useState } from "react";

export default function PickslipsPage() {
  const { setLoading } = useAppStore();
  const [pickslips, setPickslips] = useState<Pickslip[]>();

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

  return (
    <div className="page gap-6">
      <h1 className="font-semibold">Pickslip details</h1>

      <PickslipTable {...tableProps} />
    </div>
  );
}
