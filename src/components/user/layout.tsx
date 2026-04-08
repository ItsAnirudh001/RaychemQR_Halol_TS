"use client";

import { getStoredScanSessionID, userExists } from "@/utils/session-utils";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import UnAuth from "../unauth";
import { preauthUserPaths } from "@/utils/user/user-utils";
import { useroutes } from "@/api/user/user-routes";
import useMobileAutoCall from "@/hooks/user/useMobileAutoCall";
import { isAdminPath } from "@/utils/admin/admin-utils";
import { toastify } from "@/utils/toast";

export default function MobileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const path = usePathname();
  const { push } = useRouter();

  function autoAbortScanSession() {
    const id = getStoredScanSessionID();
    if (!id) return;

    const req = {
      session_id: Number(id),
    };

    const url = process.env.NEXT_PUBLIC_BASE_URL + useroutes.autoScanAbort;
    const blob = new Blob([JSON.stringify(req)], {
      type: "application/json; charset=UTF-8",
    });

    navigator.sendBeacon(url, blob);
    toastify("success", "Scan session aborted successfully");
    push("/");
  }

  useMobileAutoCall(autoAbortScanSession);

  if (isAdminPath(path)) return <></>;

  if (
    !userExists() &&
    !preauthUserPaths.includes(path) &&
    !path.includes("reset")
  )
    return <UnAuth no_margin />;

  return (
    <div className="lg:hidden" suppressHydrationWarning={true}>
      <div className="lg:hidden flex flex-col w-screen overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
