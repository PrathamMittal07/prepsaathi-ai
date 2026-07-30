import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app';
import { generateAccessToken } from '../utils/jwt';
import { EventBus } from '../core/events/event.bus';

vi.mock('@prisma/client', () => {
  return {
    PrismaClient: class {
      constructor() {}
      roadmap = {
        create: vi.fn().mockResolvedValue({ id: 'roadmap1', title: 'SDE Prep' }),
        findUnique: vi.fn().mockResolvedValue({ id: 'roadmap1', userId: 'student1', tenantId: 'tenant1', title: 'SDE Prep' }),
        findMany: vi.fn().mockResolvedValue([{ id: 'roadmap1', title: 'SDE Prep' }]),
        update: vi.fn().mockResolvedValue({})
      };
      learningMission = {
        create: vi.fn().mockResolvedValue({ id: 'mission1', title: 'DSA' }),
        findMany: vi.fn().mockResolvedValue([{ id: 'mission1', progress: 100 }]),
        update: vi.fn().mockResolvedValue({})
      };
      missionMilestone = {
        findMany: vi.fn().mockResolvedValue([{ id: 'milestone1', isCompleted: true }]),
        update: vi.fn().mockResolvedValue({})
      };
      task = {
        findUnique: vi.fn().mockResolvedValue({
          id: 'task1',
          milestone: {
            id: 'milestone1',
            mission: {
              id: 'mission1',
              roadmap: { id: 'roadmap1', userId: 'student1', tenantId: 'tenant1' }
            }
          }
        }),
        update: vi.fn().mockResolvedValue({}),
        findMany: vi.fn().mockResolvedValue([{ id: 'task1', status: 'COMPLETED' }])
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

describe('Roadmap Domain API', () => {
  const token = generateAccessToken({ userId: 'student1', tenantId: 'tenant1', roles: ['STUDENT'] });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('POST /api/v1/roadmaps', () => {
    it('should create a roadmap and publish event', async () => {
      const res = await request(app)
        .post('/api/v1/roadmaps')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'SDE Prep' });
      
      expect(res.status).toBe(201);
      expect(EventBus.publish).toHaveBeenCalledWith('roadmap.created', expect.any(Object));
    });
  });

  describe('GET /api/v1/roadmaps/my-roadmaps', () => {
    it('should return user roadmaps', async () => {
      const res = await request(app)
        .get('/api/v1/roadmaps/my-roadmaps')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
    });
  });

  describe('PATCH /api/v1/roadmaps/tasks/:id/status', () => {
    it('should update task status, trigger rollup, and publish events', async () => {
      const res = await request(app)
        .patch('/api/v1/roadmaps/tasks/task1/status')
        .set('Authorization', `Bearer ${token}`)
        .send({ status: 'COMPLETED' });
      
      expect(res.status).toBe(200);
      
      // Should publish TASK_COMPLETED
      expect(EventBus.publish).toHaveBeenCalledWith('task.completed', expect.any(Object));
      
      // Because mocks simulate 100% completion at each level, all parent events should fire
      expect(EventBus.publish).toHaveBeenCalledWith('milestone.completed', expect.any(Object));
      expect(EventBus.publish).toHaveBeenCalledWith('mission.completed', expect.any(Object));
      expect(EventBus.publish).toHaveBeenCalledWith('roadmap.updated', expect.any(Object));
    });
  });
});
