"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { checkToken } from "@/utils/helpers";
import useAppStore from "@/store/app-store";
import { Logout } from "@/api/common-utils";

export default function useTokenLogout() {
  const { push } = useRouter();
  const { setLoading } = useAppStore();
  const logoutRef = useRef<boolean>(false)

  async function handleLogout() {
    await Logout(setLoading, push, logoutRef)
    localStorage.clear()
  }

  async function tokenLogout() {
    const remainingTime = checkToken();

    setTimeout(() => {
     handleLogout()
    }, remainingTime);
  }

  useEffect(() => {
    window.addEventListener("loggedin", tokenLogout);

    return () => window.removeEventListener("loggedin", tokenLogout);
  }, []);
}
