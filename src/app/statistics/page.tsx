import { createServerClient } from "@/lib/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createServerClient();

  const { data: stages } = await supabase
    .from("tournament_stages")
    .select("stage_index, is_public")
    .eq("tournament_id", 1)
    .eq("is_public", true)
    .order("stage_index");

  if (!stages) {
    return <>Error no stages</>;
  }

  return redirect(`/statistics/${stages[stages.length - 1].stage_index}`);
}
