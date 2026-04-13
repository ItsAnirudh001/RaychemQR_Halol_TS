"use client";

import { homePaths } from "@/constants/layout-data";
import useScanSessionAbort from "@/hooks/user/useScanSessionAbort";
import useTokenLogout from "@/hooks/useTokenLogout";
import useAppStore from "@/store/app-store";
import { isAdminPath } from "@/utils/admin/admin-utils";
import { getStoredScanSessionID, userExists } from "@/utils/session-utils";
import { preauthUserPaths } from "@/utils/user/user-utils";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import UnAuth from "../unauth";

export default function MobileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const path = usePathname();
  const { push } = useRouter();
  const { loading } = useAppStore();
  const invalidAccess =
    !userExists() &&
    !preauthUserPaths.includes(path) &&
    !path.includes("reset");

  function autoAbortScanSession() {
    const session_id = getStoredScanSessionID();

    if (session_id) push(homePaths.user);
  }

  useTokenLogout();

  useScanSessionAbort(autoAbortScanSession);

  if (isAdminPath(path)) return <></>;

  if (invalidAccess) return <UnAuth no_margin />;

  return (
    <div
      className={`lg:hidden ${loading ? "hidden" : ""}`}
      suppressHydrationWarning
    >
      <div className="lg:hidden flex flex-col w-screen overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
