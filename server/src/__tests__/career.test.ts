import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app';
import { generateAccessToken } from '../utils/jwt';

// Mock Prisma
vi.mock('@prisma/client', () => {
  return {
    PrismaClient: class {
      constructor() {}
      careerProfile = {
        findUnique: vi.fn().mockResolvedValue({ id: 'profile1', userId: 'user1' }),
        create: vi.fn(),
        update: vi.fn().mockResolvedValue({ id: 'profile1', headline: 'New Headline' })
      };
      education = {
        create: vi.fn().mockResolvedValue({ id: 'edu1', institution: 'MIT' }),
        findUnique: vi.fn().mockImplementation(({ where }) => {
          if (where.id === 'edu1') return Promise.resolve({ id: 'edu1', careerProfileId: 'profile1' });
          if (where.id === 'edu2') return Promise.resolve({ id: 'edu2', careerProfileId: 'profile2' });
          return Promise.resolve(null);
        }),
        delete: vi.fn()
      };
      skill = {
        upsert: vi.fn().mockResolvedValue({ id: 'skill1', name: 'react' })
      };
      userSkill = {
        upsert: vi.fn().mockResolvedValue({ skillId: 'skill1', level: 'EXPERT' })
      }
    }
  };
});

describe('Career Profile API', () => {
  const token = generateAccessToken({ userId: 'user1', tenantId: 'tenant1', roles: ['STUDENT'] });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/v1/career/profile', () => {
    it('should return the career profile', async () => {
      const res = await request(app)
        .get('/api/v1/career/profile')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe('profile1');
    });
  });

  describe('POST /api/v1/career/education', () => {
    it('should add education successfully', async () => {
      const res = await request(app)
        .post('/api/v1/career/education')
        .set('Authorization', `Bearer ${token}`)
        .send({
          institution: 'MIT',
          degree: 'BSc Computer Science',
          startDate: new Date().toISOString(),
          currentStatus: true
        });

      expect(res.status).toBe(201);
      expect(res.body.data.institution).toBe('MIT');
    });

    it('should reject if endDate is missing and currentStatus is false', async () => {
      const res = await request(app)
        .post('/api/v1/career/education')
        .set('Authorization', `Bearer ${token}`)
        .send({
          institution: 'MIT',
          degree: 'BSc Computer Science',
          startDate: new Date().toISOString(),
          currentStatus: false // Missing endDate!
        });

      expect(res.status).toBe(400);
    });
  });

  describe('DELETE /api/v1/career/education/:id', () => {
    it('should prevent deleting education not owned by user', async () => {
      const res = await request(app)
        .delete('/api/v1/career/education/edu2') // belongs to profile2
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(404);
    });
  });

  describe('POST /api/v1/career/skills', () => {
    it('should add skill successfully', async () => {
      const res = await request(app)
        .post('/api/v1/career/skills')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'React',
          level: 'EXPERT',
          isPrimary: true
        });

      expect(res.status).toBe(201);
      expect(res.body.data.level).toBe('EXPERT');
    });
  });
});
