"use client";

import { checkToken } from "@/utils/helpers";
import { getStoredUser, updateLogoutMode } from "@/utils/session-utils";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
// import dayjs from "dayjs";
// import utc from "dayjs/plugin/utc";

// dayjs.extend(utc);

// export default function useTokenLogout() {
//   const { push } = useRouter();
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);

//   function handleBeforeUnload(e: BeforeUnloadEvent) {
//     e.preventDefault();
//   }

//   function logout() {
//     updateLogoutMode("token");
//     push("/");
//   }

//   async function tokenLogout() {
//     const token = getStoredUser()?.access_token;
//     if (intervalRef.current || !token)
//       return clearInterval(intervalRef.current!);

//     const interval = 1000;
//     const tokenExpiry = checkToken();
//     const expirytime = dayjs.utc(tokenExpiry).format("HH:mm:ss A");

//     intervalRef.current = setInterval(() => {
//       const currentTime = dayjs().format("HH:mm:ss A");

//       console.log("expiryTime X", expirytime);
//       console.log("currentTime X", currentTime);
//       // console.log("timePassed", timePassed);

//       // console.log(
//       //   "currenttime",
//       //   dayjs(currentTime).format("DD-MM-YY hh:mm:ss"),
//       // );
//       // console.log(
//       //   "expirytime",
//       //   dayjs(expirytime).format("DD-MM-YY hh:mm:ss"),
//       //   checkToken(),
//       // );

//       if (currentTime >= expirytime) {
//         clearInterval(intervalRef.current!);
//         logout();
//       }
//     }, interval);
//   }

//   useEffect(() => {
//     window.addEventListener("beforeunload", handleBeforeUnload);
//     window.addEventListener("login", tokenLogout);

//     return () => {
//       window.removeEventListener("login", tokenLogout);
//       window.removeEventListener("beforeunload", handleBeforeUnload);

//       if (intervalRef.current) clearInterval(intervalRef.current);
//     };
//   }, []);
// }

export default function useTokenLogout() {
  const { push } = useRouter();

  function handleBeforeUnload(e: BeforeUnloadEvent) {
    const user = getStoredUser();
    if (!user.user_id) return;

    e.preventDefault();
  }

  async function tokenLogout() {
    const remainingTime = checkToken();

    console.log("token expiry time", remainingTime);

    setTimeout(() => {
      updateLogoutMode("token");
      push("/");
    }, remainingTime);
  }

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("login", tokenLogout);

    return () => {
      window.removeEventListener("login", tokenLogout);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
}
