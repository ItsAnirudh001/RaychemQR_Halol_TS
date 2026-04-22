import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    viewTransition: true,
    browserDebugInfoInTerminal: true,
  },
};

export default nextConfig;
