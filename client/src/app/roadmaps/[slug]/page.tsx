import React from 'react';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import PageContainer from '@/components/PageContainer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Map, Code, LayoutTemplate, Database, Smartphone, CheckCircle2, ArrowRight } from 'lucide-react';

const roadmapData: Record<string, any> = {
  'sde': {
    title: "Software Development Engineer (SDE)",
    targetRole: "Software Engineer",
    icon: <Code className="w-10 h-10 text-[#8E2F52]" />,
    description: "The complete path to landing an SDE role at top tech companies. Covers DSA, System Design, and CS Fundamentals.",
    duration: "6 Months",
    difficulty: "Advanced",
    modules: [
      {
        title: "Programming Fundamentals",
        description: "Master variables, loops, arrays, strings, and OOP concepts in your preferred language (C++, Java, or Python)."
      },
      {
        title: "Data Structures & Algorithms I",
        description: "Learn arrays, linked lists, stacks, queues, and basic hashing techniques."
      },
      {
        title: "Data Structures & Algorithms II",
        description: "Dive deep into trees, graphs, dynamic programming, and advanced algorithmic patterns."
      },
      {
        title: "CS Core Subjects",
        description: "Operating Systems, Database Management Systems, and Computer Networks fundamentals required for interviews."
      },
      {
        title: "System Design Basics",
        description: "Understand load balancing, caching, database sharding, and high-level architecture."
      },
      {
        title: "Mock Interviews & Resume",
        description: "Polish your resume, build a strong portfolio, and practice behavioral and technical mock interviews."
      }
    ]
  },
  'frontend-developer': {
    title: "Frontend Developer",
    targetRole: "Frontend Engineer",
    icon: <LayoutTemplate className="w-10 h-10 text-[#8E2F52]" />,
    description: "Master React, Next.js, and modern CSS to build stunning user interfaces and land frontend roles.",
    duration: "4 Months",
    difficulty: "Intermediate",
    modules: [
      {
        title: "HTML, CSS, & Web Fundamentals",
        description: "Master semantic HTML, CSS Flexbox/Grid, and responsive design principles."
      },
      {
        title: "JavaScript Deep Dive",
        description: "Learn closures, promises, async/await, DOM manipulation, and ES6+ features."
      },
      {
        title: "React.js Core",
        description: "Components, props, state, hooks, context API, and component lifecycle."
      },
      {
        title: "Advanced React & Next.js",
        description: "Server-side rendering, routing, state management (Redux/Zustand), and performance optimization."
      },
      {
        title: "Frontend System Design",
        description: "Learn how to architect large-scale frontend applications and optimize web vitals."
      }
    ]
  },
  'data-scientist': {
    title: "Data Scientist",
    targetRole: "Data Scientist",
    icon: <Database className="w-10 h-10 text-[#8E2F52]" />,
    description: "Learn Python, SQL, Machine Learning, and Statistics to break into data science.",
    duration: "6 Months",
    difficulty: "Advanced",
    modules: [
      {
        title: "Python & SQL Mastery",
        description: "Master data manipulation using Pandas, NumPy, and complex SQL queries."
      },
      {
        title: "Statistics & Probability",
        description: "Learn distributions, hypothesis testing, A/B testing, and bayesian statistics."
      },
      {
        title: "Data Visualization & EDA",
        description: "Create compelling stories with Matplotlib, Seaborn, and Tableau."
      },
      {
        title: "Machine Learning Foundations",
        description: "Supervised and unsupervised learning, regression, classification, and clustering algorithms."
      },
      {
        title: "Advanced ML & Deep Learning",
        description: "Neural networks, natural language processing (NLP), and computer vision basics."
      }
    ]
  },
  'mobile-developer': {
    title: "Mobile App Developer",
    targetRole: "Mobile Developer",
    icon: <Smartphone className="w-10 h-10 text-[#8E2F52]" />,
    description: "Build iOS and Android applications using React Native or Flutter.",
    duration: "4 Months",
    difficulty: "Beginner",
    modules: [
      {
        title: "Mobile UI/UX Principles",
        description: "Understand mobile design patterns, touch targets, and navigation flows."
      },
      {
        title: "React Native Basics",
        description: "Learn native components, styling, and basic navigation."
      },
      {
        title: "State & Data Fetching",
        description: "Manage local/global state and integrate REST/GraphQL APIs."
      },
      {
        title: "Native Device Features",
        description: "Access camera, location, push notifications, and local storage."
      },
      {
        title: "App Store Deployment",
        description: "Prepare assets, handle provisioning profiles, and publish to App Store and Google Play."
      }
    ]
  }
};

export default function PublicRoadmapPage({ params }: { params: { slug: string } }) {
  const roadmap = roadmapData[params.slug];

  if (!roadmap) {
    notFound();
  }

  return (
    <main className="relative min-h-screen bg-[#F8F5EF] overflow-x-hidden font-sans">
      {/* Global Seamless Background Gradients & Noise */}
      <div className="absolute top-0 right-0 w-[70vw] h-[70vw] bg-[radial-gradient(circle_at_center,rgba(200,154,61,0.04)_0%,transparent_60%)] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute top-[20%] left-[-10%] w-[60vw] h-[60vw] bg-[radial-gradient(circle_at_center,rgba(142,44,75,0.04)_0%,transparent_60%)] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.12] mix-blend-overlay pointer-events-none" style={{ backgroundRepeat: 'repeat' }}></div>

      <Navbar />

      <PageContainer>
        <div style={{ width: '100%', maxWidth: '1024px', margin: '0 auto' }} className="w-full pt-32 pb-24 px-6 relative z-10">
          
          {/* Breadcrumb */}
          <Link href="/roadmaps" className="inline-flex items-center text-gray-500 hover:text-[#8E2F52] font-medium mb-8 transition-colors">
            &larr; Back to all roadmaps
          </Link>

          {/* Hero Section */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm mb-12 flex flex-col md:flex-row gap-8 items-start">
            <div className="w-20 h-20 bg-[#8E2F52]/5 rounded-2xl flex items-center justify-center shrink-0">
              {roadmap.icon}
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-syne font-bold text-gray-900 mb-4 tracking-tight">
                {roadmap.title}
              </h1>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {roadmap.description}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="px-4 py-2 rounded-full bg-gray-100 text-sm font-semibold text-gray-700">
                  ⏱ {roadmap.duration}
                </div>
                <div className="px-4 py-2 rounded-full bg-gray-100 text-sm font-semibold text-gray-700">
                  🔥 {roadmap.difficulty}
                </div>
              </div>

              <Link 
                href="/signup" 
                className="inline-flex items-center justify-center bg-[#8E2F52] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#A93C5D] transition-colors shadow-sm"
              >
                Start This Roadmap <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>

          {/* Timeline Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-syne font-bold text-gray-900 mb-8 flex items-center gap-2">
              <Map className="text-[#8E2F52]" size={28} /> 
              Curriculum Journey
            </h2>

            <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm relative">
              <div className="space-y-8">
                {roadmap.modules.map((module: any, index: number) => (
                  <div key={index} className="relative flex gap-6 md:gap-8 group">
                    {/* Vertical Line */}
                    {index !== roadmap.modules.length - 1 && (
                      <div className="absolute left-[19px] top-12 bottom-[-32px] w-0.5 bg-gray-100 group-hover:bg-[#8E2F52]/20 transition-colors" />
                    )}
                    
                    {/* Node */}
                    <div className="relative z-10 bg-white pt-1">
                      <div className="w-10 h-10 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center shrink-0 border-2 border-gray-200 group-hover:border-[#8E2F52]/50 group-hover:text-[#8E2F52] transition-colors">
                        <span className="font-syne font-bold">{index + 1}</span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 bg-gray-50/50 rounded-2xl p-6 border border-gray-100 group-hover:border-[#8E2F52]/20 transition-colors">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 font-syne">{module.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{module.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="bg-[#8E2F52] rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.2] mix-blend-overlay pointer-events-none" style={{ backgroundRepeat: 'repeat' }}></div>
            
            <div style={{ width: '100%', maxWidth: '672px', margin: '0 auto' }} className="relative z-10">
              <h2 className="text-3xl font-syne font-bold text-white mb-6">Customize this roadmap with AI</h2>
              <p className="text-white/80 text-lg mb-10 leading-relaxed">
                Already know the basics? Our AI Career Coach will restructure this entire curriculum to skip what you know and focus purely on what you need to land the job.
              </p>
              <Link 
                href="/signup" 
                className="inline-flex items-center justify-center bg-white text-[#8E2F52] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors shadow-lg"
              >
                Create Free Account
              </Link>
            </div>
          </div>

        </div>
      </PageContainer>
      
      <Footer />
    </main>
  );
}
