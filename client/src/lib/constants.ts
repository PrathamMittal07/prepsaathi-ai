// Inline types to avoid path alias issues during initial setup
export interface NavItem {
  label: string
  href: string
}

export interface FeatureCard {
  id: string
  icon: string
  title: string
  description: string
  tag?: string
  gradient: string
  iconBg: string
}

export interface StatItem {
  value: string
  label: string
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'About', href: '#about' },
]

export const FEATURES: FeatureCard[] = [
  {
    id: 'interview-assistant',
    icon: '🤖',
    title: 'AI Interview Assistant',
    description:
      'Practice with an AI that mimics real interviewers. Get instant feedback on your answers, tone, and technical accuracy.',
    tag: 'Popular',
    gradient: 'from-indigo-500/20 to-purple-500/10',
    iconBg: 'bg-indigo-500/15 border-indigo-500/30',
  },
  {
    id: 'resume-analyzer',
    icon: '📄',
    title: 'Resume Analyzer',
    description:
      'Upload your resume and get AI-powered feedback on structure, keywords, ATS compatibility, and actionable improvements.',
    gradient: 'from-violet-500/20 to-fuchsia-500/10',
    iconBg: 'bg-violet-500/15 border-violet-500/30',
  },
  {
    id: 'dsa-roadmaps',
    icon: '🗺️',
    title: 'Personalized DSA Roadmaps',
    description:
      'AI-curated learning paths based on your target companies and current skill level. Master DSA systematically.',
    tag: 'New',
    gradient: 'from-cyan-500/20 to-blue-500/10',
    iconBg: 'bg-cyan-500/15 border-cyan-500/30',
  },
  {
    id: 'mock-interviews',
    icon: '🎯',
    title: 'Mock Interviews',
    description:
      'Full simulated interview rounds — HR, technical, and system design — with AI scoring and detailed breakdowns.',
    gradient: 'from-purple-500/20 to-pink-500/10',
    iconBg: 'bg-purple-500/15 border-purple-500/30',
  },
  {
    id: 'quiz-generator',
    icon: '⚡',
    title: 'AI Quiz Generator',
    description:
      'Auto-generated quizzes on any topic — OS, DBMS, CN, aptitude, or company-specific patterns. Never run out of practice.',
    gradient: 'from-amber-500/20 to-orange-500/10',
    iconBg: 'bg-amber-500/15 border-amber-500/30',
  },
  {
    id: 'progress-tracking',
    icon: '📊',
    title: 'Progress Tracking',
    description:
      'Visual dashboards showing your improvement over time, weak areas, and readiness score for your target company.',
    gradient: 'from-emerald-500/20 to-teal-500/10',
    iconBg: 'bg-emerald-500/15 border-emerald-500/30',
  },
]

export const STATS: StatItem[] = [
  { value: '10K+', label: 'Students Preparing' },
  { value: '500+', label: 'Interview Questions' },
  { value: '95%', label: 'Satisfaction Rate' },
  { value: '200+', label: 'Companies Covered' },
]

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Set Your Goals',
    description: 'Tell PrepSaathi your target companies, timeline, and current skill level.',
  },
  {
    step: '02',
    title: 'Get Your Roadmap',
    description: 'AI builds a personalized preparation plan with daily tasks and milestones.',
  },
  {
    step: '03',
    title: 'Practice Daily',
    description:
      'Solve DSA, take quizzes, give mock interviews, and improve your resume — all in one place.',
  },
  {
    step: '04',
    title: 'Land the Offer',
    description:
      'Walk into interviews with confidence backed by structured AI-powered preparation.',
  },
]
