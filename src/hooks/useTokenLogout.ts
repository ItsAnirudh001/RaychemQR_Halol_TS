"use client";

import { isLoginExpired } from "@/utils/helpers";
import { getStoredUser, updateLogoutMode } from "@/utils/session-utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useTokenLogout() {
  const { push } = useRouter();

  function handleBeforeUnload(e: BeforeUnloadEvent) {
    const user = getStoredUser();
    if (!user?.user_id) return;

    e.preventDefault();
  }

  function handleLogout() {
    const user = getStoredUser();
    if (!user?.user_id) return;

    updateLogoutMode("token");
    push("/");
  }

  useEffect(() => {
    function handleExpiryListen() {
      const loginExpired = isLoginExpired();

      if (!loginExpired) return;

      clearInterval(listenInterval);
      return handleLogout();
    }

    const listenInterval = setInterval(handleExpiryListen, 1000);

    document.addEventListener("visibilitychange", handleExpiryListen);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      clearInterval(listenInterval);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleExpiryListen);
    };
  }, []);
}
