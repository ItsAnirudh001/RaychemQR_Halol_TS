"use client";

import { useEffect } from "react";

const timeout = 20 * 1000;

export default function useMobileAutoCall(callback: () => void) {
   function handleBeforeUnload(e: BeforeUnloadEvent) {
    e.preventDefault();
  }

  useEffect(() => {
   localStorage.setItem("lastseen", Date.now().toString());
  }, [document.visibilityState === "hidden"])
  

  function handleVisibilityChange() {
    const lastSeen = Number(localStorage.getItem("lastseen"));
    if (!lastSeen) return;

    const diff = Date.now() - lastSeen;

    if (diff > timeout) callback();
  }

  useEffect(() => {
     window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    }
  }, [callback, timeout]);
}
