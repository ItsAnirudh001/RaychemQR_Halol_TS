import React from "react";

export default async function MobileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col w-screen overflow-x-hidden p-3">
      {children}
    </div>
  );
}
