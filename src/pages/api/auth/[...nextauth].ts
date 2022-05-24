import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import { getUserByEmail, verifyPassword, getRoleNamesByUserId } from "utils/auth";
import { ERROR_MESSAGES } from "constants/errors";
import { signInSchema } from "libs/validation/schemas";
import { serverConfig } from "config";

export default NextAuth({
  providers: [
    Providers.Credentials({
      async authorize(credentials: any) {
        signInSchema.validateSync(credentials);
        const { email, password } = credentials;
        const user = await getUserByEmail(email);
        if (!user) {
          throw new Error(ERROR_MESSAGES.INVALID_CREDENTIAL);
        }
        if (!await verifyPassword(password, user.password)) throw new Error(ERROR_MESSAGES.INVALID_CREDENTIAL);
        return { email: user.email, name: user.name, roles: await getRoleNamesByUserId(user.id) };
      }
    })
  ],
  database: serverConfig.database.url,
  secret: serverConfig.auth.secret,
  jwt: {
    secret: serverConfig.auth.secret,
  },
  session: {
    jwt: true,
    maxAge: 7 * 24 * 60 * 60 // 7 days
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.roles = user.roles;
      }
      return token;
    },
    async session(session, token) {
      if (token?.roles) {
        session.user.roles = token.roles;
      }
      return session;
    }
  }
});
