import { createServerClient } from "@/lib/server";

/**
 *
 * @param username The current username for the osu! user with user id `user_id`
 * @param user_id The osu! user id of the user logging in
 */
export async function onUserLogin(username: string, user_id: number) {
  const supabase = await createServerClient();

  const { data: user } = await supabase
    .from("users")
    .select()
    .eq("osu_id", user_id)
    .single();

  if (!user) {
    await supabase
      .from("users")
      .insert({ osu_id: user_id, username: username });
  } else {
    await supabase
      .from("users")
      .update({ username: username })
      .eq("id", user.id);
  }
}
