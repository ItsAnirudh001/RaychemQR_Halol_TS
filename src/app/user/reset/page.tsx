"use client";

import { useroutes } from "@/api/user/user-routes";
import MuiInput from "@/components/material-ui/input";
import UserPreAuthHeader from "@/components/user/preauth-header";
import useAppStore from "@/store/app-store";
import { MuiInputChangeEvent } from "@/types/mui-types";
import { ResetForm } from "@/types/user/user-types";
import { customAxios } from "@/utils/axios";
import { toastify } from "@/utils/toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PasswordResetPage() {
  const { push } = useRouter();
  const { user } = useAppStore();

  const [form, setForm] = useState<ResetForm>({
    new_password: "",
    confirm_password: "",
  });

  function updateForm(key: string, value: string) {
    setForm((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  }

  async function handleSubmit() {
    const reset_token = sessionStorage.getItem("reset_token");
    const { access_token } = user;
    const { new_password, confirm_password } = form;

    if (!access_token && !reset_token)
      return toastify("error", "Password Reset Unauthorized", 1500);

    if (!new_password || !confirm_password)
      return toastify("warning", "All Fields are mandatory", 1500);

    if (new_password === confirm_password)
      return toastify(
        "warning",
        "Confirmed Password not matching with New Password",
        1500,
      );

    try {
      const { data } = await customAxios.post(useroutes.resetPassword, {
        reset_token,
        new_password,
      });

      const { status, message } = data;

      toastify("success", message, 1500);
      sessionStorage.removeItem("reset_token");
      push("/user/login");
    } catch (error) {
      console.error("Error in resetPassword", error);
    }
  }

  return (
    <div className="flex flex-col overflow-y-hidden bg-white h-screen">
      <UserPreAuthHeader />
      <div className="flex flex-col gap-[4vh] py-[2vh] px-[8vw]">
        <div className="max-h-[42vh] self-center">
          <Image
            src="/reset-password.png"
            alt="Login"
            width={205}
            height={0}
            className="self-center"
          />
        </div>

        <h2 className="font-semibold text-[1.25rem] pt-[1.2vh]">
          Reset Password
        </h2>

        <div className="flex flex-col gap-[3.6vh]">
          <MuiInput
            value={form.new_password}
            label="New Password"
            type="password"
            placeholder="Enter Password"
            required={true}
            onChange={(e: MuiInputChangeEvent) =>
              updateForm("password", e.target.value)
            }
          />

          <MuiInput
            value={form.confirm_password}
            label="Confirm Password"
            type="password"
            placeholder="Enter Password"
            required={true}
            onChange={(e: MuiInputChangeEvent) =>
              updateForm("password", e.target.value)
            }
          />
        </div>

        <button className="animated mobile-btn-main" onClick={handleSubmit}>
          Confirm
        </button>
      </div>
    </div>
  );
}
