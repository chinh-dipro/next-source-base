import { useSession } from "next-auth/client";

import { validateUserPermissions } from "utils/permission";

type UseCanParams = {
  roles?: string[];
};

export function useCan({ roles }: UseCanParams): boolean {
  const [session] = useSession();

  if (!session) {
    return false;
  }

  const { user } = session;

  const userHasValidPermissions = validateUserPermissions({
    user,
    roles,
  });

  return userHasValidPermissions;
}