"use client";

import { isDev } from "@/constants/layout-data";
import useTokenLogout from "@/hooks/useTokenLogout";
import useAppStore from "@/store/app-store";
import { preauthAdminPaths } from "@/utils/admin/admin-utils";
import { userExists } from "@/utils/session-utils";
import { isUserPath } from "@/utils/user/user-utils";
import { usePathname } from "next/navigation";
import React from "react";
import UnauthorizedPage from "../unauth-page";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const path = usePathname();
  const { loading } = useAppStore()

  useTokenLogout();

  // console.log("dev mode?",isDev);

  if (isUserPath(path)) return <></>;

  if (!userExists() && !preauthAdminPaths.includes(path))
    return <UnauthorizedPage no_margin />;

  return (
    <div
      className={`${isDev ? "flex flex-col" : "hidden lg:flex lg:flex-col"} w-screen overflow-x-hidden ${loading ? "hidden" : ""}`}
      suppressHydrationWarning
    >
      <AdminHeader />

      <div className="flex w-full mt-[8.5vh]">
        <AdminSidebar />

        <div className="w-[85vw]">{children}</div>
      </div>
    </div>
  );
}
