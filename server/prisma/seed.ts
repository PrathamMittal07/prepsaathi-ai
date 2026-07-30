import { PrismaClient, UserRole } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Create a Tenant
  const tenant = await prisma.tenant.create({
    data: {
      name: 'Demo University',
      domain: 'demo.edu'
    }
  });

  // 2. Create Users
  const admin = await prisma.user.create({
    data: {
      tenantId: tenant.id,
      email: 'admin@demo.edu',
      passwordHash: 'hashed_password_placeholder',
      roles: [UserRole.ADMIN]
    }
  });

  const student = await prisma.user.create({
    data: {
      tenantId: tenant.id,
      email: 'student@demo.edu',
      passwordHash: 'hashed_password_placeholder',
      roles: [UserRole.STUDENT]
    }
  });

  const mentor = await prisma.user.create({
    data: {
      tenantId: tenant.id,
      email: 'mentor@demo.edu',
      passwordHash: 'hashed_password_placeholder',
      roles: [UserRole.MENTOR]
    }
  });

  const recruiter = await prisma.user.create({
    data: {
      tenantId: tenant.id,
      email: 'recruiter@demo.edu',
      passwordHash: 'hashed_password_placeholder',
      roles: [UserRole.RECRUITER]
    }
  });

  // 3. Create Sample Company and Opportunity
  const company = await prisma.company.create({
    data: {
      name: 'Google',
      description: 'Search and Advertising'
    }
  });

  const opportunity = await prisma.opportunity.create({
    data: {
      companyId: company.id,
      title: 'Software Engineer',
      description: 'Backend systems using C++ and Go.'
    }
  });

  console.log(`Seeded successfully! Tenant ID: ${tenant.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
