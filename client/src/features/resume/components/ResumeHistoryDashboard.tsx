import React from 'react';
import { useResume } from '../context/ResumeContext';
import { FileText, Clock, Trash2, ArrowRight, CheckCircle, RotateCcw } from 'lucide-react';

export function ResumeHistoryDashboard() {
  const { activeResume, history, removeResume, startAnalysis } = useResume();

  if (!activeResume) return null;

  const previousResumes = history.filter(r => (r.id || r._id) !== (activeResume.id || activeResume._id));

  const formatSize = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="space-y-8 animate-fade-in-up w-full max-w-4xl mx-auto">
      {/* Active Resume Card */}
      <div className="bg-white rounded-3xl p-8 border border-green-200 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 bg-green-50 rounded-full blur-3xl -mr-10 -mt-10" />
        
        <div className="flex items-center gap-2 mb-6 relative z-10">
          <CheckCircle className="text-green-500" size={20} />
          <h3 className="text-xl font-bold text-gray-900">Current Active Resume</h3>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
              <FileText size={24} />
            </div>
            <div>
              <h4 className="font-bold text-lg text-gray-900 mb-1">{activeResume.fileName || activeResume.originalName || 'Resume'}</h4>
              <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-gray-400 uppercase tracking-widest">
                <span className="flex items-center gap-1"><Clock size={14}/> {formatDate(activeResume.createdAt || activeResume.uploadDate)}</span>
                <span>•</span>
                <span>{formatSize(activeResume.size || 0)}</span>
                <span>•</span>
                <span className="text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded">Version {activeResume.version || 1}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button 
              onClick={() => removeResume(activeResume.id || activeResume._id)}
              className="px-4 py-2.5 bg-white border border-gray-200 text-red-500 hover:bg-red-50 hover:border-red-200 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"
            >
              <Trash2 size={16} /> Remove
            </button>
            <button 
              onClick={() => startAnalysis(activeResume.id || activeResume._id)}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2"
            >
              Start Analysis <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Upload History */}
      {previousResumes.length > 0 && (
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <RotateCcw className="text-gray-400" size={20} /> Previous Uploads
          </h3>
          <div className="space-y-4">
            {previousResumes.map((resume) => (
              <div key={resume.id || resume._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-gray-100 hover:bg-gray-50 transition-colors gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center shrink-0">
                    <FileText size={18} />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-gray-700">{resume.fileName || resume.originalName || 'Resume'}</h5>
                    <span className="text-xs font-bold text-gray-400">Uploaded {formatDate(resume.createdAt || resume.uploadDate)} • v{resume.version || 1}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => removeResume(resume.id || resume._id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete permanently"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
