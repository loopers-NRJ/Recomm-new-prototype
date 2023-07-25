import NextAuth, { type AuthOptions } from "next-auth";
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
    }),
  ],
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
