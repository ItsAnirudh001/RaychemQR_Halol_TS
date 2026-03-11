"use client";

import { adminroutes } from "@/api/admin/admin-routes";
import AddEditUserModal from "@/components/admin/modals/addedit-user-modal";
import UsersTable from "@/components/admin/tables/users-table";
import { UserTableItem } from "@/types/table-types";
import { customAxios } from "@/utils/axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import useAppStore from "@/store/app-store";
import { toastify } from "@/utils/toast";
import { MuiInputChangeEvent } from "@/types/mui-types";
import { apiErrorPrompter } from "@/api/common-utils";
import { isAPISuccess, validatedInput, validData } from "@/utils/helpers";
import { SelectChangeEvent } from "@mui/material";
import { userTableObject } from "@/constants/admin/admin-constants";
import NoData from "@/components/no-data";

export default function UserManagementPage() {
  const { loading, setLoading } = useAppStore();

  const [userModal, setUserModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] =
    useState<UserTableItem>(userTableObject);
  const [usersData, setUsersData] = useState<UserTableItem[]>([]);

  useLayoutEffect(() => {
    setLoading(true);
  }, []);

  function updateUser(
    key: string,
    e: MuiInputChangeEvent | SelectChangeEvent<string | number>,
  ) {
    const value = "target" in e ? e.target.value : "";

    setSelectedUser((prev) => {
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

  const isEdit = Boolean(selectedUser.user_id);

  async function postUserSubmit() {
    setLoading(true);

    if (!isEdit && !validatedInput(selectedUser.password, "password")) return;

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
    fetchUsers();
  }, []);

  async function handleRefresh() {
    await fetchUsers();
    setSelectedUser(userTableObject);
  }

  function showModal(data?: UserTableItem) {
    // console.log("modal data", data);
    const object = data || userTableObject;
    console.log("object", object);
    setSelectedUser(object);
    setUserModal(true);
  }

  function hideModal() {
    setUserModal(false);
  }

  const modalProps = {
    title: isEdit ? "Edit User" : "Add User",
    open: userModal,
    onClose: hideModal,
    selectedUser,
    updateUser,
    postUserSubmit,
  };

  const tableProps = { usersData, handleRefresh, selectedUser, showModal };

  if (loading) return <></>;

  return (
    <div className="page gap-[3vh]">
      <button
        className="hover-shadow flex py-[1vh] px-[1.5vw] bg-primary-heading rounded-xl self-end text-white font-semibold items-center gap-[1vw] cursor-pointer"
        onClick={() => showModal()}
      >
        <IoMdAdd className="text-[1.25rem]" />
        <span>Add Users</span>
      </button>

      {validData(usersData) ? <UsersTable {...tableProps} /> : <NoData />}

      <AddEditUserModal {...modalProps} />
    </div>
  );
}
