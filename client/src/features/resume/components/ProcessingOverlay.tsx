import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useResume } from '../context/ResumeContext';
import { Sparkles, FileSearch, Code, BrainCircuit, Target, CheckCircle } from 'lucide-react';

export function ProcessingOverlay() {
  const { workflowState } = useResume();
  const isProcessing = workflowState === 'ANALYZING';
  const processingStep = 'Analyzing...';

  const getIconForStep = () => {
    if (processingStep?.includes('Reading')) return <FileSearch className="text-blue-400" size={48} />;
    if (processingStep?.includes('Extracting')) return <Code className="text-purple-400" size={48} />;
    if (processingStep?.includes('Analyzing')) return <BrainCircuit className="text-pink-400" size={48} />;
    if (processingStep?.includes('Comparing')) return <Target className="text-orange-400" size={48} />;
    if (processingStep?.includes('Report')) return <CheckCircle className="text-green-400" size={48} />;
    return <Sparkles className="text-indigo-400" size={48} />;
  };

  return (
    <AnimatePresence>
      {isProcessing && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 backdrop-blur-md"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white rounded-3xl p-10 max-w-sm w-full text-center shadow-2xl flex flex-col items-center"
          >
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 rounded-full animate-pulse" />
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="relative z-10 w-24 h-24 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center"
              >
                {getIconForStep()}
              </motion.div>
            </div>
            
            <h3 className="text-2xl font-black text-gray-900 mb-2">AI Analysis</h3>
            
            <motion.p 
              key={processingStep}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-indigo-600 font-bold"
            >
              {processingStep}
            </motion.p>
            
            <div className="w-full bg-gray-100 h-1.5 rounded-full mt-8 overflow-hidden">
              <motion.div 
                className="bg-indigo-500 h-full rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
