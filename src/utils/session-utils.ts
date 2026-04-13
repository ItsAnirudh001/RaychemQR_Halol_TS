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
  if (typeof sessionStorage === "undefined") return;

  const session_id = sessionStorage.getItem("scan_session_id");
  return session_id;
}

export function getStoredScanItem() {
  if (typeof sessionStorage === "undefined") return;

  const scan_item = JSON.parse(sessionStorage.getItem("scan_item")!);
  return scan_item;
}

export function getStoredPickslip() {
  if (typeof sessionStorage === "undefined") return;

  const pickslip = JSON.parse(sessionStorage.getItem("pickslip")!);
  return pickslip;
}

export function updateLogoutMode(mode: string) {
  if (typeof localStorage === "undefined") return;

  localStorage.setItem("logout_mode", mode);
}
