import Button from '@/components/Button'


export default function Hero() {
  return (
    <section id="hero" className="w-full max-w-[1440px] mx-auto px-[clamp(24px,5vw,80px)] relative z-10 pt-16 lg:pt-24 pb-32">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,52fr)_minmax(0,48fr)] items-center gap-16 lg:gap-32 w-full relative z-10">
        
        {/* LEFT COLUMN */}
        <div className="w-full flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="mb-6 animate-fade-in-up">
            <span className="text-sm sm:text-base font-bold uppercase tracking-[0.2em] text-[var(--color-accent-maroon)]">AI Placement Platform for Engineering Students</span>
          </div>

          <h1 className="text-hero-title mb-6 max-w-[600px] animate-fade-in-up animate-delay-1">
            Master your <br />
            <span className="text-[var(--color-accent-maroon)]">tech interviews</span> <br />
            with AI precision
          </h1>

          <p className="text-body-text mb-12 max-w-[540px] animate-fade-in-up animate-delay-2 text-pretty leading-[1.8]">
            The ultimate placement preparation platform. Get personalized roadmaps, realistic AI mock interviews, and instantly graded resumes to land your dream job faster.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-14 w-full sm:w-auto animate-fade-in-up animate-delay-3">
            <Button variant="primary" className="group w-full sm:w-auto h-[56px] px-10 text-lg">
              Start Preparing Free
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="transition-transform duration-300 group-hover:translate-x-1 ml-2">
                <path d="M3 9H15M15 9L10 4M15 9L10 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
            <Button variant="secondary" className="w-full sm:w-auto h-[56px] px-10 text-lg" href="#features">
              How it works
            </Button>
          </div>

          {/* Statistics */}
          <div className="flex flex-row items-center justify-center lg:justify-between gap-8 sm:gap-12 lg:gap-0 pt-10 border-t border-[var(--color-border)] w-full max-w-[520px] animate-fade-in-up animate-delay-4">
            <div className="flex flex-col gap-1.5 items-center lg:items-start">
              <span className="font-sans font-bold text-[clamp(1.75rem,3vw,2.25rem)] text-text-primary tracking-tight leading-none">10K+</span>
              <span className="text-small-text">Active Students</span>
            </div>
            <div className="flex flex-col gap-1.5 items-center lg:items-start">
              <span className="font-sans font-bold text-[clamp(1.75rem,3vw,2.25rem)] text-text-primary tracking-tight leading-none">95%</span>
              <span className="text-small-text">Interview Success</span>
            </div>
            <div className="flex flex-col gap-1.5 items-center lg:items-start">
              <span className="font-sans font-bold text-[clamp(1.75rem,3vw,2.25rem)] text-text-primary tracking-tight leading-none">200+</span>
              <span className="text-small-text">Companies</span>
            </div>
          </div>
        </div>
        
        {/* RIGHT COLUMN */}
        <div className="w-full flex items-center justify-center lg:justify-end animate-fade-in-up animate-delay-2 mt-12 lg:mt-0">
          
          <div className="relative w-full max-w-[600px]">
            {/* Dashboard Card - Explicitly dark theme for contrast per user request */}
            <div className="relative shadow-[0_30px_120px_20px_rgba(0,0,0,0.1),0_10px_40px_rgba(0,0,0,0.05)] border border-white/[0.08] p-6 sm:p-8 z-10 w-full rounded-[24px] bg-[#0a0a12] text-white transition-all duration-300 hover:-translate-y-1">
              
              {/* Dashboard Header */}
              <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row gap-4 mb-6 pb-6 border-b border-white/[0.06]">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-[14px] bg-gradient-to-br from-[var(--color-accent-purple)] to-[#4B3DE5] flex items-center justify-center shadow-md shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20v-6M6 20V10M18 20V4"/></svg>
                  </div>
                  <div>
                    <div className="text-base font-semibold text-white tracking-wide">DSA Progress</div>
                    <div className="text-sm text-gray-400 mt-0.5">Week 4 • Dynamic Programming</div>
                  </div>
                </div>
                
                <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:gap-0.5">
                  <div className="text-sm sm:text-base font-semibold text-white">
                    Resume Score <span className="text-[#8E2C4B] font-bold ml-1">92</span>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400">Top 5% Bracket</div>
                </div>
              </div>

              {/* Statistics Cards */}
              <div className="grid grid-cols-2 gap-5 mb-6">
                <div className="rounded-[16px] p-5 bg-white/[0.03] border border-white/[0.05] transition-all duration-300 hover:bg-white/[0.05] hover:-translate-y-0.5 hover:shadow-lg">
                  <div className="text-sm text-gray-400 mb-2 font-medium">Problems Solved</div>
                  <div className="font-sans font-bold text-4xl text-white">124</div>
                  <div className="mt-4 h-2 w-full bg-white/[0.05] rounded-full overflow-hidden">
                    <div className="h-full bg-[#C89A3D] w-[68%] rounded-full" />
                  </div>
                </div>
                <div className="rounded-[16px] p-5 bg-white/[0.03] border border-white/[0.05] transition-all duration-300 hover:bg-white/[0.05] hover:-translate-y-0.5 hover:shadow-lg">
                  <div className="text-sm text-gray-400 mb-2 font-medium">Mock Interviews</div>
                  <div className="font-sans font-bold text-4xl text-white">12</div>
                  <div className="mt-4 h-2 w-full bg-white/[0.05] rounded-full overflow-hidden">
                    <div className="h-full bg-[#8E2C4B] w-[85%] rounded-full" />
                  </div>
                </div>
              </div>

              {/* AI Assistant */}
              <div className="rounded-[16px] p-5 bg-gradient-to-r from-[#8E2C4B]/10 to-transparent border border-[#8E2C4B]/20 mb-6 transition-all duration-300 hover:border-[#8E2C4B]/30">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#8E2C4B]/20 border border-[#8E2C4B]/30 flex items-center justify-center flex-shrink-0 text-[#8E2C4B] mt-0.5">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[#8E2C4B] font-bold text-sm mb-1">AI Assistant</h4>
                    <p className="text-sm text-gray-200 leading-relaxed font-medium mb-4 text-pretty">
                      &quot;Your graph traversal speed has improved by 40%. Focus on Dynamic Programming this week.&quot;
                    </p>
                    
                    <button className="flex flex-col items-start w-full sm:w-auto text-left bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.05] hover:border-white/[0.1] rounded-[12px] py-2.5 px-4 transition-all duration-200 group">
                      <span className="flex items-center gap-2 text-sm font-semibold text-white group-hover:text-[#C89A3D] transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        Google Mock Interview
                      </span>
                      <span className="text-xs text-gray-400 mt-1 ml-6">
                        Tomorrow • 7:00 PM
                      </span>
                    </button>
                    
                  </div>
                </div>
              </div>

              {/* Upcoming Interview */}
              <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-white tracking-wide">Google Mock Interview</div>
                    <div className="text-xs text-gray-400 mt-1">Tomorrow • 7:00 PM</div>
                  </div>
                </div>
                <div className="bg-white/10 text-gray-300 border border-white/10 font-medium px-3 py-1 text-xs rounded-full">Scheduled</div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
