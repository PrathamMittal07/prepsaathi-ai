import React from 'react';
import { AIHero } from '@/features/dashboard/components/AIHero';
import { ApplicationMetrics } from '@/features/dashboard/components/ApplicationMetrics';

export default function DashboardPage() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-10 pb-12">
      <AIHero />
      <div className="mt-8">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Application Pipeline</h2>
        <ApplicationMetrics />
      </div>
    </div>
  );
}
