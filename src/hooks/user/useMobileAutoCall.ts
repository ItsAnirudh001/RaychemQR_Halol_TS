"use client";

import { useEffect } from "react";

export default function useMobileAutoCall(callback: () => void) {
  function handleBeforeUnload(e: BeforeUnloadEvent) {
    e.preventDefault();
  }

  function handlePageHide() {
    callback();
    localStorage.clear();
  }

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handlePageHide);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handlePageHide);
    };
  }, []);
}
