import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import logo from "public/logos/ont/logo@100.png";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === "development"
      ? `http://localhost:${process.env.PORT || 3000}`
      : "https://ont.osunorge.no",
  ),
  title: "osu! Norge Turnering",
  description: "A Norwegian tournament series in the rhythm game osu!",
  keywords: ["osu", "norge", "turnering", "ont", "norway", "tournament"],
  openGraph: {
    type: "website",
    siteName: "o!NT",
    images: { url: logo.src, height: 100, width: 100 },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
