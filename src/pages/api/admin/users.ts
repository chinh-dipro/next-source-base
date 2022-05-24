import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";

import checkAuth from "libs/middleware/checkAuth";
import roleAuth from "libs/middleware/roleAuth";
import prisma from "utils/db";
import { ROLE } from "constants/common";
import onError from "libs/middleware/onError";
import onNoMatch from "libs/middleware/onNoMatch";
import { IResponse } from "models/Response";

const handler = nc({ onError, onNoMatch }).use(checkAuth).use(roleAuth([ROLE.ADMIN]));

handler.get(async (req: NextApiRequest, res: NextApiResponse<IResponse>) => {
  const users = await prisma.user.findMany();
  res.status(200).json({ data: users });
});

export default handler;
