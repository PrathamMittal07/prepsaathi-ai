import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useResume } from '../context/ResumeContext';
import { CheckCircle2, Loader2, AlertCircle, Sparkles } from 'lucide-react';
import Button from '@/components/Button';

const STAGES = [
  { id: 'UPLOADING', label: 'Uploading Document' },
  { id: 'Pending', label: 'Initializing Engine' },
  { id: 'Extracting', label: 'Extracting Text' },
  { id: 'Parsing', label: 'AI Deep Analysis' }
];

export function ResumeProcessingWorkflow() {
  const { workflowState, uploadProgress, finishProcessing, error, activeResume } = useResume();
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const isUploading = workflowState === 'FILE_SELECTED' || workflowState === 'VALIDATING' || workflowState === 'UPLOADING';
  const isParsing = workflowState === 'UPLOAD_COMPLETE' || workflowState === 'READY_FOR_ANALYSIS' || workflowState === 'ANALYZING' || workflowState === 'ANALYSIS_COMPLETE';
  const isProcessingComplete = workflowState === 'ANALYSIS_COMPLETE' || activeResume?.parsingStatus === 'Completed';
  
  const isVisible = isUploading || isParsing || showSuccess || error !== null;

  useEffect(() => {
    if (isUploading) {
      setCurrentStageIndex(0);
    } else if (isParsing) {
      if (isProcessingComplete) {
        setCurrentStageIndex(STAGES.length); // All complete
        setShowSuccess(true);
        const timer = setTimeout(() => {
          finishProcessing();
          setShowSuccess(false);
          setCurrentStageIndex(0);
        }, 1500);
        return () => clearTimeout(timer);
      } else {
        const status = activeResume?.parsingStatus || 'Pending';
        const index = STAGES.findIndex(s => s.id === status);
        if (index !== -1) {
          setCurrentStageIndex(index);
        }
      }
    }
  }, [isUploading, isParsing, isProcessingComplete, activeResume?.parsingStatus]);

  if (!isVisible) return null;

  const progressPercent = isUploading 
    ? (uploadProgress * 0.25) // Upload is first 25%
    : isProcessingComplete 
      ? 100 
      : (Math.max(1, currentStageIndex) / STAGES.length) * 100;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-md p-4"
      >
        <motion.div 
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white rounded-[20px] shadow-[0_18px_40px_rgba(15,23,42,0.12)] relative overflow-hidden flex flex-col md:flex-row w-full max-w-[48rem] h-[450px]"
        >
          {/* Main Content Grid */}
          <div className="flex-1 flex flex-col md:flex-row h-full">
            
            {/* Left Column: Header & Progress */}
            <div className="w-full md:w-2/5 p-8 border-b md:border-b-0 md:border-r border-[rgba(15,23,42,0.06)] bg-gray-50 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                    <Sparkles size={20} />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight">Processing</h2>
                </div>
                
                <div className="h-6 overflow-hidden mt-4">
                  <p className="text-indigo-600 font-medium">
                    {showSuccess ? 'Analysis complete!' : STAGES[currentStageIndex]?.label || 'Finalizing...'}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-8 md:mt-0">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-bold text-gray-500">
                    {Math.round(progressPercent)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden relative">
                  <motion.div 
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ ease: "linear", duration: 0.5 }}
                  />
                  {!isProcessingComplete && !error && (
                    <div className="absolute top-0 left-0 bottom-0 w-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Checklist Stages */}
            <div className="w-full md:w-3/5 p-8 bg-white overflow-y-auto h-full">
              <div className="flex flex-col gap-4">
                {STAGES.map((stage, index) => {
                  const isCompleted = currentStageIndex > index || isProcessingComplete;
                  const isRunning = currentStageIndex === index && !showSuccess && !error;
                  const isWaiting = currentStageIndex < index && !error;
                  const isError = error && currentStageIndex === index;

                  return (
                    <motion.div 
                      key={stage.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                        isRunning ? 'bg-indigo-50 border-indigo-100 shadow-sm' : 
                        isError ? 'bg-red-50 border-red-100 shadow-sm' :
                        isCompleted ? 'bg-gray-50 border-transparent' : 'bg-white border-transparent opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                          {isCompleted && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                              <CheckCircle2 className="text-green-500" size={20} />
                            </motion.div>
                          )}
                          {isRunning && <Loader2 className="text-indigo-500 animate-spin" size={20} />}
                          {isError && <AlertCircle className="text-red-500" size={20} />}
                          {isWaiting && <div className="w-2 h-2 rounded-full bg-gray-300" />}
                        </div>
                        <span className={`font-semibold ${
                          isRunning ? 'text-indigo-900' :
                          isError ? 'text-red-900' :
                          isCompleted ? 'text-gray-900' : 'text-gray-400'
                        }`}>
                          {stage.label}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Absolute Overlays (Ensures modal size doesn't change on success/error) */}
          
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-20 bg-white flex flex-col items-center justify-center p-10 text-center"
              >
                <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mb-6 border border-red-100">
                  <AlertCircle size={40} />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">Processing Failed</h3>
                <p className="text-gray-600 font-medium mb-8 w-full max-w-md min-w-[300px] whitespace-normal break-words">{error}</p>
                <Button onClick={finishProcessing} variant="secondary">
                  Dismiss
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showSuccess && !error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-20 bg-white flex flex-col items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6"
                >
                  <CheckCircle2 className="text-green-500" size={48} />
                </motion.div>
                <motion.h3 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-black text-gray-900 tracking-tight"
                >
                  Analysis Complete
                </motion.h3>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
