import React, { useState } from 'react';
import { useRoadmap } from '../../context/RoadmapContext';
import { FormData } from '../../types/roadmap';
import Button from '../Button';

const COMPANIES = ['Google', 'Microsoft', 'Amazon', 'Atlassian', 'Adobe', 'Flipkart', 'Walmart', 'Goldman Sachs', 'TCS', 'Infosys'];

export const RoadmapForm: React.FC = () => {
  const { generateRoadmap, isGenerating } = useRoadmap();
  
  const [formData, setFormData] = useState<FormData>({
    year: 'Third Year',
    currentLevel: 'Intermediate',
    targetCompanies: [],
    dailyStudyTime: '2 Hours',
    preparationDuration: '90 Days',
    preferredDifficulty: 'Medium'
  });

  const handleCompanyToggle = (company: string) => {
    setFormData(prev => ({
      ...prev,
      targetCompanies: prev.targetCompanies.includes(company)
        ? prev.targetCompanies.filter(c => c !== company)
        : [...prev.targetCompanies, company]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateRoadmap(formData);
  };

  return (
    <div className="bg-bg-card border border-white/10 rounded-2xl p-6 shadow-xl">
      <h2 className="text-2xl font-bold font-syne text-text-primary mb-6">Create Your Roadmap</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Current Level */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Current DSA Level</label>
          <div className="grid grid-cols-3 gap-3">
            {['Beginner', 'Intermediate', 'Advanced'].map(level => (
              <button
                key={level}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, currentLevel: level }))}
                className={`py-2 px-3 rounded-xl border text-sm transition-all duration-200 ${
                  formData.currentLevel === level 
                    ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300' 
                    : 'bg-white/5 border-white/10 text-text-secondary hover:bg-white/10'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Year */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Student Year</label>
          <select 
            value={formData.year}
            onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-indigo-500/50 appearance-none"
          >
            <option className="bg-bg-primary" value="First Year">First Year</option>
            <option className="bg-bg-primary" value="Second Year">Second Year</option>
            <option className="bg-bg-primary" value="Third Year">Third Year</option>
            <option className="bg-bg-primary" value="Final Year">Final Year</option>
          </select>
        </div>

        {/* Target Companies */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Target Companies (Select multiple)</label>
          <div className="flex flex-wrap gap-2">
            {COMPANIES.map(company => (
              <button
                key={company}
                type="button"
                onClick={() => handleCompanyToggle(company)}
                className={`py-1.5 px-3 rounded-full border text-xs transition-all duration-200 ${
                  formData.targetCompanies.includes(company)
                    ? 'bg-purple-500/20 border-purple-500 text-purple-300' 
                    : 'bg-white/5 border-white/10 text-text-secondary hover:bg-white/10'
                }`}
              >
                {company}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Daily Study Time */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Daily Study Time</label>
            <select 
              value={formData.dailyStudyTime}
              onChange={(e) => setFormData(prev => ({ ...prev, dailyStudyTime: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-indigo-500/50 appearance-none"
            >
              <option className="bg-bg-primary" value="1 Hour">1 Hour</option>
              <option className="bg-bg-primary" value="2 Hours">2 Hours</option>
              <option className="bg-bg-primary" value="3 Hours">3 Hours</option>
              <option className="bg-bg-primary" value="4+ Hours">4+ Hours</option>
            </select>
          </div>

          {/* Prep Duration */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Preparation Duration</label>
            <select 
              value={formData.preparationDuration}
              onChange={(e) => setFormData(prev => ({ ...prev, preparationDuration: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-indigo-500/50 appearance-none"
            >
              <option className="bg-bg-primary" value="30 Days">30 Days</option>
              <option className="bg-bg-primary" value="60 Days">60 Days</option>
              <option className="bg-bg-primary" value="90 Days">90 Days</option>
              <option className="bg-bg-primary" value="180 Days">180 Days</option>
            </select>
          </div>
        </div>
        
        {/* Preferred Difficulty */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Preferred Difficulty</label>
          <div className="grid grid-cols-3 gap-3">
            {['Easy', 'Medium', 'Hard'].map(level => (
              <button
                key={level}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, preferredDifficulty: level }))}
                className={`py-2 px-3 rounded-xl border text-sm transition-all duration-200 ${
                  formData.preferredDifficulty === level 
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' 
                    : 'bg-white/5 border-white/10 text-text-secondary hover:bg-white/10'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <Button 
          type="submit" 
          variant="primary" 
          className="w-full py-3 mt-4 text-base font-semibold"
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : 'Generate Roadmap'}
        </Button>
      </form>
    </div>
  );
};
