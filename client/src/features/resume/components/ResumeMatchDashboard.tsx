import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { resumeApi } from '@/lib/api/resume';
import { Loader2, Zap, Target, AlertTriangle, Briefcase } from 'lucide-react';

export function ResumeMatchDashboard() {
  const { activeResume } = useResume();
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [matchResult, setMatchResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  if (!activeResume) return null;

  const handleMatch = async () => {
    if (!jobDescription.trim()) {
      setError('Please paste a Job Description first.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    try {
      const result = await resumeApi.matchWithJD(activeResume.id, jobDescription);
      setMatchResult(result.feedback);
    } catch (err: any) {
      setError(err.message || 'Failed to match against Job Description');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full mt-12 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          <Target className="text-indigo-500" /> Job Description Match
        </h2>
        <p className="text-slate-600 mt-2">Paste a job description below to see how well your resume matches and what skills you are missing.</p>
      </div>

      <div className="space-y-4">
        <textarea 
          className="w-full h-40 p-4 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-y"
          placeholder="Paste Job Description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
        <button 
          onClick={handleMatch}
          disabled={isLoading || !jobDescription.trim()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : <Zap />} 
          {isLoading ? 'Analyzing Match...' : 'Analyze Match'}
        </button>
      </div>

      {matchResult && (
        <div className="mt-12 space-y-8 animate-fade-in-up">
          <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Overall Match Score</h3>
              <p className="text-slate-500 text-sm mt-1">{matchResult.overallFeedback}</p>
            </div>
            <div className="text-5xl font-black text-indigo-600">{matchResult.matchScore}%</div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100">
              <h4 className="font-bold text-emerald-900 mb-4 flex items-center gap-2"><Briefcase size={18}/> Matching Skills</h4>
              <div className="flex flex-wrap gap-2">
                {matchResult.matchingSkills?.map((skill: string, i: number) => (
                  <span key={i} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-semibold">{skill}</span>
                ))}
              </div>
            </div>
            <div className="bg-red-50/50 p-6 rounded-2xl border border-red-100">
              <h4 className="font-bold text-red-900 mb-4 flex items-center gap-2"><AlertTriangle size={18}/> Missing Skills</h4>
              <div className="flex flex-wrap gap-2">
                {matchResult.missingSkills?.map((skill: string, i: number) => (
                  <span key={i} className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-semibold">{skill}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
            <h4 className="font-bold text-amber-900 mb-2">Experience Gaps</h4>
            <p className="text-amber-800/80">{matchResult.experienceGap}</p>
          </div>

          <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
            <h4 className="font-bold text-indigo-900 mb-4">ATS Optimization Suggestions</h4>
            <ul className="space-y-3">
              {matchResult.atsSuggestions?.map((sugg: string, i: number) => (
                <li key={i} className="flex gap-3 text-indigo-900/80">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-xs">{i+1}</span>
                  <span className="mt-0.5">{sugg}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
