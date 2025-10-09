"use client";

import { StageMatchesQueryData } from "@/lib/schedule/query";
import {
  isOwnMatch,
  sortBy,
  SortBy,
  sortKeyLabels,
} from "@/lib/schedule/utils";
import { useSession } from "next-auth/react";
import { Select } from "radix-ui";
import React from "react";
import ToolTip from "../ui/tooltip";
import { MatchCard } from "./match-card";

interface MatchListProps {
  matches: StageMatchesQueryData["matches"];
}

export function MatchList({ matches }: MatchListProps) {
  const [showOwnOnly, setShowOwnOnly] = React.useState(false);
  const [sortKey, setSortKey] = React.useState<SortBy>("time");

  const { data: session } = useSession();

  if (!session && showOwnOnly) {
    setShowOwnOnly(false);
  }

  const showOwnOnlyCheckbox = (
    <label className="inline-flex gap-2">
      <input
        type="checkbox"
        disabled={!session}
        checked={showOwnOnly}
        onChange={() => setShowOwnOnly(!showOwnOnly)}
      />
      Vis kun egne matches
    </label>
  );

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        {!session ? (
          <ToolTip trigger={showOwnOnlyCheckbox}>
            Logg inn for å bruke denne funksjonen
          </ToolTip>
        ) : (
          showOwnOnlyCheckbox
        )}
        <div className="flex items-center gap-2">
          Sorter etter:
          <Select.Root
            value={sortKey}
            onValueChange={(key) => {
              setSortKey(key as SortBy);
            }}
          >
            <Select.Trigger className="bg-navbar cursor-pointer rounded-md p-2">
              <Select.Value>{sortKeyLabels[sortKey]}</Select.Value>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content
                className="bg-navbar min-w-48 rounded-md"
                position="popper"
                sideOffset={5}
              >
                <Select.Viewport className="shadow-container p-[5px]">
                  {Object.keys(sortBy).map((key) => {
                    const sortKey = key as SortBy;
                    return (
                      <Select.Item
                        key={key}
                        className="hover:bg-card cursor-pointer rounded-md py-[2px] pl-1"
                        value={sortKey}
                      >
                        {sortKeyLabels[sortKey]}
                      </Select.Item>
                    );
                  })}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>
      </div>
      {matches.length !== 0 ? (
        matches
          .filter((match) =>
            showOwnOnly && session?.user.name
              ? isOwnMatch(match, session.user.name)
              : true,
          )
          .sort(sortBy[sortKey])
          .map((match) => <MatchCard match={match} key={match.id} />)
      ) : (
        <p className="mx-auto pb-8">Denne runden har ingen matches</p>
      )}
    </div>
  );
}
