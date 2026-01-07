import React from "react";

export default function MobileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="lg:hidden flex flex-col w-screen overflow-x-hidden p-3">
      {children}
    </div>
  );
}
