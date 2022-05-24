import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  // eslint-disable-next-line no-unused-vars
  interface Session {
    user: {
      roles: string[];
    } & DefaultSession["user"];
  }

  // eslint-disable-next-line no-unused-vars
  interface User extends DefaultUser {
    roles: string[];
  }
}

declare module "next-auth/jwt" {
  // eslint-disable-next-line no-unused-vars
  interface JWT extends DefaultJWT {
    roles: string[];
  }
}
