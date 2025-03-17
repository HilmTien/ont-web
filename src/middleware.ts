import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { createServerClient } from "./lib/server";

export default auth(async (req) => {
  if (!req.auth) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (req.auth.osuId == parseInt(process.env.SITE_OWNER_OSU_ID!)) {
    return;
  }

  const supabase = await createServerClient();

  const { data: userWithAdmin } = await supabase
    .from("users")
    .select("id, admins(id)")
    .eq("osu_id", req.auth.osuId)
    .single();

  if (!userWithAdmin || userWithAdmin.admins.length === 0) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return;
});

export const config = {
  matcher: "/admin/:path*",
};
