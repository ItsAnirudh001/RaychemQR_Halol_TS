"use client";

import { Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import { PiUserCircleFill } from "react-icons/pi";
import { MdLock } from "react-icons/md";
import { useRouter } from "next/navigation";
import { AutoLogout } from "@/api/common-utils";
import useAppStore from "@/store/app-store";
import { IoRefreshCircleSharp } from "react-icons/io5";
import useMobileAutoCall from "@/hooks/user/useMobileAutoCall";

export default function UserAuthHeader({
  children,
  setSearchVal,
  handleRefresh,
}: {
  children?: React.ReactNode;
  setSearchVal?: React.Dispatch<React.SetStateAction<string>>;
  handleRefresh?: () => Promise<void>;
}) {
  const { push } = useRouter();
  const { setLoading } = useAppStore();

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  function showMenu(event: React.MouseEvent<HTMLButtonElement>) {
    setMenuAnchor(event.currentTarget);
  }

  function hideMenu() {
    setMenuAnchor(null);
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    if (!setSearchVal) return;

    const { value } = e.target;
    setSearchVal(value);
  }

  function postLogout() {
    AutoLogout();
    setMenuAnchor(null);
  }

  useMobileAutoCall(postLogout);

  return (
    <div
      className="shadowed flex p-3 items-center justify-between box-shadow bg-white
      fixed right-0 left-0 top-0"
    >
      <div className="flex gap-2 items-center">{children}</div>

      <div className="flex gap-[1.5vw] items-center">
        {Boolean(handleRefresh) && (
          <button className="animated2" onClick={handleRefresh}>
            <IoRefreshCircleSharp className="text-primary-heading text-[2.2rem]" />
          </button>
        )}

        {Boolean(setSearchVal) && (
          <div className="flex bg-[rgba(237,243,247,1)] rounded-3xl p-2 placeholder:text-gray-600 gap-2 items-center border border-gray-300 text-[0.75rem]!">
            <FaSearch />
            <input
              onChange={handleSearch}
              placeholder="Search"
              type="search"
              className="border-none outline-none placeholder-gray-500 font-medium max-w-[27vw]"
            />
          </div>
        )}

        <button className="animated2" onClick={showMenu}>
          <PiUserCircleFill color="rgb(9, 99, 126)" className="text-[2.4rem]" />
        </button>

        <Menu
          id="basic-menu"
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={hideMenu}
          slotProps={{
            list: {
              "aria-labelledby": "basic-button",
            },
            paper: {
              className: "text-[rgba(71,67,67,1)]! rounded-xl!",
            },
            root: {
              className: "bg-[rgba(0,0,0,0.45)]",
            },
          }}
        >
          <MenuItem
            className="animated2 mui-menuitem-mobile"
            onClick={() => push("/user/changepassword")}
          >
            <MdLock className="text-[1.25rem]" />
            Change Password
          </MenuItem>
          <MenuItem
            className="animated2 mui-menuitem-mobile"
            onClick={postLogout}
          >
            <RiLogoutCircleLine className="text-[1.1rem]" />
            Logout
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}
