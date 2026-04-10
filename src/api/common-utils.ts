import { LoginForm } from "@/types/login-types";
import { Pickslip } from "@/types/pickslip-type";
import { customAxios } from "@/utils/axios";
import { handleFileDownload, isAPISuccess, resetRef } from "@/utils/helpers";
import { getStoredScanSessionID, getStoredUser } from "@/utils/session-utils";
import { toastify } from "@/utils/toast";
import axios from "axios";
import dayjs from "dayjs";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import qs from "qs";
import { RefObject } from "react";
import { commonmodroutes, commonroutes } from "./common-routes";
import { useroutes } from "./user/user-routes";

export function apiErrorPrompter(error: unknown) {
  let detail: unknown;

  if (axios.isAxiosError(error)) detail = error.response?.data?.detail;

  switch (true) {
    case typeof detail === "string":
      toastify("error", detail);
      break;

    case Array.isArray(detail):
      const messages = detail.map(
        ({ field, message }: { field?: string; message: string }) =>
          field ? field + " " + message : message,
      );

      for (const message of messages) toastify("error", message);
      break;

    default:
      toastify("error", "Unknown error");
  }
}

export async function AbortScanSession(setLoading?: (value: boolean) => void) {
  const session_id = getStoredScanSessionID();

  if(!session_id) return;

  if (setLoading) setLoading(true);

  try {
    const { data } = await customAxios.post(useroutes.abortScanSession, {
      session_id,
    });

    if (isAPISuccess(data.status)) sessionStorage.removeItem("scan_session_id");

    return data;
  } catch (error) {
    console.error("Error in /abortScanSession", error);
    apiErrorPrompter(error);
  } finally {
    if (setLoading) setLoading(false);
  }
}

export async function Login(
  access_mode: string,
  setLoading: (value: boolean) => void,
  reqBody: LoginForm,
  callback: () => void,
) {
  setLoading(true);
  // console.log("reqBody", reqBody);
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

    localStorage.setItem("user", JSON.stringify(userObject));

    const success = isAPISuccess(status);
    const authorized = role === access_mode;

    if (role && !authorized)
      return toastify("warning", `Access Unauthorized for ${role}`);

    toastify(success ? "success" : "warning", message);

    if (!success) return;

    window.dispatchEvent(new Event("login"));
    localStorage.setItem(
      "login",
      `Login at ${dayjs().format("DD-MM-YYYY hh:mm:ss")}`,
    );

    callback();
  } catch (error) {
    console.error("Error2 in Login", error);
    apiErrorPrompter(error);
  } finally {
    setLoading(false);
  }
}

export async function Logout(
  setLoading: (value: boolean) => void,
  push: (href: string, options?: NavigateOptions | undefined) => void,
  logoutRef: RefObject<boolean>,
) {
  if (logoutRef.current) return;

  logoutRef.current = true;
  await AbortScanSession();
   
  const user = getStoredUser();

  if (!user) return;

  console.log("Triggwered logout for", user);

  setLoading(true);
  try {
    const { data } = await customAxios.post(commonroutes.logout);
    console.log("Logout triggered");
    localStorage.setItem(
      "logout",
      `Logout at ${dayjs().format("DD-MM-YYYY hh:mm:ss")}`,
    );
    push("/");
    toastify("success", data?.message);
    localStorage.clear();
  } catch (error) {
    console.error("Error in logout", error);
    apiErrorPrompter(error);
  } finally {
    setLoading(false);
    resetRef(logoutRef);
  }
}

export function AutoLogout() {
  const user_id = getStoredUser()?.user_id;

  console.log("Triggwered auto logout for", user_id);

  if (!user_id) return;

  const req = {
    user_id,
  };

  const url = process.env.NEXT_PUBLIC_BASE_URL + commonroutes.autoLogout;
  const blob = new Blob([JSON.stringify(req)], {
    type: "application/json; charset=UTF-8",
  });

  const success = navigator.sendBeacon(url, blob);

  console.log("beacon success for ", user_id);

  if (success) return;

  console.log("into fetch for ", user_id);

  fetch(url, {
    method: "POST",
    body: JSON.stringify(req),
    headers: { "Content-Type": "application/json" },
    keepalive: true,
  });

  console.log("fetch success for ", user_id);
}

export async function GetAllPickslips(setLoading: (value: boolean) => void) {
  setLoading(true);
  try {
    const { data } = await customAxios.get(commonroutes.getAllPickslips);
    // console.log("getAllPickslips data", data);
    return data?.data;
  } catch (error) {
    console.error("Error in getAllpickslips", error);
    apiErrorPrompter(error);
  } finally {
    setLoading(false);
  }
}

export async function GetPickslipItems(
  pickslip_id: number,
  setLoading: (value: boolean) => void,
) {
  console.log("Pickslip ID for getItems", pickslip_id);
  setLoading(true);
  const url = commonmodroutes({ pickslip_id }).getPickslipitems;

  console.log("items url", url);

  try {
    const { data } = await customAxios.get(url);
    console.log("getPickslipItems data", data);
    const success = isAPISuccess(data.status);

    if (!success) return;
    return data?.data;
  } catch (error) {
    console.error("Error in getPickslipItems", error);
    apiErrorPrompter(error);
  } finally {
    setLoading(false);
  }
}

export async function GetFileForDownload(
  pickslip: Pickslip,
  setLoading: (value: boolean) => void,
) {
  setLoading(true);

  const { pickslip_id } = pickslip;

  try {
    const { data, headers } = await customAxios.get(
      commonmodroutes({ pickslip_id }).downloadPickslip,
      {
        responseType: "blob",
      },
    );

    const contentDisposition = headers["content-disposition"];

    let filename: string = "";

    // console.log("headers", headers);

    // console.log("contentDisposition", contentDisposition);

    if (contentDisposition) {
      const match = contentDisposition.match(/filename="(.+)"/);
      if (match?.[1]) filename = match[1];
    }

    //  console.log("filey", filename);

    handleFileDownload(data, filename);
  } catch (error) {
    console.error("Error getting download file", error);
    apiErrorPrompter(error);
  } finally {
    setLoading(false);
  }
}
