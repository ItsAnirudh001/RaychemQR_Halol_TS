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

export default function AuditTable() {
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
          {tableData?.map((data, i) => (
            <TableRow className="table-row-data" key={i + 1}>
              <TableCell className="tablecell">{data.user_name}</TableCell>

              <TableCell className="tablecell">{data.name}</TableCell>

              <TableCell className="tablecell">{data.email_id}</TableCell>

              <TableCell className="tablecell">{data.date_time}</TableCell>

              <TableCell className="tablecell text-center!">
                {data.role}
              </TableCell>

              <TableCell className="tablecell flex! justify-center!">
                <div className="flex items-center bg-[rgba(213,242,214,1)] py-[1.1vh] px-[2.25vw] rounded-2xl cursor-pointer shadow-[0_0_6px_rgba(0,0,0,0.25)]">
                  <span className="text-green-600 text-[0.75rem] font-medium">
                    {data.status}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
