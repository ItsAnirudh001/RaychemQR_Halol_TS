"use client";

import MuiInput from "@/components/material-ui/input";
import { MuiInputChangeEvent } from "@/types/mui-types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { LoginForm } from "@/types/login-types";
import { Login } from "@/api/common-utils";
import useAppStore from "@/store/app-store";
import { validatedInput } from "@/utils/helpers";

export default function LoginPage() {
  const { push } = useRouter();
  const { setLoading } = useAppStore();

  const [form, setForm] = useState<LoginForm>({
    username: "",
    password: "",
  });

  function updateForm(key: string, e: MuiInputChangeEvent) {
    setForm((prev) => {
      return {
        ...prev,
        [key]: e.target.value,
      };
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validatedInput(form.password, "password")) return;

    await Login(setLoading, form, () => {
      push("/admin/usermanagement");
    });
  }

  return (
    <div className="flex w-screen h-screen mt-[-10vh] overflow-hidden">
      <div className="flex w-full items-center justify-center">
        {/* Login Box */}
        <div className="shadowed flex flex-col bg-white w-[70%] rounded-2xl py-[3vh] px-[2.25vw] gap-[5vh]">
          <h2 className="text-primary-heading font-semibold text-[1.85rem]">
            Sign In
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-full">
            <div className="flex flex-col gap-[4vh]">
              <MuiInput
                value={form.username}
                label="Username"
                type="username"
                placeholder="Enter Username"
                required={true}
                onChange={(e: MuiInputChangeEvent) => updateForm("username", e)}
              />

              <MuiInput
                value={form.password}
                label="Password"
                type="password"
                placeholder="Enter Password"
                required={true}
                min={8}
                onChange={(e: MuiInputChangeEvent) => updateForm("password", e)}
              />
            </div>

            {/* <div className="flex gap-[0.35vw] items-center">
              <CheckBoxOutlineBlankIcon className="text-gray-400!" />
              <span className="text-gray-500 font-medium text-[0.91rem]">
                Remember Me
              </span>
            </div> */}

            <button
              type="submit"
              className="animated hover-shadow bg-primary-heading w-full text-white rounded-xl py-[1.5vh] font-semibold text-[1.25rem]"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>

      <div className="flex items-center justify-center w-full bg-white rounded-l-4xl">
        <Image
          src="/login.svg"
          alt="Login"
          width={420}
          height={0}
          unoptimized
          className=""
        />
      </div>
    </div>
  );
}
