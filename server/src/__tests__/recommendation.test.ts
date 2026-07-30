import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app';
import { generateAccessToken } from '../utils/jwt';
import { MatchingEngine } from '../services/recommendations/matching.engine';

vi.mock('@prisma/client', () => {
  return {
    PrismaClient: class {
      constructor() {}
      jobRecommendation = {
        findMany: vi.fn().mockResolvedValue([
          { 
            id: 'rec1', 
            userId: 'student1', 
            overallScore: 90, 
            opportunity: { id: 'opp1', title: 'SDE 1', company: { id: 'comp1', name: 'Google' } }
          }
        ]),
        findUnique: vi.fn().mockResolvedValue({
          id: 'rec1',
          userId: 'student1',
          overallScore: 90,
          rationale: 'Great match!',
          scoreBreakdown: {},
          strengths: ['React'],
          missingSkills: ['Node'],
          eligibilityIssues: []
        })
      };
      skillGap = {
        findUnique: vi.fn().mockResolvedValue({
          userId: 'student1',
          missingSkills: ['Node.js', 'AWS']
        })
      };
    }
  };
});

describe('Recommendation Domain API', () => {
  const token = generateAccessToken({ userId: 'student1', tenantId: 'tenant1', roles: ['STUDENT'] });

  describe('Matching Engine Logic', () => {
    it('should correctly calculate 100% skill match', () => {
      const profile = { skills: [{ name: 'React' }, { name: 'Node.js' }] } as any;
      const opportunity = { skillsRequired: ['react', 'node.js'], type: 'INTERNSHIP', eligibilityRules: {} } as any;
      
      const result = MatchingEngine.calculateMatch(profile, null, opportunity);
      
      expect(result.scoreBreakdown.skillMatch).toBe(100);
      expect(result.overallScore).toBe(100);
      expect(result.missingSkills.length).toBe(0);
    });

    it('should correctly penalize missing skills', () => {
      const profile = { skills: [{ name: 'React' }] } as any;
      const opportunity = { skillsRequired: ['react', 'node.js'], type: 'INTERNSHIP', eligibilityRules: {} } as any;
      
      const result = MatchingEngine.calculateMatch(profile, null, opportunity);
      
      expect(result.scoreBreakdown.skillMatch).toBe(50); // 1 out of 2
      expect(result.overallScore).toBe(80);
      expect(result.missingSkills).toContain('node.js');
    });
  });

  describe('GET /api/v1/recommendations/jobs', () => {
    it('should return job recommendations', async () => {
      const res = await request(app)
        .get('/api/v1/recommendations/jobs')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].overallScore).toBe(90);
    });
  });

  describe('GET /api/v1/recommendations/skill-gaps', () => {
    it('should return skill gaps', async () => {
      const res = await request(app)
        .get('/api/v1/recommendations/skill-gaps')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.status).toBe(200);
      expect(res.body.data.missingSkills).toContain('Node.js');
    });
  });

  describe('GET /api/v1/recommendations/:id/explanation', () => {
    it('should return explainability data', async () => {
      const res = await request(app)
        .get('/api/v1/recommendations/rec1/explanation')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.status).toBe(200);
      expect(res.body.data.rationale).toBe('Great match!');
    });
  });
});
