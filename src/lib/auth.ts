import client from "@/database/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;

if (clientId == null || clientSecret == null) {
  throw new Error("Missing `Google Oauth` Credentials");
}

export const options: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      name: "Sign in with Google",
      clientId,
      clientSecret,
      httpOptions: {
        timeout: 20000,
      },
    }),
  ],
  // pages: {
  //   signIn: "/signin",
  //   error: "/signin",
  // },
  adapter: PrismaAdapter(client),
};
