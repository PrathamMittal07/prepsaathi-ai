import React from 'react';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import PageContainer from '@/components/PageContainer';
import { Check, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Pricing() {
  const freeFeatures = [
    "Full ATS Resume Analysis",
    "Basic AI Career Roadmaps",
    "DSA Progress Tracker",
    "Job Application Board",
    "Community Support"
  ];

  return (
    <main className="relative min-h-screen bg-[#F8F5EF] overflow-x-hidden">
      {/* Global Seamless Background Gradients & Noise */}
      <div className="absolute top-0 right-0 w-[70vw] h-[70vw] bg-[radial-gradient(circle_at_center,rgba(200,154,61,0.04)_0%,transparent_60%)] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute top-[20%] left-[-10%] w-[60vw] h-[60vw] bg-[radial-gradient(circle_at_center,rgba(142,44,75,0.04)_0%,transparent_60%)] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.12] mix-blend-overlay pointer-events-none" style={{ backgroundRepeat: 'repeat' }}></div>

      <Navbar />

      <PageContainer>
        <div className="pt-32 pb-24 max-w-5xl mx-auto px-6 relative z-10">
          
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8E2F52]/10 text-[#8E2F52] text-sm font-semibold tracking-wide uppercase mb-6">
              <Sparkles className="w-4 h-4" />
              Early Access Pricing
            </div>
            <h1 className="text-4xl md:text-5xl font-syne font-bold text-gray-900 mb-6 leading-tight">
              Premium career tools, <span className="text-[#8E2F52]">currently 100% free.</span>
            </h1>
            <p className="text-xl text-gray-600">
              We are in beta. Join now to lock in lifetime free access to all our core features before we introduce premium tiers.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-3xl p-8 md:p-10 border-2 border-[#8E2F52] shadow-xl relative overflow-hidden transform transition-all hover:-translate-y-1">
              
              <div className="absolute top-0 right-0 bg-[#8E2F52] text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">
                Most Popular
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-syne font-bold text-gray-900 mb-2">Early Adopter</h3>
                <p className="text-gray-500 mb-6">Everything you need to land your dream role.</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-syne font-bold text-gray-900">$0</span>
                  <span className="text-gray-500 font-medium">/forever</span>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                {freeFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#8E2F52]/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-[#8E2F52]" />
                    </div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <Link 
                href="/signup"
                className="w-full inline-flex items-center justify-center bg-[#8E2F52] text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-[#A93C5D] transition-colors shadow-lg shadow-[#8E2F52]/20"
              >
                Claim Free Account
              </Link>
            </div>
          </div>

        </div>
      </PageContainer>
      
      <Footer />
    </main>
  );
}
