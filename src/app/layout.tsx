import { geistMono, geistSans } from "@/Data/layoutData";
import { ToastContainer } from "react-toastify";
import { Metadata } from "next";
import "./globals.css";

export const metadata:Metadata = {
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

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen w-full items-center justify-center bg-zinc-50 font-sans dark:bg-gray-800">
          <main className="flex min-h-screen max-w-3xl flex-col items-center justify-between sm:items-start p-8">
            {children}
          </main>
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
