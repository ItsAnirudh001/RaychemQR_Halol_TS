import dayjs from "dayjs";
import { toastify } from "./toast";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { PickslipItem } from "@/types/pickslip-type";
import { regexMod } from "@/constants/regex";

export function handleInputScroll() {
  const active = document.activeElement as HTMLElement | null;
  if (!active) return;

  active.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
  });
}

export function getStoredUser() {
  if (typeof sessionStorage === "undefined") return;

  const user = JSON.parse(sessionStorage.getItem("user")!);
  return user || {};
}

export function getStoredScanSessionID() {
  if (typeof sessionStorage === "undefined") return;

  const session_id = Number(sessionStorage.getItem("scan_session_id"));
  return session_id;
}

export function getStoredPickslip() {
  if (typeof sessionStorage === "undefined") return;

  const pickslip = JSON.parse(sessionStorage.getItem("pickslip")!);
  return pickslip;
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

export function checkToken(token: string) {
  if (!token) return;
  // console.warn("No Token Detected");

  // console.log("token",token);

  try {
    const decodedToken: JwtPayload = jwtDecode(token);

    const { exp } = decodedToken;
    if (!exp) return;

    const currentTime = Date.now() / 1000;

    const tokenExpired = exp < currentTime;

    // console.log("exp", exp);
    // console.log("current",currentTime)

    if (tokenExpired)
      localStorage.setItem(
        "logout",
        `Logout at ${dayjs().format("DD-MM-YYYY hh:mm:ss")}`,
      );
    return tokenExpired;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
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

export function validateInputNeeds(value: string, type: string) {
  const validations = regexMod[type];

  if (!validations) return true;

  const mismatches = [];

  for (const valid in validations) {
    const { name, validation } = valid;
    if (validation.test(value)) mismatches.push(name);
  }

  if (mismatches.length < 1) return true;

  toastify("warning", `${type} must include ${mismatches.join(" ,")}`);

  return false;
}
