'use client'

import React, { useState } from 'react';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import PageContainer from '@/components/PageContainer';
import { Mail, MapPin, Send } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactUs() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you shortly.");
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <main className="relative min-h-screen bg-[#F8F5EF] overflow-x-hidden">
      {/* Global Seamless Background Gradients & Noise */}
      <div className="absolute top-0 right-0 w-[70vw] h-[70vw] bg-[radial-gradient(circle_at_center,rgba(200,154,61,0.04)_0%,transparent_60%)] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute top-[20%] left-[-10%] w-[60vw] h-[60vw] bg-[radial-gradient(circle_at_center,rgba(142,44,75,0.04)_0%,transparent_60%)] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.12] mix-blend-overlay pointer-events-none" style={{ backgroundRepeat: 'repeat' }}></div>

      <Navbar />

      <PageContainer>
        <div className="pt-32 pb-24 max-w-6xl mx-auto px-6">
          
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-syne font-bold text-gray-900 mb-6">Get in touch</h1>
            <p className="text-xl text-gray-600">
              Have a question about our AI tools? Want to report a bug? Or just want to say hi? We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-12 max-w-5xl mx-auto relative z-10">
            {/* Contact Info */}
            <div className="md:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-syne font-bold text-gray-900 mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#8E2F52]/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-[#8E2F52]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-1">Email us</p>
                      <a href="mailto:support@prep2place.com" className="text-gray-600 hover:text-[#8E2F52] transition-colors">
                        support@prep2place.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#8E2F52]/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#8E2F52]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-1">Location</p>
                      <p className="text-gray-600">
                        Remote globally,<br/>
                        Built with passion.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium text-gray-900">First Name</label>
                      <input 
                        type="text" 
                        id="firstName" 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8E2F52]/20 focus:border-[#8E2F52] transition-all bg-gray-50/50"
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium text-gray-900">Last Name</label>
                      <input 
                        type="text" 
                        id="lastName" 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8E2F52]/20 focus:border-[#8E2F52] transition-all bg-gray-50/50"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-900">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8E2F52]/20 focus:border-[#8E2F52] transition-all bg-gray-50/50"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-900">Message</label>
                    <textarea 
                      id="message" 
                      rows={5}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8E2F52]/20 focus:border-[#8E2F52] transition-all bg-gray-50/50 resize-none"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-[#8E2F52] text-white py-3.5 px-6 rounded-xl font-medium hover:bg-[#A93C5D] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

        </div>
      </PageContainer>
      
      <Footer />
    </main>
  );
}
