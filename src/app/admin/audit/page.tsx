"use client";

import { adminroutes } from "@/api/admin/admin-routes";
import AdminPageHead from "@/components/admin/page-head";
import AuditTable from "@/components/admin/tables/audit-table";
import NoData from "@/components/no-data";
import useAppStore from "@/store/app-store";
import { UserLogsItem } from "@/types/table-types";
import { customAxios } from "@/utils/axios";
import { isAPISuccess, validData } from "@/utils/helpers";
import { useEffect, useLayoutEffect, useState } from "react";

export default function AuditPage() {
  const { loading, setLoading } = useAppStore();
  const [userLogs, setUserLogs] = useState<UserLogsItem[]>();

  useLayoutEffect(() => {
    setLoading(true);
  }, []);

  async function fetchUserLogs() {
    setLoading(true);

    try {
      const { data } = await customAxios.get(adminroutes.userLogs);

      const success = isAPISuccess(data.status);

      if (!success) return;

      setUserLogs(data?.data);
    } catch (error) {
      console.error("Error in userLogs", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUserLogs();
  }, []);

  const tableProps = { userLogs };

  const headProps = { title: "Audit Logs", handleRefresh : fetchUserLogs };

  if (loading) return <></>;

  return (
    <div className="page gap-[3vh]">
      <AdminPageHead {...headProps} />

      {validData(userLogs) ? <AuditTable {...tableProps} /> : <NoData />}
    </div>
  );
}
