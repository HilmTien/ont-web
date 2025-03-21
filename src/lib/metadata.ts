import type { Metadata } from "next";
import { getURL } from "./utils";

export const metadata: Metadata = {
  metadataBase: getURL("/"),
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
