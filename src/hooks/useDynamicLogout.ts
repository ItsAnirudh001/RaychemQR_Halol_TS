"use client";

import { Logout } from "@/api/common-utils";
import useAppStore from "@/store/app-store";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

export default function useDynamicLogout(homePath: string) {
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
    if (logoutDisabled) return push(homePath);

    postLogout();
  }, []);
}
