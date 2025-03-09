import NextAuth, { type DefaultSession } from "next-auth";
import Osu from "next-auth/providers/osu";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"];
    expires: string;
    accessToken: string;
  }

  interface Account {
    access_token: string;
  }
}

import { onUserLogin } from "@/actions/user";
import { JWT } from "next-auth/jwt";
declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    expiresAt: number;
    refreshToken: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Osu({
      authorization: "https://osu.ppy.sh/oauth/authorize?scope=identify+public",
    }),
  ],
  callbacks: {
    jwt: async ({ account, token }) => {
      // first time login
      if (account) {
        if (!token.name) {
          console.log("Something unexpected happened...");
          return {
            ...token,
            accessToken: account.access_token,
            expiresAt: account.expires_at!,
            refreshToken: account.refresh_token!,
          };
        }

        await onUserLogin(token.name, parseInt(account.providerAccountId));

        return {
          ...token,
          accessToken: account.access_token,
          expiresAt: account.expires_at!,
          refreshToken: account.refresh_token!,
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
      params.session.accessToken = params.token.accessToken;
      return params.session;
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
    // no clue if this is needed
    // await logout();
    return null;
  }
}
