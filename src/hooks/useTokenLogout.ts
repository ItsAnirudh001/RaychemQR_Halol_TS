"use client";

import { checkToken } from "@/utils/helpers";
import { updateLogoutMode } from "@/utils/session-utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useTokenLogout() {
  const { push } = useRouter();

  async function tokenLogout() {
    const remainingTime = checkToken();

    // console.log("token expiry time",remainingTime)

    setTimeout(() => {
      updateLogoutMode("token");
      push("/");
    }, remainingTime);
  }

  useEffect(() => {
    window.addEventListener("login", tokenLogout);

    return () => window.removeEventListener("login", tokenLogout);
  }, []);
}
