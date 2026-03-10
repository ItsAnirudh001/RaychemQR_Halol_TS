"use client";

import { userExists } from "@/utils/session-utils";
import { usePathname } from "next/navigation";
import React from "react";
import UnAuth from "../unauth";
import { preauthUserPaths } from "@/utils/user/user-utils";

export default function MobileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const path = usePathname();

  if(path.startsWith("/admin")) return <></>;

  if (!userExists() && !preauthUserPaths.includes(path))
    return <UnAuth no_margin />;

  return (
    <div className="lg:hidden">
      <div className="lg:hidden flex flex-col w-screen overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
