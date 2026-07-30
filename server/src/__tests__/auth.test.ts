import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';

// Mock PrismaClient globally for all tests
vi.mock('@prisma/client', () => {
  return {
    PrismaClient: class {
      constructor() {}
    }
  };
});

// Mock dependencies
vi.mock('../services/auth.service', () => {
  return {
    AuthService: {
      register: vi.fn().mockResolvedValue({
        user: { id: 'user1', email: 'test@demo.edu', roles: ['STUDENT'], tenantId: 'tenant1' },
        accessToken: 'mock-access',
        refreshToken: 'mock-refresh'
      }),
      login: vi.fn().mockResolvedValue({
        user: { id: 'user1', email: 'test@demo.edu', roles: ['STUDENT'], tenantId: 'tenant1' },
        accessToken: 'mock-access',
        refreshToken: 'mock-refresh'
      }),
      refresh: vi.fn().mockResolvedValue({
        user: { id: 'user1', email: 'test@demo.edu', roles: ['STUDENT'], tenantId: 'tenant1' },
        accessToken: 'mock-access-2',
        refreshToken: 'mock-refresh-2'
      }),
      logout: vi.fn().mockResolvedValue(undefined)
    }
  };
});

describe('Authentication API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('POST /api/v1/auth/register', () => {
    it('should return 400 on invalid body', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({ email: 'not-an-email' });
      
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('should register successfully and set refresh cookie', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          tenantId: '00000000-0000-0000-0000-000000000000',
          email: 'test@demo.edu',
          password: 'password123'
        });

      expect(res.status).toBe(201);
      expect(res.body.data.accessToken).toBe('mock-access');
      expect(res.headers['set-cookie']).toBeDefined();
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('should login and set refresh cookie', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'test@demo.edu', password: 'password123' });

      expect(res.status).toBe(200);
      expect(res.body.data.accessToken).toBe('mock-access');
      expect(res.headers['set-cookie'][0]).toContain('refreshToken=mock-refresh');
    });
  });

  describe('GET /api/v1/auth/me', () => {
    it('should return 401 without token', async () => {
      const res = await request(app).get('/api/v1/auth/me');
      expect(res.status).toBe(401);
    });

    it('should return 200 with valid token', async () => {
      const token = generateAccessToken({ userId: '1', tenantId: '1', roles: ['STUDENT'] });
      
      const res = await request(app)
        .get('/api/v1/auth/me')
        .set('Authorization', `Bearer ${token}`);
        
      expect(res.status).toBe(200);
      expect(res.body.data.user.roles).toContain('STUDENT');
    });
  });
});
