import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app';
import { generateAccessToken } from '../utils/jwt';
import { EventBus } from '../core/events/event.bus';

vi.mock('@prisma/client', () => {
  return {
    PrismaClient: class {
      constructor() {}
      $transaction = vi.fn().mockImplementation(async (cb) => {
        return await cb(this);
      });
      company = {
        create: vi.fn().mockResolvedValue({ id: 'company1', name: 'Google', tenantId: 'tenant1' }),
        findUnique: vi.fn().mockResolvedValue({ id: '123e4567-e89b-12d3-a456-426614174000', tenantId: 'tenant1' })
      };
      opportunity = {
        create: vi.fn().mockResolvedValue({ id: 'opp1', title: 'SDE 1' }),
        findMany: vi.fn().mockResolvedValue([{ id: 'opp1', title: 'SDE 1' }, { id: 'opp2', title: 'SDE 2' }]),
        findUnique: vi.fn().mockResolvedValue({ id: 'opp1', status: 'OPEN', company: { tenantId: 'tenant1' } })
      };
      application = {
        create: vi.fn().mockResolvedValue({ id: 'app1', status: 'PENDING' }),
        findUnique: vi.fn().mockResolvedValue({ id: 'app1', userId: 'student1', opportunity: { company: { tenantId: 'tenant1' } } }),
        update: vi.fn().mockResolvedValue({})
      };
      applicationTimeline = {
        create: vi.fn().mockResolvedValue({})
      };
    }
  };
});

vi.mock('../core/events/event.bus', () => {
  return {
    EventBus: {
      publish: vi.fn().mockResolvedValue('jobId')
    }
  };
});

describe('Company & Opportunity Domain API', () => {
  const recruiterToken = generateAccessToken({ userId: 'rec1', tenantId: 'tenant1', roles: ['RECRUITER'] });
  const studentToken = generateAccessToken({ userId: 'student1', tenantId: 'tenant1', roles: ['STUDENT'] });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('POST /api/v1/opportunities/companies', () => {
    it('should allow RECRUITER to create a company', async () => {
      const res = await request(app)
        .post('/api/v1/opportunities/companies')
        .set('Authorization', `Bearer ${recruiterToken}`)
        .send({ name: 'Google' });
      
      expect(res.status).toBe(201);
      expect(res.body.data.name).toBe('Google');
      expect(EventBus.publish).toHaveBeenCalledWith('company.created', expect.any(Object));
    });

    it('should block STUDENT from creating a company', async () => {
      const res = await request(app)
        .post('/api/v1/opportunities/companies')
        .set('Authorization', `Bearer ${studentToken}`)
        .send({ name: 'Google' });
      
      expect(res.status).toBe(403);
    });
  });

  describe('POST /api/v1/opportunities', () => {
    it('should create an opportunity and publish event', async () => {
      const res = await request(app)
        .post('/api/v1/opportunities')
        .set('Authorization', `Bearer ${recruiterToken}`)
        .send({
          companyId: '123e4567-e89b-12d3-a456-426614174000',
          title: 'SDE 1',
          description: 'This is a great role with lots of opportunities.',
          type: 'FULL_TIME'
        });
      
      if (res.status !== 201) console.log(res.body);
      expect(res.status).toBe(201);
      expect(EventBus.publish).toHaveBeenCalledWith('opportunity.created', expect.any(Object));
    });
  });

  describe('GET /api/v1/opportunities', () => {
    it('should return paginated opportunities', async () => {
      const res = await request(app)
        .get('/api/v1/opportunities?limit=1')
        .set('Authorization', `Bearer ${studentToken}`);
      
      expect(res.status).toBe(200);
      expect(res.body.data).toBeDefined();
      expect(res.body.nextCursor).toBe('opp2');
    });
  });

  describe('POST /api/v1/opportunities/:id/apply', () => {
    it('should allow STUDENT to apply and log timeline', async () => {
      const res = await request(app)
        .post('/api/v1/opportunities/opp1/apply')
        .set('Authorization', `Bearer ${studentToken}`)
        .send({});
      
      expect(res.status).toBe(201);
      expect(EventBus.publish).toHaveBeenCalledWith('application.created', expect.any(Object));
    });

    it('should block RECRUITER from applying', async () => {
      const res = await request(app)
        .post('/api/v1/opportunities/opp1/apply')
        .set('Authorization', `Bearer ${recruiterToken}`)
        .send({});
      
      expect(res.status).toBe(403);
    });
  });

  describe('PATCH /api/v1/opportunities/applications/:id/status', () => {
    it('should allow RECRUITER to update status', async () => {
      const res = await request(app)
        .patch('/api/v1/opportunities/applications/app1/status')
        .set('Authorization', `Bearer ${recruiterToken}`)
        .send({ status: 'INTERVIEWING', notes: 'Looks good' });
      
      expect(res.status).toBe(200);
      expect(EventBus.publish).toHaveBeenCalledWith('application.updated', expect.objectContaining({ status: 'INTERVIEWING' }));
    });
  });
});
