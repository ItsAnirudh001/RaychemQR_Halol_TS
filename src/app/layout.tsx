import { fontSans } from "@/constants/layout-data";
import MuiProviders from "@/components/material-ui/providers";
import { ToastContainer } from "react-toastify";
import { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import QueryProvider from "./query-provider";
import AdminLayout from "@/components/admin/layout";
import MobileLayout from "@/components/user/layout";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Loader from "@/components/loader";
import "./globals.css";

dayjs.extend(customParseFormat);

export const metadata: Metadata = {
  title: "RaychemQR_Halol",
  description: "Official PWA for the RaychemQR HALOL",
  manifest: "/manifest.json",
  icons: {
    icon: "/android/android-launchericon-192-192.png",
    apple: "/android/android-launchericon-192-192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=375, initial-scale=1, user-scalable=no"
        />
        <meta name="theme-color" content="transparent" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="navigation-bar-color" content="transparent" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="transparent"
        />
      </head>

      <body
        className={`antialiased min-h-screen ${fontSans.variable} lg:bg-background
        }`}
      >
        <QueryProvider>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <MuiProviders>
              <Loader />
              <MobileLayout>{children}</MobileLayout>

              <AdminLayout>{children}</AdminLayout>
            </MuiProviders>
          </AppRouterCacheProvider>
        </QueryProvider>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/helpers/pwaWorker.js');
                });
              }
            `,
          }}
        />

        <ToastContainer />
      </body>
    </html>
  );
}
