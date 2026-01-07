import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const ua = req.headers.get("user-agent") || "";
  const isMobile = /mobile|android|iphone/i.test(ua);

  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(
      new URL(isMobile ? "/mobile/login" : "/admin/login", req.url)
    );
  }
}