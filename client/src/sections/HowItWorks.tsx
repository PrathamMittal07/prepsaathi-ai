'use client'

import { useEffect, useState, useRef } from 'react'
import Section from '@/components/Section'
import Card from '@/components/Card'

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate scroll relative to the middle of the screen
      // Start when the top of the timeline reaches 60% of viewport
      const startOffset = windowHeight * 0.6
      const currentScroll = startOffset - rect.top
      
      // Total scrollable distance is the height minus some padding
      const totalScroll = rect.height - 100
      
      let percentage = (currentScroll / totalScroll) * 100
      if (percentage < 0) percentage = 0
      if (percentage > 100) percentage = 100
      
      setProgress(percentage)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const steps = [
    {
      title: 'Create Your Account',
      desc: 'Sign up and define your placement goals in just a few clicks.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
      ),
      visual: (
        <div className="mt-8 flex flex-col gap-2 p-4 rounded-xl bg-gray-50 border border-black/5">
          <div className="w-full h-8 rounded-md bg-white border border-black/5 flex items-center px-3">
            <span className="text-[10px] text-gray-400 font-medium">Name</span>
          </div>
          <div className="w-full h-8 rounded-md bg-white border border-black/5 flex items-center px-3">
            <span className="text-[10px] text-gray-400 font-medium">Email</span>
          </div>
          <div className="w-full h-8 rounded-md bg-white border border-black/5 flex items-center px-3">
            <span className="text-[10px] text-gray-400 font-medium">Password</span>
          </div>
          <div className="w-full h-8 rounded-md bg-[var(--color-accent-maroon)] text-white shadow-sm flex items-center justify-center mt-2">
            <span className="text-xs font-semibold flex items-center gap-1.5 tracking-wide">
              Create Account
            </span>
          </div>
        </div>
      )
    },
    {
      title: 'Choose Target Company',
      desc: 'Select your dream company or role to receive personalized preparation.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
      ),
      visual: (
        <div className="mt-8 flex flex-wrap gap-2.5">
          <div className="px-4 py-2 rounded-full bg-white border border-black/10 text-xs font-semibold text-text-primary shadow-sm hover:border-[var(--color-accent-maroon)] transition-colors">Amazon</div>
          <div className="px-4 py-2 rounded-full bg-white border border-black/10 text-xs font-semibold text-text-primary shadow-sm hover:border-[var(--color-accent-maroon)] transition-colors">Google</div>
          <div className="px-4 py-2 rounded-full bg-white border border-black/10 text-xs font-semibold text-text-primary shadow-sm hover:border-[var(--color-accent-maroon)] transition-colors">Microsoft</div>
          <div className="px-4 py-2 rounded-full bg-[var(--color-accent-maroon)] border border-transparent text-xs font-bold text-white shadow-md">Adobe</div>
          <div className="px-4 py-2 rounded-full bg-white border border-black/10 text-xs font-semibold text-text-primary shadow-sm hover:border-[var(--color-accent-maroon)] transition-colors">Meta</div>
        </div>
      )
    },
    {
      title: 'Generate AI Roadmap',
      desc: 'Automatically build a preparation roadmap tailored exactly to your goals.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
      ),
      visual: (
        <div className="mt-8 flex flex-col gap-2 px-2">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-[var(--color-accent-gold)] flex items-center justify-center text-white shadow-sm"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
            <span className="text-sm font-semibold text-text-primary">Resume Optimization</span>
          </div>
          <div className="w-0.5 h-3 bg-[var(--color-accent-gold)] ml-2.5"></div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-[var(--color-accent-gold)] flex items-center justify-center text-white shadow-sm"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
            <span className="text-sm font-semibold text-text-primary">Data Structures</span>
          </div>
          <div className="w-0.5 h-3 bg-gray-200 ml-2.5"></div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full border-2 border-[var(--color-accent-gold)] bg-white flex items-center justify-center shadow-sm"></div>
            <span className="text-sm font-semibold text-text-primary">Core CS Subjects</span>
          </div>
          <div className="w-0.5 h-3 bg-gray-200 ml-2.5"></div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full border-2 border-gray-200 bg-white flex items-center justify-center"></div>
            <span className="text-sm font-semibold text-text-muted">Mock Interviews</span>
          </div>
        </div>
      )
    },
    {
      title: 'Practice Smarter',
      desc: 'Complete DSA challenges, AI mock interviews, and resume analysis.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
      ),
      visual: (
        <div className="mt-8 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-[#E8E2DA] shadow-sm hover:border-[var(--color-accent-gold)] transition-colors">
            <div className="p-1.5 rounded-md bg-[var(--color-accent-gold)]/10 text-[var(--color-accent-gold)]"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg></div>
            <span className="text-xs font-semibold text-text-primary">DSA</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-[#E8E2DA] shadow-sm hover:border-[var(--color-accent-maroon)] transition-colors">
            <div className="p-1.5 rounded-md bg-[var(--color-accent-maroon)]/10 text-[var(--color-accent-maroon)]"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z"></path></svg></div>
            <span className="text-xs font-semibold text-text-primary">Mock</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-[#E8E2DA] shadow-sm hover:border-[var(--color-accent-maroon)] transition-colors">
            <div className="p-1.5 rounded-md bg-[var(--color-accent-maroon)]/10 text-[var(--color-accent-maroon)]"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path></svg></div>
            <span className="text-xs font-semibold text-text-primary">Resume</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-[#E8E2DA] shadow-sm hover:border-[var(--color-accent-maroon)] transition-colors">
            <div className="p-1.5 rounded-md bg-[var(--color-accent-maroon)]/10 text-[var(--color-accent-maroon)]"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect></svg></div>
            <span className="text-xs font-semibold text-text-primary">Company</span>
          </div>
        </div>
      )
    },
    {
      title: 'Track Your Progress',
      desc: 'Monitor preparation through visual dashboards and continuously improve.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
      ),
      visual: (
        <div className="mt-8 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="text-xs text-text-secondary w-[64px] font-bold uppercase tracking-wider">DSA</span>
            <div className="h-2.5 bg-gray-100 rounded-full w-full overflow-hidden shadow-inner">
               <div className="h-full bg-[var(--color-accent-gold)] rounded-full w-[45%]"></div>
            </div>
            <span className="text-xs font-bold text-text-primary">45%</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-text-secondary w-[64px] font-bold uppercase tracking-wider">Resume</span>
            <div className="h-2.5 bg-gray-100 rounded-full w-full overflow-hidden shadow-inner">
               <div className="h-full bg-[var(--color-accent-maroon)] rounded-full w-[82%]"></div>
            </div>
            <span className="text-xs font-bold text-text-primary">82%</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-text-secondary w-[64px] font-bold uppercase tracking-wider">Mock</span>
            <div className="h-2.5 bg-gray-100 rounded-full w-full overflow-hidden shadow-inner">
               <div className="h-full bg-[var(--color-accent-gold)] rounded-full w-[60%]"></div>
            </div>
            <span className="text-xs font-bold text-text-primary">60%</span>
          </div>
        </div>
      )
    }
  ]

  return (
    <Section id="how-it-works">
      <div className="w-full flex flex-col items-center z-10 relative py-12 lg:py-24">
        
        {/* Section Header */}
        <div className="text-center max-w-[800px] mb-24 px-4">
          <h2 className="text-section-title mb-6 animate-fade-in-up">
            How Prep2Place <span className="text-[var(--color-accent-maroon)]">Works</span>
          </h2>
          <p className="text-body-text max-w-[650px] mx-auto text-pretty animate-fade-in-up animate-delay-1">
            Get started in minutes. Prep2Place guides you from your first login to becoming interview-ready through a personalized AI-powered workflow.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative w-full max-w-[1100px] mx-auto" ref={containerRef}>
          
          {/* Base Lines */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-4 bottom-[40px] w-[2px] bg-[var(--color-border)] rounded-full animate-fade-in-up z-0"></div>
          <div className="block lg:hidden absolute left-[39px] sm:left-[47px] top-4 bottom-[40px] w-[2px] bg-[var(--color-border)] rounded-full animate-fade-in-up z-0"></div>

          {/* Animated Progress Lines */}
          <div 
            className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-4 w-[2px] bg-[var(--color-accent-maroon)] rounded-full z-0 transition-all duration-300 ease-out shadow-[0_0_12px_rgba(142,44,75,0.4)]"
            style={{ height: `calc(${progress}% - 40px)` }}
          ></div>
          <div 
            className="block lg:hidden absolute left-[39px] sm:left-[47px] top-4 w-[2px] bg-[var(--color-accent-maroon)] rounded-full z-0 transition-all duration-300 ease-out shadow-[0_0_12px_rgba(142,44,75,0.4)]"
            style={{ height: `calc(${progress}% - 40px)` }}
          ></div>

          <div className="flex flex-col gap-24 lg:gap-20 pb-16 relative z-10">
            {steps.map((step, index) => {
              // Calculate rough activation point for each step
              const stepActivationPoint = (index / steps.length) * 100
              const isActive = progress >= stepActivationPoint - 5

              return (
                <div 
                  key={index} 
                  className={`relative flex items-center w-full group animate-fade-in-up
                    lg:justify-between lg:even:flex-row-reverse`}
                >
                  
                  {/* Timeline Node / Icon */}
                  <div className={`absolute flex items-center justify-center
                    left-[24px] sm:left-[32px] lg:left-1/2 transform -translate-x-1/2 
                    w-14 h-14 rounded-full bg-white border-[3px] 
                    transition-all duration-500 shadow-sm z-20
                    ${isActive 
                      ? 'border-[var(--color-accent-maroon)] text-[var(--color-accent-maroon)] scale-110 shadow-[0_0_20px_rgba(142,44,75,0.2)]' 
                      : 'border-[var(--color-border)] text-gray-400 group-hover:border-[var(--color-accent-maroon)]/40 group-hover:text-[var(--color-accent-maroon)]'
                    }`}
                  >
                    <div className="relative z-10 bg-white rounded-full w-full h-full flex items-center justify-center">{step.icon}</div>
                  </div>
                  
                  {/* Connector Line (Horizontal) - Desktop only */}
                  <div className={`hidden lg:block absolute top-1/2 -translate-y-1/2 w-[calc(50%-28px)] h-[2px] transition-all duration-700 z-10
                    ${isActive ? 'bg-[var(--color-accent-maroon)] opacity-100' : 'bg-[var(--color-border)] opacity-30'}
                    ${index % 2 !== 0 ? 'right-1/2' : 'left-1/2'}`}
                  ></div>

                  {/* Content Card */}
                  <div className={`w-full pl-[90px] sm:pl-[110px] lg:pl-0 lg:w-[calc(50%-60px)]`}>
                    <Card 
                      className={`p-8 lg:p-12 h-full transition-all duration-700 ${isActive ? 'shadow-[0_20px_60px_rgba(0,0,0,0.08)] border-[#D1C9BE] -translate-y-1' : ''}`}
                      interactive
                    >
                      {/* Number Badge */}
                      <div className={`mb-6 inline-flex items-center justify-center w-10 h-10 rounded-full text-base font-bold tracking-widest transition-colors duration-500
                        ${isActive ? 'bg-[var(--color-accent-maroon)] text-white shadow-md' : 'bg-[var(--color-accent-maroon)]/10 text-[var(--color-accent-maroon)]'}`}
                      >
                        0{index + 1}
                      </div>
                      
                      <h3 className={`text-2xl font-sans font-bold tracking-tight mb-4 transition-colors duration-500 ${isActive ? 'text-[var(--color-accent-maroon)]' : 'text-text-primary'}`}>
                        {step.title}
                      </h3>
                      <p className="text-body-text text-base md:text-lg mb-4 leading-[1.7]">
                        {step.desc}
                      </p>
                      
                      {/* Meaningful Mini Visualization */}
                      <div className={`w-full transition-all duration-700 ${isActive ? 'opacity-100 transform-none' : 'opacity-60 translate-y-2'}`}>
                        {step.visual}
                      </div>
                    </Card>
                  </div>

                </div>
              )
            })}
            
            {/* Final Destination / Completion Node */}
            <div className={`relative flex flex-col items-center justify-center w-full mt-8 lg:mt-12 transition-all duration-1000 ${progress >= 95 ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`}>
              <div className="relative z-10 w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-sm">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-md z-10 border-[4px] border-white transition-colors duration-1000
                  ${progress >= 95 ? 'bg-[var(--color-accent-maroon)]' : 'bg-gray-300'}`}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                {progress >= 95 && (
                  <div className="absolute inset-0 rounded-full border-4 border-[var(--color-accent-maroon)] animate-[ping_2s_ease-out_infinite] opacity-20"></div>
                )}
              </div>
              <h3 className={`text-2xl font-sans font-bold mt-6 tracking-wide transition-colors duration-500 ${progress >= 95 ? 'text-text-primary' : 'text-gray-400'}`}>Interview Ready</h3>
              <p className="text-text-secondary text-base mt-2">Apply with confidence.</p>
            </div>

          </div>

        </div>
      </div>
    </Section>
  )
}
