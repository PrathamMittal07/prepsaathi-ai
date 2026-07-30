import React, { useRef, useState } from 'react';
import { UploadCloud, File, FileText, CheckCircle } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

export function ResumeUploadArea() {
  const { uploadResume, workflowState } = useResume();
  const isUploading = workflowState === 'UPLOADING' || workflowState === 'VALIDATING';
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
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center">
      <div 
        className={`relative border-2 border-dashed rounded-2xl p-12 transition-all ${dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400 bg-gray-50'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input 
          ref={fileInputRef}
          type="file" 
          accept=".pdf,.doc,.docx"
          onChange={handleChange}
          className="hidden"
          disabled={isUploading}
        />
        
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 mb-2">
            <UploadCloud size={40} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Upload your Resume</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Drag and drop your PDF or DOCX file here, or click to browse. Max size 5MB.
          </p>
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="mt-6 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50"
          >
            Browse Files
          </button>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <div className="flex items-start gap-3">
          <CheckCircle className="text-green-500 shrink-0 mt-1" size={20} />
          <div>
            <h4 className="font-bold text-gray-900">ATS Optimized</h4>
            <p className="text-sm text-gray-500">We analyze your resume against standard ATS parsers.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle className="text-green-500 shrink-0 mt-1" size={20} />
          <div>
            <h4 className="font-bold text-gray-900">Role Matching</h4>
            <p className="text-sm text-gray-500">Detailed comparison against your target SWE roles.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle className="text-green-500 shrink-0 mt-1" size={20} />
          <div>
            <h4 className="font-bold text-gray-900">Roadmap Sync</h4>
            <p className="text-sm text-gray-500">Missing skills automatically added to your learning path.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
