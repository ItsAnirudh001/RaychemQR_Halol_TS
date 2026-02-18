"use client";

import { Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { FaUserCircle, FaSearch } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import { MdLock } from "react-icons/md";

export default function UserAuthHeader({
  children,
  setSearchVal,
}: {
  children?: React.ReactNode;
  searchable?: boolean;
  setSearchVal?: React.Dispatch<React.SetStateAction<string>>;
}) {
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

  return (
    <div
      className="flex p-3 items-center justify-between box-shadow bg-white"
      // fixed top-0 right-0 left-0"
    >
      <div className="flex gap-2 items-center">{children}</div>

      <div className="flex gap-3 items-center">
        {Boolean(setSearchVal) && (
          <div className="flex bg-[rgba(237,243,247,1)] rounded-3xl p-[1.1vh] placeholder:text-gray-600 gap-2 items-center border border-gray-300 text-xs!">
            <FaSearch />
            <input
              onChange={handleSearch}
              placeholder="Search"
              type="search"
              className="border-none outline-none placeholder-gray-500 font-medium max-w-[27vw]"
            />
          </div>
        )}

        <button onClick={showMenu}>
          <FaUserCircle
            color="rgba(108, 107, 110, 1)"
            className="text-[3.75vh]"
          />
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
          <MenuItem className="mui-menuitem">
            <MdLock className="text-[2.65vh]" />
            Change Password
          </MenuItem>
          <MenuItem className="mui-menuitem">
            <RiLogoutCircleLine className="text-[2.5vh]" />
            Logout
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}
