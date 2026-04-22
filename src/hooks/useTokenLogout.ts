"use client";

import { isLoginExpired } from "@/utils/helpers";
import { getStoredUser, updateLogoutMode } from "@/utils/session-utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useTokenLogout() {
  const { push } = useRouter();

  function handleLogout() {
    const user = getStoredUser();
    if (!user?.user_id) return;

    updateLogoutMode("token");
    push("/");
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const loginExpired = isLoginExpired();

      if (!loginExpired) return;

      clearInterval(interval);
      return handleLogout();
    }, 1000);
  }, []);
}
