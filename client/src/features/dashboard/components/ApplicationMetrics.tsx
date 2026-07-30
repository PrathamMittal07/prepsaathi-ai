'use client';

import React, { useEffect, useState } from 'react';
import { applicationsApi } from '@/lib/api/applications';
import { Bookmark, Send, Calendar, CheckCircle2 } from 'lucide-react';

export function ApplicationMetrics() {
  const [metrics, setMetrics] = useState({
    saved: 0,
    applied: 0,
    interviews: 0,
    offers: 0
  });

  useEffect(() => {
    async function load() {
      try {
        const apps = await applicationsApi.listApplications();
        let saved = 0, applied = 0, interviews = 0, offers = 0;
        
        apps.forEach((app: any) => {
          if (app.status === 'SAVED') saved++;
          if (app.status === 'APPLIED') applied++;
          if (app.status === 'INTERVIEW') interviews++;
          if (app.status === 'OFFER') offers++;
        });

        setMetrics({ saved, applied, interviews, offers });
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center shrink-0">
            <Bookmark size={20} />
          </div>
          <span className="text-sm font-bold tracking-wider text-slate-500">Saved Jobs</span>
        </div>
        <div>
          <div className="text-3xl font-black text-slate-900">{metrics.saved}</div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Send size={20} />
          </div>
          <span className="text-sm font-bold tracking-wider text-slate-500">Applications</span>
        </div>
        <div>
          <div className="text-3xl font-black text-slate-900">{metrics.applied}</div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Calendar size={20} />
          </div>
          <span className="text-sm font-bold tracking-wider text-slate-500">Interviews</span>
        </div>
        <div>
          <div className="text-3xl font-black text-slate-900">{metrics.interviews}</div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 size={20} />
          </div>
          <span className="text-sm font-bold tracking-wider text-slate-500">Offers</span>
        </div>
        <div>
          <div className="text-3xl font-black text-slate-900">{metrics.offers}</div>
        </div>
      </div>
    </div>
  );
}
