"use client";

import { Login } from "@/api/common-utils";
import MuiInput from "@/components/material-ui/input";
import useAppStore from "@/store/app-store";
import { LoginForm } from "@/types/login-form";
import { MuiInputChangeEvent } from "@/types/mui-types";
import { toastify } from "@/utils/toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const { push } = useRouter();
  const { setUser, setLoading } = useAppStore();

  const [form, setForm] = useState<LoginForm>({
    username: "",
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

  async function handleSubmit() {
    if (!form.username || !form.password)
      return toastify("warning", "Enter Valid Credentials", 1000);

    await Login(setLoading, form, setUser, () => {
      push("/user/pickslips");
    });
  }

  return (
    <div className="flex flex-col gap-[3vh] p-4 overflow-y-hidden bg-white h-screen">
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

      <h2 className="text-primary-heading font-semibold text-[1.5rem]">
        Sign In
      </h2>

      <div className="flex flex-col gap-[1.5vh]">
        <div className="flex flex-col gap-[4vh]">
          <MuiInput
            value={form.username}
            label="Username"
            type="string"
            placeholder="Enter Username"
            required={true}
            onChange={(e: MuiInputChangeEvent) =>
              updateForm("username", e.target.value)
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

        <span
          className="text-[0.85rem] self-end text-primary-heading font-medium"
          onClick={handleForgetClick}
        >
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
