"use client";

import MuiInput from "@/components/mui-input";
import { LoginForm } from "@/types/login/form";
import { MuiInputChangeEvent } from "@/types/mui-input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const { push } = useRouter();

  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  function updateForm(key: string, value: string) {
    setForm((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  }

  function handleForgetClick() {
    push("/user/emailverify");
  }

  function handleSubmit() {
    push("/user/pickslips");
  }

  return (
    <div className="flex flex-col gap-6 p-4 overflow-y-hidden bg-white h-screen">
      <div className="max-h-[42vh] self-center">
        <Image
          src="/login.svg"
          alt="Login"
          width={300}
          height={0}
          unoptimized
          className="self-center"
        />
      </div>

      <h2 className="text-primary-heading font-semibold text-2xl">Sign In</h2>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-8">
          <MuiInput
            value={form.email}
            label="Email ID"
            type="string"
            placeholder="Enter Email Address"
            required={true}
            onChange={(e: MuiInputChangeEvent) =>
              updateForm("email", e.target.value)
            }
          />

          <MuiInput
            value={form.password}
            label="Password"
            type="password"
            placeholder="Enter Password"
            required={true}
            onChange={(e: MuiInputChangeEvent) =>
              updateForm("password", e.target.value)
            }
          />
        </div>

        <span className="text-sm self-end text-primary-heading font-medium" onClick={handleForgetClick}>
          Forgot Password?
        </span>
      </div>

      <button
        className="animated hover-shadow mobile-btn-main"
        onClick={handleSubmit}
      >
        Sign In
      </button>
    </div>
  );
}
