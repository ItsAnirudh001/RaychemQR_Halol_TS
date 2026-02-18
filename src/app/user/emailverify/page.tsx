"use client"

import MuiInput from "@/components/mui-input";
import { MuiInputChangeEvent } from "@/types/mui-input";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function EmailVerifyScreen() {
  const [email, setEmail] = useState<string>("");
  const { push } = useRouter()

  function handleSubmit() {
    push("/user/reset")
  }
  return (
    <div className="flex flex-col gap-6 pt-20 px-4 overflow-y-hidden bg-white h-screen">
      <h2 className="font-semibold text-2xl">Enter E-mail ID</h2>

      <MuiInput
        value={email}
        label="Email ID"
        type="string"
        placeholder="Enter Email Address"
        required={true}
        onChange={(e: MuiInputChangeEvent) => setEmail(e.target.value)}
      />

      <button
        className="animated hover-shadow mobile-btn-main"
        onClick={handleSubmit}
      >
        Send Verification Mail
      </button>
    </div>
  );
}
