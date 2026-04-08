"use client";

import { adminroutes } from "@/api/admin/admin-routes";
import AdminPageHead from "@/components/admin/page-head";
import AuditTable from "@/components/admin/tables/audit-table";
import NoData from "@/components/no-data";
import useAppStore from "@/store/app-store";
import { UserLogsItem } from "@/types/table-types";
import { customAxios } from "@/utils/axios";
import { isAPISuccess, searchParam, timestamp } from "@/utils/helpers";
import { useEffect, useLayoutEffect, useState } from "react";

export default function AuditPage() {
  const { loading, setLoading } = useAppStore();
  const [userLogs, setUserLogs] = useState<UserLogsItem[]>();
  const [searchVal, setSearchVal] = useState<string>("");

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

  function searchedData() {
    const data = userLogs;

    if (!searchVal) return data;

    const searched = data?.filter((d) =>
      searchParam(d.username).includes(searchParam(searchVal)),
    );

    return searched;
  }

  const finalData = searchedData();
  const validData = Array.isArray(finalData) && finalData.length > 0;

  const tableProps = { userLogs: finalData };

  const headProps = {
    title: "Audit Logs",
    handleRefresh: fetchUserLogs,
    setSearchVal,
  };

  if (loading) return <></>;

  return (
    <div className="page gap-[3vh]">
      <AdminPageHead {...headProps} />

      {validData ? <AuditTable {...tableProps} /> : <NoData />}
    </div>
  );
}
