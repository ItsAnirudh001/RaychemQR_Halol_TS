import AuditTable from "@/components/admin/tables/audit-table";
import React from "react";

export default function AuditPage() {
  return (
    <div className="page gap-6">
      <h1 className="font-semibold">Audit Logs</h1>

      <AuditTable />
    </div>
  );
}
