import { NextApiRequest, NextApiResponse } from "next";
import * as Yup from "yup";
import type Lazy from "yup/lib/Lazy";

import { IResponse } from "models/Response";

type Validation = {
  mode?: "body" | "query" | "param" | "headers";
  schema: any;
};

function yupResolver<T extends Yup.AnyObjectSchema | Lazy<any>>(schema:T) {
  return {
    validate: (data: unknown) => schema.validateSync(data),
  };
}

export default function withValidation({ schema, mode = "query" }: Validation) {
  return (
    handler: any
  ) => {
    return async (
      req: NextApiRequest,
      res: NextApiResponse<IResponse>,
      next?: any
    ) => {
      try {
        const resolver = yupResolver(schema);
        resolver.validate(req[mode]);

        if (next) {
          return next();
        }
        return handler(req, res);
      } catch (error) {
        res.status(400).send({ error: error.message, data: error });
      }
    };
  };
}

