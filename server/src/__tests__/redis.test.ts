import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RedisClient } from '../core/redis/redis.client';
import Redis from 'ioredis';

// mock ioredis completely
vi.mock('ioredis', () => {
  return {
    default: class MockRedis {
      on = vi.fn();
      ping = vi.fn().mockResolvedValue('PONG');
      quit = vi.fn().mockResolvedValue('OK');
    }
  };
});

describe('Redis Client', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Private field reset via access
    (RedisClient as any).instance = null;
    (RedisClient as any).subscriberInstance = null;
  });

  it('should initialize a single instance', () => {
    const instance1 = RedisClient.getInstance();
    const instance2 = RedisClient.getInstance();
    
    expect(instance1).toBe(instance2);
  });

  it('should initialize a separate subscriber instance', () => {
    const pub = RedisClient.getInstance();
    const sub = RedisClient.getSubscriberInstance();
    
    expect(pub).not.toBe(sub);
  });

  it('should return true on health check if connected', async () => {
    RedisClient.getInstance(); // Ensure connected
    const isHealthy = await RedisClient.healthCheck();
    expect(isHealthy).toBe(true);
  });

  it('should return false on health check if not connected', async () => {
    const isHealthy = await RedisClient.healthCheck();
    expect(isHealthy).toBe(false);
  });
});
