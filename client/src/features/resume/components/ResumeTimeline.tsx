import React from 'react';
import { Map, CheckCircle2, CircleDashed } from 'lucide-react';

export function ResumeTimeline() {
  const steps = [
    { title: 'Uploaded', description: 'File saved securely.', status: 'completed' },
    { title: 'Parsed', description: 'Raw text extracted.', status: 'completed' },
    { title: 'Intelligence Ready', description: 'Basic health metrics available.', status: 'completed' },
    { title: 'AI Analysis', description: 'Deep Gemini evaluation.', status: 'upcoming' },
    { title: 'Improvements', description: 'One-click rewrites applied.', status: 'upcoming' },
  ];

  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
        <Map className="text-indigo-500" /> Processing Timeline
      </h3>

      <div className="relative">
        {/* Connector Line */}
        <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gray-100" />

        <div className="space-y-6 relative z-10">
          {steps.map((step, idx) => (
            <div key={idx} className="flex gap-4 items-start group">
              <div className={`mt-0.5 bg-white p-1 rounded-full ${step.status === 'completed' ? 'text-green-500' : 'text-gray-300'}`}>
                {step.status === 'completed' ? <CheckCircle2 size={24} className="fill-green-50" /> : <CircleDashed size={24} />}
              </div>
              <div>
                <h4 className={`font-bold text-sm ${step.status === 'completed' ? 'text-gray-900' : 'text-gray-400'}`}>
                  {step.title}
                </h4>
                <p className={`text-sm ${step.status === 'completed' ? 'text-gray-500' : 'text-gray-400'}`}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
