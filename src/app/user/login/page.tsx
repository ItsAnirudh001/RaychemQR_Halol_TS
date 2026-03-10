"use client";

import { Login } from "@/api/common-utils";
import MuiInput from "@/components/material-ui/input";
import useAppStore from "@/store/app-store";
import { LoginForm } from "@/types/login-types";
import { MuiInputChangeEvent } from "@/types/mui-types";
import { validatedInput } from "@/utils/helpers";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const { push } = useRouter();
  const { setLoading } = useAppStore();

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validatedInput(form.password, "password")) return;

    await Login(setLoading, form, () => {
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
          loading="eager"
          className="self-center"
        />
      </div>

      <h2 className="text-primary-heading font-semibold text-[1.5rem]">
        Sign In
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-[2.5vh]">
          <div className="flex flex-col gap-[3vh]">
            <MuiInput
              value={form.username}
              label="Username"
              type="username"
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
              min={8}
              onChange={(e: MuiInputChangeEvent) =>
                updateForm("password", e.target.value)
              }
            />
          </div>

          <button
            className="animated2 text-[0.85rem] self-end text-primary-heading font-medium"
            onClick={handleForgetClick}
          >
            Forgot Password?
          </button>

          <button type="submit" className="animated2 mobile-btn-main">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
