"use client";

import { useForm } from "react-hook-form";

import { editMatch } from "@/actions/schedule";
import { PublicMatchesUpdate } from "@/generated/zod-schema-types";
import { publicMatchesUpdateSchema } from "@/generated/zod-schemas";
import {
  CommentatorsQueryData,
  MatchesQueryData,
  RefereesQueryData,
  StagesQueryData,
  StreamersQueryData,
  TeamsQueryData,
} from "@/lib/schedule/query";
import { removeNullProperties } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

interface MatchFormProps {
  staff: {
    commentators: CommentatorsQueryData;
    streamers: StreamersQueryData;
    referees: RefereesQueryData;
  };
  teams: TeamsQueryData;
  stages: StagesQueryData;
  match: MatchesQueryData[number];
}

export function EditMatchForm({ staff, teams, stages, match }: MatchFormProps) {
  const form = useForm<PublicMatchesUpdate>({
    resolver: zodResolver(publicMatchesUpdateSchema),
    defaultValues: { ...removeNullProperties(match) },
  });

  return (
    <form onSubmit={form.handleSubmit((data) => editMatch(data, match.id))}>
      <select
        id="referee"
        {...form.register("referee_id", {
          setValueAs: (v) => (v === "" ? null : parseInt(v)),
        })}
      >
        <option value={""}>None</option>
        {staff.referees.map((referee) => (
          <option value={referee.id} key={referee.id}>
            {referee.users.username}
          </option>
        ))}
      </select>
      <select
        id="streamer"
        {...form.register("streamer_id", {
          setValueAs: (v) => (v === "" ? null : parseInt(v)),
        })}
      >
        <option value={""}>None</option>
        {staff.streamers.map((streamer) => (
          <option value={streamer.id} key={streamer.id}>
            {streamer.users.username}
          </option>
        ))}
      </select>
      <select
        id="commentator-1"
        {...form.register("commentator1_id", {
          setValueAs: (v) => (v === "" ? null : parseInt(v)),
        })}
      >
        <option value={""}>None</option>
        {staff.commentators.map((commentator) => (
          <option value={commentator.id} key={commentator.id}>
            {commentator.users.username}
          </option>
        ))}
      </select>
      <select
        id="commentator-2"
        {...form.register("commentator2_id", {
          setValueAs: (v) => (v === "" ? null : parseInt(v)),
        })}
      >
        <option value={""}>None</option>
        {staff.commentators.map((commentator) => (
          <option value={commentator.id} key={commentator.id}>
            {commentator.users.username}
          </option>
        ))}
      </select>
      <input {...form.register("match_time")}></input>
      <select
        id="teams-1"
        {...form.register("team1_id", {
          setValueAs: (v) => (v === "" ? null : parseInt(v)),
        })}
      >
        {teams.map((team) => (
          <option value={team.id} key={team.id}>
            {team.name}
          </option>
        ))}
      </select>
      <select
        id="teams-2"
        {...form.register("team2_id", {
          setValueAs: (v) => (v === "" ? null : parseInt(v)),
        })}
      >
        {teams.map((team) => (
          <option value={team.id} key={team.id}>
            {team.name}
          </option>
        ))}
      </select>
      <select
        id="stage"
        {...form.register("stage_id", {
          setValueAs: (v) => (v === "" ? null : parseInt(v)),
        })}
      >
        {stages.map((stage) => (
          <option value={stage.id} key={stage.id}>
            {stage.stage_name}
          </option>
        ))}
      </select>
      <input {...form.register("tournament_match_id")} />
      <input type="submit" />
    </form>
  );
}
