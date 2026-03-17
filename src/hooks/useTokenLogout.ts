"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getTokenExpiryTime } from "@/utils/helpers";
import { getStoredUser } from "@/utils/session-utils";
import useAppStore from "@/store/app-store";
import { Logout } from "@/api/common-utils";

export default function useTokenLogout() {
  const { push } = useRouter();
  const { setLoading } = useAppStore();

  async function tokenLogout() {
    await Logout(setLoading, push);
  }

  useEffect(() => {
    const token = getStoredUser()?.access_token;
    if (!token) return;

    const remainingTime = getTokenExpiryTime(token);

    const timer = setTimeout(async () => {
      await tokenLogout();
    }, remainingTime * 1000);

    return () => clearTimeout(timer);
  }, []);
}
