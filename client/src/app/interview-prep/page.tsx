import React from 'react';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import PageContainer from '@/components/PageContainer';
import { MessageSquare, Code2, Users, Network } from 'lucide-react';
import Link from 'next/link';

export default function InterviewPrep() {
  const modules = [
    {
      title: "Behavioral Interviews",
      icon: <Users className="w-8 h-8 text-[#8E2F52]" />,
      description: "Master the STAR method. Learn how to tell your story, answer 'Tell me about yourself', and handle conflict questions perfectly.",
      topics: ["STAR Method", "Leadership Principles", "Culture Fit"]
    },
    {
      title: "Technical Coding",
      icon: <Code2 className="w-8 h-8 text-[#8E2F52]" />,
      description: "Step-by-step guides on how to approach algorithmic problems, communicate your thought process, and write clean code on a whiteboard.",
      topics: ["Data Structures", "Algorithms", "Time Complexity"]
    },
    {
      title: "System Design",
      icon: <Network className="w-8 h-8 text-[#8E2F52]" />,
      description: "Learn how to design scalable systems from scratch. Understand load balancers, caching, database sharding, and microservices.",
      topics: ["Scalability", "Databases", "APIs"]
    },
    {
      title: "Mock Interviews",
      icon: <MessageSquare className="w-8 h-8 text-[#8E2F52]" />,
      description: "Practice makes perfect. Use our AI tools to simulate real interview scenarios and get immediate actionable feedback.",
      topics: ["AI Simulator", "Peer Mocks", "Feedback Loop"]
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
              Master the <span className="text-[#8E2F52]">Interview</span>
            </h1>
            <p className="text-xl text-gray-600">
              Getting the interview is only half the battle. Our comprehensive guides and AI simulation tools will ensure you never freeze up when it matters most.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {modules.map((mod, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-[#8E2F52]/5 flex items-center justify-center mb-6">
                  {mod.icon}
                </div>
                
                <h3 className="text-2xl font-syne font-bold text-gray-900 mb-3">{mod.title}</h3>
                <p className="text-gray-600 mb-8">{mod.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {mod.topics.map((topic, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-gray-50 border border-gray-100 text-sm font-medium text-gray-600">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-gray-900 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.2] mix-blend-overlay pointer-events-none" style={{ backgroundRepeat: 'repeat' }}></div>
            
            <h2 className="text-3xl font-syne font-bold text-white mb-4 relative z-10">Ready to practice?</h2>
            <p style={{ maxWidth: '672px' }} className="text-gray-400 mb-8 mx-auto relative z-10">
              Not ready for a live mock interview yet? Our AI can grill you on specific concepts until you have them completely memorized.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Link 
                href="/signup" 
                className="inline-flex items-center justify-center bg-[#8E2F52] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#A93C5D] transition-colors"
              >
                Create Free Account
              </Link>
              <Link 
                href="/login" 
                className="inline-flex items-center justify-center bg-white/10 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-white/20 transition-colors"
              >
                Log In
              </Link>
            </div>
          </div>

        </div>
      </PageContainer>
      
      <Footer />
    </main>
  );
}
