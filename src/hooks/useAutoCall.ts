"use client";

import { useEffect } from "react";

export default function useUnload(callback: () => Promise<void>) {
  function handleBeforeUnload(e: BeforeUnloadEvent) {
    e.preventDefault();
  }

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", callback);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", callback);
    };
  }, []);
};
