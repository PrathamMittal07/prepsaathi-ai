import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app';
import { generateAccessToken } from '../utils/jwt';
import { EventBus } from '../core/events/event.bus';

// Mock FileService
vi.mock('../services/file.service', () => {
  return {
    FileService: {
      processUpload: vi.fn().mockResolvedValue({
        id: 'file123',
        originalName: 'MyResume.pdf',
        mimeType: 'application/pdf',
        size: 1024
      })
    }
  };
});

// Mock Prisma
vi.mock('@prisma/client', () => {
  return {
    PrismaClient: class {
      constructor() {}
      $transaction = vi.fn().mockImplementation(async (cb) => {
        return await cb(this);
      });
      resume = {
        count: vi.fn().mockResolvedValue(0),
        create: vi.fn().mockResolvedValue({
          id: 'resume1',
          name: 'MyResume',
          isPrimary: true,
          versions: [{ id: 'version1' }]
        }),
        findMany: vi.fn().mockResolvedValue([
          { id: 'resume1', name: 'MyResume', isPrimary: true }
        ]),
        findUnique: vi.fn().mockImplementation(({ where }) => {
          if (where.id === 'resume1') {
            return Promise.resolve({
              id: 'resume1',
              userId: 'user1',
              tenantId: 'tenant1',
              isPrimary: true,
              versions: [
                { id: 'version1', fileRecordId: 'file1', versionNumber: 1 }
              ]
            });
          }
          return Promise.resolve(null);
        }),
        update: vi.fn().mockResolvedValue({ id: 'resume1', name: 'UpdatedName' }),
        updateMany: vi.fn().mockResolvedValue({ count: 1 })
      };
      resumeVersion = {
        create: vi.fn().mockResolvedValue({ id: 'version2', versionNumber: 2 })
      };
    }
  };
});

describe('Resume Management API', () => {
  const token = generateAccessToken({ userId: 'user1', tenantId: 'tenant1', roles: ['STUDENT'] });

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(EventBus, 'publish').mockResolvedValue('jobId123');
  });

  describe('POST /api/v1/resumes', () => {
    it('should upload a resume and publish RESUME_UPLOADED event', async () => {
      const res = await request(app)
        .post('/api/v1/resumes')
        .set('Authorization', `Bearer ${token}`)
        .attach('file', Buffer.from('fake pdf content'), 'MyResume.pdf');
      
      expect(res.status).toBe(201);
      expect(res.body.data.id).toBe('resume1');
      expect(EventBus.publish).toHaveBeenCalledWith('resume.uploaded', expect.objectContaining({
        resumeId: 'resume1'
      }));
    });
  });

  describe('GET /api/v1/resumes', () => {
    it('should list all resumes', async () => {
      const res = await request(app)
        .get('/api/v1/resumes')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
    });
  });

  describe('PATCH /api/v1/resumes/:id', () => {
    it('should update metadata and publish event', async () => {
      const res = await request(app)
        .patch('/api/v1/resumes/resume1')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'UpdatedName' });
      
      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe('UpdatedName');
      expect(EventBus.publish).toHaveBeenCalledWith('resume.updated', expect.any(Object));
    });
  });

  describe('POST /api/v1/resumes/:id/set-primary', () => {
    it('should update primary status and publish event', async () => {
      const res = await request(app)
        .post('/api/v1/resumes/resume1/set-primary')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.status).toBe(200);
      expect(EventBus.publish).toHaveBeenCalledWith('resume.primary.changed', expect.any(Object));
    });
  });

  describe('POST /api/v1/resumes/:id/restore-version', () => {
    it('should restore previous version and publish event', async () => {
      const res = await request(app)
        .post('/api/v1/resumes/resume1/restore-version')
        .set('Authorization', `Bearer ${token}`)
        .send({ versionId: 'version1' });
      
      expect(res.status).toBe(200);
      expect(EventBus.publish).toHaveBeenCalledWith('resume.version.created', expect.any(Object));
    });
  });
});
