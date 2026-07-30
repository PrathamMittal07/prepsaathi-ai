import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app';
import { generateAccessToken } from '../utils/jwt';

// Mock PrismaClient globally for all tests
vi.mock('@prisma/client', () => {
  return {
    PrismaClient: class {
      constructor() {}
    }
  };
});

vi.mock('../services/user.service', () => {
  return {
    UserService: {
      getCurrentUser: vi.fn().mockResolvedValue({ id: 'user1', profile: { displayName: 'John' } }),
      updateProfile: vi.fn().mockResolvedValue({ displayName: 'John Doe' }),
      searchUsers: vi.fn().mockResolvedValue({ users: [{ id: 'user2' }], nextCursor: null })
    }
  };
});

describe('User API', () => {
  const token = generateAccessToken({ userId: 'user1', tenantId: 'tenant1', roles: ['STUDENT'] });
  const adminToken = generateAccessToken({ userId: 'admin1', tenantId: 'tenant1', roles: ['ADMIN'] });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/v1/users/me', () => {
    it('should return the current user', async () => {
      const res = await request(app)
        .get('/api/v1/users/me')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.status).toBe(200);
      expect(res.body.data.profile.displayName).toBe('John');
    });
  });

  describe('PATCH /api/v1/users/me', () => {
    it('should update and return the current user', async () => {
      const res = await request(app)
        .patch('/api/v1/users/me')
        .set('Authorization', `Bearer ${token}`)
        .send({ profile: { displayName: 'John Doe' } });
      
      expect(res.status).toBe(200);
      expect(res.body.data.profile.displayName).toBe('John');
    });
  });

  describe('GET /api/v1/users', () => {
    it('should forbid STUDENT from listing users', async () => {
      const res = await request(app)
        .get('/api/v1/users')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.status).toBe(403);
    });

    it('should allow ADMIN to list users', async () => {
      const res = await request(app)
        .get('/api/v1/users')
        .set('Authorization', `Bearer ${adminToken}`);
      
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
    });
  });
});
