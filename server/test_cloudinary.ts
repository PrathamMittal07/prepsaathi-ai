import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const publicId = "resumes/your_public_id"; // I will fetch the actual publicId from the DB

import { prisma } from './src/utils/prisma';
prisma.resume.findUnique({ where: { id: "5fa70379-8939-4d15-b179-03a128bb8cc2" } }).then(async (resume) => {
  if (!resume || !resume.publicId) return;
  const url = cloudinary.utils.url(resume.publicId, { resource_type: 'image', type: 'upload', sign_url: true });
  console.log("Signed URL:", url);
  
  const res = await fetch(url);
  console.log("Fetch Status:", res.status, res.statusText);
}).finally(() => prisma.$disconnect());
