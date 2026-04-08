"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkToken } from "@/utils/helpers";

export default function useTokenLogout() {
  const { push } = useRouter();

  async function tokenLogout() {
    const remainingTime = checkToken();
    // const remainingTime = 10 * 60 * 1000;

    setTimeout(() => {
     push("/")
    }, remainingTime);
  }

  useEffect(() => {
    window.addEventListener("login", tokenLogout);

    return () => window.removeEventListener("login", tokenLogout);
  }, []);
}
