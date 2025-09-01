import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { createServerClient } from "./lib/server";

export default auth(async (req) => {
  if (!req.auth) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (req.auth.osuId == parseInt(process.env.SITE_OWNER_OSU_ID!)) {
    return;
  }

  const tournament_regex = req.nextUrl.pathname.match(
    /^\/admin\/tournaments\/(\d+)(\/.*)?$/,
  );

  if (tournament_regex) {
    const tournament_id = parseInt(tournament_regex[1]);

    const supabase = await createServerClient();

    const { data: userWithAdmin } = await supabase
      .from("users")
      .select("id, admins(tournament_id)")
      .eq("osu_id", req.auth.osuId)
      .single();

    if (
      userWithAdmin &&
      userWithAdmin.admins.some((t) => t.tournament_id == tournament_id)
    ) {
      return;
    }
  }

  return NextResponse.redirect(new URL("/", req.url));
});

export const config = {
  matcher: "/admin/:path*",
};
