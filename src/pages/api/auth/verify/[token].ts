import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import onError from "libs/middleware/onError";
import onNoMatch from "libs/middleware/onNoMatch";
import { checkExistingToken, verifyAccount } from "utils/auth";

const handler = nc({ onError, onNoMatch });

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.query.token as string;
  const isExistingToken = await checkExistingToken(token);

  let message = isExistingToken? "Verify success": "Verify failed";

  isExistingToken && await verifyAccount(token);

  res.status(200).send(message);
});

export default handler;