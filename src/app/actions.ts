"use server";

import { auth } from "@/lib/auth";
import { ServerActionResponse } from "@/lib/error";
import { createServerClient } from "@/lib/server";

export async function getOsuAPIToken(): Promise<ServerActionResponse<string>> {
  const session = await auth();

  if (!session) {
    return { error: "Du er ikke pålogget" };
  }

  const supabase = await createServerClient();

  const { data, error } = await supabase
    .schema("next_auth")
    .from("accounts")
    .select("access_token")
    .eq("userId", session.userId)
    .single();

  if (error) {
    console.log(error);
    return { error: "Noe gikk galt under databasesøket..." };
  }

  return data.access_token;
}
