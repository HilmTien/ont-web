"use client";

import { Copy } from "@/components/icons/copy";
import { PublicStagesData } from "@/lib/referee/query";
import { useState } from "react";

interface RefereeHelperProps {
  stages: PublicStagesData;
}

function copyToClipboard(text: string) {
  if (!text || text === "-") return;
  navigator.clipboard.writeText(text);
}

export function RefereeHelper({ stages }: RefereeHelperProps) {
  const [selectedStageId, setSelectedStageId] = useState<number>(stages[0].id);

  const selectedStage = stages.find((stage) => stage.id === selectedStageId);

  // Track banned and picked maps by map id
  const [bannedMaps, setBannedMaps] = useState<Record<number, boolean>>({});
  const [pickedMaps, setPickedMaps] = useState<Record<number, boolean>>({});

  // Match selection
  const [selectedMatchId, setSelectedMatchId] = useState<number | undefined>(
    selectedStage?.matches?.[0]?.id,
  );
  const selectedMatch = selectedStage?.matches?.find(
    (m) => m.id === selectedMatchId,
  );

  // Track map winners: mapId -> "team1" | "team2" | undefined
  const [mapWinners, setMapWinners] = useState<
    Record<number, "team1" | "team2" | undefined>
  >({});

  // NEW: State for who starts picking/banning
  const [pickBanStart, setPickBanStart] = useState<"team1" | "team2">("team1");

  const [mpId, setMpId] = useState<string>("");

  // Calculate score
  let team1Score = 0;
  let team2Score = 0;
  Object.values(selectedStage?.mappool_maps ?? {}).forEach((map) => {
    if (mapWinners[map.id] === "team1") team1Score++;
    if (mapWinners[map.id] === "team2") team2Score++;
  });

  const handleBanChange = (mapId: number) => {
    setBannedMaps((prev) => ({
      ...prev,
      [mapId]: !prev[mapId],
    }));
  };

  const handlePickChange = (mapId: number) => {
    setPickedMaps((prev) => ({
      ...prev,
      [mapId]: !prev[mapId],
    }));
  };

  const handleWinnerChange = (
    mapId: number,
    winner: "team1" | "team2" | undefined,
  ) => {
    setMapWinners((prev) => ({
      ...prev,
      [mapId]: winner,
    }));
  };

  // Update selectedMatchId when stage changes
  // (to avoid stale match selection)
  // eslint-disable-next-line
  if (
    selectedStage &&
    selectedStage.matches?.length &&
    !selectedStage.matches.find((m) => m.id === selectedMatchId)
  ) {
    setSelectedMatchId(selectedStage.matches[0].id);
  }

  // Helper for rendering command + copy button
  function CommandWithCopy({ command }: { command: string }) {
    return (
      <span className="inline-flex items-center gap-1">
        <span className="font-mono">{command}</span>
        {command && command !== "-" && (
          <button
            className="h-4 w-4 p-0 hover:cursor-pointer"
            aria-label="Copy to clipboard"
            onClick={() => copyToClipboard(command)}
          >
            <Copy className="h-4 w-4" />
          </button>
        )}
      </span>
    );
  }

  // --- NEW: Logic for determining who picks/bans next ---

  // Get team/player names
  const team1Name =
    selectedMatch?.team1?.team_players[0]?.users?.username ??
    selectedMatch?.team1?.name ??
    "Team 1";
  const team2Name =
    selectedMatch?.team2?.team_players[0]?.users?.username ??
    selectedMatch?.team2?.name ??
    "Team 2";

  // Get arrays of picked and banned map ids in order
  const pickedMapIds =
    selectedStage?.mappool_maps
      .toSorted((a, b) =>
        a.map_index.localeCompare(b.map_index, undefined, {
          numeric: true,
          sensitivity: "base",
        }),
      )
      .filter((map) => pickedMaps[map.id])
      .map((map) => map.id) ?? [];

  const bannedMapIds =
    selectedStage?.mappool_maps
      .toSorted((a, b) =>
        a.map_index.localeCompare(b.map_index, undefined, {
          numeric: true,
          sensitivity: "base",
        }),
      )
      .filter((map) => bannedMaps[map.id])
      .map((map) => map.id) ?? [];

  // Helper to get next picker/ban player name
  function getNextPickerOrBanner(): string {
    // If more bans than picks, assume banning phase
    if (pickedMapIds.length === 4 && bannedMapIds.length < 2) {
      // Ban order: Player 2, Player 1
      // If 0 bans, it's Player 2; if 1 ban, it's Player 1
      if (bannedMapIds.length === 0) {
        return pickBanStart === "team1" ? team2Name : team1Name;
      } else {
        return pickBanStart === "team1" ? team1Name : team2Name;
      }
    }

    // If in picking phase
    // Rule 1: Player 1, Player 2, Player 1, Player 2 (first 4 picks)
    // Rule 3: Player 2, Player 1, Player 2, ... (repeat)
    if (pickedMapIds.length < 4) {
      // 0: Player 1, 1: Player 2, 2: Player 1, 3: Player 2
      if (pickedMapIds.length % 2 === 0) {
        return pickBanStart === "team1" ? team1Name : team2Name;
      } else {
        return pickBanStart === "team1" ? team2Name : team1Name;
      }
    } else {
      // After 4 picks, alternate starting with Player 2
      // 4: Player 2, 5: Player 1, 6: Player 2, ...
      if ((pickedMapIds.length - 4) % 2 === 0) {
        return pickBanStart === "team1" ? team2Name : team1Name;
      } else {
        return pickBanStart === "team1" ? team1Name : team2Name;
      }
    }
  }

  const team1Won =
    team1Score >= Math.floor((selectedStage?.best_of || 0) / 2) + 1;
  const team2Won =
    team2Score >= Math.floor((selectedStage?.best_of || 0) / 2) + 1;

  const isMatchOver = team1Won || team2Won;

  const summary = `${selectedMatch?.team1?.name} | ${team1Score} - ${team2Score} | ${selectedMatch?.team2?.name} // Best of ${selectedStage?.best_of ?? 0}, ${getNextPickerOrBanner()} du har 90 sekunder på å ${pickedMapIds.length === 4 && bannedMapIds.length !== 2 ? "banlyse" : "velge"} et kart!`;
  const winnerSummary = team1Won
    ? `Gratulerer til ${selectedMatch?.team1?.name} for å vinne matchen!`
    : team2Won
      ? `Gratulerer til ${selectedMatch?.team2?.name} for å vinne matchen!`
      : "";

  const matchResultsText = `**${selectedStage?.stage_name}:** Match ${selectedMatch?.tournament_match_id}
${team1Won ? "**" : ""}${team1Name} | ${team1Score}${team1Won ? "**" : ""} - ${team2Won ? "**" : ""}${team2Score} | ${team2Name}${team2Won ? "**" : ""} :first_place:
MP Link: <https://osu.ppy.sh/community/matches/${mpId}>

**Bans**:
${bannedMapIds
  .map((id) => {
    const map = selectedStage?.mappool_maps.find(
      (mappool_map) => mappool_map.id === id,
    );
    return map
      ? `**${map.map_index}:** | ${map.beatmaps.artist} - ${map.beatmaps.name} [${map.beatmaps.difficulty_name}]`
      : "";
  })
  .join("\n")}`;

  return (
    <div className="mx-auto w-full">
      <h2 className="mb-4 text-2xl font-bold">Referee Helper</h2>
      <label className="mb-4 block">
        <span className="mr-2">Select Stage:</span>
        <select
          className="rounded border px-2 py-1"
          value={selectedStageId}
          onChange={(e) => setSelectedStageId(Number(e.target.value))}
        >
          {stages.map((stage) => (
            <option key={stage.id} value={stage.id}>
              {stage.stage_name}
            </option>
          ))}
        </select>
      </label>

      {(selectedStage?.matches.length || 0) > 0 && (
        <label className="mb-4 block">
          <span className="mr-2">Select Match:</span>
          <select
            className="rounded border px-2 py-1"
            value={selectedMatchId}
            onChange={(e) => setSelectedMatchId(Number(e.target.value))}
          >
            {selectedStage?.matches.map((match) => (
              <option key={match.id} value={match.id}>
                ({match.tournament_match_id}){" "}
                {match.team1?.name || match.team1_label} vs{" "}
                {match.team2?.name || match.team2_label}
              </option>
            ))}
          </select>
        </label>
      )}

      <div className="mb-4 flex gap-2">
        <span className="font-semibold">Create lobby: </span>
        <CommandWithCopy
          command={`!mp make o!NT: (${team1Name}) vs (${team2Name})`}
        />
      </div>

      <label className="mb-4 block">
        <span className="mr-2">osu! multiplayer ID:</span>
        <input className="bg-table" onChange={(e) => setMpId(e.target.value)} />
      </label>

      {selectedMatch && (
        <div className="mb-4 flex gap-2">
          <span className="font-semibold">Invite command:</span>
          <CommandWithCopy
            command={
              !selectedMatch.team1?.team_players[0].users?.osu_id
                ? "-"
                : `!mp invite ${selectedMatch.team1.team_players[0].users.osu_id}`
            }
          />
          <CommandWithCopy
            command={
              !selectedMatch.team2?.team_players[0].users?.osu_id
                ? "-"
                : `!mp invite ${selectedMatch.team2.team_players[0].users.osu_id}`
            }
          />
        </div>
      )}

      <label className="mb-4 block">
        <span className="mr-2">Who starts picking/banning:</span>
        <select
          className="rounded border px-2 py-1"
          value={pickBanStart}
          onChange={(e) => setPickBanStart(e.target.value as "team1" | "team2")}
        >
          <option value="team1">{team1Name}</option>
          <option value="team2">{team2Name}</option>
        </select>
      </label>

      <div className="mb-4 flex gap-2">
        <span className="font-semibold">Useful commands: </span>
        <div className="flex gap-8">
          <CommandWithCopy command="!mp set 0 3" />
          <CommandWithCopy command="!mp timer 90" />
          <CommandWithCopy command="!mp start 10" />
          <CommandWithCopy command="!mp abort" />
        </div>
      </div>

      <div className="mb-4 flex gap-4">
        <div>
          <span className="font-semibold">Best of: </span>
          <span>{selectedStage?.best_of}</span>
        </div>
        <div>
          <span className="font-semibold">Picks per player before bans: </span>
          <span>2</span>
        </div>
        <div>
          <span className="font-semibold">Bans per player: </span>
          <span>1</span>
        </div>
        <div>
          <span className="font-semibold">Doublepicking allowed</span>
        </div>
      </div>

      {selectedStage && (
        <div className="mt-6">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b border-gray-300 px-2 py-1 text-left">
                  Ban
                </th>
                <th className="border-b border-gray-300 px-2 py-1 text-left">
                  Pick
                </th>
                <th className="border-b border-gray-300 px-2 py-1 text-left">
                  Index
                </th>
                <th className="border-b border-gray-300 px-2 py-1 text-left">
                  Beatmap
                </th>
                <th className="border-b border-gray-300 px-2 py-1 text-left">
                  Map Command
                </th>
                <th className="border-b border-gray-300 px-2 py-1 text-left">
                  Mods Command
                </th>
                <th className="border-b border-gray-300 px-2 py-1 text-left">
                  Winner
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedStage.mappool_maps
                .toSorted((a, b) =>
                  a.map_index.localeCompare(b.map_index, undefined, {
                    numeric: true,
                    sensitivity: "base",
                  }),
                )
                .map((map) => {
                  const isBanned = bannedMaps[map.id];
                  const isPicked = pickedMaps[map.id];
                  const winner = mapWinners[map.id];
                  const mapCommand = !map.beatmaps.osu_id
                    ? "-"
                    : `!mp map ${map.beatmaps.osu_id}`;
                  const modsCommand = !map.mods
                    ? "!mp mods NF"
                    : map.mods === "FM"
                      ? "!mp mods Freemod"
                      : `!mp mods NF ${map.mods === "NM" ? "" : map.mods}`;
                  return (
                    <tr
                      key={map.id}
                      className={`${isBanned && "bg-red-900"} ${isPicked && "bg-green-900"} `}
                    >
                      <td className="px-2 py-1 text-center">
                        <input
                          type="checkbox"
                          checked={!!isBanned}
                          onChange={() => handleBanChange(map.id)}
                          aria-label="Ban map"
                        />
                      </td>
                      <td className="px-2 py-1 text-center">
                        <input
                          type="checkbox"
                          checked={!!isPicked}
                          onChange={() => handlePickChange(map.id)}
                          aria-label="Pick map"
                        />
                      </td>
                      <td className="px-2 py-1 text-center">{map.map_index}</td>
                      <td className="px-2 py-1">
                        {map.beatmaps.artist} - {map.beatmaps.name} [
                        {map.beatmaps.difficulty_name}]
                      </td>
                      <td className="px-2 py-1">
                        <CommandWithCopy command={mapCommand} />
                      </td>
                      <td className="px-2 py-1">
                        <CommandWithCopy command={modsCommand} />
                      </td>
                      <td className="px-2 py-1 text-center">
                        <select
                          className="rounded border px-1 py-0.5"
                          value={winner ?? ""}
                          onChange={(e) =>
                            handleWinnerChange(
                              map.id,
                              e.target.value === ""
                                ? undefined
                                : (e.target.value as "team1" | "team2"),
                            )
                          }
                        >
                          <option value="">-</option>
                          <option value="team1">
                            {selectedMatch?.team1?.team_players[0]?.users
                              ?.username ?? "Team 1"}
                          </option>
                          <option value="team2">
                            {selectedMatch?.team2?.team_players[0]?.users
                              ?.username ?? "Team 2"}
                          </option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="mt-4 font-semibold">
            Score:{" "}
            <span className="text-red-400">
              {selectedMatch?.team1?.name ?? "Team 1"}
            </span>{" "}
            {team1Score} - {team2Score}{" "}
            <span className="text-blue-400">
              {selectedMatch?.team2?.name ?? "Team 2"}
            </span>
            {isMatchOver ? " (Match over)" : ""}
          </div>
          <CommandWithCopy command={isMatchOver ? winnerSummary : summary} />
          {isMatchOver && <CommandWithCopy command={matchResultsText} />}
        </div>
      )}
    </div>
  );
}
