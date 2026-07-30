import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app';
import { generateAccessToken } from '../utils/jwt';

// Mock dependencies
vi.mock('@prisma/client', () => {
  return {
    PrismaClient: class {
      constructor() {}
      fileRecord = {
        create: vi.fn().mockResolvedValue({ id: 'file1', originalName: 'test.txt' }),
        findUnique: vi.fn().mockImplementation(({ where }) => {
          if (where.id === 'file1') return Promise.resolve({ id: 'file1', tenantId: 'tenant1', storageKey: 'mock/key' });
          if (where.id === 'file2') return Promise.resolve({ id: 'file2', tenantId: 'tenant2', storageKey: 'mock/key2' });
          return Promise.resolve(null);
        }),
        update: vi.fn().mockResolvedValue({})
      }
    }
  };
});

vi.mock('../services/storage.service', () => {
  return {
    StorageService: {
      uploadFile: vi.fn().mockResolvedValue('mock-storage-key'),
      getSignedDownloadUrl: vi.fn().mockResolvedValue('https://mock-signed-url.com'),
      deleteFile: vi.fn().mockResolvedValue(undefined)
    }
  };
});

describe('File API', () => {
  const token = generateAccessToken({ userId: 'user1', tenantId: 'tenant1', roles: ['STUDENT'] });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('POST /api/v1/files/upload', () => {
    it('should reject unauthenticated requests', async () => {
      const res = await request(app).post('/api/v1/files/upload');
      expect(res.status).toBe(401);
    });

    it('should reject missing file payload', async () => {
      const res = await request(app)
        .post('/api/v1/files/upload')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.status).toBe(400);
    });

    it('should accept valid file uploads', async () => {
      // Supertest supports .attach() for file uploads
      const res = await request(app)
        .post('/api/v1/files/upload')
        .set('Authorization', `Bearer ${token}`)
        .field('folder', 'resumes')
        .attach('file', Buffer.from('hello world'), {
          filename: 'test.txt',
          contentType: 'text/plain'
        });

      expect(res.status).toBe(201);
      expect(res.body.data.id).toBe('file1');
    });

    it('should reject invalid MIME types', async () => {
      const res = await request(app)
        .post('/api/v1/files/upload')
        .set('Authorization', `Bearer ${token}`)
        .attach('file', Buffer.from('mock exec'), {
          filename: 'virus.exe',
          contentType: 'application/x-msdownload'
        });

      expect(res.status).toBe(400);
      expect(res.body.error.message).toContain('Invalid file type');
    });
  });

  describe('GET /api/v1/files/:id', () => {
    it('should return signed URL for authorized tenant', async () => {
      const res = await request(app)
        .get('/api/v1/files/file1')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.status).toBe(200);
      expect(res.body.data.url).toBe('https://mock-signed-url.com');
    });

    it('should reject if requested across tenants', async () => {
      const res = await request(app)
        .get('/api/v1/files/file2') // file2 belongs to tenant2
        .set('Authorization', `Bearer ${token}`); // token is for tenant1
      
      expect(res.status).toBe(403);
    });
  });

  describe('DELETE /api/v1/files/:id', () => {
    it('should soft delete and return 200', async () => {
      const res = await request(app)
        .delete('/api/v1/files/file1')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.status).toBe(200);
    });
  });
});
