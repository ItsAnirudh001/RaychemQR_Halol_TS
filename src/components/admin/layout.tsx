"use client";

import React, { useEffect } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import { checkToken } from "@/utils/helpers";
import { Logout } from "@/api/common-utils";
import { usePathname, useRouter } from "next/navigation";
import useAppStore from "@/store/app-store";
import { getStoredUser, userExists } from "@/utils/session-utils";
import { preauthAdminPaths } from "@/utils/admin/admin-utils";
import UnAuth from "../unauth";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const path = usePathname();
  const { push } = useRouter();
  const { setLoading } = useAppStore();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    interval = setInterval(async () => {
      const user = getStoredUser();
      const tokenExpired = checkToken(user?.access_token);
      if (!tokenExpired) return;

      await Logout(setLoading, push).then(() => {
        if (interval) clearInterval(interval);
      });
    });
  }, []);

  if (path.startsWith("/user")) return <></>;

  if (!userExists() && !preauthAdminPaths.includes(path))
    return <UnAuth no_margin />;

  return (
    <div
      className="hidden lg:flex lg:flex-col w-screen overflow-x-hidden"
      suppressHydrationWarning={true}
    >
      <AdminHeader />

      <div className="flex w-full mt-[10vh]">
        <AdminSidebar />

        <div className="w-[85vw]">{children}</div>
      </div>
    </div>
  );
}
