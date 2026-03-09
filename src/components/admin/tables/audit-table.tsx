"use client";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { tableData } from "@/constants/admin/mocks/audit-table-mock";
import { auditTableHeaders } from "@/constants/admin/table-headers";
import { useEffect, useState } from "react";
import { UserLogsItem } from "@/types/table-types";
import { customAxios } from "@/utils/axios";
import { adminroutes } from "@/api/admin/admin-routes";
import { isAPISuccess } from "@/utils/helpers";
import dayjs from "dayjs";
import useAppStore from "@/store/app-store";

export default function AuditTable() {
  const [userLogs, setUserLogs] = useState<UserLogsItem[]>();
  const { setLoading } = useAppStore();

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

  return (
    <TableContainer component={Paper} className="table-container">
      <Table className="w-full bg-transparent!">
        <TableHead>
          <TableRow className="bg-white border-b! border-gray-800!">
            {auditTableHeaders?.map(({ name, width, align }, i) => (
              <TableCell
                key={i + 1}
                align={(align as "center") || "left"}
                className="tablecell"
                style={width ? { width } : {}}
              >
                <span className="font-semibold! text-[0.85rem]">{name}</span>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {userLogs?.map((data, i) => (
            <TableRow className="table-row-data" key={i + 1}>
              <TableCell className="tablecell">{data.slno}</TableCell>

              <TableCell className="tablecell">{data.user_id}</TableCell>

              <TableCell className="tablecell">{data.username}</TableCell>

              <TableCell className="tablecell">
                {dayjs(data.login_time).format("DD-MM-YYYY hh:mm:ss")}
              </TableCell>

              <TableCell className="tablecell text-center!">
                {Number(data.login_success)}
              </TableCell>

              <TableCell className="tablecell text-center!">
                {data.login_flag}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
