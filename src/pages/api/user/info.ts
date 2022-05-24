import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import nc from "next-connect";

import checkAuth from "libs/middleware/checkAuth";
import prisma from "utils/db";
import onError from "libs/middleware/onError";
import onNoMatch from "libs/middleware/onNoMatch";
import { IResponse } from "models/Response";

const handler = nc({ onError, onNoMatch }).use(checkAuth);

handler.get(async (req: NextApiRequest, res: NextApiResponse<IResponse>) => {
  const { user } = await getSession({ req });
  const userInfo = await prisma.user.findUnique({
    where: {
      email: user.email
    }
  });
  delete userInfo.password;
  res.status(200).json({ data: userInfo });
});

export default handler;
