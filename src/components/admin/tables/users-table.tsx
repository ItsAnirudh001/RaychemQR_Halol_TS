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
import { customAxios } from "@/utils/axios";
import { adminroutes } from "@/api/admin/admin-routes";
import { toastify } from "@/utils/toast";
import useAppStore from "@/store/app-store";
import { userTableHeaders } from "@/constants/admin/table-headers";

export default function UsersTable(props: {
  usersData: UserTableItem[];
  selectedUser: UserTableItem;
  showModal: (data?: UserTableItem | undefined) => void;
}) {
  const { setLoading } = useAppStore();
  const { usersData, showModal } = props;

  async function postDeleteUser(data:UserTableItem) {
    setLoading(true);
    const { user_id } = data;

    console.log("user_id",data);

    try {
      const { data, status } = await customAxios.delete(
        adminroutes.deleteUser + "/" + user_id,
      );

      const success = status == 200;

      if(!success) return;
      toastify("success", data?.message);
    } catch (error) {
      console.error("Error in deleteUser", error);
    } finally {
      setLoading(false);
    }
  }

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
          {usersData?.map((data, i) => (
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
                <div className="flex flex-1 w-full justify-evenly cursor-pointer gap-[1.1vw]">
                  <button
                    className="user-table-btn animated hover-shadow border-primary-heading text-primary-heading"
                    onClick={() => showModal(data)}
                  >
                    Edit
                  </button>
                  <button
                    className="user-table-btn animated hover-shadow border-red-600 text-red-600"
                    onClick={() => postDeleteUser(data)}
                  >
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
