import { handleInputScroll } from "@/utils/helpers";
import { useEffect } from "react";

export function useKeyboardScroll() {
  useEffect(() => {
    const { visualViewport } = window;
    if (!visualViewport) return;

    visualViewport.addEventListener("resize", handleInputScroll);
    return () => visualViewport.removeEventListener("resize", handleInputScroll);
  }, []);
}
