import { updateResult } from "@/actions/referee";
import { CommandWithCopy } from "@/components/ui/command-with-copy";
import { isActionError } from "@/lib/error";
import { getSelector, getSelectType } from "@/lib/referee/utils";
import { countValues } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";
import { BackButton } from "../back-button";
import {
  RefereeHelperDispatchContext,
  RefereeHelperStateContext,
} from "../referee-helper-state";

export function AfterMatchStep() {
  const state = React.useContext(RefereeHelperStateContext);
  const dispatch = React.useContext(RefereeHelperDispatchContext);

  if (
    !state.matchState ||
    !state.selectedStage ||
    !state.selectedMatch ||
    !state.mpId
  ) {
    dispatch({ type: "SET_STEP", step: 0 });
    return;
  }

  const [isFinished, setIsFinished] = React.useState(false);

  const team1Name =
    state.selectedMatch.team1?.name ?? state.selectedMatch.team1_label ?? "";
  const team2Name =
    state.selectedMatch.team2?.name ?? state.selectedMatch.team2_label ?? "";

  const teamPoints = countValues(state.mapWinners);

  const team1Won =
    teamPoints.red >=
    Math.ceil((state.selectedStage.best_of ?? Number.POSITIVE_INFINITY) / 2);
  const team2Won =
    teamPoints.blue >=
    Math.ceil((state.selectedStage.best_of ?? Number.POSITIVE_INFINITY) / 2);

  const discordResultText = `**${state.selectedStage.stage_name}:** Match ${state.selectedMatch.tournament_match_id}
${team1Won ? "**:first_place: " : ""}:red_square: ${team1Name} | ${teamPoints.red ?? 0}${team1Won ? "**" : ""} - ${team2Won ? "**" : ""}${teamPoints.blue ?? 0} | ${team2Name} :blue_square:${team2Won ? "** :first_place:" : ""}
MP Link: <https://osu.ppy.sh/community/matches/${state.mpId}>

**Sammendrag**:
${state.selections
  .map((selection, i) => {
    const selectType = getSelectType(i);

    return `${i === 4 ? "\n" : i === 6 ? "\n" : ""}:${getSelector(i, state.firstPick)}_square: ${selectType === "pick" ? "picket" : "bannet"} **[${selection.map_index}](<https://osu.ppy.sh/b/${selection.beatmaps.osu_id}>)** (${selection.mods})${selectType === "pick" ? `, :${state.mapWinners[selection.id]}_square: vant!` : ""}`;
  })
  .join("\n")}
`;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Match results</h2>
        <BackButton />
      </div>
      <div>
        <h3 className="text-xl font-semibold">Discord match results:</h3>
        <pre>
          <CommandWithCopy command={discordResultText} />
        </pre>
      </div>
      <div className="flex justify-between">
        <button
          disabled={isFinished}
          className="disabled:bg-disabled bg-accent rounded p-2 text-white hover:cursor-pointer disabled:cursor-default"
          onClick={async () => {
            if (!state.selectedMatchId) {
              return;
            }

            const res = await updateResult({
              id: state.selectedMatchId,
              mp_id: state.mpId,
              team1_score: teamPoints.red ?? 0,
              team2_score: teamPoints.blue ?? 0,
            });

            if (isActionError(res)) {
              console.error(res);
            } else {
              setIsFinished(true);
            }
          }}
        >
          Submit match
        </button>
        <div className="flex items-center gap-4">
          <label className="flex gap-2">
            <span>Confirm:</span>
            <input
              type="checkbox"
              onChange={(e) => setIsFinished(e.target.checked)}
            />
          </label>
          <button
            disabled={!isFinished}
            className="disabled:bg-disabled bg-accent rounded p-2 text-white hover:cursor-pointer disabled:cursor-default"
            onClick={() => {
              dispatch({ type: "RESET" });
              const router = useRouter();

              router.refresh();
            }}
          >
            Reset referee helper
          </button>
        </div>
      </div>
    </div>
  );
}
