"use client";

import { isAdminPath } from "@/utils/admin/admin-utils";
import { resetRef } from "@/utils/helpers";
import { toastify } from "@/utils/toast";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function useScanSessionAbort(
  callback: () => void,
  message?: string,
) {
  const path = usePathname();

  const logoutRef = useRef(false);

  function handleVisibilityChange() {
    if (logoutRef.current) return;
    logoutRef.current = true;

    try {
      callback();
      if (message) toastify("success", message);
    } catch (error) {
      console.error("error", error);
    } finally {
      resetRef(logoutRef);
    }
  }

  useEffect(() => {
    if (isAdminPath(path)) return;

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);
}
