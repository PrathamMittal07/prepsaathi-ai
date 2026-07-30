import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { env } from '../config/env';

export class StorageService {
  private static s3Client = new S3Client({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'mock-access',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'mock-secret'
    },
    // Optional: useful for Cloudflare R2 or MinIO
    endpoint: process.env.AWS_ENDPOINT_URL_S3,
    forcePathStyle: process.env.AWS_FORCE_PATH_STYLE === 'true' // needed for MinIO
  });

  private static bucket = process.env.S3_BUCKET_NAME || 'prep2place-storage-dev';

  static async uploadFile(buffer: Buffer, key: string, mimeType: string): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: buffer,
      ContentType: mimeType,
      // ACL is typically omitted if bucket enforces owner-only or uniform ACLs
    });

    await this.s3Client.send(command);
    return key;
  }

  static async getSignedDownloadUrl(key: string, expiresIn: number = 3600): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    return getSignedUrl(this.s3Client, command, { expiresIn });
  }

  static async deleteFile(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    await this.s3Client.send(command);
  }
}
