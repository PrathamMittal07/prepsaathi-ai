'use client';

import React, { useEffect, useState } from 'react';
import { applicationsApi, ApplicationStatus } from '@/lib/api/applications';
import { Briefcase, Building2, Calendar, Edit3, CheckCircle2, Archive, XCircle, Clock, Trash2, MapPin } from 'lucide-react';

const statusConfig: Record<string, { label: string, color: string, icon: React.ReactNode }> = {
  SAVED: { label: 'Saved', color: 'bg-slate-100 text-slate-700', icon: <BookmarkIcon /> },
  APPLIED: { label: 'Applied', color: 'bg-indigo-100 text-indigo-700', icon: <Clock size={16} /> },
  INTERVIEW: { label: 'Interviewing', color: 'bg-amber-100 text-amber-700', icon: <Calendar size={16} /> },
  ASSESSMENT: { label: 'Assessment', color: 'bg-blue-100 text-blue-700', icon: <Edit3 size={16} /> },
  OFFER: { label: 'Offer Received', color: 'bg-emerald-100 text-emerald-700', icon: <CheckCircle2 size={16} /> },
  REJECTED: { label: 'Rejected', color: 'bg-red-100 text-red-700', icon: <XCircle size={16} /> },
  ARCHIVED: { label: 'Archived', color: 'bg-gray-100 text-gray-700', icon: <Archive size={16} /> },
};

function BookmarkIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>;
}

export function ApplicationTracker() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      const data = await applicationsApi.listApplications();
      setApplications(data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleStatusChange = async (id: string, newStatus: ApplicationStatus) => {
    try {
      await applicationsApi.updateApplication(id, newStatus);
      load();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this application record?')) return;
    try {
      await applicationsApi.deleteApplication(id);
      load();
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200">
        {error}
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 border border-slate-100 shadow-sm text-center">
        <Briefcase className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-slate-900 mb-2">No applications yet</h2>
        <p className="text-slate-500">When you save or apply to jobs, they will appear here for you to track.</p>
      </div>
    );
  }

  return (
    <div className="pb-16 space-y-4">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Application Tracker</h2>
        <p className="text-slate-500 mt-1">Manage and track the status of all your job applications.</p>
      </div>

      <div className="grid gap-4">
        {applications.map((app) => {
          const config = statusConfig[app.status] || statusConfig.SAVED;
          
          return (
            <div key={app.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center gap-6">
              
              {/* Info section */}
              <div className="flex-1 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                  <Building2 size={24} className="text-slate-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{app.opportunity.title}</h3>
                  <div className="text-sm font-medium text-slate-600 flex items-center gap-3 mt-1">
                    <span className="text-indigo-600 font-bold">{app.opportunity.company?.name}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><MapPin size={14}/> {app.opportunity.location || 'Remote'}</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-2">
                    Last updated: {new Date(app.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Status & Actions */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
                <div className={`px-4 py-2 rounded-xl flex items-center gap-2 font-bold text-sm ${config.color}`}>
                  {config.icon} {config.label}
                </div>

                <div className="flex items-center gap-2">
                  <select 
                    value={app.status}
                    onChange={(e) => handleStatusChange(app.id, e.target.value as ApplicationStatus)}
                    className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 outline-none font-medium cursor-pointer"
                  >
                    <option value="SAVED">Saved</option>
                    <option value="APPLIED">Applied</option>
                    <option value="INTERVIEW">Interviewing</option>
                    <option value="ASSESSMENT">Assessment</option>
                    <option value="OFFER">Offer</option>
                    <option value="REJECTED">Rejected</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>

                  <button onClick={() => handleDelete(app.id)} className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
