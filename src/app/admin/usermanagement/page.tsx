"use client";

import { adminroutes } from "@/api/admin/admin-routes";
import { apiErrorPrompter } from "@/api/common-utils";
import AddEditUserModal from "@/components/admin/modals/add-edit-delete-modal";
import AdminPageHead from "@/components/admin/page-head";
import UsersTable from "@/components/admin/tables/users-table";
import NoData from "@/components/no-data";
import { userTableObject } from "@/constants/admin/admin-constants";
import useAppStore from "@/store/app-store";
import { MuiInputChangeEvent } from "@/types/mui-types";
import { UserTableItem } from "@/types/table-types";
import { customAxios } from "@/utils/axios";
import { isAPISuccess, searchParam, validatedInput } from "@/utils/helpers";
import { getStoredUser } from "@/utils/session-utils";
import { toastify } from "@/utils/toast";
import { SelectChangeEvent } from "@mui/material";
import { useEffect, useLayoutEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";

export default function UserManagementPage() {
  const { loading, setLoading } = useAppStore();

  const [userModal, setUserModal] = useState<boolean>(false);
  const [mode, setMode] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<UserTableItem | undefined>(
    userTableObject,
  );
  const [usersData, setUsersData] = useState<UserTableItem[]>([]);
  const [searchVal, setSearchVal] = useState<string>("");

  useLayoutEffect(() => {
    setLoading(true);
  }, []);

  function updateUser(
    key: string,
    e: MuiInputChangeEvent | SelectChangeEvent<string | number>,
  ) {
    const value = "target" in e ? e.target.value : "";

    setSelectedUser((prev) => {
      if (!prev) return undefined;

      const object = {
        ...prev,
        [key]: value,
      };
      return object;
    });
  }

  async function fetchUsers() {
    setLoading(true);
    try {
      const { data } = await customAxios.get(adminroutes.getUsersList);
      // console.log("getUsersList data", data);
      setUsersData(data.users);
    } catch (error) {
      console.error("Error in getUsersList", error);
      apiErrorPrompter(error);
    } finally {
      setLoading(false);
    }
  }

  const isEdit = Boolean(selectedUser?.user_id);

  async function postUserSubmit() {
    if (mode === "Add User" && !validatedInput(selectedUser?.password || "", "password")) return;

    setLoading(true);

    try {
      const { data } = isEdit
        ? await customAxios.put(adminroutes.updateUser, selectedUser)
        : await customAxios.post(adminroutes.createUser, selectedUser);

      const { status, message } = data;

      const success = isAPISuccess(data.status) || status == 200;

      toastify(success ? "success" : "warning", message);

      if (!success) return;

      hideModal();
      await handleRefresh();
    } catch (error) {
      console.error(`Error in user submit`, error);
      apiErrorPrompter(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    sessionStorage.setItem("logout_session", "enabled");
    fetchUsers();
  }, []);

  function hideModal() {
    setUserModal(false);
    setSelectedUser(undefined);
    setMode("");
  }

  async function handleRefresh() {
    hideModal();
    setSelectedUser(userTableObject);
    await fetchUsers();
  }

  function showModal(params: { data?: UserTableItem; newMode: string }) {
    const { data, newMode } = params;
    const user = getStoredUser();

    if (newMode === "Delete User" && data?.user_id == user.user_id)
      return toastify("error", "Cannot delete self account");

    const object = data || userTableObject;
    console.log("object", object);
    setSelectedUser(object);
    setMode(newMode);
    setUserModal(true);
  }

  function searchedData() {
    const data = usersData;

    if (!searchVal) return data;

    const searched = data?.filter(
      (d) =>
        searchParam(d.email_id).includes(searchParam(searchVal)) ||
        searchParam(d.full_name).includes(searchParam(searchVal)) ||
        searchParam(d.phone_number).includes(searchParam(searchVal)),
    );

    return searched;
  }

  const finalData = searchedData();
  const validData = Array.isArray(finalData) && finalData.length > 0;

  const modalProps = {
    open: userModal,
    onClose: hideModal,
    selectedUser,
    updateUser,
    postUserSubmit,
    mode,
    handleRefresh,
  };

  const tableProps = {
    usersData: searchedData(),
    handleRefresh,
    selectedUser,
    showModal,
  };

  const headProps = { title: "User Management", handleRefresh, setSearchVal };

  return (
    <div className="page gap-[3vh]">
      <AdminPageHead {...headProps} />

      <button
        className="hover-shadow flex py-[1vh] px-[1.5vw] bg-primary-heading rounded-xl self-end text-white font-semibold items-center gap-[1vw] cursor-pointer"
        onClick={() => showModal({ newMode: "Add User" })}
      >
        <IoMdAdd className="text-[1.25rem]" />
        <span>Add User</span>
      </button>

      {validData ? <UsersTable {...tableProps} /> : <NoData />}

      <AddEditUserModal {...modalProps} />
    </div>
  );
}
