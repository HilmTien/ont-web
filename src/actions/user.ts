"use server";

import { Tables } from "@/generated/database.types";
import { ServerActionResponse } from "@/lib/error";
import { createServerClient } from "@/lib/server";

/**
 *
 * @param username The current username for the osu! user with user id `user_id`
 * @param user_id The osu! user id of the user logging in
 */
export async function onUserLogin(
  username: string,
  user_id: number,
): ServerActionResponse<Tables<"users">> {
  const supabase = await createServerClient();

  const { data: user } = await supabase
    .from("users")
    .select()
    .eq("osu_id", user_id)
    .single();

  if (!user) {
    const { data: insertedUser, error: insertError } = await supabase
      .from("users")
      .insert({ osu_id: user_id, username: username })
      .select()
      .single();

    if (!insertedUser) {
      await supabase.from("errors").insert(insertError);

      return { error: "Could not insert user" };
    }

    return insertedUser;
  }

  const { data: updatedUser, error: updateError } = await supabase
    .from("users")
    .update({ username: username })
    .eq("id", user.id)
    .select()
    .single();

  if (!updatedUser) {
    await supabase.from("errors").insert(updateError);

    return { error: "Could not update user" };
  }

  return updatedUser;
}
