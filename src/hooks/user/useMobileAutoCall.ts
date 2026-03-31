"use client";

import { useEffect } from "react";

export default function useMobileAutoCall(callback: () => void) {
  function handleBeforeUnload(e: BeforeUnloadEvent) {
    e.preventDefault();
  }

  function handleVisibilityChange() {
    if(document.visibilityState !== "hidden") return;
    
    callback();
    localStorage.clear();
  }

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
}
