import React from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import { getDevice } from "@/utils/helpers";

export default async function DynamicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const isMobile = await getDevice();

  // console.log("isMobile",isMobile);
  return (
    <>
      {isMobile ? (
        <div>{children}</div>
      ) : (
        <div className="hidden lg:flex lg:flex-col w-screen overflow-x-hidden">
          <Header />

          <div className="flex w-full mt-[10vh]">
            <Sidebar />

            <div className="w-[85vw]">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
