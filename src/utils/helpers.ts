import { toastify } from "./toast";

export function handleInputScroll() {
  const active = document.activeElement as HTMLElement | null;
  if (!active) return;

  active.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
  });
}

export function getStoredUser() {
  const user = JSON.parse(sessionStorage.getItem("user")!);
  return user || {};
}

export function getStoredScanSessionID() {
  const session_id = Number(sessionStorage.getItem("scan_session_id"));
  return session_id;
}

export function handleFileDownload(file: File) {
  if (!file) return toastify("error", "Invalid File");

  const url = URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = url;
  a.download = file?.name;
  document.body.appendChild(a);
  a.click();

  setTimeout(() => {
    URL.revokeObjectURL(url);
    a.remove();
    toastify("success", `Successfully downloaded ${file?.name}`);
  }, 100);
}

export function isAPISuccess(status: string) {
  return status === "success";
}

export function dynamicClass(condition: boolean | string) {
  return condition
    ? "mobile-filter-btn border! border-green-700! text-green-700!"
    : `mobile-filter-btn text-[rgba(120,124,130,1)]`;
}
