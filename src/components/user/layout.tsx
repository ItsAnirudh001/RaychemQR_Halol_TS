"use client";

import { userExists } from "@/utils/session-utils";
import { usePathname } from "next/navigation";
import React from "react";
import UnAuth from "../unauth";
import { preauthUserPaths } from "@/utils/user/user-utils";
import useAutoCall from "@/hooks/useAutoCall";
import { AbortScanSession } from "@/api/common-utils";

export default function MobileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const path = usePathname();

  async function autoAbortScanSession() {
    await AbortScanSession();
  }

  useAutoCall(autoAbortScanSession);

  if (path.startsWith("/admin")) return <></>;

  if (!userExists() && !preauthUserPaths.includes(path))
    return <UnAuth no_margin />;

  return (
    <div className="lg:hidden" suppressHydrationWarning={true}>
      <div className="lg:hidden flex flex-col w-screen overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
