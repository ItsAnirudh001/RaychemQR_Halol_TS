"use client";

import { useEffect } from "react";

const timeout = 10 * 1000;

export default function useMobileAutoCall(callback: () => void) {
   function handleBeforeUnload(e: BeforeUnloadEvent) {
    e.preventDefault();
  }

  function handleVisibilityChange() {
    if (document.visibilityState === "hidden")
      localStorage.setItem("lastseen", Date.now().toString());
  }

  function postLogout() {
    const lastSeen = Number(localStorage.getItem("lastseen"));

    if (!lastSeen) return;

    const diff = Date.now() - lastSeen;

    if (diff > timeout) callback();
  }

  useEffect(() => {
    postLogout();

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    }
  }, [callback, timeout]);
}
