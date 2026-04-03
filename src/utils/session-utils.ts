export function userExists() {
  if (typeof localStorage === "undefined") return;

  const user = JSON.parse(localStorage.getItem("user")!);
  return Boolean(user?.user_id);
}

export function getStoredUser() {
  if (typeof localStorage === "undefined") return;

  const user = JSON.parse(localStorage.getItem("user")!);
  return user;
}

export function getStoredScanSessionID() {
  if (typeof localStorage === "undefined") return;

  const session_id = localStorage.getItem("scan_session_id");
  return session_id;
}

export function getStoredScanItem() {
  if (typeof localStorage === "undefined") return;

  const scan_item = JSON.parse(localStorage.getItem("scan_item")!);
  return scan_item;
}

export function getStoredPickslip() {
  if (typeof localStorage === "undefined") return;

  const pickslip = JSON.parse(localStorage.getItem("pickslip")!);
  return pickslip;
}