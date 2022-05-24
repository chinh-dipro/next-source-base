import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Seed roles
  const user = await prisma.role.upsert({
    where: { role: "user" },
    update: {},
    create: {
      role: "user",
    },
  });

  const admin = await prisma.role.upsert({
    where: { role: "admin" },
    update: {},
    create: {
      role: "admin",
    },
  });

  console.log({ user, admin });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });