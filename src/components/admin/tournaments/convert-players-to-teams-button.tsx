"use client";

import { convertPlayersToTeams } from "@/actions/teams";

interface ConvertPlayersToTeamsButtonProps {
  tournamentId: number;
}

export function ConvertPlayersToTeamsButton({
  tournamentId,
}: ConvertPlayersToTeamsButtonProps) {
  return (
    <button onClick={() => convertPlayersToTeams(tournamentId)}>
      Convert players to teams
    </button>
  );
}
