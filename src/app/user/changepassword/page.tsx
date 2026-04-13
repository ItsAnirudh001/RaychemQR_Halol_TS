"use client";

import { apiErrorPrompter } from "@/api/common-utils";
import { useroutes } from "@/api/user/user-routes";
import UnauthorizedPage from "@/components/unauth-page";
import PasswordResetForm from "@/components/user/password-reset-form";
import useAppStore from "@/store/app-store";
import { ResetForm } from "@/types/user/user-types";
import { customAxios } from "@/utils/axios";
import { isAPISuccess } from "@/utils/helpers";
import { getStoredUser } from "@/utils/session-utils";
import { toastify } from "@/utils/toast";
import { useRouter } from "next/navigation";

export default function ChangePasswordPage() {
  const { back } = useRouter();
  const { setLoading } = useAppStore();
  const user = getStoredUser();

  async function postChangePassword(form: ResetForm) {
    const { new_password } = form;

    setLoading(true);

    try {
      const { data } = await customAxios.post(useroutes.changePassword, {
        new_password,
      });

      const { status, message } = data;

      const success = isAPISuccess(status);

      if (!success) return;

      toastify("success", message);
      back();
    } catch (error) {
      console.error("Error in changePassword", error);
      apiErrorPrompter(error);
    } finally {
      setLoading(false);
    }
  }

  if (!user.access_token) return <UnauthorizedPage />;

  return (
    <PasswordResetForm
      title="Change Password"
      postSubmit={postChangePassword}
    />
  );
}
