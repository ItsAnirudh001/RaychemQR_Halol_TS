import { MuiInputChangeEvent } from "@/types/mui-types";
import { ResetForm } from "@/types/user/user-types";
import React, { useState } from "react";
import MuiInput from "../material-ui/input";
import UserPreAuthHeader from "./preauth-header";
import Image from "next/image";
import { validatedInput } from "@/utils/helpers";
import { toastify } from "@/utils/toast";

export default function PasswordResetForm(props: {
  title: string;
  postSubmit: (form: ResetForm) => Promise<void>;
}) {
  const { title, postSubmit } = props;

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { new_password, confirm_password } = form;

    if (
      !validatedInput(new_password, "password") ||
      !validatedInput(confirm_password, "password")
    )
      return;

    if (new_password !== confirm_password)
      return toastify(
        "warning",
        "Confirmed Password not matching with New Password",
      );

    await postSubmit(form);
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

        <h2 className="font-semibold text-[1.25rem] pt-[1.2vh]">{title}</h2>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-[3.6vh]">
            <MuiInput
              value={form.new_password}
              label="New Password"
              type="password"
              placeholder="Enter Password"
              required={true}
              min={8}
              onChange={(e: MuiInputChangeEvent) =>
                updateForm("new_password", e.target.value)
              }
            />

            <MuiInput
              value={form.confirm_password}
              label="Confirm Password"
              type="password"
              placeholder="Enter Password"
              required={true}
              min={8}
              onChange={(e: MuiInputChangeEvent) =>
                updateForm("confirm_password", e.target.value)
              }
            />
          </div>

          <button type="submit" className="animated2 mobile-btn-main mt-[4vh]">
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}
