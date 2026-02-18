"use client";

import UsersTable from "@/components/admin/tables/users-table";
import { IoMdAdd } from "react-icons/io";

export default function UserManagement() {
  return (
    <div className="page gap-6">
      <button className="hover-shadow flex py-2 px-5 bg-primary-heading rounded-xl self-end text-white font-semibold items-center gap-3 cursor-pointer">
        <IoMdAdd className="text-xl" />
        <span>Add Users</span>
      </button>

      <UsersTable />
    </div>
  );
}
