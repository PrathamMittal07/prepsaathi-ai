import React from 'react';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import PageContainer from '@/components/PageContainer';
import { Target, Users, Zap, Award } from 'lucide-react';

export default function AboutUs() {
  const values = [
    {
      icon: <Target className="w-6 h-6 text-[#8E2F52]" />,
      title: "Student-First",
      description: "Everything we build is designed to give students the highest possible advantage in the modern job market."
    },
    {
      icon: <Zap className="w-6 h-6 text-[#8E2F52]" />,
      title: "AI-Powered, Human-Centered",
      description: "We leverage cutting-edge AI to provide insights, but the ultimate goal is to showcase the real human behind the resume."
    },
    {
      icon: <Users className="w-6 h-6 text-[#8E2F52]" />,
      title: "Equal Opportunity",
      description: "We believe every student deserves access to top-tier career guidance, regardless of their background or university."
    },
    {
      icon: <Award className="w-6 h-6 text-[#8E2F52]" />,
      title: "Excellence",
      description: "We don't settle for 'good enough'. Our ATS parsers and AI models are continuously refined to provide the most accurate feedback."
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
        <div className="pt-32 pb-24 max-w-5xl mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-syne font-bold text-gray-900 mb-6 leading-tight">
              Leveling the playing field for <span className="text-[#8E2F52]">early-career</span> talent.
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We built Prep2Place because we saw the massive gap between what universities teach and what modern tech companies actually look for.
            </p>
          </div>

          {/* Mission Section */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm relative overflow-hidden mb-24">
            <div className="absolute right-0 top-0 w-64 h-64 bg-[#8E2F52]/5 rounded-full blur-3xl -mr-20 -mt-20" />
            
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-syne font-bold text-gray-900 mb-6">Our Mission</h2>
                <div className="space-y-4 text-lg text-gray-600">
                  <p>
                    Every year, millions of brilliant students struggle to land their first job simply because they don't know how to navigate the complex world of ATS systems, technical interviews, and modern recruiting.
                  </p>
                  <p>
                    <strong>Prep2Place</strong> was founded with a single mission: to democratize access to premium career coaching using artificial intelligence.
                  </p>
                  <p>
                    We act as your personal AI placement partner, guiding you from your first resume draft to your final interview.
                  </p>
                </div>
              </div>
              <div className="bg-[#F8F5EF] rounded-2xl p-8 border border-gray-200">
                <div className="text-[#8E2F52] text-6xl font-syne font-bold mb-4">"</div>
                <p className="text-2xl font-syne font-medium text-gray-900 leading-tight">
                  Your degree gets you the knowledge. We get you the job.
                </p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-syne font-bold text-gray-900 mb-4">Our Core Values</h2>
              <p className="text-gray-600 text-lg">The principles that guide everything we build.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, idx) => (
                <div key={idx} className="bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 hover:bg-white transition-colors">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-syne font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </PageContainer>
      
      <Footer />
    </main>
  );
}
