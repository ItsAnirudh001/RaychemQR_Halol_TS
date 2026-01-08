import React from "react";
import Header from "../header";
import Sidebar from "../sidebar";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  
  return (
    <div className="hidden lg:flex lg:flex-col w-screen overflow-x-hidden">
      <Header />

      <div className="flex w-full mt-[10vh]">
        <Sidebar />

        <div className="w-[85vw]">{children}</div>
      </div>
    </div>
  );
}
