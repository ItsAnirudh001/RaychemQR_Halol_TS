import React from "react";
import Header from "../header";
import Sidebar from "../sidebar";

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // console.log("isMobile",isMobile);
  return (
    <div className="flex flex-col w-screen overflow-x-hidden">
      <Header />

      <div className="flex w-full mt-[10vh]">
        <Sidebar />

        <div className="w-[85vw]">{children}</div>
      </div>
    </div>
  );
}
