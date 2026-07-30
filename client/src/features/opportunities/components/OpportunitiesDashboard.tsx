'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { opportunitiesApi } from '@/lib/api/opportunities';
import { applicationsApi, ApplicationStatus } from '@/lib/api/applications';
import { Briefcase, MapPin, Calendar, ExternalLink, BookmarkPlus, BookmarkCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/features/auth/context/AuthContext';
import { useUserProfile } from '@/features/profile/context/UserProfileContext';

export function OpportunitiesDashboard() {
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();
  const { careerProfile } = useUserProfile();

  const load = async () => {
    try {
      setLoading(true);
      const [oppsData, appsData] = await Promise.all([
        opportunitiesApi.listOpportunities(),
        applicationsApi.listApplications()
      ]);
      setOpportunities(oppsData || []);
      setApplications(appsData || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load opportunities');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSave = async (oppId: string) => {
    try {
      await applicationsApi.createApplication(oppId, 'SAVED');
      load();
    } catch (e) {
      console.error('Failed to save', e);
    }
  };

  const handleApply = async (oppId: string, e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await applicationsApi.createApplication(oppId, 'APPLIED');
      load();
      // Ideally redirect to external link here if provided by opp, but we'll just track it internally
    } catch (err) {
      console.error('Failed to apply', err);
    }
  };

  // Simple Rule-based Recommendations
  const sortedOpportunities = useMemo(() => {
    if (!opportunities || !careerProfile) return opportunities;

    const userSkills = (careerProfile.skills as any[])?.map(s => s.name.toLowerCase()) || [];
    
    return [...opportunities].sort((a, b) => {
      // Calculate match score
      const aSkills = (a.skillsRequired || []).map((s: string) => s.toLowerCase());
      const bSkills = (b.skillsRequired || []).map((s: string) => s.toLowerCase());

      const aMatchCount = aSkills.filter((s: string) => userSkills.includes(s)).length;
      const bMatchCount = bSkills.filter((s: string) => userSkills.includes(s)).length;

      // Sort by match count descending
      return bMatchCount - aMatchCount;
    });
  }, [opportunities, careerProfile]);

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

  return (
    <div className="pb-16">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Discover Opportunities</h2>
          <p className="text-slate-500 mt-1">Jobs recommended based on your skills and preferences.</p>
        </div>
      </div>

      {sortedOpportunities.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-slate-100 shadow-sm text-center">
          <Briefcase className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">No opportunities found</h2>
          <p className="text-slate-500">Check back later for new roles matching your profile.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedOpportunities.map((opp) => {
            const app = applications.find(a => a.opportunityId === opp.id);
            const isSaved = app?.status === 'SAVED';
            const hasApplied = app && app.status !== 'SAVED' && app.status !== 'ARCHIVED';

            return (
              <div key={opp.id} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group flex flex-col h-full">
                
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                    <Briefcase size={20} className="text-slate-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 line-clamp-1">{opp.title}</h3>
                    <div className="text-sm font-medium text-indigo-600">{opp.company?.name || 'Unknown Company'} • {opp.type}</div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mb-6 flex-grow">
                  <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                    <MapPin size={16} /> {opp.location || 'Remote'}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                    <Calendar size={16} /> Posted: {new Date(opp.createdAt).toLocaleDateString()}
                  </div>
                  {opp.skillsRequired && opp.skillsRequired.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {opp.skillsRequired.slice(0, 3).map((s: string) => (
                        <span key={s} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded-md">{s}</span>
                      ))}
                      {opp.skillsRequired.length > 3 && <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded-md">+{opp.skillsRequired.length - 3}</span>}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-auto">
                  {hasApplied ? (
                    <button disabled className="w-full px-4 py-2.5 bg-emerald-100 text-emerald-700 font-bold text-sm rounded-xl cursor-not-allowed flex items-center justify-center gap-2">
                      <CheckCircle2 size={16} /> Applied
                    </button>
                  ) : (
                    <>
                      <button 
                        onClick={() => handleSave(opp.id)}
                        disabled={isSaved}
                        className={`flex-1 px-4 py-2.5 font-bold text-sm rounded-xl flex items-center justify-center transition-colors ${isSaved ? 'bg-indigo-50 text-indigo-600 cursor-not-allowed' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                      >
                        {isSaved ? <BookmarkCheck size={18} /> : <BookmarkPlus size={18} />}
                      </button>
                      <button 
                        onClick={(e) => handleApply(opp.id, e)}
                        className="flex-[2] px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors"
                      >
                        Apply Now <ExternalLink size={16} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
