import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const userAgent: string = req.headers.get("user-agent") || "";
  const isMobile: boolean =
    /(mobile|android|iphone|ipad|playbook|silk)|(android(?!.*mobile))/i.test(
      userAgent,
    );
  // const isMobile:boolean = /mobile|android|iphone/i.test(userAgent);

  const { pathname }: { pathname: string } = req.nextUrl;

  const invalidAccess: boolean =
    (isMobile && pathname.startsWith("/admin")) ||
    (!isMobile && pathname.startsWith("/user"));

  if (invalidAccess) return NextResponse.rewrite(new URL("/404", req.url));

  if (pathname === "/")
    return NextResponse.redirect(
      new URL(isMobile ? "/user/login" : "/admin/login", req.url),
    );

  return NextResponse.next();
}
