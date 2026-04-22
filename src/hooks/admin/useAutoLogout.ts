// "use client";

// import { useEffect } from "react";

// export default function useAutoLogout(callback: () => void) {
//   function handleUnload() {
//     callback();
//     localStorage.clear();
//   }

//   useEffect(() => {
//     window.addEventListener("unload", handleUnload);

//     return () => window.removeEventListener("unload", handleUnload);
//   }, []);
// }
