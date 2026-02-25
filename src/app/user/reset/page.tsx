"use client";

import MuiInput from "@/components/material-ui/input";
import UserPreAuthHeader from "@/components/user/preauth-header";
import { MuiInputChangeEvent } from "@/types/mui-types";
import { ResetForm } from "@/types/user/user-types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const { push } = useRouter();

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

  function handleSubmit() {
    push("/user/pickslips");
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
