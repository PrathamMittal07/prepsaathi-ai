import React from 'react';
import { useResume } from '../context/ResumeContext';
import { Code2, TrendingUp, Cpu, Server, Lightbulb } from 'lucide-react';

export function ProjectEvaluator() {
  const { analysis } = useResume();

  if (!analysis) return null;

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Code2 className="text-indigo-500" /> Project Analysis
      </h3>

      <div className="space-y-6">
        {analysis.projects.map((project: any, idx: number) => (
          <div key={idx} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-lg text-gray-900">{project.name}</h4>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Strength</span>
                <div className="flex gap-1">
                  {Array.from({length: 10}).map((_, i) => (
                    <div key={i} className={`w-2 h-4 rounded-full ${i < project.strength ? 'bg-indigo-500' : 'bg-gray-200'}`} />
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex gap-3">
                <TrendingUp className="text-emerald-500 shrink-0" size={20} />
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Business Impact</span>
                  <p className="text-sm font-medium text-gray-700">{project.businessImpact}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Cpu className="text-blue-500 shrink-0" size={20} />
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Technical Depth</span>
                  <p className="text-sm font-medium text-gray-700">{project.technicalDepth}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Server className="text-orange-500 shrink-0" size={20} />
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Scalability</span>
                  <p className="text-sm font-medium text-gray-700">{project.scalability}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Lightbulb className="text-purple-500 shrink-0" size={20} />
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Innovation</span>
                  <p className="text-sm font-medium text-gray-700">{project.innovation}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-indigo-100/50">
              <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest block mb-2">AI Recommendations</span>
              <ul className="space-y-1">
                {project.recommendations.map((rec: any, i: number) => (
                  <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
