"use client";

import React from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import { usePathname } from "next/navigation";
import { userExists } from "@/utils/session-utils";
import { preauthAdminPaths } from "@/utils/admin/admin-utils";
import UnAuth from "../unauth";
import { isDev } from "@/constants/layout-data";
import useTokenLogout from "@/hooks/useTokenLogout";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const path = usePathname();

  useTokenLogout();

  // console.log("dev mode?",isDev);

  if (path.startsWith("/user")) return <></>;

  if (!userExists() && !preauthAdminPaths.includes(path))
    return <UnAuth no_margin />;

  return (
    <div
      className={`${isDev ? "flex flex-col" : "hidden lg:flex lg:flex-col"} w-screen overflow-x-hidden`}
      suppressHydrationWarning={true}
    >
      <AdminHeader />

      <div className="flex w-full mt-[8.5vh]">
        <AdminSidebar />

        <div className="w-[85vw]">{children}</div>
      </div>
    </div>
  );
}
