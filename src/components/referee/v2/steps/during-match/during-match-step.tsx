import { CommandWithCopy } from "@/components/ui/command-with-copy";
import { Separator } from "@/components/ui/separator";
import { PublicStagesData } from "@/lib/referee/query";
import {
  getModCommand,
  getPoints,
  getSelector,
  getSelectType,
} from "@/lib/referee/utils";
import React from "react";
import { BackButton } from "../../back-button";
import {
  RefereeHelperDispatchContext,
  RefereeHelperStateContext,
} from "../../referee-helper-state";
import { MapSelect } from "./map-select";
import { RefereeHelperActionBar } from "./referee-helper-actions";
import { TeamOverview } from "./team-overview";

export function DuringMatchStep() {
  const state = React.useContext(RefereeHelperStateContext);
  const dispatch = React.useContext(RefereeHelperDispatchContext);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        dispatch({ type: "UNDO_SELECTION" });
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
        e.preventDefault();
        dispatch({ type: "REDO_SELECTION" });
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "|") {
        e.preventDefault();
        dispatch({ type: "RESET_SELECTIONS" });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  if (!state.matchState || !state.selectedStage || !state.selectedMatch) {
    dispatch({ type: "SET_STEP", step: 0 });
    return;
  }

  const team1Name =
    state.selectedMatch.team1?.name ?? state.selectedMatch.team1_label ?? "";
  const team2Name =
    state.selectedMatch.team2?.name ?? state.selectedMatch.team2_label ?? "";

  const sortedMappool = state.selectedStage.mappool_maps.toSorted((a, b) =>
    a.map_index.localeCompare(b.map_index, undefined, {
      numeric: true,
      sensitivity: "base",
    }),
  );

  const aPoolMaps = sortedMappool.filter((map) =>
    map.map_index.startsWith("A"),
  );

  const bPoolMaps = sortedMappool.filter((map) =>
    map.map_index.startsWith("B"),
  );

  const tiebreakers = sortedMappool.filter((map) =>
    map.map_index.includes("TB"),
  );

  const teamPoints = getPoints(state.mapWinners);

  const team1Won =
    teamPoints.red >=
    Math.ceil((state.selectedStage.best_of ?? Number.POSITIVE_INFINITY) / 2);
  const team2Won =
    teamPoints.blue >=
    Math.ceil((state.selectedStage.best_of ?? Number.POSITIVE_INFINITY) / 2);

  const currentPick =
    state.selections.length < 7
      ? state.selections.at(Math.min(3, state.selections.length - 1))
      : state.selections.at(-1);

  const arePicksFinished =
    teamPoints.red >=
      Math.floor(
        (state.selectedStage.best_of ?? Number.POSITIVE_INFINITY) / 2,
      ) &&
    teamPoints.blue >=
      Math.floor((state.selectedStage.best_of ?? Number.POSITIVE_INFINITY) / 2);

  const isPointPickMismatched =
    (teamPoints.red ?? 0) + (teamPoints.blue ?? 0) - teamPoints.ties !==
    (state.selections.length > 4
      ? Math.max(state.selections.length - 2, 4)
      : state.selections.length);

  const statusText =
    isPointPickMismatched && !arePicksFinished
      ? "Update pick results first"
      : `${team1Name} | ${teamPoints.red ?? 0} - ${teamPoints.blue ?? 0} | ${team2Name} // ` +
        `${state.selectedStage.best_of ? `Best of ${state.selectedStage.best_of}, ` : ""}` +
        `${team1Won ? `${team1Name} vant!` : team2Won ? `${team2Name} vant!` : arePicksFinished ? `tiebreakeren blir spilt!` : `${getSelector(state.selections.length, state.firstPick) === "red" ? team1Name : team2Name} du har 90 sekunder på å ${getSelectType(state.selections.length) === "pick" ? "picke" : "banne"} et map!`}`;

  const onWin = (winner: "red" | "blue" | "tie", mapId: number) => {
    dispatch({ type: "SET_MAP_WINNER", mapId: mapId, winner: winner });
  };

  const onMapSelect = (
    map: PublicStagesData[number]["mappool_maps"][number],
  ) => {
    if (team1Won || team2Won || isPointPickMismatched || arePicksFinished)
      return;

    dispatch({ type: "PUSH_SELECTION", selection: map });
  };

  return (
    <div className="flex max-w-4xl min-w-4xl flex-col gap-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Referee Helper</h2>
        <div className="flex gap-4">
          <BackButton />
          <button
            disabled={
              state.selectedStage.best_of ? !(team1Won || team2Won) : false
            }
            className="disabled:bg-disabled bg-accent rounded p-2 text-white hover:cursor-pointer disabled:cursor-default"
            onClick={() => dispatch({ type: "SET_STEP", step: state.step + 1 })}
          >
            Go to results
          </button>
        </div>
      </div>
      <Separator orientation="horizontal" />
      <div className="flex items-center gap-2">
        <span>Status:</span>
        <CommandWithCopy command={statusText} />
      </div>
      <Separator orientation="horizontal" />
      <div className="flex justify-end">
        <div className="flex items-center gap-2">
          {currentPick && (
            <>
              <span className="text-nowrap">Set map:</span>
              <div className="flex flex-col gap-2">
                <CommandWithCopy
                  command={`!mp map ${arePicksFinished ? tiebreakers[0].beatmaps.osu_id : currentPick.beatmaps.osu_id}`}
                />
                <CommandWithCopy
                  command={`!mp mods ${getModCommand(arePicksFinished ? tiebreakers[0].mods : currentPick.mods)}`}
                />
              </div>
              <Separator orientation="vertical" />
            </>
          )}
          <span>General:</span>
          <div className="grid grid-flow-col grid-rows-2 gap-2">
            <CommandWithCopy command="!mp timer 90" />
            <CommandWithCopy command="!mp start 10" />
            <CommandWithCopy command="!mp abort" />
            <CommandWithCopy command="!mp settings" />
            <CommandWithCopy
              command={`!mp invite ${team1Name.replaceAll(" ", "_")}`}
            />
            <CommandWithCopy
              command={`!mp invite ${team2Name.replaceAll(" ", "_")}`}
            />
          </div>
        </div>
      </div>
      <TeamOverview />
      <div className="grid grid-cols-8 gap-8">
        {[aPoolMaps, bPoolMaps].map((mappool, i) => {
          return (
            <div key={i} className="col-span-4 space-y-4">
              {mappool.map((map) => {
                const selectionIndex = state.selections.findIndex(
                  (selection) => selection.id === map.id,
                );
                return (
                  <MapSelect
                    key={map.id}
                    map={map}
                    selector={getSelector(selectionIndex, state.firstPick)}
                    selectType={getSelectType(selectionIndex)}
                    onClick={() => onMapSelect(map)}
                    onWin={onWin}
                    winner={state.mapWinners[map.id]}
                  />
                );
              })}
            </div>
          );
        })}
        <div className="col-span-4 col-start-3 space-y-4">
          {tiebreakers.map((map) => {
            return (
              <MapSelect
                key={map.id}
                map={map}
                selectType="tiebreaker"
                selector={arePicksFinished ? "tiebreaker" : undefined}
                onWin={onWin}
                winner={state.mapWinners[map.id]}
              />
            );
          })}
        </div>
      </div>
      <RefereeHelperActionBar />
    </div>
  );
}
