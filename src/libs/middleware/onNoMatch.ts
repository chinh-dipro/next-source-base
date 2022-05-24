import { NextApiRequest, NextApiResponse } from "next";

import { IResponse } from "models/Response";
import { ERROR_MESSAGES } from "constants/errors";

const onNoMatch = (req: NextApiRequest, res: NextApiResponse<IResponse>) => {
  res.status(404).end(ERROR_MESSAGES.NOT_FOUND);
};

export default onNoMatch;