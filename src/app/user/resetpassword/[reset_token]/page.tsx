"use client";

import { apiErrorPrompter } from "@/api/common-utils";
import { useroutes } from "@/api/user/user-routes";
import UnauthorizedPage from "@/components/unauth-page";
import PasswordResetForm from "@/components/user/password-reset-form";
import useAppStore from "@/store/app-store";
import { ResetForm } from "@/types/user/user-types";
import { customAxios } from "@/utils/axios";
import { isAPISuccess } from "@/utils/helpers";
import { toastify } from "@/utils/toast";
import { usePathname, useRouter } from "next/navigation";

export default function PasswordResetPage() {
  const { push } = useRouter();
  const path = usePathname();
  const { setLoading } = useAppStore();

  const routeToken: string = path.split("resetpassword/")[1];
  const storedToken: string = localStorage.getItem("reset_token")!;


  const validAccess = routeToken === storedToken;

  // console.log("routetoken",routeToken);
  // console.log("storedtoken",storedToken);
  // console.log("valid access?",validAccess)

  async function postResetPassword(form: ResetForm) {
    const reset_token = localStorage.getItem("reset_token");

    const { new_password } = form;

    setLoading(true);

    try {
      const { data } = await customAxios.post(useroutes.resetPassword, {
        reset_token,
        new_password,
      });

      const { status, message } = data;

      const success = isAPISuccess(status);

      if (!success) return;

      toastify("success", message);
      push("/user/login");
      localStorage.removeItem("reset_token");
    } catch (error) {
      console.error("Error in resetPassword", error);
      apiErrorPrompter(error);
    } finally {
      setLoading(false);
    }
  }

  if (!validAccess) return <UnauthorizedPage />;

  return (
    <PasswordResetForm title="Reset Password" postSubmit={postResetPassword} />
  );
}
