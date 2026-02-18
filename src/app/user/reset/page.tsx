"use client";

import MuiInput from "@/components/mui-input";
import { MuiInputChangeEvent } from "@/types/mui-input";
import { ResetForm } from "@/types/reset/form";
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
    <div className="flex flex-col gap-6 p-4 overflow-y-hidden bg-white h-screen">
      <div className="max-h-[42vh] self-center">
        <Image
          src="/reset-password.png"
          alt="Login"
          width={300}
          height={0}
          className="self-center"
        />
      </div>

      <h2 className="font-semibold text-2xl">Reset Password</h2>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-8">
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
      </div>

      <button
        className="animated mobile-btn-main"
        onClick={handleSubmit}
      >
        Confirm
      </button>
    </div>
  );
}
