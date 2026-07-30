const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const resume = await prisma.resume.findFirst({ where: { isPrimary: true } });
  console.log(resume?.secureUrl);
  if (resume?.secureUrl) {
    const res = await fetch(resume.secureUrl);
    console.log(res.status, res.statusText);
  }
}
main().finally(() => prisma.$disconnect());
