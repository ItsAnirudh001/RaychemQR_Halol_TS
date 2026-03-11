"use client";

import { handleInputScroll } from "@/utils/helpers";
import { useEffect } from "react";
import { isMobile } from "react-device-detect";

export function useKeyboardScroll() {
  useEffect(() => {
    const { visualViewport } = window;
    if (!visualViewport || !isMobile) return;

    visualViewport.addEventListener("resize", handleInputScroll);
    return () =>
      visualViewport.removeEventListener("resize", handleInputScroll);
  }, []);
}
