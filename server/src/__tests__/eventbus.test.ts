import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EventBus } from '../core/events/event.bus';
import { EventType } from '../core/events/event.types';
import { QueueRegistry } from '../core/queues/queue.registry';
import { QueueName } from '../core/queues/queue.types';

vi.mock('../core/queues/queue.registry', () => {
  return {
    QueueRegistry: {
      getQueue: vi.fn().mockImplementation((queueName) => {
        return {
          add: vi.fn().mockResolvedValue({ id: 'job123' })
        };
      })
    }
  };
});

describe('Event Bus', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should publish RESUME_UPLOADED to the ResumeQueue', async () => {
    const payload = {
      tenantId: 'tenant1',
      userId: 'user1',
      fileId: 'file1',
      storageKey: 'mock/key',
      timestamp: Date.now()
    };

    const jobId = await EventBus.publish(EventType.RESUME_UPLOADED, payload);
    
    expect(QueueRegistry.getQueue).toHaveBeenCalledWith(QueueName.RESUME);
    expect(jobId).toBe('job123');
  });

  it('should publish USER_CREATED to the WorkflowQueue', async () => {
    const payload = {
      tenantId: 'tenant1',
      email: 'test@demo.edu',
      timestamp: Date.now()
    };

    await EventBus.publish(EventType.USER_CREATED, payload);
    
    expect(QueueRegistry.getQueue).toHaveBeenCalledWith(QueueName.WORKFLOW);
  });
});
