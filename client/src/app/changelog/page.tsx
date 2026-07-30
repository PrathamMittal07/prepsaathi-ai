import React from 'react';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import PageContainer from '@/components/PageContainer';
import { Rocket, Bug, Sparkles, Zap } from 'lucide-react';

export default function Changelog() {
  const updates = [
    {
      version: "v1.0.0",
      date: "July 30, 2026",
      title: "Prep2Place Initial Release! 🎉",
      type: "major",
      icon: <Rocket className="w-5 h-5 text-white" />,
      color: "bg-[#8E2F52]",
      changes: [
        "Launched the AI-powered Resume Analyzer with ATS scoring.",
        "Released the interactive DSA Progress Tracker.",
        "Added the Job Applications Board with Kanban view.",
        "Introduced the AI Career Coach (powered by Gemini).",
        "Full authentication flow with secure PostgreSQL database."
      ]
    },
    {
      version: "v0.9.5",
      date: "July 15, 2026",
      title: "Beta Testing Phase 2",
      type: "minor",
      icon: <Sparkles className="w-5 h-5 text-white" />,
      color: "bg-indigo-500",
      changes: [
        "Improved the latency of the AI Career Coach responses by 40%.",
        "Added PDF parsing support for resumes up to 5MB.",
        "Redesigned the main dashboard for better user experience.",
        "Added dark mode support for code snippets in chat."
      ]
    },
    {
      version: "v0.9.1",
      date: "July 02, 2026",
      title: "Bug Fixes & Performance",
      type: "patch",
      icon: <Bug className="w-5 h-5 text-white" />,
      color: "bg-amber-500",
      changes: [
        "Fixed an issue where the DSA tracker wouldn't save completed problems.",
        "Resolved a CORS error during deployment on Render.",
        "Optimized database queries in Prisma to prevent connection pooling limits.",
        "Fixed responsive layout issues on mobile Safari."
      ]
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
        <div className="pt-32 pb-24 max-w-3xl mx-auto px-6">
          
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-syne font-bold text-gray-900 mb-4">Changelog</h1>
            <p className="text-xl text-gray-600">
              New updates, features, and improvements to Prep2Place.
            </p>
          </div>

          <div className="relative border-l-2 border-gray-200 ml-6 pl-8 space-y-16">
            {updates.map((update, idx) => (
              <div key={idx} className="relative">
                {/* Timeline Node */}
                <div className={`absolute -left-[43px] top-0 w-10 h-10 rounded-full ${update.color} border-4 border-[#F8F5EF] flex items-center justify-center shadow-sm z-10`}>
                  {update.icon}
                </div>

                {/* Content */}
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-syne font-bold text-xl text-gray-900">{update.version}</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold uppercase tracking-wider">
                          {update.type}
                        </span>
                      </div>
                      <h2 className="text-lg font-medium text-gray-800">{update.title}</h2>
                    </div>
                    <span className="text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-lg">
                      {update.date}
                    </span>
                  </div>

                  <ul className="space-y-3">
                    {update.changes.map((change, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-2 flex-shrink-0" />
                        <span className="leading-relaxed">{change}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

        </div>
      </PageContainer>
      
      <Footer />
    </main>
  );
}
