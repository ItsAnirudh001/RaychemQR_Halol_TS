"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useMobileAutoCall(callback: () => void) {
  const { push } = useRouter();

  function handleBeforeUnload(e: BeforeUnloadEvent) {
    e.preventDefault();
  }

  function handleVisibilityChange() {
    setTimeout(() => {
      callback();
      push("/");
      localStorage.clear();
    }, 15000);
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
}
