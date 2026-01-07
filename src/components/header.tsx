"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const name = usePathname();

  if (name.includes("login")) return <></>;

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex flex-row py-4 px-8 items-center gap-4 bg-header-bg h-[10vh]">
      <Image
        src="/org_logo.png"
        alt="Org logo"
        width={140}
        height={0}
        priority
      />
    </div>
  );
}
