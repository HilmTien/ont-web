import { createServerClient } from "@/lib/server";
import Navbar from "./navbar";

export async function NavbarServer() {
  const supabase = await createServerClient();

  const { data: stages } = await supabase
    .from("tournament_stages")
    .select("stage_index, is_public")
    .eq("tournament_id", 1)
    .eq("is_public", true)
    .order("stage_index");

  if (!stages || stages.length == 0) {
    return <Navbar />;
  }

  return <Navbar latestStage={stages[stages.length - 1].stage_index} />;
}
