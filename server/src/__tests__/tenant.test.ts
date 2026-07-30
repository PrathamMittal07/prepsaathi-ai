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

vi.mock('../services/tenant.service', () => {
  return {
    TenantService: {
      createTenant: vi.fn().mockResolvedValue({ id: 'tenant2', name: 'New Tenant' }),
      getTenant: vi.fn().mockResolvedValue({ id: 'tenant1', name: 'Existing Tenant' }),
      updateTenant: vi.fn().mockResolvedValue({ id: 'tenant1', name: 'Updated Tenant' }),
      listTenants: vi.fn().mockResolvedValue({ tenants: [{ id: 'tenant1' }], nextCursor: null })
    }
  };
});

describe('Tenant API', () => {
  const token = generateAccessToken({ userId: 'user1', tenantId: 'tenant1', roles: ['STUDENT'] });
  const adminToken = generateAccessToken({ userId: 'admin1', tenantId: 'tenant1', roles: ['ADMIN'] });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/v1/tenants', () => {
    it('should forbid STUDENT from listing tenants', async () => {
      const res = await request(app)
        .get('/api/v1/tenants')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.status).toBe(403);
    });

    it('should allow ADMIN to list tenants', async () => {
      const res = await request(app)
        .get('/api/v1/tenants')
        .set('Authorization', `Bearer ${adminToken}`);
      
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
    });
  });

  describe('POST /api/v1/tenants', () => {
    it('should forbid STUDENT from creating a tenant', async () => {
      const res = await request(app)
        .post('/api/v1/tenants')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'New', domain: 'new.edu' });
      
      expect(res.status).toBe(403);
    });

    it('should allow ADMIN to create a tenant', async () => {
      const res = await request(app)
        .post('/api/v1/tenants')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'New', domain: 'new.edu' });
      
      expect(res.status).toBe(201);
      expect(res.body.data.name).toBe('New Tenant');
    });
  });
});
