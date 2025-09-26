import { CommandWithCopy } from "@/components/ui/command-with-copy";
import React from "react";
import { BackButton } from "../back-button";
import {
  RefereeHelperDispatchContext,
  RefereeHelperStateContext,
} from "../referee-helper-state";

export function SetupLobbyStep() {
  const state = React.useContext(RefereeHelperStateContext);
  const dispatch = React.useContext(RefereeHelperDispatchContext);

  const [isFinished, setIsFinished] = React.useState(false);

  const finishSetup = () => {
    dispatch({ type: "SET_STEP", step: state.step + 1 });
  };

  if (!state.matchState || !state.selectedStage || !state.selectedMatch) {
    dispatch({ type: "SET_STEP", step: 0 });
    return;
  }

  const team1Name =
    state.selectedMatch.team1?.name ?? state.selectedMatch.team1_label ?? "";
  const team2Name =
    state.selectedMatch.team2?.name ?? state.selectedMatch.team2_label ?? "";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Setup lobby and warmups</h2>
        <BackButton />
      </div>
      {state.selectedMatch.streamers && (
        <div>
          <span className="mr-2 text-xl">Add streamer:</span>
          <CommandWithCopy
            command={`!mp addref ${state.selectedMatch.streamers.users.username.replaceAll(" ", "_")}`}
          />
        </div>
      )}
      <div>
        <span className="mr-2 text-xl">Set lobby rules:</span>
        <CommandWithCopy command="!mp set 0 3" />
      </div>
      <div>
        <span className="mr-2 text-xl">Invite player 1:</span>
        <CommandWithCopy
          command={`!mp invite ${team1Name.replaceAll(" ", "_")}`}
        />
      </div>
      <div>
        <span className="mr-2 text-xl">Invite player 2:</span>
        <CommandWithCopy
          command={`!mp invite ${team2Name.replaceAll(" ", "_")}`}
        />
      </div>
      {state.selectedMatch.streamers && (
        <>
          <p>
            Since the match is streamed, ensure the players are in the correct
            slots. You can check their slots with{" "}
            <CommandWithCopy command="!mp settings" />.{" "}
            {state.selectedMatch?.team1?.name ??
              state.selectedMatch?.team1_label}{" "}
            should be in slot 1 and{" "}
            {state.selectedMatch?.team2?.name ??
              state.selectedMatch?.team2_label}{" "}
            should be in slot 2. You can force it by using these commands should
            they not move by themselves:
          </p>
          <div>
            <span className="mr-2">Move player 2 to temporary slot:</span>
            <CommandWithCopy
              command={`!mp move ${team2Name.replaceAll(" ", "_")} 3`}
            />
          </div>
          <div>
            <span className="mr-2">Move player 1 to correct slot:</span>
            <CommandWithCopy
              command={`!mp move ${team1Name.replaceAll(" ", "_")} 1`}
            />
          </div>
          <div>
            <span className="mr-2">Move player 2 to correct slot:</span>
            <CommandWithCopy
              command={`!mp move ${team2Name.replaceAll(" ", "_")} 2`}
            />
          </div>
        </>
      )}
      <div>
        <span className="mr-2 text-xl">Warmup player 1:</span>
        <CommandWithCopy
          command={`!mp host ${team1Name.replaceAll(" ", "_")}`}
        />
      </div>
      <div>
        <span className="mr-2 text-xl">Warmup player 2:</span>
        <CommandWithCopy
          command={`!mp host ${team2Name.replaceAll(" ", "_")}`}
        />
      </div>
      <div>
        <span className="mr-2 text-xl">Clear host:</span>
        <CommandWithCopy command={"!mp clearhost"} />
      </div>
      <div>
        <span className="mr-2 text-xl">Check lobby state:</span>
        <CommandWithCopy command={"!mp settings"} />
      </div>
      <p>
        There is a chance that players tampered with settings while they had
        their warmups. Run <CommandWithCopy command="!mp set 0 3" /> again to
        ensure the lobby settings are correct
      </p>
      <p>
        The players can now roll. The winner of the roll chooses first or second
        pick.
      </p>
      <label>
        <span className="mr-2 text-xl">First pick:</span>
        <select
          value={state.firstPick}
          onChange={(e) =>
            dispatch({
              type: "SET_FIRST_PICK",
              firstPick: e.target.value as "red" | "blue",
            })
          }
          className="rounded border p-2"
        >
          <option value="red">
            {state.selectedMatch.team1?.name ?? state.selectedMatch.team1_label}
          </option>
          <option value="blue">
            {state.selectedMatch.team2?.name ?? state.selectedMatch.team2_label}
          </option>
        </select>
      </label>
      <label>
        <span className="mr-2 text-xl">Everything done:</span>
        <input
          type="checkbox"
          checked={isFinished}
          onChange={() => setIsFinished((prev) => !prev)}
        />
      </label>
      <button
        disabled={!isFinished}
        onClick={finishSetup}
        className="disabled:bg-disabled bg-accent rounded p-2 text-white hover:cursor-pointer disabled:cursor-default"
      >
        Start Referee Helper
      </button>
    </div>
  );
}
