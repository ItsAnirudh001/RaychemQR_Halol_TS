"use client";

import { Logout } from "@/api/common-utils";
import useAppStore from "@/store/app-store";
import { toastify } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

export default function useSessionHandle(homePath: string) {
  const { push } = useRouter();
  const { setLoading } = useAppStore();

  const logoutRef = useRef<boolean>(false);

  async function postLogout() {
    await Logout(setLoading, push, logoutRef);
  }

  useLayoutEffect(() => {
    const logoutEnabled = sessionStorage.getItem("logout_session");

    if (logoutEnabled) {
      postLogout();
      return;
    }

    const logoutDisabled = localStorage.getItem("logout_mode") === "disabled";
    
    if (logoutDisabled) {
      toastify("success", "Login Detected");
      return push(homePath);
    }

    postLogout();
  }, []);
}
