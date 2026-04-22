import { Poppins } from "next/font/google";
import { sidebarData } from "./admin/sidebar-data";

export const fontSans = Poppins({
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
  subsets: ["latin"],
});

export const isDev = process.env.NEXT_PUBLIC_ENV === "Local";

export const homePaths = {
  admin: sidebarData[0].route,
  user: "/user/pickslips",
};

export const timestampFormat = "DD-MM-YYYY hh:mm:ss A";
