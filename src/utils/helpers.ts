import { regexMod } from "@/constants/regex-data";
import { Pickslip, PickslipItem } from "@/types/pickslip-type";
import { UserLogsItem, UserTableItem } from "@/types/table-types";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { RefObject } from "react";
import { getStoredUser } from "./session-utils";
import { toastify } from "./toast";
import dayjs from "dayjs";

export function tableIndices(page: number, rowsPerPage: number) {
  const indices = {
    topRowIndex: page * rowsPerPage,
    nthRowIndex: page * rowsPerPage + rowsPerPage,
  };

  return indices;
}

export function handleInputScroll() {
  const active = document.activeElement as HTMLElement | null;
  if (!active) return;

  active.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
  });
}

export function handleFileDownload(file: File, filename: string) {
  try {
    if (!file) return toastify("error", "Invalid File");

    const url = window.URL.createObjectURL(new Blob([file]));
    const a = document.createElement("a");
    a.href = url;
    a.setAttribute("download", filename);
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      a.remove();
      toastify("success", `Successfully downloaded ${filename}`);
    }, 100);
  } catch (error) {
    console.error("Error in handleDownload file", error);
  }
}

export function isAPISuccess(status: string) {
  return status === "success";
}

export function dynamicClass(condition: boolean | string) {
  return condition
    ? "animated2 mobile-filter-btn border! border-green-700! text-green-700!"
    : `animated2 mobile-filter-btn text-[rgba(120,124,130,1)]`;
}

export function checkToken() {
  const token = getStoredUser()?.access_token;

  if (!token) return 0;

  try {
    const decoded: JwtPayload = jwtDecode(token);
    // console.log("decoded token", decoded);
    const { exp, iat } = decoded;

    if (!exp || !iat) return 0;

    const expiryTime = (exp - iat) * 1000;

    return expiryTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return 0;
  }
}

export function getScannedItems(pickslipItems: PickslipItem[]) {
  const scannedItems = pickslipItems?.filter(
    (item: PickslipItem) => item.is_scanned == true,
  );

  return scannedItems;
}

export function smallHeight() {
  if (typeof window === "undefined") return;

  const height = window.innerHeight;

  // console.log("height",height);

  return height <= 850;
}

export function validatedInput(value: string, type: string) {
  const validations = regexMod[type as keyof typeof regexMod];

  if (!Array.isArray(validations)) return true;

  const mismatches = [];

  for (const valid of validations) {
    const { name, validation } = valid;
    if (!validation.test(value)) mismatches.push(name);
  }

  if (mismatches.length < 1) return true;

  toastify("warning", `${type} must include ${mismatches.join(", ")}`);

  return false;
}

export function validData(
  data:
    | UserTableItem[]
    | UserLogsItem[]
    | Pickslip[]
    | PickslipItem[]
    | undefined,
) {
  return Array.isArray(data) && data.length > 0;
}

export function searchParam(value: string | number | null) {
  return String(value).toLowerCase();
}

export function timestamp(date?: string | null) {
  const format = "DD-MM-YYYY hh:mm:ss";

  return date ? dayjs(date).format(format) : "";
}

export function resetRef(ref: RefObject<boolean>) {
  setTimeout(() => {
    ref.current = false;
  }, 3000);
}
