import React, { ReactNode } from "react";

import { useCan } from "libs/hooks/useCan";

interface RequiredPermissionProps {
  children: ReactNode;
  roles?: string[];
}

export default function RequiredPermission({ children, roles }: RequiredPermissionProps) {
  const userCanSeeComponent = useCan({ roles });

  if (!userCanSeeComponent) {
    return null;
  }

  return <>{children}</>;
}
