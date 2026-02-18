import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { tableHeaders } from "@/data/usermanagement/table-data";
import { tableData } from "@/data/mocks/user-table-mock";

export default function UsersTable() {
  return (
    <TableContainer
      component={Paper}
      className="rounded-xl! bg-transparent! border! border-gray-300! shadow-none!"
    >
      <Table className="w-full bg-transparent!">
        <TableHead>
          <TableRow className="bg-white border-b! border-gray-800!">
            {tableHeaders?.map(({ name, width, align }, i) => (
              <TableCell
                key={i + 1}
                align={(align as "center") || "left"}
                className="tablecell"
                style={width ? { width } : {}}
              >
                <span className="font-semibold! text-sm">{name}</span>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData?.map((data, i) => (
            <TableRow className="even:bg-gray-50 odd:bg-transparent" key={i + 1}>
              <TableCell className="tablecell">
                {data.user_name}
              </TableCell>

              <TableCell className="tablecell">{data.name}</TableCell>

              <TableCell className="tablecell">
                {data.email_id}
              </TableCell>

              <TableCell className="tablecell">
                {data.phone_number}
              </TableCell>

              <TableCell className="tablecell text-center!">
                {data.role}
              </TableCell>

              <TableCell className="tablecell flex! justify-center!">
                <div className="flex items-center bg-[rgba(213,242,214,1)] py-2 px-8 rounded-2xl cursor-pointer shadow-[0_0_6px_rgba(0,0,0,0.25)]">
                  <span className="text-green-600 text-xs font-medium">
                    {data.status}
                  </span>
                </div>
              </TableCell>

              <TableCell className="tablecell">
                <div className="flex flex-1 w-full justify-evenly cursor-pointer gap-4">
                  <button className="user-table-btn animated hover-shadow border-primary-heading text-primary-heading">
                    Edit
                  </button>
                  <button className="user-table-btn animated hover-shadow border-red-600 text-red-600">
                    Delete
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
