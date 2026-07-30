import React, { useRef, useState } from 'react';
import { UploadCloud, File, AlertCircle, FileText, ArrowDown } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

export function ResumeUploadCard() {
  const { uploadResume, workflowState, error, clearError } = useResume();
  const isUploading = workflowState === 'UPLOADING' || workflowState === 'VALIDATING' || workflowState === 'FILE_SELECTED';
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadResume(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      uploadResume(e.target.files[0]);
    }
  };

  return (
    <div className="saas-card p-6 md:p-8 flex flex-col w-full lg:w-[540px] xl:w-[580px] min-h-[660px] mx-auto group">
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes drawCheck {
          to { stroke-dashoffset: 0; }
        }
        .animate-check {
          stroke-dasharray: 24;
          stroke-dashoffset: 24;
          animation: drawCheck 0.6s ease-out forwards;
        }
        @keyframes subtlePulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
          50% { transform: scale(1.05); box-shadow: 0 0 15px 5px rgba(99, 102, 241, 0.1); }
        }
        .group:hover .icon-hover-pulse {
          animation: subtlePulse 2s infinite;
        }
      `}} />

      {error && (
        <div className="mb-6 bg-red-50 text-red-700 px-4 py-3 rounded-xl flex items-center justify-between text-sm font-bold border border-red-200">
          <div className="flex items-center gap-2">
            <AlertCircle size={16} />
            {error}
          </div>
          <button onClick={clearError} className="hover:text-red-900">&times;</button>
        </div>
      )}

      <div 
        className={`relative w-full h-full border-2 border-dashed rounded-[1.5rem] p-6 md:p-10 flex-1 flex flex-col justify-center items-center transition-all duration-500 ${dragActive ? 'border-indigo-500 bg-indigo-50/80 shadow-[0_0_30px_rgba(99,102,241,0.2)] scale-[1.02]' : 'border-gray-300 hover:border-indigo-400 hover:bg-indigo-50/30 hover:shadow-[0_0_25px_rgba(99,102,241,0.1)]'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input 
          ref={fileInputRef}
          type="file" 
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleChange}
          className="hidden"
          disabled={isUploading}
        />
        
        {/* FOOLPROOF BLOCK CONTAINER */}
        <div style={{ width: '100%', maxWidth: '340px', margin: '0 auto', textAlign: 'center' }}>
          
          <div style={{ width: '80px', height: '80px', margin: '0 auto 32px auto' }} className={`rounded-full bg-white shadow-sm flex items-center justify-center text-indigo-500 border border-indigo-100 transition-all duration-500 ${dragActive ? 'scale-110 animate-bounce shadow-indigo-200' : 'group-hover:-translate-y-2 group-hover:shadow-md icon-hover-pulse'}`}>
            {dragActive ? <ArrowDown size={36} strokeWidth={2.5} /> : <UploadCloud size={40} strokeWidth={1.5} />}
          </div>
          
          <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-4 transition-colors">
            {dragActive ? <span className="text-indigo-600">Drop your Resume here</span> : 'Upload your Resume'}
          </h3>
          
          <p className="text-gray-500 text-[15px] leading-relaxed mb-8">
            Drag & drop your resume here or click <span className="font-bold text-indigo-600">Browse Files</span>.<br/><br/>
            Supports PDF and DOCX up to 10 MB.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '32px' }}>
            <div className="flex flex-col items-center justify-center border border-gray-100 shadow-sm rounded-2xl bg-white transition-transform hover:scale-105" style={{ width: '88px', height: '100px', flexShrink: 0 }}>
              <FileText className="text-red-500 mb-2" size={28} strokeWidth={1.5} />
              <span className="text-[11px] font-bold text-gray-700">PDF</span>
            </div>
            
            <div style={{ width: '6px', height: '6px', margin: 'auto 0', flexShrink: 0 }} className="rounded-full bg-gray-300"></div>
            
            <div className="flex flex-col items-center justify-center border border-gray-100 shadow-sm rounded-2xl bg-white transition-transform hover:scale-105" style={{ width: '88px', height: '100px', flexShrink: 0 }}>
              <File className="text-blue-500 mb-2" size={28} strokeWidth={1.5} />
              <span className="text-[11px] font-bold text-gray-700">DOCX</span>
            </div>
            
            <div className="flex flex-col justify-center text-left" style={{ flexShrink: 0 }}>
              <span className="text-[10px] font-bold text-gray-400">MAX</span>
              <span className="text-xs font-bold text-gray-500">10MB</span>
            </div>
          </div>

          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="mb-8 h-[60px] w-full bg-gradient-to-b from-[#6366f1] to-[#4f46e5] hover:from-[#575ae6] hover:to-[#4338ca] hover:-translate-y-1 text-white font-bold rounded-2xl transition-all duration-300 shadow-[0_8px_30px_rgb(79,70,229,0.3)] hover:shadow-[0_8px_40px_rgb(79,70,229,0.5)] border border-indigo-400/20 disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-3 text-lg"
          >
            <File size={20} /> Browse Files
          </button>
          
          <div className="flex flex-col gap-3 text-sm text-gray-500 font-medium group/success">
            <div className="flex items-center justify-center gap-3 transition-colors hover:text-green-600">
              <svg className="w-[18px] h-[18px] text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.4)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path className="animate-check" style={{ animationDelay: '0.2s' }} strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              <span>Secure upload</span>
            </div>
            <div className="flex items-center justify-center gap-3 transition-colors hover:text-green-600">
              <svg className="w-[18px] h-[18px] text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.4)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path className="animate-check" style={{ animationDelay: '0.4s' }} strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              <span>Automatically deleted after analysis</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
