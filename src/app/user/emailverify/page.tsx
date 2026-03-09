"use client";

import { apiErrorPrompter } from "@/api/common-utils";
import { useroutes } from "@/api/user/user-routes";
import MuiInput from "@/components/material-ui/input";
import UserPreAuthHeader from "@/components/user/preauth-header";
import useAppStore from "@/store/app-store";
import { MuiInputChangeEvent } from "@/types/mui-types";
import { customAxios } from "@/utils/axios";
import { isAPISuccess } from "@/utils/helpers";
import { toastify } from "@/utils/toast";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

export default function EmailVerifyPage() {
  const { push } = useRouter();
  const { setLoading } = useAppStore();

  const [email, setEmail] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    try {
      const { data } = await customAxios.post(useroutes.forgetPassword, {
        email,
      });

      const { status, message, reset_token } = data;

      const success = isAPISuccess(status);

      toastify(success ? "success" : "warning", message);

      if (!success) return;

      sessionStorage.setItem("reset_token", reset_token);
      push("/user/reset");
    } catch (error) {
      console.error("Error in forgetPassword", error);
      apiErrorPrompter(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col overflow-y-hidden bg-white h-screen">
      <UserPreAuthHeader />
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6 pt-20 px-10">
          <h2 className="font-bold text-[1.5rem]">Enter E-mail ID</h2>

          <MuiInput
            value={email}
            label="Email ID"
            type="email"
            placeholder="Enter Email Address"
            required={true}
            onChange={(e: MuiInputChangeEvent) => setEmail(e.target.value)}
          />

          <button type="submit" className="animated2 mobile-btn-main">
            Send Verification Mail
          </button>
        </div>
      </form>
    </div>
  );
}
