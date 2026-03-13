"use client";

import { adminroutes } from "@/api/admin/admin-routes";
import AddEditUserModal from "@/components/admin/modals/add-edit-delete-modal";
import UsersTable from "@/components/admin/tables/users-table";
import { UserTableItem } from "@/types/table-types";
import { customAxios } from "@/utils/axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import useAppStore from "@/store/app-store";
import { toastify } from "@/utils/toast";
import { MuiInputChangeEvent } from "@/types/mui-types";
import { apiErrorPrompter } from "@/api/common-utils";
import {
  isAPISuccess,
  searchParam,
  validatedInput,
  validData,
} from "@/utils/helpers";
import { SelectChangeEvent } from "@mui/material";
import { userTableObject } from "@/constants/admin/admin-constants";
import NoData from "@/components/no-data";
import AdminPageHead from "@/components/admin/page-head";

export default function UserManagementPage() {
  const { loading, setLoading } = useAppStore();

  const [userModal, setUserModal] = useState<boolean>(false);
  const [mode, setMode] = useState<string>("");
  const [selectedUser, setSelectedUser] =
    useState<UserTableItem>(userTableObject);
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

    if (!validatedInput(selectedUser.password, "password")) return;

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

  function hideModal() {
    setUserModal(false);
    setMode("");
  }

  async function handleRefresh() {
    hideModal();
    setSelectedUser(userTableObject);
    await fetchUsers();
  }

  function showModal(params: { data?: UserTableItem; newMode: string }) {
    const { data, newMode } = params;
    // console.log("modal data", data);
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

  if (loading) return <></>;

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
