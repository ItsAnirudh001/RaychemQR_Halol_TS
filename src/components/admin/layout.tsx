"use client";

import React, { useEffect } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import { checkToken, getStoredUser } from "@/utils/helpers";
import { Logout } from "@/api/common-utils";
import { useRouter } from "next/navigation";
import useAppStore from "@/store/app-store";
import NotFound from "@/app/not-found";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { push } = useRouter();
  const { setLoading } = useAppStore();

  // useEffect(() => {
  //   if (path.startsWith("/user")) window.resizeTo(480, 800);
  //   else window.resizeTo(1500, 600);
  // }, [path]);

  useEffect(() => {
    let interval = null;

    interval = setInterval(async () => {
      const user = getStoredUser();
      const tokenExpired = checkToken(user?.access_token);
      if (!tokenExpired) return;

      await Logout(setLoading, push).then(() => {
        clearInterval(interval);
      });
    });
  }, []);

  return (
    <div className="hidden lg:flex lg:flex-col w-screen overflow-x-hidden">
      <AdminHeader />

      <div className="flex w-full mt-[10vh]">
        <AdminSidebar />

        <div className="w-[85vw]">{children}</div>
      </div>
    </div>
  );
}
