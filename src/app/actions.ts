"use server";

import { auth } from "@/lib/auth";
import { ServerActionResponse } from "@/lib/error";

export async function getOsuAPIToken(): Promise<ServerActionResponse<string>> {
  const session = await auth();

  if (!session) {
    return { error: "Du er ikke pålogget" };
  }

  return session.accessToken;
}
