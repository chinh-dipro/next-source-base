import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

import { IResponse } from "models/Response";
import { ERROR_MESSAGES } from "constants/errors";

const checkAuth = async (req: NextApiRequest, res: NextApiResponse<IResponse>, next: Function) => {
  try {
    const session = await getSession({ req });
    if (session) {
      req.user = session.user;
      next();
    } else {
      res.status(401).json({ error: ERROR_MESSAGES.UNAUTHENTICATED });
    }
  } catch (error) {
    res.status(500).json({ error: ERROR_MESSAGES.INTERNAL_ERROR });
  }
};

export default checkAuth;