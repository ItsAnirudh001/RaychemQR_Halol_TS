import type { NextConfig } from "next";

const removeConsole = process.env.NEXT_PUBLIC_ENV !== "Local";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    viewTransition: true,
    browserDebugInfoInTerminal: true,
  },
  compiler: {
    removeConsole,
  },
};

export default nextConfig;
