"use client";

import { useroutes } from "@/api/user/user-routes";
import MuiInput from "@/components/material-ui/input";
import UserPreAuthHeader from "@/components/user/preauth-header";
import { MuiInputChangeEvent } from "@/types/mui-types";
import { customAxios } from "@/utils/axios";
import { isAPISuccess } from "@/utils/helpers";
import { toastify } from "@/utils/toast";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function EmailVerifyPage() {
  const [email, setEmail] = useState<string>("");
  const { push } = useRouter();

  async function handleSubmit() {
    if (!email) return toastify("warning", "Email ID is required", 1400);

    try {
      const { data } = await customAxios.post(useroutes.forgetPassword, {
        email,
      });

      const { status, message, reset_token } = data;

      const success = isAPISuccess(status);

      toastify(success ? "success" : "warning", message, 1500);
      
      if(!success) return;

      sessionStorage.setItem("reset_token", reset_token);
      push("/user/reset");
    } catch (error) {
      console.error("Error in forgetPassword", error);
    }
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
