import { fontSans } from "@/Data/layoutData";
import { ToastContainer } from "react-toastify";
import { Metadata } from "next";
import Image from "next/image";
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

      <body className={`${fontSans.variable} antialiased`}>
        <div className="flex min-h-screen w-full items-start bg-zinc-50 font-sans dark:bg-gray-800 flex-col p-6">
          <div className="flex flex-row items-center justify-between space-x-4">
            <Image
              className="dark:invert"
              src="/apple-touch-icon.png"
              alt="Next.js logo"
              width={100}
              height={20}
              priority
            />
            <h1 className="heading text-2xl! font-semibold!">
              RaychemQR
            </h1>
          </div>
          {children}
        </div>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/Helpers/pwaWorker.js');
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
