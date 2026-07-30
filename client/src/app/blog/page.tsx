'use client'

import React from 'react';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import PageContainer from '@/components/PageContainer';
import Link from 'next/link';
import { ArrowRight, Calendar, User } from 'lucide-react';

export default function Blog() {
  const posts = [
    {
      title: "How to Beat the ATS: A Technical Deep Dive",
      excerpt: "Applicant Tracking Systems are misunderstood. Here is exactly how they parse your resume and how to format it perfectly.",
      category: "Resume Tips",
      author: "Pratham",
      date: "Jul 28, 2026",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800&h=400"
    },
    {
      title: "The Ultimate Guide to System Design Interviews",
      excerpt: "Breaking down the exact framework you need to answer any system design question at FAANG companies.",
      category: "Interview Prep",
      author: "Alex",
      date: "Jul 25, 2026",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800&h=400"
    },
    {
      title: "Why Your Cold Emails Are Being Ignored",
      excerpt: "Stop using generic templates. Learn the psychological triggers that actually get recruiters to reply to your DMs.",
      category: "Networking",
      author: "Sarah",
      date: "Jul 20, 2026",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1557425955-df376b5903c8?auto=format&fit=crop&q=80&w=800&h=400"
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
        <div style={{ width: '100%', maxWidth: '1152px', margin: '0 auto' }} className="w-full pt-32 pb-24 px-6">
          
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-syne font-bold text-gray-900 mb-6">The Prep2Place Blog</h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              Insights, strategies, and deep-dives on how to navigate the modern tech recruiting landscape.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {posts.map((post, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition-shadow flex flex-col h-full">
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#8E2F52] uppercase tracking-wider">
                    {post.category}
                  </div>
                  {/* Using standard img for external placeholder images */}
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-syne font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#8E2F52] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-3 text-sm flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="mt-24 bg-[#8E2F52] rounded-3xl p-10 md:p-12 relative overflow-hidden text-center z-10">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.2] mix-blend-overlay pointer-events-none" style={{ backgroundRepeat: 'repeat' }}></div>
            <div style={{ width: '100%', maxWidth: '672px', margin: '0 auto' }} className="w-full relative z-10">
              <h2 className="text-3xl font-syne font-bold text-white mb-4">Never miss an update</h2>
              <p className="text-white/80 mb-8 text-lg">Get our latest career strategies delivered straight to your inbox once a week.</p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-grow px-5 py-3.5 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button type="submit" className="bg-gray-900 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-gray-800 transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

        </div>
      </PageContainer>
      
      <Footer />
    </main>
  );
}
