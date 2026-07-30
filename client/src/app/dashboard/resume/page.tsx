'use client';

import React from 'react';
import { useResume } from '@/features/resume/context/ResumeContext';
import { ResumeUploadCard } from '@/features/resume/components/ResumeUploadCard';
import { ResumeHistoryDashboard } from '@/features/resume/components/ResumeHistoryDashboard';
import { ResumeOnboarding } from '@/features/resume/components/ResumeOnboarding';
import { ResumeIntelligenceDashboard } from '@/features/resume/components/ResumeIntelligenceDashboard';
import { ResumeMatchDashboard } from '@/features/resume/components/ResumeMatchDashboard';
import { ResumeProcessingWorkflow } from '@/features/resume/components/ResumeProcessingWorkflow';

function ResumeIntelligenceCenterContent() {
  const { activeResume, history, workflowState } = useResume();
  const isUploading = workflowState === 'UPLOADING' || workflowState === 'FILE_SELECTED' || workflowState === 'VALIDATING' || workflowState === 'UPLOAD_COMPLETE';
  const isParsing = workflowState === 'ANALYZING' || workflowState === 'ANALYSIS_COMPLETE';
  
  const isLandingState = !activeResume && !isUploading && !isParsing && history.length === 0;

  return (
    <>
      <ResumeProcessingWorkflow />
      <div className={isLandingState ? "w-full max-w-[1440px] mx-auto px-6 lg:px-10 py-12 min-h-[calc(100vh-120px)] flex flex-col justify-center animate-fade-in-up" : "max-w-5xl mx-auto space-y-10 animate-fade-in-up pb-20"}>

      {isLandingState ? (
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 lg:gap-12 items-center w-full">
          <ResumeOnboarding />
          <ResumeUploadCard />
        </div>
      ) : (
        <>
          <div>
            <h1 className="text-3xl font-bold font-syne text-gray-900 tracking-tight">Resume Intelligence</h1>
            <p className="mt-2 text-base text-gray-500">Premium AI-powered resume analysis.</p>
          </div>

          {isUploading ? null : (
            <div className="flex flex-col gap-10">
              {!isParsing && <ResumeUploadCard />}
              {activeResume && !isParsing && (
                <>
                  <ResumeHistoryDashboard />
                  {activeResume.status === 'PROCESSED' || activeResume.analysis ? (
                    <>
                      <ResumeIntelligenceDashboard />
                      <ResumeMatchDashboard />
                    </>
                  ) : null}
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
    </>
  );
}

export default function ResumePage() {
  return (
    <ResumeIntelligenceCenterContent />
  );
}
