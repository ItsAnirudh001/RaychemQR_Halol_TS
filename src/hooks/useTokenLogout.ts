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
    function listenForExpiry() {
      const loginExpired = isLoginExpired();

      if (!loginExpired) return;

      clearInterval(listenInterval);
      return handleLogout();
    }

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") listenForExpiry();
    }

    const listenInterval = setInterval(listenForExpiry, 1000);

    window.addEventListener("focus", listenForExpiry);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      clearInterval(listenInterval);
      window.removeEventListener("focus", listenForExpiry);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
}
