"use client";

import React from "react";

export default function MobileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <div className="lg:hidden flex flex-col w-screen overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
