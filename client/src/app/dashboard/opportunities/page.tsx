'use client';

import React, { useState } from 'react';
import { OpportunitiesDashboard } from '@/features/opportunities/components/OpportunitiesDashboard';
import { ApplicationTracker } from '@/features/opportunities/components/ApplicationTracker';

export default function OpportunitiesPage() {
  const [activeTab, setActiveTab] = useState<'DISCOVER' | 'TRACKER'>('DISCOVER');

  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-10 py-12 animate-fade-in-up">
      <div className="mb-10">
        <h1 className="text-3xl font-bold font-syne text-gray-900 tracking-tight">Opportunities & Applications</h1>
        <p className="mt-2 text-base text-gray-500">Find your dream role and track your application pipeline.</p>
      </div>

      <div className="flex border-b border-slate-200 mb-8">
        <button
          onClick={() => setActiveTab('DISCOVER')}
          className={`py-4 px-8 font-bold text-sm border-b-2 transition-colors ${activeTab === 'DISCOVER' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'}`}
        >
          Discover Jobs
        </button>
        <button
          onClick={() => setActiveTab('TRACKER')}
          className={`py-4 px-8 font-bold text-sm border-b-2 transition-colors ${activeTab === 'TRACKER' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'}`}
        >
          My Applications
        </button>
      </div>

      {activeTab === 'DISCOVER' ? <OpportunitiesDashboard /> : <ApplicationTracker />}
    </div>
  );
}
