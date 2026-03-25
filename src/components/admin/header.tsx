"use client";

import { AutoLogout } from "@/api/common-utils";
import useAutoCall from "@/hooks/useAutoCall";
import { getStoredUser } from "@/utils/session-utils";
import { Menu, MenuItem } from "@mui/material";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { PiUserCircleFill } from "react-icons/pi";
import { RiLogoutCircleLine } from "react-icons/ri";

export default function AdminHeader() {
  const path = usePathname();

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  function postLogout() {
    AutoLogout()
    setMenuAnchor(null);
  }

  useAutoCall(postLogout);

  function showMenu(event: React.MouseEvent<HTMLButtonElement>) {
    setMenuAnchor(event.currentTarget);
  }

  function hideMenu() {
    setMenuAnchor(null);
  }

  // console.log("user",user);

  if (path.includes("login") || path.startsWith("/user")) return <></>;

  const user = getStoredUser();

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex flex-row py-4 px-4 items-center gap-4 bg-header-bg h-[10vh] justify-between">
      <Image
        suppressHydrationWarning={true}
        src="/ray-logo.png"
        alt="Org logo"
        width={200}
        height={0}
        priority
      />

      <div className="flex gap-[0.85vw]">
        <div className="flex flex-col text-end text-[0.8rem]">
          <span className="font-bold">{user?.full_name}</span>
          <span className="font-medium">{user?.username}</span>
        </div>

        <button onClick={showMenu} className="animated">
          <PiUserCircleFill
            color="rgb(9, 99, 126)"
            className="text-[2.4rem]"
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
        <MenuItem className="animated2 mui-menuitem" onClick={postLogout}>
          <RiLogoutCircleLine className="text-[1.4rem]" />
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
