"use server";

import { auth } from "@/auth";
import { Tables } from "@/generated/database.types";
import { PublicUsersInsert } from "@/generated/zod-schema-types";
import { ServerActionResponse } from "@/lib/error";
import { createServerClient } from "@/lib/server";
import { batchArray } from "@/lib/utils";
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

export async function updateRanks(): ServerActionResponse {
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

  // also assume id < 1000 => mockuser
  const batchedUsers = batchArray(
    users.filter((user) => user.osu_id > 1000),
    50,
  );

  for (const batch of batchedUsers) {
    const response = await fetch(
      `https://osu.ppy.sh/api/v2/users?ids[]=${batch.map((user) => user.osu_id).join("&ids[]=")}`,
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
      users: {
        id: number;
        statistics_rulesets: {
          osu: {
            global_rank: number;
            pp: number;
            hit_accuracy: number;
            play_count: number;
            maximum_combo: number;
          };
        };
      }[];
    };

    const updates = data.users.map(async (data) => {
      const { data: updatedUser, error: updateError } = await supabase
        .from("users")
        .update({
          rank: data.statistics_rulesets.osu.global_rank,
          accuracy: data.statistics_rulesets.osu.hit_accuracy,
          maximum_combo: data.statistics_rulesets.osu.maximum_combo,
          play_count: data.statistics_rulesets.osu.play_count,
          pp: data.statistics_rulesets.osu.pp,
        })
        .eq("osu_id", data.id)
        .select();

      if (!updatedUser) {
        await supabase.from("errors").insert(updateError);
      }
    });

    await Promise.allSettled(updates);
  }

  revalidatePath(`players`);
}
