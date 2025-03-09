import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === "development"
      ? `http://localhost:${process.env.PORT || 3000}`
      : "https://ont.osunorge.no",
  ),
  title: "osu! Norge Turnering",
  description: "A Norwegian tournament series in the rhythm game osu!",
  keywords: [
    "osu",
    "osu!",
    "norge",
    "turnering",
    "ont",
    "norway",
    "tournament",
  ],
  openGraph: {
    type: "website",
    siteName: "o!NT",
    images: { url: "/logos/ont/logo@80.png", height: 80, width: 80 },
  },
  twitter: {
    card: "summary",
  },
};
