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
import { UserTableItem } from "@/types/table-types"; 
import { userTableHeaders } from "@/constants/admin/table-headers";
import MuiPagination from "@/components/material-ui/pagination";
import { useState } from "react";
import { rowsPerPage } from "@/constants/admin/paginate-data";
import MuiTooltip from "@/components/material-ui/tooltip";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { tableIndices } from "@/utils/helpers";

export default function UsersTable(props: {
  usersData: UserTableItem[];
  selectedUser: UserTableItem;
  showModal: (params: {
    data?: UserTableItem | undefined;
    newMode: string;
  }) => void;
}) {
  const { usersData, showModal } = props;
  const [page, setPage] = useState(0);

  const { topRowIndex, nthRowIndex } = tableIndices(page, rowsPerPage);

  return (
    <TableContainer component={Paper} className="table-container">
      <Table className="w-full bg-transparent!">
        <TableHead>
          <TableRow className="bg-white border-b! border-gray-800!">
            {userTableHeaders?.map(({ name, width, align }, i) => (
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
          {usersData?.slice(topRowIndex, nthRowIndex)?.map((data, i) => (
            <TableRow className="table-row-data" key={i + 1}>
              <TableCell className="tablecell">{data.user_id}</TableCell>

              <TableCell className="tablecell">{data.full_name}</TableCell>

              <TableCell className="tablecell">{data.email_id}</TableCell>

              <TableCell className="tablecell">{data.phone_number}</TableCell>

              <TableCell className="tablecell text-center!">
                {data.role}
              </TableCell>

              <TableCell className="tablecell flex! justify-center!">
                <div className="flex items-center bg-[rgba(213,242,214,1)] py-[1.25vh] px-[2.5vw] rounded-2xl cursor-pointer shadow-[0_0_6px_rgba(0,0,0,0.25)]">
                  <span className="text-green-600 text-[0.75rem] font-medium">
                    {data.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
              </TableCell>

              <TableCell className="tablecell">
                <div className="flex flex-1 w-full justify-evenly cursor-pointer gap-[0.75vw] px-3">
                  <MuiTooltip title="Edit User">
                    <button
                      className="user-table-btn animated hover-shadow bg-indigo-800"
                      onClick={() => showModal({ data, newMode: "Edit User" })}
                    >
                      <FaUserEdit />
                    </button>
                  </MuiTooltip>

                  <MuiTooltip title={data.is_active ? "Delete User" : "User Already Deleted"} disabled={!data.is_active}>
                    <button
                      className={`user-table-btn bg-red-600 ${data.is_active ? "animated hover-shadow" : "opacity-60 cursor-not-allowed!"}`}
                      onClick={() => showModal({ data, newMode: "Delete User" })}
                      disabled={!data.is_active}
                    >
                      <MdDelete />
                    </button>
                  </MuiTooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <MuiPagination data={usersData} page={page} setPage={setPage} />
    </TableContainer>
  );
}
