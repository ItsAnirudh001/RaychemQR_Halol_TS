"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Login() {
  const { push }  = useRouter();

  return (
    <>
      <Image
        className="dark:invert"
        src="/apple-touch-icon.png"
        alt="Next.js logo"
        width={100}
        height={20}
        priority
      />

      <button className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left" onClick={() => push("/home")}>
        <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          Halol_Login
        </h1>
      </button>
    </>
  );
}
