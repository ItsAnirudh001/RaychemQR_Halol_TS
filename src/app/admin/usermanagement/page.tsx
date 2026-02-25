"use client";

import { adminroutes } from "@/api/admin/admin-routes";
import AddEditUserModal from "@/components/admin/modals/addedit-user-modal";
import UsersTable from "@/components/admin/tables/users-table";
import { UserTableItem, userTableObject } from "@/types/table-types";
import { customAxios } from "@/utils/axios";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import qs from "qs";
import useAppStore from "@/store/app-store";
import { toastify } from "@/utils/toast";
import { MuiInputChangeEvent, SelectEvent } from "@/types/mui-types";

export default function UserManagementPage() {
  const { setLoading } = useAppStore();

  const [userModal, setUserModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] =
    useState<UserTableItem>(userTableObject);
  const [usersData, setUsersData] = useState<UserTableItem[]>([]);

  function updateUser(key: string, e: MuiInputChangeEvent | SelectEvent) {
    const { value } = e.target;

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
    } finally {
      setLoading(false);
    }
  }

  async function postUserSubmit() {
    setLoading(true);
    try {
      const { data } = isEdit
        ? await customAxios.put(
            adminroutes.updateUser,
            qs.stringify(selectedUser),
          )
        : await customAxios.post(
            adminroutes.createUser,
            qs.stringify(selectedUser),
          );

      toastify("success", data?.message, 1000);
      await handleRefresh();
    } catch (error) {
      console.error(`Error in user submit`, error);
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
    setSelectedUser(data || userTableObject);
    setUserModal(true);
  }

  function hideModal() {
    setUserModal(false);
  }

  const isEdit = Boolean(selectedUser.user_id);

  const modalProps = {
    title: isEdit ? "Edit User" : "Add User",
    open: userModal,
    onClose: hideModal,
    selectedUser,
    updateUser,
    isEdit,
    postUserSubmit,
  };

  const tableProps = { usersData, handleRefresh, selectedUser, showModal };

  return (
    <div className="page gap-[3vh]">
      <button
        className="hover-shadow flex py-[1vh] px-[1.5vw] bg-primary-heading rounded-xl self-end text-white font-semibold items-center gap-[1vw] cursor-pointer"
        onClick={() => showModal()}
      >
        <IoMdAdd className="text-[1.25rem]" />
        <span>Add Users</span>
      </button>

      <UsersTable {...tableProps} />

      <AddEditUserModal {...modalProps} />
    </div>
  );
}
