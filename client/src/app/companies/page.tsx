import React from 'react';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import PageContainer from '@/components/PageContainer';
import { ArrowRight, Building2, Search } from 'lucide-react';
import Link from 'next/link';

export default function Companies() {
  const companies = [
    {
      name: "Google",
      category: "Big Tech",
      difficulty: "Very Hard",
      process: "Phone Screen → 4-5 Onsite Rounds (DSA, System Design, Googleyness)",
      focus: "Strong emphasis on algorithmic efficiency and data structures."
    },
    {
      name: "Amazon",
      category: "Big Tech",
      difficulty: "Hard",
      process: "Online Assessment → Phone Screen → 4 Onsite Rounds (The Loop)",
      focus: "Heavy focus on Amazon's 16 Leadership Principles in every round."
    },
    {
      name: "Microsoft",
      category: "Big Tech",
      difficulty: "Hard",
      process: "Codility Test → Phone Screen → 4 Onsite Rounds",
      focus: "Balanced focus on coding, system design, and behavioral questions."
    },
    {
      name: "Meta",
      category: "Big Tech",
      difficulty: "Very Hard",
      process: "Phone Screen (Jedi) → 4-5 Onsite Rounds",
      focus: "Extremely fast-paced coding rounds. Speed and accuracy are critical."
    },
    {
      name: "Apple",
      category: "Big Tech",
      difficulty: "Very Hard",
      process: "Multiple Phone Screens → 5-6 Onsite Rounds",
      focus: "Deep domain knowledge. Less generic algorithmic questions, more specific to the team's tech stack."
    },
    {
      name: "Netflix",
      category: "Big Tech",
      difficulty: "Very Hard",
      process: "Phone Screen → Take-home project (sometimes) → Onsite Rounds",
      focus: "Huge emphasis on culture fit (Freedom and Responsibility) and extreme technical depth."
    }
  ];

  return (
    <main className="relative min-h-screen bg-[#F8F5EF] overflow-x-hidden">
      {/* Global Seamless Background Gradients & Noise */}
      <div className="absolute top-0 right-0 w-[70vw] h-[70vw] bg-[radial-gradient(circle_at_center,rgba(200,154,61,0.04)_0%,transparent_60%)] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute top-[20%] left-[-10%] w-[60vw] h-[60vw] bg-[radial-gradient(circle_at_center,rgba(142,44,75,0.04)_0%,transparent_60%)] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.12] mix-blend-overlay pointer-events-none" style={{ backgroundRepeat: 'repeat' }}></div>

      <Navbar />

      <PageContainer>
        <div style={{ width: '100%', maxWidth: '1152px', margin: '0 auto' }} className="w-full pt-32 pb-24 px-6 relative z-10">
          
          <div style={{ width: '100%', maxWidth: '768px', margin: '0 auto' }} className="w-full text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-syne font-bold text-gray-900 mb-6 leading-tight">
              Company <span className="text-[#8E2F52]">Interview Guides</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Every company interviews differently. Learn the exact process, what they look for, and how to crack their specific rounds.
            </p>
            
            <div style={{ width: '100%', maxWidth: '576px', margin: '0 auto' }} className="w-full relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-4 py-4 border-none rounded-2xl text-gray-900 bg-white shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-[#8E2F52] sm:text-lg transition-shadow"
                placeholder="Search for a company (e.g. Google)..."
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {companies.map((company, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100">
                    <Building2 className="w-6 h-6 text-gray-400 group-hover:text-[#8E2F52] transition-colors" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                    ${company.difficulty === 'Very Hard' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'}
                  `}>
                    {company.difficulty}
                  </span>
                </div>
                
                <h3 className="text-2xl font-syne font-bold text-gray-900 mb-1">{company.name}</h3>
                <p className="text-sm font-medium text-gray-500 mb-4">{company.category}</p>
                
                <div className="space-y-4 mb-6 flex-grow">
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">The Process</h4>
                    <p className="text-sm text-gray-600">{company.process}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">What they want</h4>
                    <p className="text-sm text-gray-600">{company.focus}</p>
                  </div>
                </div>
                
                <Link href={`/signup`} className="w-full flex items-center justify-center gap-2 bg-gray-50 hover:bg-[#8E2F52] text-gray-600 hover:text-white py-3 rounded-xl font-medium transition-colors">
                  Get Full Guide <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>

        </div>
      </PageContainer>
      
      <Footer />
    </main>
  );
}
