'use client';

import React, { useEffect, useState } from 'react';
import { roadmapsApi } from '@/lib/api/roadmaps';
import { useResume } from '@/features/resume/context/ResumeContext';
import { useUserProfile } from '@/features/profile/context/UserProfileContext';
import { useCareerCoach } from '@/features/coach/context/CareerCoachContext';
import { Map, CheckCircle2, Circle, Activity, FileText, Target, Briefcase, FileUp, Zap, Clock } from 'lucide-react';

export default function ProgressTrackerPage() {
  const [roadmaps, setRoadmaps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const { activeResume } = useResume();
  const { careerProfile } = useUserProfile();
  const { coachData } = useCareerCoach();

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await roadmapsApi.listMyRoadmaps();
        setRoadmaps(data || []);
      } catch (err: any) {
        setError(err.message || 'Failed to load roadmaps');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleGenerateRoadmap = async () => {
    try {
      setIsGenerating(true);
      setError(null);
      const targetRole = careerProfile?.targetRole || (activeResume?.analysis?.length > 0 ? activeResume.analysis[0].targetRole : 'Software Engineer');
      await roadmapsApi.createRoadmap(targetRole || 'Software Engineer');
      const data = await roadmapsApi.listMyRoadmaps();
      setRoadmaps(data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to generate roadmap');
    } finally {
      setIsGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center bg-[#F9FAFB]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] -m-4 py-8 px-4 sm:px-8 font-sans">
      <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto' }} className="w-full">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Your Roadmaps</h1>
          <p className="text-slate-500 mt-2 text-lg">Track your learning progress and missions.</p>
        </div>

        {roadmaps.length === 0 ? (
          <div className="bg-white rounded-[2rem] p-8 md:p-16 border border-slate-100 shadow-sm flex flex-col items-center text-center max-w-[42rem] mx-auto mt-8 md:mt-12">
            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
              <Map className="w-10 h-10 text-indigo-500" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Generate Your AI Roadmap</h2>
            <p className="text-slate-500 mb-8 max-w-[28rem] mx-auto leading-relaxed">
              You haven't generated any learning roadmaps yet. Upload your resume or define your target career to get a personalized, step-by-step mission plan.
            </p>
            {activeResume || careerProfile ? (
              <button 
                onClick={handleGenerateRoadmap}
                disabled={isGenerating}
                className="inline-flex items-center justify-center bg-indigo-600 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200 disabled:opacity-50"
              >
                {isGenerating ? 'Generating Roadmap...' : 'Generate AI Roadmap'}
              </button>
            ) : (
              <a 
                href="/dashboard/resume"
                className="inline-flex items-center justify-center bg-indigo-600 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
              >
                Upload Resume to Generate Roadmap
              </a>
            )}
          </div>
        ) : (
          (() => {
            const activeRoadmap = roadmaps[0];
            const missions = activeRoadmap.missions || [];
            const totalMissions = missions.length;
            const completedMissions = missions.filter((m: any) => m.status === 'COMPLETED').length;
            const remainingMissions = totalMissions - completedMissions;
            
            return (
              <div className="space-y-6">
                {/* Hero / Overall Progress Section */}
                <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-md border border-indigo-100 uppercase tracking-wide">
                        Active Roadmap
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-1 truncate">
                      {activeRoadmap.title}
                    </h2>
                    <p className="text-slate-500 font-medium truncate">{activeRoadmap.targetRole}</p>
                  </div>
                  
                  <div className="w-full md:w-72 bg-slate-50 rounded-2xl p-5 border border-slate-100 shrink-0">
                    <div className="flex justify-between items-end mb-3">
                      <span className="text-sm font-bold text-slate-600">Overall Progress</span>
                      <span className="text-2xl font-black text-indigo-600">{Math.round(activeRoadmap.progress)}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000 ease-out" 
                        style={{ width: `${activeRoadmap.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Summary Metric Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col justify-center relative overflow-hidden">
                    <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">Completion</div>
                    <div className="text-2xl font-black text-slate-800">{Math.round(activeRoadmap.progress)}%</div>
                    <Target className="absolute -right-2 -bottom-2 text-slate-50 opacity-50 w-16 h-16 pointer-events-none" />
                  </div>
                  
                  <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col justify-center relative overflow-hidden">
                    <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">Completed</div>
                    <div className="text-2xl font-black text-emerald-600">{completedMissions}</div>
                    <CheckCircle2 className="absolute -right-2 -bottom-2 text-emerald-50 opacity-50 w-16 h-16 pointer-events-none" />
                  </div>
                  
                  <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col justify-center relative overflow-hidden">
                    <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">Pending</div>
                    <div className="text-2xl font-black text-indigo-600">{remainingMissions}</div>
                    <Clock className="absolute -right-2 -bottom-2 text-indigo-50 opacity-50 w-16 h-16 pointer-events-none" />
                  </div>

                  <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col justify-center relative overflow-hidden">
                    <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">Resume Score</div>
                    <div className="text-2xl font-black text-slate-800">
                      {activeResume?.atsScore ? `${activeResume.atsScore}/100` : <span className="text-lg text-slate-400 font-medium">N/A</span>}
                    </div>
                    <FileText className="absolute -right-2 -bottom-2 text-slate-50 opacity-50 w-16 h-16 pointer-events-none" />
                  </div>

                  <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col justify-center relative overflow-hidden">
                    <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">Applications</div>
                    <div className="text-2xl font-black text-slate-800">0</div>
                    <Briefcase className="absolute -right-2 -bottom-2 text-slate-50 opacity-50 w-16 h-16 pointer-events-none" />
                  </div>

                  <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col justify-center relative overflow-hidden">
                    <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">Interview Ready</div>
                    <div className="text-2xl font-black text-slate-800">
                      {coachData?.overallReadiness ? `${coachData.overallReadiness}%` : <span className="text-lg text-slate-400 font-medium">N/A</span>}
                    </div>
                    <Activity className="absolute -right-2 -bottom-2 text-slate-50 opacity-50 w-16 h-16 pointer-events-none" />
                  </div>
                </div>

                {/* The Journey / Milestones List */}
                <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-slate-100 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Map className="text-indigo-500" size={24} /> 
                    Your Journey
                  </h3>
                  
                  {missions.length > 0 ? (
                    <div className="space-y-6">
                      {missions.map((mission: any, index: number) => {
                        const isCompleted = mission.status === 'COMPLETED';
                        const isInProgress = mission.status === 'IN_PROGRESS';
                        
                        return (
                          <div key={mission.id} className="relative flex gap-4 md:gap-6">
                            {/* Vertical Line */}
                            {index !== missions.length - 1 && (
                              <div className="absolute left-[15px] top-10 bottom-[-24px] w-0.5 bg-slate-100" />
                            )}
                            
                            {/* Status Icon */}
                            <div className="relative z-10 bg-white pt-1">
                              {isCompleted ? (
                                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 border-2 border-white shadow-sm">
                                  <CheckCircle2 size={18} className="fill-emerald-100" />
                                </div>
                              ) : isInProgress ? (
                                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 border-2 border-indigo-200 shadow-sm">
                                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse" />
                                </div>
                              ) : (
                                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 border-2 border-white">
                                  <Circle size={18} />
                                </div>
                              )}
                            </div>
                            
                            {/* Mission Content */}
                            <div className={`flex-1 bg-slate-50/50 rounded-2xl p-5 border ${isInProgress ? 'border-indigo-100 shadow-sm' : 'border-slate-100'}`}>
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                                <h4 className={`text-lg font-bold ${isCompleted ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                                  {mission.title}
                                </h4>
                                <div>
                                  {isCompleted ? (
                                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider border border-emerald-100">Completed</span>
                                  ) : isInProgress ? (
                                    <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider border border-indigo-100">In Progress</span>
                                  ) : (
                                    <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Pending</span>
                                  )}
                                </div>
                              </div>
                              <p className="text-slate-500 text-sm leading-relaxed">
                                {mission.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-slate-500 italic">No missions generated yet.</p>
                    </div>
                  )}
                </div>

                {/* Recent Activity Timeline */}
                <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-slate-100 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Zap className="text-amber-500" size={24} /> 
                    Recent Activity
                  </h3>
                  
                  {(() => {
                    // Aggregate activity from available contexts
                    const activity = [];
                    
                    if (activeRoadmap?.createdAt) {
                      activity.push({ date: new Date(activeRoadmap.createdAt), event: "AI Roadmap Generated", icon: <Map size={16} />, color: "text-indigo-600 bg-indigo-100", border: "border-indigo-200" });
                    }
                    if (activeResume?.createdAt) {
                      activity.push({ date: new Date(activeResume.createdAt), event: "Resume Uploaded & Analyzed", icon: <FileUp size={16} />, color: "text-emerald-600 bg-emerald-100", border: "border-emerald-200" });
                    }
                    if (careerProfile?.updatedAt || careerProfile?.createdAt) {
                      const date = careerProfile.updatedAt || careerProfile.createdAt;
                      activity.push({ date: new Date(date), event: "Career Profile Updated", icon: <Target size={16} />, color: "text-pink-600 bg-pink-100", border: "border-pink-200" });
                    }
                    
                    // Sort descending
                    activity.sort((a, b) => b.date.getTime() - a.date.getTime());

                    if (activity.length === 0) {
                      return <p className="text-slate-500 italic text-center py-4">No recent activity detected.</p>;
                    }

                    return (
                      <div className="space-y-6">
                        {activity.map((item, index) => (
                          <div key={index} className="relative flex gap-4 md:gap-6">
                            {index !== activity.length - 1 && (
                              <div className="absolute left-[15px] top-10 bottom-[-24px] w-0.5 bg-slate-100" />
                            )}
                            
                            <div className="relative z-10 bg-white pt-1">
                              <div className={`w-8 h-8 rounded-full ${item.color} flex items-center justify-center shrink-0 border-2 ${item.border} shadow-sm`}>
                                {item.icon}
                              </div>
                            </div>
                            
                            <div className="flex-1 bg-slate-50/50 rounded-2xl p-4 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <h4 className="font-bold text-slate-800 text-sm">
                                {item.event}
                              </h4>
                              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                {item.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              </div>
            );
          })()
        )}
      </div>
    </div>
  );
}
