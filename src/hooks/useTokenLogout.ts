"use client";

import { checkToken } from "@/utils/helpers";
import { updateLogoutMode } from "@/utils/session-utils";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function useTokenLogout() {
  const { push } = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const logoutTimeRef = useRef<number>(0);

  function handleBeforeUnload(e: BeforeUnloadEvent) {
    e.preventDefault();
  }

  function logout() {
    updateLogoutMode("token");
    push("/");
  }

  function tokenLogout() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const logoutTime = checkToken();
    logoutTimeRef.current = logoutTime;

    // console.log("logoutTime", logoutTime);

    const loginTime = Date.now();
    localStorage.setItem("login_time", loginTime.toString());

    timeoutRef.current = setTimeout(logout, logoutTime);
  }

  function handleVisibilityChange() {
    if (document.hidden) return;

    const loginTime = localStorage.getItem("login_time");

    if (!loginTime) return;

    const elapsedTime = Date.now() - parseInt(loginTime);
    if (elapsedTime >= logoutTimeRef.current) logout();
  }

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("login", tokenLogout);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("login", tokenLogout);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
}
