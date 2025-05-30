if (typeof window !== "undefined") {
  throw new Error("`server.ts` should not be imported in client-side code!");
}

import { Database } from "@/generated/database.types";
import { createClient } from "@supabase/supabase-js";

export async function createServerClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // Service role key (server-side only)
    {
      auth: { persistSession: false },
    },
  );
}
