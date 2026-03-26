"use client";

import { useEffect } from "react";

const timeout = 2 * 60 * 1000;

export default function useMobileAutoCall(callback: () => void) {
  function handleBeforeUnload(e: BeforeUnloadEvent) {
    e.preventDefault();
  }

  function handleVisibilityChange() {
    if (document.visibilityState === "hidden")
      localStorage.setItem("lastseen", Date.now().toString());

    const lastSeen = localStorage.getItem("lastseen");
    if (!lastSeen) return;

    const diff = Date.now() - Number(lastSeen);

    if (diff > timeout) callback();
  }

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [callback, timeout]);
}
