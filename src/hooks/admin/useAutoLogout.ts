"use client";

import { useEffect } from "react";

export default function useAutoCall(callback: () => void) {
  function handleBeforeUnload(e: BeforeUnloadEvent) {
    e.preventDefault();
  }

  function handleUnload() {
    callback();
    localStorage.clear();
  }

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, []);
}