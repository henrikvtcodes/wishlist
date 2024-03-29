import "./globals.css";

import Loglib from "@loglib/tracker/react";
import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { Toaster } from "~/components/ui/toaster";
import { TRPCReactProvider } from "~/trpc/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "henrik's wishlist",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${inter.variable} min-h-screen w-screen overflow-x-hidden`}
      >
        <TRPCReactProvider headers={headers()}>{children}</TRPCReactProvider>
        <Toaster />
        <Loglib
          config={{
            id: "wishlist_henrikvt",
            host: "/api/log/lib",
            consent: "granted",
          }}
        />
      </body>
    </html>
  );
}
