import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app';
import { generateAccessToken } from '../utils/jwt';
import { QueueRegistry } from '../core/queues/queue.registry';
import { ResumeWorker } from '../workers/resume.worker';

// Mock Prisma
vi.mock('@prisma/client', () => {
  return {
    PrismaClient: class {
      constructor() {}
      resume = {
        findUnique: vi.fn().mockImplementation(({ where }) => {
          if (where.id === 'resume1') {
            return Promise.resolve({
              id: 'resume1',
              userId: 'user1',
              tenantId: 'tenant1',
              status: 'UPLOADED',
              versions: [
                { id: 'version1', fileRecordId: 'file1' }
              ]
            });
          }
          return Promise.resolve(null);
        }),
        update: vi.fn().mockResolvedValue({})
      };
      resumeAnalysis = {
        upsert: vi.fn().mockResolvedValue({}),
        findUnique: vi.fn().mockResolvedValue({
          id: 'analysis1',
          resumeId: 'resume1',
          provider: 'mock-parser',
          processingTimeMs: 500,
          confidenceScore: 0.95,
          parsedData: { personalInfo: { name: 'John Doe' } }
        })
      };
    }
  };
});

// Mock QueueRegistry
vi.mock('../core/queues/queue.registry', () => {
  return {
    QueueRegistry: {
      getQueue: vi.fn().mockReturnValue({
        add: vi.fn().mockResolvedValue({ id: 'job123' })
      })
    }
  };
});

// Mock EventBus
vi.mock('../core/events/event.bus', () => {
  return {
    EventBus: {
      publish: vi.fn().mockResolvedValue('jobId')
    }
  };
});

describe('Resume Analysis Pipeline', () => {
  const token = generateAccessToken({ userId: 'user1', tenantId: 'tenant1', roles: ['STUDENT'] });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('POST /api/v1/resumes/:id/process', () => {
    it('should queue resume for processing and update status to PENDING_PROCESSING', async () => {
      const res = await request(app)
        .post('/api/v1/resumes/resume1/process')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.status).toBe(202);
      expect(res.body.data.status).toBe('PENDING_PROCESSING');
      
      const queue = QueueRegistry.getQueue('resume');
      expect(queue.add).toHaveBeenCalledWith('parse_resume', expect.objectContaining({
        resumeId: 'resume1',
        versionId: 'version1',
        fileId: 'file1'
      }));
    });
  });

  describe('GET /api/v1/resumes/:id/analysis', () => {
    it('should return analysis results', async () => {
      const res = await request(app)
        .get('/api/v1/resumes/resume1/analysis')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.status).toBe(200);
      expect(res.body.data.provider).toBe('mock-parser');
      expect(res.body.data.parsedData.personalInfo.name).toBe('John Doe');
    });
  });

  describe('Worker Execution (Direct Call)', () => {
    it('should execute processJob correctly via mock parser', async () => {
      const worker = new ResumeWorker();
      const fakeJob = {
        data: {
          resumeId: 'resume1',
          versionId: 'version1',
          fileId: 'file1',
          userId: 'user1',
          tenantId: 'tenant1'
        }
      } as any;
      
      // Access protected method for testing
      const result = await (worker as any).processJob(fakeJob);
      expect(result.status).toBe('PROCESSED');
      expect(result.resumeId).toBe('resume1');
    });
  });
});
