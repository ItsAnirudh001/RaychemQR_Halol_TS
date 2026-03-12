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
import dayjs from "dayjs";
import { Pickslip } from "@/types/pickslip-type";
import { useRouter } from "next/navigation";
import { pickslipTableHeaders } from "@/constants/admin/table-headers";
import MuiPagination from "@/components/material-ui/pagination";
import { rowsPerPage } from "@/constants/admin/paginate-data";
import { useState } from "react";
import { tableIndices } from "@/utils/helpers";

export default function PickslipTable(props: {
  pickslips: Pickslip[] | undefined;
}) {
  const { pickslips } = props;
  const { push } = useRouter();

  const [page, setPage] = useState(0);

  const { topRowIndex, nthRowIndex } = tableIndices(page, rowsPerPage);

  function handleOrderClick(data: Pickslip) {
    new Promise((resolve) => {
      sessionStorage.setItem("pickslip", JSON.stringify(data));
      resolve(() => {});
    }).then(() => push(`/admin/pickslips/${data.oa_no}`));
  }

  return (
    <TableContainer component={Paper} className="table-container">
      <Table className="w-full bg-transparent! p-2!">
        <TableHead>
          <TableRow className="bg-white border-b! border-gray-800!">
            {pickslipTableHeaders?.map(({ name, width, align }, i) => (
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
          {pickslips?.slice(topRowIndex, nthRowIndex)?.map((data, i) => (
            <TableRow className="table-row-data" key={i + 1}>
              <TableCell
                className="tablecell text-[rgba(1,127,245,1)]! font-medium! underline! cursor-pointer! animated"
                onClick={() => handleOrderClick(data)}
              >
                {data.oa_no}
              </TableCell>

              <TableCell className="tablecell">{data.po_no}</TableCell>

              <TableCell className="tablecell">{data.items?.length}</TableCell>

              <TableCell className="tablecell">
                {dayjs(data.created_at).format("DD-MM-YYYY hh:mm:ss")}
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

      {pickslips && (
        <MuiPagination
          data={pickslips}
          page={page}
          setPage={setPage}
        />
      )}
    </TableContainer>
  );
}
