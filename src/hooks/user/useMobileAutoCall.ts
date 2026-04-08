"use client";

import { isAdminPath } from "@/utils/admin/admin-utils";
import { resetRef } from "@/utils/helpers";
import { toastify } from "@/utils/toast";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function useMobileAutoCall(
  callback: () => void,
  message?: string,
) {
  const { push } = useRouter();
  const path = usePathname()

  const logoutRef = useRef(false);

  function handleBeforeUnload(e: BeforeUnloadEvent) {
    e.preventDefault();
  }

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
    if(isAdminPath(path)) return;

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
}
