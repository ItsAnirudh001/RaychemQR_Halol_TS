"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// import useAppStore from "@/store/app";
import Drawer from "@mui/material/Drawer";
// import ClickAwayListener from "@mui/material/ClickAwayListener";
// import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import { sidebarData } from "@/constants/sidebar-data";

export default function AdminSidebar() {
  const path = usePathname();

  if (path.includes("login") || path.startsWith("/user")) return <></>;

  // console.log("name", path);

  //   function handleSidebar() {
  //     setSidebarOpen(!sidebarOpen);
  //   }

  //   const Icon = sidebarOpen ? IoIosArrowDropleft : IoIosArrowDropright;

  return (
    // <ClickAwayListener onClickAway={() => setSidebarOpen(false)}>
    <Drawer
      variant="persistent"
      open
      ModalProps={{ keepMounted: true }}
      sx={{
        width: "15vw",
        [`& .MuiDrawer-paper`]: {
          width: "inherit",
          transition: "width 0.25s",
          marginTop: "10vh",
        },
      }}
    >
      <button
        className={`flex lg:hidden items-center ${
          // sidebarOpen ? "justify-end mr-2" :
          "justify-center"
        }`}
        //   onClick={handleSidebar}
      >
        {/* <Icon className="mt-3 text-2xl cursor-pointer text-foreground!" /> */}
      </button>

      <div
        className={`flex-col gap-3 px-2 py-3 w-full ${
          // sidebarOpen ? "flex" :
          "hidden lg:flex"
        }`}
      >
        <div className="flex flex-col px-3 gap-2.5 mt-3">
          {sidebarData.map((data, i) => {
            const selected: boolean = path.startsWith(data.route);
            const color = selected
              ? "bg-sideitem-bg! text-sideitem-text! font-bold"
              : "hover-shadow text-gray-500! font-medium";

            return (
              <div
                className={`flex flex-row w-full items-center rounded-xl p-3 gap-2 ${color}`}
                key={i + 1}
              >
                <data.icon className="text-2xl" />
                <Link
                  href={data.route}
                  className="w-full text-[0.9vw]"
                  //   onClick={handleSidebar}
                >
                  {data.name}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </Drawer>
    // </ClickAwayListener>
  );
}
