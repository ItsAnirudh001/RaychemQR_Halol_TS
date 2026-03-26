"use client";

import { getStoredScanSessionID, userExists } from "@/utils/session-utils";
import { usePathname } from "next/navigation";
import React from "react";
import UnAuth from "../unauth";
import { preauthUserPaths } from "@/utils/user/user-utils";
import { useroutes } from "@/api/user/user-routes";
import useMobileAutoCall from "@/hooks/user/useMobileAutoCall";

export default function MobileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const path = usePathname();
  const isAdmin = path.startsWith("/admin");

  function autoAbortScanSession() {
    if (isAdmin) return;

    const session_id = getStoredScanSessionID();

    const req = {
      session_id,
    };

    const url = process.env.NEXT_PUBLIC_BASE_URL + useroutes.autoScanAbort;
    const blob = new Blob([JSON.stringify(req)], {
      type: "application/json; charset=UTF-8",
    });

    navigator.sendBeacon(url, blob);
  }

  useMobileAutoCall(autoAbortScanSession);

  if (isAdmin) return <></>;

  if (!userExists() && !preauthUserPaths.includes(path) && !path.includes("reset"))
    return <UnAuth no_margin />;

  return (
    <div className="lg:hidden" suppressHydrationWarning={true}>
      <div className="lg:hidden flex flex-col w-screen overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
