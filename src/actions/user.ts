"use server";

import { auth } from "@/auth";
import { Tables } from "@/generated/database.types";
import { PublicUsersInsert } from "@/generated/zod-schema-types";
import { ServerActionResponse } from "@/lib/error";
import { createServerClient } from "@/lib/server";
import { revalidatePath } from "next/cache";

/**
 *
 * @param username The current username for the osu! user with user id `user_id`
 * @param user_id The osu! user id of the user logging in
 */
export async function onUserLogin(
  data: PublicUsersInsert,
): ServerActionResponse<Tables<"users">> {
  const supabase = await createServerClient();

  const { data: user } = await supabase
    .from("users")
    .select()
    .eq("osu_id", data.osu_id)
    .single();

  if (!user) {
    const { data: insertedUser, error: insertError } = await supabase
      .from("users")
      .insert(data)
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
    .update(data)
    .eq("id", user.id)
    .select()
    .single();

  if (!updatedUser) {
    await supabase.from("errors").insert(updateError);

    return { error: "Could not update user" };
  }

  return updatedUser;
}

export async function updateUsers(): ServerActionResponse {
  const session = await auth();

  if (!session) {
    return { error: "You are not logged in" };
  }

  const supabase = await createServerClient();

  const { data: users, error: usersError } = await supabase
    .from("users")
    .select("*");

  if (!users) {
    await supabase.from("errors").insert(usersError);

    return { error: "Could not fetch users" };
  }

  for (const user of users) {
    // Assume these are mock users
    if (user.osu_id < 1000) {
      continue;
    }

    const response = await fetch(
      `https://osu.ppy.sh/api/v2/users/${user.osu_id}/osu`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const data = (await response.json()) as {
      statistics: {
        global_rank: number;
        pp: number;
        hit_accuracy: number;
        play_count: number;
        maximum_combo: number;
      };
      badges: { description: string }[];
      country_code: string;
      is_restricted: boolean;
    };

    const { data: updatedUser, error: updateError } = await supabase
      .from("users")
      .update({
        is_restricted: data.is_restricted,
        badges: data.badges.length,
        tournament_badges: data.badges.filter((badge) => {
          const matches = badge.description.match(
            /winner|winning|corsace|perennial/i,
          );
          return matches ? matches.length != 0 : false;
        }).length,
        country_code: data.country_code,
        rank: data.statistics.global_rank,
        accuracy: data.statistics.hit_accuracy,
        maximum_combo: data.statistics.maximum_combo,
        play_count: data.statistics.play_count,
        pp: data.statistics.pp,
      })
      .eq("id", user.id)
      .select();

    if (!updatedUser) {
      await supabase.from("errors").insert(updateError);
    }
  }

  revalidatePath(`players`);
}
