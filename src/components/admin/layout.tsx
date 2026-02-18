import React from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  
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
