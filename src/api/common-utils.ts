import { customAxios } from "@/utils/axios";
import { commonroutes } from "./common-routes";
import { LoginForm } from "@/types/login-form";
import qs from "qs";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toastify } from "@/utils/toast";
import { UserObject } from "@/types/store-types";
import { handleFileDownload } from "@/utils/helpers";

export async function Login(
  setLoading: (value: boolean) => void,
  reqBody: LoginForm,
  setUser: (data: UserObject) => void,
  callback: () => void,
) {
  setLoading(true);
  console.log("reqBody", reqBody);
  try {
    const { data } = await customAxios.post(
      commonroutes.login,
      qs.stringify(reqBody),
    );

    const {
      status,
      message,
      username,
      user_id,
      first_login,
      role,
      access_token,
      app_token,
      refresh_token,
    } = data;

    const userObject = {
      username,
      user_id,
      first_login,
      role,
      access_token,
      app_token,
      refresh_token,
    };

    setUser(userObject);

    sessionStorage.setItem("user", JSON.stringify(userObject));

    if (status !== "success") return toastify("error", message, 1500);

    callback();
  } catch (error) {
    console.error("Error in Login", error);
  } finally {
    setLoading(false);
  }
}

export async function Logout(
  setLoading: (value: boolean) => void,
  push: (href: string, options?: NavigateOptions | undefined) => void,
) {
  setLoading(true);
  try {
    const { data } = await customAxios.post(commonroutes.logout);
    sessionStorage.clear();
    push("/");
    toastify("success", data?.message, 1200);
  } catch (error) {
    console.error("Error in logout", error);
  } finally {
    setLoading(false);
  }
}

export async function GetAllPickslips() {
  try {
    const { data } = await customAxios.get(commonroutes.getAllPickslips);
    console.log("getAllPickslips data", data);
    return data?.data;
  } catch (error) {
    console.error("Error in getAllpickslips", error);
  }
}

export async function GetFileForDownload() {
  try {
    const { data } = await customAxios.get(commonroutes.downloadReport);

    const { file } = data;

    handleFileDownload(file);
  } catch (error) {
    console.error("Error getting download file",error);
    toastify("error","Unable to get File for download")
  }
}
