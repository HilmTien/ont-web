import { NavbarServer } from "@/components/general/navbar/navbar-server";
import { metadata as meta } from "@/lib/metadata";
import { SessionProvider } from "next-auth/react";
import { Jersey_25, Jersey_25_Charted } from "next/font/google";
import { Tooltip } from "radix-ui";
import "./globals.css";

const jersey25 = Jersey_25({
  variable: "--font-jersey-25",
  subsets: ["latin"],
  weight: "400",
});

const jersey25Charted = Jersey_25_Charted({
  variable: "--font-jersey-25-charted",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = meta;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jersey25.variable} ${jersey25Charted.variable} antialiased`}
      >
        <SessionProvider>
          <Tooltip.Provider>
            <div className="fixed top-0 left-0 z-[-1] h-full w-full bg-[url('/background/bg.png')] bg-cover bg-center bg-no-repeat blur-xs brightness-50"></div>
            <NavbarServer />
            <main className="pt-36">{children}</main>
          </Tooltip.Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
