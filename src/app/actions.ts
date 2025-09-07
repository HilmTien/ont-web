"use server";

import { auth } from "@/auth";
import { ServerActionResponse } from "@/lib/error";
import { revalidatePath } from "next/cache";

export async function getOsuAPIToken(): Promise<ServerActionResponse<string>> {
  const session = await auth();

  if (!session) {
    return { error: "Du er ikke pålogget" };
  }

  return session.accessToken;
}

export async function revalidateWebsite() {
  revalidatePath("/", "layout");
}
