import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

console.log('CLOUDINARY CONFIG CALLED');
console.log('API KEY:', process.env.CLOUDINARY_API_KEY ? 'EXISTS' : 'UNDEFINED');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export class CloudinaryService {
  static async uploadPdfFromBuffer(buffer: Buffer, folder: string = 'resumes'): Promise<{ publicId: string; secureUrl: string }> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'image', // Use 'image' to prevent Cloudinary from blocking PDF delivery due to raw file security restrictions
          format: 'pdf',
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          if (result) {
            resolve({
              publicId: result.public_id,
              secureUrl: result.secure_url,
            });
          } else {
            reject(new Error('Unknown error during upload'));
          }
        }
      );

      streamifier.createReadStream(buffer).pipe(uploadStream);
    });
  }

  static async deletePdf(publicId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, { resource_type: 'image' }, (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve();
      });
    });
  }
}
