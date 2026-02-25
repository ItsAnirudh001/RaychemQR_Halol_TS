"use client"

import MuiInput from "@/components/material-ui/input";
import UserPreAuthHeader from "@/components/user/preauth-header";
import { MuiInputChangeEvent } from "@/types/mui-types";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function EmailVerifyScreen() {
  const [email, setEmail] = useState<string>("");
  const { push } = useRouter()

  function handleSubmit() {
    push("/user/reset")
  }
  return (
    <div className="flex flex-col overflow-y-hidden bg-white h-screen">
    <UserPreAuthHeader />
    <div className="flex flex-col gap-6 pt-20 px-10">
      <h2 className="font-bold text-[1.5rem]">Enter E-mail ID</h2>

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
    </div>
  );
}
