"use client";

import { useForm } from "react-hook-form";

import { createTournamentStage } from "@/actions/tournament-stage";
import { PublicTournamentStagesInsertSchema } from "@/generated/zod-schema-types";
import { publicTournamentStagesInsertSchemaSchema } from "@/generated/zod-schemas";
import { isActionError } from "@/lib/error";
import { zodResolver } from "@hookform/resolvers/zod";

interface TournamentStageFormProps {
  id: number;
}

export function TournamentStageForm({ id }: TournamentStageFormProps) {
  const form = useForm<PublicTournamentStagesInsertSchema>({
    resolver: zodResolver(publicTournamentStagesInsertSchemaSchema),
    defaultValues: {
      stage_name: "My Stage",
      stage_index: 1,
      stage_type: "pvp",
    },
  });

  const onSubmit = async (data: PublicTournamentStagesInsertSchema) => {
    const result = await createTournamentStage(data);

    if (isActionError(result)) {
      console.log(result.error);
    } else {
      console.log("success");
    }
  };

  form.setValue("tournament_id", id, { shouldValidate: false });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input {...form.register("stage_name")} />
      <input {...form.register("stage_type")} />
      <input
        {...form.register("stage_index", {
          setValueAs: (v) => (v === "" ? null : parseInt(v)),
        })}
      />
      <input type="submit" />
    </form>
  );
}
