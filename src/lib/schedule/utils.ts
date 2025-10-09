import { StageMatchesQueryData } from "./query";

export function isOwnMatch(
  match: StageMatchesQueryData["matches"][number],
  username: string,
) {
  return (
    match.team1?.name === username ||
    match.team2?.name === username ||
    match.team1_label?.includes(username) ||
    match.team2_label?.includes(username)
  );
}

export type SortBy = "id" | "time";

export const sortBy: Record<
  SortBy,
  (
    a: StageMatchesQueryData["matches"][number],
    b: StageMatchesQueryData["matches"][number],
  ) => number
> = {
  id: (a, b) =>
    a.tournament_match_id.localeCompare(b.tournament_match_id, undefined, {
      numeric: true,
      sensitivity: "base",
    }),
  time: (a, b) =>
    new Date(a.match_time).getTime() - new Date(b.match_time).getTime(),
};

export const sortKeyLabels: Record<SortBy, string> = {
  id: "Match ID",
  time: "Match Tid",
};
