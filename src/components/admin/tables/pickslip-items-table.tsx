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
import { useEffect, useState } from "react";
import useAppStore from "@/store/app-store";
import { GetPickslipItems } from "@/api/common-utils";
import { getStoredPickslip } from "@/utils/helpers";

export default function PickslipItemsTable() {
  const { setLoading } = useAppStore();

  const pickslip = getStoredPickslip();

  const [pickslipItems, setPickslipItems] = useState<PickslipItem[]>();

  async function fetchPickslipItems() {
    setLoading(true);
    const { pickslip_id } = pickslip;

    try {
      const items = await GetPickslipItems(pickslip_id, setLoading);
      setPickslipItems(items);
    } catch (error) {
      console.error("Error in fetchPickslipItems", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPickslipItems();
  }, []);

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
          {pickslipItems?.map((data: PickslipItem) => (
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
