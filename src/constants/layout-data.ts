import { Poppins } from "next/font/google";

export const fontSans = Poppins({
  display: "swap",
  weight: ["100" , "200" , "300" , "400" , "500" , "600" , "700" , "800" , "900"],
  variable: "--font-sans",
  subsets: ["latin"],
});

export const isDev = process.env.NEXT_PUBLIC_ENV === "Local";

export const homePaths = {
  admin : "/admin/usermanagement",
  user : "/user/pickslips"
}
