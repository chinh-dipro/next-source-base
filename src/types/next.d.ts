import { Session } from "next-auth";

declare module "next" {
  interface NextApiRequest extends NextApiRequest {
    user: Partial<Session.user>;
  }
}
