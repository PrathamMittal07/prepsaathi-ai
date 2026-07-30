import { prisma } from './src/utils/prisma';
prisma.resume.findMany({ orderBy: { createdAt: 'desc' }, take: 1 })
  .then(resumes => {
    console.log("Extracted Text:", !!resumes[0]?.extractedText, "Length:", resumes[0]?.extractedText?.length);
    console.log("Resume ID:", resumes[0]?.id);
  })
  .finally(() => prisma.$disconnect());
