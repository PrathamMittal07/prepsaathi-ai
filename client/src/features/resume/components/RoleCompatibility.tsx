import React from 'react';
import { useResume } from '../context/ResumeContext';
import { UserCheck } from 'lucide-react';

export function RoleCompatibility() {
  const { analysis } = useResume();

  if (!analysis) return null;

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <UserCheck className="text-indigo-500" /> Role Compatibility
      </h3>

      <div className="space-y-4">
        {analysis.roleCompatibility.map((role: any, idx: number) => (
          <div key={idx}>
            <div className="flex justify-between items-end mb-1">
              <span className="text-sm font-bold text-gray-700">{role.role}</span>
              <span className="text-xs font-bold text-gray-500">{role.matchPercentage}% Match</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${role.matchPercentage >= 80 ? 'bg-green-500' : role.matchPercentage >= 60 ? 'bg-amber-500' : 'bg-red-500'}`} 
                style={{ width: `${role.matchPercentage}%` }} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
