"use client";

import { adminroutes } from "@/api/admin/admin-routes";
import MuiInput from "@/components/material-ui/input";
import AppModal from "@/components/material-ui/modal";
import MuiSingleSelect from "@/components/material-ui/single-select";
import { rolesData } from "@/constants/roles-data";
import useAppStore from "@/store/app-store";
import { MuiInputChangeEvent } from "@/types/mui-types";
import { UserTableItem } from "@/types/table-types";
import { customAxios } from "@/utils/axios";
import { toastify } from "@/utils/toast";
import { SelectChangeEvent } from "@mui/material";
import { IoMdClose } from "react-icons/io";

export default function AddEditUserModal(props: {
  open: boolean;
  onClose: () => void;
  selectedUser: UserTableItem | undefined;
  updateUser: (
    key: string,
    e: MuiInputChangeEvent | SelectChangeEvent<string | number>,
  ) => void;
  postUserSubmit: () => Promise<void>;
  mode: string;
  handleRefresh: () => Promise<void>;
}) {
  const {
    selectedUser,
    updateUser,
    onClose,
    postUserSubmit,
    mode,
    handleRefresh,
  } = props;

  const isCreate = mode === "Add User"
  const isDelete = mode === "Delete User";

  const { setLoading } = useAppStore();

  const inputProps = {
    background: "rgba(241, 242, 244, 1)",
    noBorder: true,
    required: true,
    radius: 12,
    disabled: isDelete,
  };

  async function postDeleteUser(data: UserTableItem) {
    setLoading(true);
    const { user_id } = data;

    // console.log("user_id", data);

    try {
      const { data, status } = await customAxios.delete(
        adminroutes.deleteUser + "/" + user_id,
      );

      const success = status == 200;

      toastify(success ? "success" : "warning", data?.message);

      if (!success) return;

      await handleRefresh();
    } catch (error) {
      console.error("Error in deleteUser", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    if(!selectedUser) return;
    
    if (isDelete) return await postDeleteUser(selectedUser);

    e.preventDefault();
    await postUserSubmit();
  }

  if(!selectedUser) return <></>

  return (
    <AppModal {...props}>
      <div className="flex flex-col w-[45vw] bg-white px-[2.2vw] pt-[2.25vh] pb-[3vh] outline-none! rounded-2xl gap-[4.5vh]">
        {/* header */}
        <div className="flex w-full pb-[1.25vh] items-center justify-between border-b-2 border-[rgba(173,180,185,1)]">
          <h1 className="font-medium text-[rgba(65,68,70,1)] text-[1.25rem]">
            {mode}
          </h1>

          <button
            className="hover-shadow text-[rgba(69,85,108,1)]! text-[2rem]"
            onClick={onClose}
          >
            <IoMdClose />
          </button>
        </div>

        {/* inputs */}
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-10">
          <div className="flex flex-col gap-[4vh]">
            <div className="flex gap-[1.4vw]">
              <MuiInput
                value={selectedUser.email_id}
                label="Email"
                type="email"
                placeholder="Enter Email Address"
                onChange={(e: MuiInputChangeEvent) => updateUser("email_id", e)}
                {...inputProps}
              />

              <MuiInput
                value={selectedUser.phone_number}
                label="Contact Number"
                type="mobile_no"
                placeholder="Enter Contact Number"
                onChange={(e: MuiInputChangeEvent) =>
                  updateUser("phone_number", e)
                }
                {...inputProps}
              />
            </div>

            <div className="flex gap-[1.4vw]">
              <MuiInput
                value={selectedUser.username}
                label="Username"
                type="username"
                placeholder="Enter Username"
                onChange={(e: MuiInputChangeEvent) => updateUser("username", e)}
                {...inputProps}
              />

              <MuiInput
                value={selectedUser.full_name}
                label="Full Name"
                type="text"
                placeholder="Enter Full Name"
                onChange={(e: MuiInputChangeEvent) =>
                  updateUser("full_name", e)
                }
                {...inputProps}
              />
            </div>

            <div className="flex gap-[1.4vw]">
              {isCreate && (
                <MuiInput
                  value={selectedUser.password}
                  label="Password"
                  type="password"
                  placeholder="Enter Password"
                  min={8}
                  onChange={(e: MuiInputChangeEvent) =>
                    updateUser("password", e)
                  }
                  {...inputProps}
                />
              )}

              <MuiSingleSelect
                label="Select Role"
                value={selectedUser.role}
                items={rolesData}
                disabled={isDelete}
                handleChange={(e) => updateUser("role", e)}
                className="bg-[rgba(241,242,244,1)]! text-[0.85rem]! rounded-2xl!"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-[1.25vw]">
            <button
              type="button"
              className="animated hover-shadow mobile-btn-main py-[1.25vh]! px-[2vw]! font-medium! text-[rgba(65,68,70,1)]! border border-[rgba(152,146,146,1)] bg-transparent! rounded-xl w-fit! text-[0.92rem]!"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`animated hover-shadow mobile-btn-main py-[1.25vh]! px-[2.75vw]! font-medium! w-fit! text-[0.92rem]! ${isDelete ? "bg-red-600!" : "bg-[rgba(59,130,246,1)]!"}`}
            >
              {isDelete ? "Confirm" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </AppModal>
  );
}
