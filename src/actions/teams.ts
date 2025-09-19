"use server";

import { createServerClient } from "@/lib/server";

export async function convertPlayersToTeams(tournamentId: number) {
  const supabase = await createServerClient();

  const { data: players } = await supabase
    .from("registrations")
    .select("users(id, username)")
    .eq("tournament_id", tournamentId);

  if (!players || players.length === 0) {
    return { error: "No players found for this tournament" };
  }

  const updates = players.map(async (player) => {
    const { data: team } = await supabase
      .from("teams")
      .upsert({
        name: player.users.username,
        tournament_id: tournamentId,
      })
      .select()
      .single();

    if (!team) {
      return { error: "Could not create team" };
    }

    return supabase.from("team_players").upsert({
      team_id: team.id,
      user_id: player.users.id,
    });
  });

  await Promise.allSettled(updates);
}
