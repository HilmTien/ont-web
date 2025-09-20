import { createServerClient } from "@/lib/server";
import Credentials from "next-auth/providers/credentials";

export const MockOsu = Credentials({
  name: "Mock users",
  credentials: {
    name: { label: "Name", type: "text" },
  },
  async authorize(credentials) {
    const supabase = await createServerClient();

    const { data: user } = await supabase
      .from("users")
      .select("username, osu_id")
      .eq("username", credentials?.name as string)
      .single();

    if (!user) {
      throw new Error(
        "Users is not seeded in the database, add some MockUsers",
      );
    }

    return {
      id: user.osu_id.toString(),
      name: user.username,
      image: "/profile-pics/avatar-guest.png",
    };
  },
});
