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
import { PickslipItem } from "@/types/pickslip-type";
import { pickslipItemsTableHeaders } from "@/constants/admin/table-headers";

export default function PickslipItemsTable() {
  const items = JSON.parse(sessionStorage.getItem("pickslip_items")!);

  return (
    <TableContainer component={Paper} className="table-container">
      <Table className="w-full bg-transparent!">
        <TableHead>
          <TableRow className="bg-white border-b! border-gray-800!">
            {pickslipItemsTableHeaders?.map(({ name, width, align }, i) => (
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
          {items?.map((data: PickslipItem) => (
            <TableRow className="table-row-data" key={data.item_id}>
              <TableCell className="tablecell">{data.item_name}</TableCell>

              <TableCell className="tablecell">{data.item_code}</TableCell>

              <TableCell className="tablecell">{data.requested_qty}</TableCell>

              <TableCell className="tablecell">{data.serial_no}</TableCell>

              <TableCell className="tablecell">{data.net_weight}</TableCell>

              <TableCell className="tablecell">{data.gross_weight}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
