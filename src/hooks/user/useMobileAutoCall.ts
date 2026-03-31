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
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, []);
}
