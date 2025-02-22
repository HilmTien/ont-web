import { SupabaseAdapter } from "@auth/supabase-adapter";
import NextAuth, { type DefaultSession } from "next-auth";
import Osu from "next-auth/providers/osu";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: DefaultSession["user"];
    id: string;
    expires: string;
    sessionToken: string;
    userId: string;
  }
}

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
