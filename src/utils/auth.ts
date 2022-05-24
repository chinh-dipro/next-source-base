import { hash, compare } from "bcryptjs";
import { User } from ".prisma/client";

import prisma from "utils/db";

export async function checkExistingEmail(email: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });
  return !user;
}

export async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });
  return user;
}

export async function verifyPassword(lPassword: string, password: string): Promise<boolean> {
  return await compare(lPassword, password);
}

export async function getRoleNamesByUserId(id: number): Promise<string[]> {
  const user = await prisma.user.findUnique({
    include: {
      roles: {
        include: {
          role: true
        }
      },
    },
    where: {
      id
    },
  });

  if (!user) return [];

  const roles = user.roles.map(userAndRoles => {
    return userAndRoles.role.role;
  });
  return roles;
}

export async function getRoleIdsByRoleNames(roleNames: string[]): Promise<number[]> {
  const roles = await prisma.role.findMany({
    where: {
      role: { in: roleNames },
    },
  });

  if (!roles) return [];

  const ids = roles.map(role => {
    return role.id;
  });

  return ids;
}
