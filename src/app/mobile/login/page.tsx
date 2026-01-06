"use client";

import { useRouter } from "next/navigation";

export default function Login() {
  const { push } = useRouter();

  return (
    <div className="h-screen">
      <button
        className="flex button bg-transparent self-center m-auto"
      >
        <h1 className="heading">Mobile</h1>
      </button>
    </div>
  );
}
