"use client";

import { useRouter } from "next/navigation";

export default function Login() {
  const { push } = useRouter();

  return (
    <button
      className="button bg-transparent self-center m-auto"
      onClick={() => push("home")}
    >
      <h1 className="heading">Login</h1>
    </button>
  );
}
