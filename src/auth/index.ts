import NextAuth, { type User } from "next-auth";
import Osu from "next-auth/providers/osu";

declare module "next-auth" {
  interface Session {
    osuId: number;
    user: User;
    expires: string;
    accessToken: string;
  }

  interface Account {
    access_token: string;
  }

  interface Profile {
    is_restricted: boolean;
    badges: {
      awarded_at: string;
      description: string;
    }[];
    country_code: string;
    statistics_rulesets: {
      osu: {
        global_rank: number;
        pp: number;
        hit_accuracy: number;
        play_count: number;
        maximum_combo: number;
      };
    };
  }
}

import { onUserLogin } from "@/actions/user";
import { JWT } from "next-auth/jwt";
import { MockOsu } from "./mock-auth";
declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    expiresAt: number;
    refreshToken: string;
    osuId: number;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Osu({
      authorization: {
        url: "https://osu.ppy.sh/oauth/authorize",
        params: {
          scope: "identify public",
        },
      },
    }),
    ...(process.env.NODE_ENV === "development" ? [MockOsu] : []),
  ],
  callbacks: {
    jwt: async ({ account, token, profile }) => {
      // first time login
      if (account) {
        if (profile) {
          console.log(profile.statistics_rulesets);
          console.log(profile.badges!);
          console.log(profile.is_restricted!);
          console.log(profile.country_code!);
        }
        const osuId = parseInt(account.providerAccountId);

        if (!token.name) {
          console.log("Something unexpected happened...");
          return {
            ...token,
            accessToken: account.access_token,
            expiresAt: account.expires_at!,
            refreshToken: account.refresh_token!,
            osuId: osuId,
          };
        }

        if (!profile) {
          await onUserLogin({
            osu_id: osuId,
            username: token.name,
            is_restricted: true,
          });
          console.log("Something unexpected happened...");
          return {
            ...token,
            accessToken: account.access_token,
            expiresAt: account.expires_at!,
            refreshToken: account.refresh_token!,
            osuId: osuId,
          };
        }

        await onUserLogin({
          osu_id: osuId,
          username: token.name,
          is_restricted: profile.is_restricted,
          badges: profile.badges.length,
          tournament_badges: profile.badges.filter((badge) => {
            const matches = badge.description.match(
              /winner|winning|corsace|perennial/i,
            );
            return matches ? matches.length != 0 : false;
          }).length,
          country_code: profile.country_code,
          rank: profile.statistics_rulesets.osu.global_rank,
          accuracy: profile.statistics_rulesets.osu.hit_accuracy,
          maximum_combo: profile.statistics_rulesets.osu.maximum_combo,
          play_count: profile.statistics_rulesets.osu.play_count,
          pp: profile.statistics_rulesets.osu.pp,
        });

        return {
          ...token,
          accessToken: account.access_token,
          expiresAt: account.expires_at!,
          refreshToken: account.refresh_token!,
          osuId: osuId,
        };
      }

      // subsequent logins, and the token has expired
      if (Date.now() > token.expiresAt * 1000) {
        return await tryRefreshToken(token);
      }

      // subsequent logins
      return token;
    },
    session: (params) => {
      return {
        ...params.session,
        accessToken: params.token.accessToken,
        osuId: params.token.osuId,
      };
    },
  },
});

/**
 * Tries to refresh the access token, and if the operation fails, logs out the user
 *
 * @param {JWT} token - The current token.
 * @returns The refreshed token, or null (implicit signOut) if the access token couldn't be refreshed.
 */
async function tryRefreshToken(token: JWT): Promise<JWT | null> {
  try {
    const response = await fetch("https://osu.ppy.sh/oauth/token", {
      method: "POST",
      body: new URLSearchParams({
        client_id: process.env.AUTH_OSU_ID!,
        client_secret: process.env.AUTH_OSU_SECRET!,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      }),
    });

    if (!response.ok) {
      throw new Error("Refresh token request was unsuccessful");
    }

    const newToken = (await response.json()) as {
      access_token: string;
      expires_in: number;
      refresh_token: string;
      token_type: string;
    };

    return {
      ...token,
      accessToken: newToken.access_token,
      expiresAt: Math.floor(Date.now() / 1000 + newToken.expires_in),
      refreshToken: newToken.refresh_token,
    };
  } catch {
    return null;
  }
}
