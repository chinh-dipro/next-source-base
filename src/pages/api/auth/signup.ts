import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import randomString from "randomstring";

import { checkExistingEmail, hashPassword, getRoleIdsByRoleNames } from "utils/auth";
import prisma from "utils/db";
import { ROLE } from "constants/common";
import { signupSchema } from "libs/validation/schemas";
import onError from "libs/middleware/onError";
import onNoMatch from "libs/middleware/onNoMatch";
import withValidation from "libs/middleware/withValidation";
import { IResponse } from "models/Response";
import { ERROR_MESSAGES } from "constants/errors";
import EmailService from "services/email.service";
import { serverConfig } from "config";

const validate = withValidation({
  schema: signupSchema,
  mode: "body",
});

const handler = nc({ onError, onNoMatch });

handler.post(async (req: NextApiRequest, res: NextApiResponse<IResponse>) => {
  const { email, password, name, roles = [ROLE.USER] } = req.body;

  if (await checkExistingEmail(email)) {
    return res.status(400).json({ error: ERROR_MESSAGES.EMAIL_ALREADY_TAKEN });
  }

  const roleIds = await getRoleIdsByRoleNames(roles);

  const token = randomString.generate();

  const user = await prisma.user.create({
    include: {
      roles: {
        include: {
          role: true
        }
      },
    },
    data: {
      name,
      email,
      password: await hashPassword(password),
      token,
      roles: {
        create: [
          ...roleIds.map(roleId => {
            return {
              role: {
                connect: {
                  id: roleId
                }
              }
            };
          }),
        ]
      },
    }
  });

  EmailService.sendEmail(email, "Verification DIPRO's Account", "verify-account", { name, link: `${serverConfig.external.url}/api/auth/verify/${token}` });

  return res.status(200).json({ data: { id: user.id } });
});

export default validate(handler);
