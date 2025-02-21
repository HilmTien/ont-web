import { SupabaseAdapter } from "@auth/supabase-adapter";
import NextAuth from "next-auth";
import Osu from "next-auth/providers/osu";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Osu],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  session: {
    strategy: "database",
  },
});
