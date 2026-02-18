import PackslipTable from "@/components/admin/tables/packslip-table";
import React from "react";

export default function ReportsPage() {
  return (
    <div className="page gap-6">
      <h1 className="font-semibold">Packslip details</h1>

      <PackslipTable />
    </div>
  );
}
