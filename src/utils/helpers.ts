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
  return user || {}
}

// export function handleDownloadFile() {
//   // if (!files[0]) return;
//   // const url = URL.createObjectURL(files[0]);
//   // const a = document.createElement("a");
//   // a.href = url;
//   // a.download = files[0].name;
//   // document.body.appendChild(a);
//   // a.click();
//   // setTimeout(() => {
//   // URL.revokeObjectURL(url);
//   // a.remove();
//   toastify("success", `Successfully downloaded ${files[0]?.name}`);
//   // }, 100);
// }
