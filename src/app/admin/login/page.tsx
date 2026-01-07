"use client";

import MuiInput from "@/components/mui-input";
import { MuiInputChangeEvent } from "@/types/mui-input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

export default function Login() {
  const { push } = useRouter();
  const [form, setForm] = useState<Record<string, string | boolean>>({
    email: "",
    password: "",
    remember: false,
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
    push("/admin/usermanagement");
  }

  return (
    <div className="flex w-screen h-screen mt-[-10vh] overflow-hidden">
      {/* <button
        className="flex button bg-transparent self-center m-auto"
        onClick={() => push("home")}
      >
        <h1 className="heading">Web</h1>
      </button> */}

      <div className="flex w-full items-center justify-center">
        {/* Login Box */}
        <div className="shadowed flex flex-col bg-white w-[70%] rounded-2xl py-6 px-8 gap-8">
          <h2 className="text-primary-heading font-semibold text-3xl">
            Sign In
          </h2>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-8">
              {/* <MuiInput
                value={form.email}
                label="Email"
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
              /> */}
            </div>

            <div className="flex gap-1.5">
              <CheckBoxOutlineBlankIcon className="text-gray-400!" />
              <span className="text-gray-500 font-medium">Remember Me</span>
            </div>
          </div>

          <button
            className="animated hover-shadow bg-primary-heading w-full text-white rounded-xl py-3 font-semibold text-xl"
            onClick={handleSubmit}
          >
            Sign In
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center w-full bg-white rounded-l-4xl">
        <Image
          src="/login.svg"
          alt="Login"
          width={420}
          height={0}
          unoptimized
        />
      </div>
    </div>
  );
}
