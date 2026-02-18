"use client";

import { usePathname, useRouter } from "next/navigation";
import { IoChevronBackCircle } from "react-icons/io5";

export default function UserPreAuthHeader() {
  const path = usePathname();
  const { back } = useRouter();

  if (path.endsWith("login")) return <></>;

  return (
    <div className="p-4">
      <IoChevronBackCircle size={42} onClick={back} />
    </div>
  );
}
