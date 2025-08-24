import { metadata as meta } from "@/lib/metadata";
import { Jersey_25, Jersey_25_Charted } from "next/font/google";
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
        {children}
      </body>
    </html>
  );
}
