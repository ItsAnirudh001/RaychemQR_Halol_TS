import { fontSans } from "@/data/layoutData";
import MuiProviders from "@/components/mui-providers";
import { ToastContainer } from "react-toastify";
import { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import QueryProvider from "./query-provider";
import DynamicLayout from "@/components/layout";
import "./globals.css";

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
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
        <meta name="theme-color" content="transparent" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </head>

      <body className={`antialiased min-h-screen ${fontSans.variable}`}>
        <QueryProvider>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <MuiProviders>
              <DynamicLayout>{children}</DynamicLayout>
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
