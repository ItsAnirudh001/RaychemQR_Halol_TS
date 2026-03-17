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
import { useState } from "react";
import MuiPagination from "@/components/material-ui/pagination";
import { rowsPerPage } from "@/constants/admin/paginate-data";
import { tableIndices } from "@/utils/helpers";

export default function PickslipItemsTable(props: {
  pickslipItems: PickslipItem[] | undefined;
}) {
  const { pickslipItems } = props;
  const [page, setPage] = useState(0);

  const { topRowIndex, nthRowIndex } = tableIndices(page, rowsPerPage);

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
          {pickslipItems
            ?.slice(topRowIndex, nthRowIndex)
            ?.map((data: PickslipItem) => (
              <TableRow className="table-row-data" key={data.item_id}>
                <TableCell className="tablecell">{data.material_description}</TableCell>

                <TableCell className="tablecell">{data.item_code}</TableCell>

                <TableCell className="tablecell">
                  {data.requested_qty}
                </TableCell>

                <TableCell className="tablecell">
                  {data.serial_no}
                </TableCell>

              <TableCell className="tablecell text-center!">{data.weight}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {pickslipItems && (
        <MuiPagination data={pickslipItems} page={page} setPage={setPage} />
      )}
    </TableContainer>
  );
}
