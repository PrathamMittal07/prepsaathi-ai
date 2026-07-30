import React from 'react';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import PageContainer from '@/components/PageContainer';
import { ArrowRight, Code, Database, LayoutTemplate, Smartphone } from 'lucide-react';
import Link from 'next/link';

export default function Roadmaps() {
  const roadmaps = [
    {
      title: "Software Development Engineer (SDE)",
      icon: <Code className="w-8 h-8 text-[#8E2F52]" />,
      description: "The complete path to landing an SDE role at top tech companies. Covers DSA, System Design, and CS Fundamentals.",
      duration: "6 Months",
      difficulty: "Advanced"
    },
    {
      title: "Frontend Developer",
      icon: <LayoutTemplate className="w-8 h-8 text-[#8E2F52]" />,
      description: "Master React, Next.js, and modern CSS to build stunning user interfaces and land frontend roles.",
      duration: "4 Months",
      difficulty: "Intermediate"
    },
    {
      title: "Data Scientist",
      icon: <Database className="w-8 h-8 text-[#8E2F52]" />,
      description: "Learn Python, SQL, Machine Learning, and Statistics to break into data science.",
      duration: "6 Months",
      difficulty: "Advanced"
    },
    {
      title: "Mobile App Developer",
      icon: <Smartphone className="w-8 h-8 text-[#8E2F52]" />,
      description: "Build iOS and Android applications using React Native or Flutter.",
      duration: "4 Months",
      difficulty: "Beginner"
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
        <div className="pt-32 pb-24 max-w-6xl mx-auto px-6 relative z-10">
          
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-syne font-bold text-gray-900 mb-6 leading-tight">
              Free Career <span className="text-[#8E2F52]">Roadmaps</span>
            </h1>
            <p className="text-xl text-gray-600">
              Curated step-by-step guides to help you master the skills required for top tech roles. 
              Sign up to get a personalized AI version tailored exactly to your current skill level.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {roadmaps.map((roadmap, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col">
                <div className="w-16 h-16 rounded-2xl bg-[#8E2F52]/5 flex items-center justify-center mb-6">
                  {roadmap.icon}
                </div>
                
                <h3 className="text-2xl font-syne font-bold text-gray-900 mb-3">{roadmap.title}</h3>
                <p className="text-gray-600 mb-8 flex-grow">{roadmap.description}</p>
                
                <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                  <div className="flex items-center gap-4">
                    <div className="px-3 py-1 rounded-full bg-gray-100 text-xs font-semibold text-gray-600">
                      {roadmap.duration}
                    </div>
                    <div className="px-3 py-1 rounded-full bg-gray-100 text-xs font-semibold text-gray-600">
                      {roadmap.difficulty}
                    </div>
                  </div>
                  
                  <Link href="/signup" className="flex items-center gap-2 text-[#8E2F52] font-semibold hover:text-[#A93C5D] transition-colors">
                    Start Path <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-[#8E2F52]/5 border border-[#8E2F52]/10 rounded-3xl p-10 text-center">
            <h2 className="text-2xl font-syne font-bold text-gray-900 mb-4">Want a custom roadmap?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Our AI Career Coach can generate a personalized roadmap based exactly on the skills you already have, saving you months of redundant learning.
            </p>
            <Link 
              href="/signup" 
              className="inline-flex items-center justify-center bg-[#8E2F52] text-white px-8 py-3.5 rounded-xl font-medium hover:bg-[#A93C5D] transition-colors"
            >
              Generate My AI Roadmap
            </Link>
          </div>

        </div>
      </PageContainer>
      
      <Footer />
    </main>
  );
}
