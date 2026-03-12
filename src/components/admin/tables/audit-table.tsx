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
import { useState } from "react";
import { UserLogsItem } from "@/types/table-types";
import MuiPagination from "@/components/material-ui/pagination";
import { rowsPerPage } from "@/constants/admin/paginate-data";
import dayjs from "dayjs";
import { tableIndices } from "@/utils/helpers";

export default function AuditTable(props: {
  userLogs: UserLogsItem[] | undefined;
}) {
  const { userLogs } = props;
  const [page, setPage] = useState(0);

  const { topRowIndex, nthRowIndex } = tableIndices(page, rowsPerPage);

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
          {userLogs?.slice(topRowIndex, nthRowIndex)?.map((data, i) => (
            <TableRow className="table-row-data" key={i + 1}>
              <TableCell className="tablecell">{data.slno}</TableCell>

              <TableCell className="tablecell">{data.user_id}</TableCell>

              <TableCell className="tablecell">{data.username}</TableCell>

              <TableCell className="tablecell">
                {dayjs(data.login_time).format("DD-MM-YYYY hh:mm:ss")}
              </TableCell>

              <TableCell className="tablecell text-center!">
                {data.login_flag}
              </TableCell>

              <TableCell className="tablecell text-center!">
                {Number(data.login_success)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {userLogs && (
        <MuiPagination data={userLogs} page={page} setPage={setPage} />
      )}
    </TableContainer>
  );
}
