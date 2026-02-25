"use client";

import { Logout } from "@/api/common-utils";
import useAppStore from "@/store/app-store";
import { Menu, MenuItem } from "@mui/material";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";

export default function AdminHeader() {
  const name = usePathname();
  const { push } = useRouter();
  const { setLoading, user } = useAppStore();

  console.log("user", user);

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  if (name.includes("login")) return <></>;

  function showMenu(event: React.MouseEvent<HTMLButtonElement>) {
    setMenuAnchor(event.currentTarget);
  }

  function hideMenu() {
    setMenuAnchor(null);
  }

  async function postLogout() {
    await Logout(setLoading, push);
    setMenuAnchor(null);
  }

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex flex-row py-4 px-8 items-center gap-4 bg-header-bg h-[10vh] justify-between">
      <Image
        src="/org_logo.png"
        alt="Org logo"
        width={140}
        height={0}
        priority
      />

      <div className="flex gap-[0.85vw]">
        <div className="flex flex-col text-end text-[0.8rem]">
          <span className="font-bold">{user?.full_name}</span>
          <span className="font-medium">{user.username}</span>
        </div>

        <button onClick={showMenu}>
          <FaUserCircle
            color="rgba(108, 107, 110, 1)"
            className="text-[2rem]"
          />
        </button>
      </div>

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
            className: "text-[rgba(71,67,67,1)]! rounded-xl! ml-[-1vw]!",
          },
          root: {
            className: "bg-[rgba(0,0,0,0.45)]",
          },
        }}
      >
        <MenuItem className="mui-menuitem" onClick={postLogout}>
          <RiLogoutCircleLine className="text-[1.4rem]" />
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
