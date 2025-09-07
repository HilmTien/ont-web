"use client";

import { revalidateWebsite } from "@/app/actions";

export function RevalidateWebsiteButton() {
  return <button onClick={revalidateWebsite}>Revalidate website</button>;
}
