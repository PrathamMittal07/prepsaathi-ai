import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { roleProfilesDB, compareRoles } from '../services/roleMatchingEngine';
import { GitCompare, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function RoleComparisonTool() {
  const { activeResume } = useResume();
  const [roleA, setRoleA] = useState<string>(roleProfilesDB[0].name);
  const [roleB, setRoleB] = useState<string>(roleProfilesDB[1].name);

  if (!activeResume || !activeResume.parsedData) return null;

  const comparison = compareRoles(roleA, roleB, activeResume.parsedData);

  if (!comparison) return null;

  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mt-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <GitCompare className="text-indigo-500" /> Compare Career Paths
      </h3>

      {/* Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Role A</label>
          <select 
            value={roleA} 
            onChange={(e) => setRoleA(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 outline-none focus:border-indigo-500 transition-colors"
          >
            {roleProfilesDB.map(r => <option key={r.name} value={r.name}>{r.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Role B</label>
          <select 
            value={roleB} 
            onChange={(e) => setRoleB(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 outline-none focus:border-indigo-500 transition-colors"
          >
            {roleProfilesDB.map(r => <option key={r.name} value={r.name}>{r.name}</option>)}
          </select>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={`${roleA}-${roleB}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Role A Column */}
          <div className="space-y-6 border border-gray-100 p-6 rounded-2xl bg-gray-50/50 relative">
            {comparison.roleA.compatibilityScore > comparison.roleB.compatibilityScore && (
              <div className="absolute -top-3 left-6 bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                <Sparkles size={12} /> Better Match
              </div>
            )}
            
            <div className="flex justify-between items-end border-b border-gray-200 pb-4">
              <div>
                <h4 className="font-black text-xl text-gray-900">{comparison.roleA.role.name}</h4>
                <p className="text-sm font-bold text-gray-500 mt-1">Compatibility</p>
              </div>
              <span className="text-3xl font-black text-indigo-600">{comparison.roleA.compatibilityScore}%</span>
            </div>

            <div>
              <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1">
                <CheckCircle2 size={14} className="text-green-500" /> Common Skills
              </h5>
              <div className="flex flex-wrap gap-2">
                {comparison.commonBetweenRoles.map(s => (
                  <span key={s} className="bg-gray-100 text-gray-700 px-2.5 py-1 text-xs font-bold rounded-md border border-gray-200">{s}</span>
                ))}
              </div>
            </div>

            <div>
              <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1">
                <XCircle size={14} className="text-red-400" /> Missing Unique Skills
              </h5>
              <div className="flex flex-wrap gap-2">
                {comparison.roleA.missingRequired.filter(s => comparison.uniqueToA.includes(s)).map(s => (
                  <span key={s} className="bg-red-50 text-red-700 px-2.5 py-1 text-xs font-bold rounded-md border border-red-200">{s}</span>
                ))}
                {comparison.roleA.missingPreferred.filter(s => comparison.uniqueToA.includes(s)).map(s => (
                  <span key={s} className="bg-amber-50 text-amber-700 px-2.5 py-1 text-xs font-bold rounded-md border border-amber-200">{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Role B Column */}
          <div className="space-y-6 border border-gray-100 p-6 rounded-2xl bg-gray-50/50 relative">
            {comparison.roleB.compatibilityScore > comparison.roleA.compatibilityScore && (
              <div className="absolute -top-3 left-6 bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                <Sparkles size={12} /> Better Match
              </div>
            )}
            
            <div className="flex justify-between items-end border-b border-gray-200 pb-4">
              <div>
                <h4 className="font-black text-xl text-gray-900">{comparison.roleB.role.name}</h4>
                <p className="text-sm font-bold text-gray-500 mt-1">Compatibility</p>
              </div>
              <span className="text-3xl font-black text-indigo-600">{comparison.roleB.compatibilityScore}%</span>
            </div>

            <div>
              <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1">
                <CheckCircle2 size={14} className="text-green-500" /> Common Skills
              </h5>
              <div className="flex flex-wrap gap-2">
                {comparison.commonBetweenRoles.map(s => (
                  <span key={s} className="bg-gray-100 text-gray-700 px-2.5 py-1 text-xs font-bold rounded-md border border-gray-200">{s}</span>
                ))}
              </div>
            </div>

            <div>
              <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1">
                <XCircle size={14} className="text-red-400" /> Missing Unique Skills
              </h5>
              <div className="flex flex-wrap gap-2">
                {comparison.roleB.missingRequired.filter(s => comparison.uniqueToB.includes(s)).map(s => (
                  <span key={s} className="bg-red-50 text-red-700 px-2.5 py-1 text-xs font-bold rounded-md border border-red-200">{s}</span>
                ))}
                {comparison.roleB.missingPreferred.filter(s => comparison.uniqueToB.includes(s)).map(s => (
                  <span key={s} className="bg-amber-50 text-amber-700 px-2.5 py-1 text-xs font-bold rounded-md border border-amber-200">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
