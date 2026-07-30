import Section from '@/components/Section'
import Card from '@/components/Card'

export default function Features() {
  return (
    <Section id="features">
      <div className="w-full flex flex-col items-center z-10 relative py-10 lg:py-20">
        
        {/* Section Header */}
        <div className="text-center max-w-[800px] mb-16 lg:mb-24 px-4">
          <h2 className="text-section-title mb-6 animate-fade-in-up">
            Everything You Need <br className="hidden sm:block" />
            <span className="text-[var(--color-accent-maroon)]">To Crack Placements</span>
          </h2>
          <p className="text-body-text max-w-[650px] mx-auto text-pretty animate-fade-in-up animate-delay-1">
            Stop juggling multiple tools. Everything you need to confidently land your dream role—from AI mock interviews to personalized learning roadmaps—all in one place.
          </p>
        </div>

        {/* 2-Column Bento Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 auto-rows-fr">
          
          {/* Large Card 1: AI Resume Analyzer */}
          <Card className="md:row-span-2 flex flex-col h-full group p-8 lg:p-12 overflow-hidden" interactive>
            <div className="w-14 h-14 rounded-2xl bg-[var(--color-accent-maroon)]/10 flex items-center justify-center border border-[var(--color-accent-maroon)]/20 mb-6 group-hover:scale-110 transition-all duration-300">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[var(--color-accent-maroon)] transition-colors duration-300" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <path d="M16 13H8"></path>
                <path d="M16 17H8"></path>
                <path d="M10 9H8"></path>
              </svg>
            </div>
            <h3 className="text-card-title mb-3 tracking-wide">
              AI Resume Analyzer
            </h3>
            <p className="text-body-text text-sm md:text-base font-medium mb-10 text-pretty">
              Get instant ATS analysis, keyword optimization, and actionable resume improvements.
            </p>
            {/* Visual Decoration: ATS Score */}
            <div className="mt-auto relative w-full h-[200px] rounded-2xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] flex items-center justify-center overflow-hidden transition-all duration-500">
              <div className="relative z-10 flex items-center gap-8 transform scale-110">
                {/* Circular Progress */}
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
                    <path className="text-gray-200" strokeWidth="2.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="text-[var(--color-accent-maroon)]" strokeDasharray="92, 100" strokeWidth="2.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-text-primary leading-none">92</span>
                    <span className="text-[10px] text-text-muted mt-1 uppercase tracking-wider font-semibold">Score</span>
                  </div>
                </div>
                {/* Score Checklist */}
                <div className="flex flex-col gap-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span className="text-sm text-text-primary font-medium">Action Verbs</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span className="text-sm text-text-primary font-medium">Quantifiable Impact</span>
                  </div>
                  <div className="flex items-center gap-2.5 opacity-60">
                    <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </div>
                    <span className="text-sm text-text-primary font-medium">Missing Keywords</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Small Card 1: Personalized Roadmaps */}
          <Card className="flex flex-col h-full group p-8 lg:p-10" interactive>
            <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-gold)]/10 flex items-center justify-center border border-[var(--color-accent-gold)]/20 mb-5 transition-all duration-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[var(--color-accent-gold)] transition-colors duration-300" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <h3 className="text-card-title mb-2 transition-colors duration-300">
              Personalized Roadmaps
            </h3>
            <p className="text-body-text text-sm md:text-base mb-8">
              Generate step-by-step preparation plans perfectly tailored to your target company.
            </p>
            {/* Visual: Roadmap Flow */}
            <div className="mt-auto flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[var(--color-accent-gold)] flex items-center justify-center text-white">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <span className="text-sm font-semibold text-text-primary">Resume Setup</span>
              </div>
              <div className="w-[2px] h-3 bg-[var(--color-accent-gold)]/20 ml-2.5"></div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[var(--color-accent-gold)] flex items-center justify-center text-white">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <span className="text-sm font-semibold text-text-primary">Data Structures</span>
              </div>
              <div className="w-[2px] h-3 bg-gray-200 ml-2.5"></div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-gray-200 bg-white flex items-center justify-center"></div>
                <span className="text-sm font-semibold text-text-muted">Mock Interview</span>
              </div>
            </div>
          </Card>

          {/* Small Card 2: DSA Progress Tracker */}
          <Card className="flex flex-col h-full group p-8 lg:p-10" interactive>
            <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-gold)]/10 flex items-center justify-center border border-[var(--color-accent-gold)]/20 mb-5 transition-all duration-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[var(--color-accent-gold)] transition-colors duration-300" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
            <h3 className="text-card-title mb-2 transition-colors duration-300">
              DSA Progress Tracker
            </h3>
            <p className="text-body-text text-sm md:text-base mb-8">
              Track solved problems, study streaks, and identify your weak topics instantly.
            </p>
            {/* Visual: Mini Progress Bars */}
            <div className="mt-auto space-y-4">
              <div>
                <div className="flex justify-between text-[11px] text-text-secondary mb-1.5 font-semibold tracking-wide">
                  <span>Arrays & Hashing</span>
                  <span className="text-[var(--color-accent-gold)]">85%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--color-accent-gold)] rounded-full group-hover:w-[85%] w-[40%] transition-all duration-1000 ease-out" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] text-text-secondary mb-1.5 font-semibold tracking-wide">
                  <span>Graphs & Trees</span>
                  <span className="text-[var(--color-accent-gold)]">60%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--color-accent-gold)] rounded-full group-hover:w-[60%] w-[20%] transition-all duration-1000 ease-out" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] text-text-secondary mb-1.5 font-semibold tracking-wide">
                  <span>Dynamic Programming</span>
                  <span className="text-[var(--color-accent-gold)]">40%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--color-accent-gold)] rounded-full group-hover:w-[40%] w-[10%] transition-all duration-1000 ease-out" />
                </div>
              </div>
            </div>
          </Card>

          {/* Small Card 3: Company Preparation */}
          <Card className="flex flex-col h-full group p-8 lg:p-10" interactive>
            <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-maroon)]/10 flex items-center justify-center border border-[var(--color-accent-maroon)]/20 mb-5 transition-all duration-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[var(--color-accent-maroon)] transition-colors duration-300" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </div>
            <h3 className="text-card-title mb-2 transition-colors duration-300">
              Company Preparation
            </h3>
            <p className="text-body-text text-sm md:text-base mb-6">
              Access curated questions and architectural patterns asked by top tech companies.
            </p>
            {/* Visual: Company Chips */}
            <div className="mt-auto flex flex-wrap gap-2.5">
              <div className="px-4 py-2 rounded-full bg-white border border-[var(--color-border)] text-sm font-semibold text-text-primary group-hover:border-[var(--color-accent-maroon)] group-hover:bg-[var(--color-accent-maroon)]/10 transition-all duration-300">Google</div>
              <div className="px-4 py-2 rounded-full bg-white border border-[var(--color-border)] text-sm font-semibold text-text-primary group-hover:border-[var(--color-accent-maroon)] group-hover:bg-[var(--color-accent-maroon)]/10 transition-all duration-300 delay-75">Amazon</div>
              <div className="px-4 py-2 rounded-full bg-white border border-[var(--color-border)] text-sm font-semibold text-text-primary group-hover:border-[var(--color-accent-maroon)] group-hover:bg-[var(--color-accent-maroon)]/10 transition-all duration-300 delay-150">Microsoft</div>
              <div className="px-4 py-2 rounded-full bg-gray-50 border border-black/5 text-sm font-semibold text-text-muted">+120 more</div>
            </div>
          </Card>

          {/* Large Card 2: AI Mock Interview */}
          <Card className="md:row-span-2 flex flex-col h-full group p-8 lg:p-12 overflow-hidden" interactive>
            <div className="w-14 h-14 rounded-2xl bg-[var(--color-accent-maroon)]/10 flex items-center justify-center border border-[var(--color-accent-maroon)]/20 mb-6 group-hover:scale-110 transition-all duration-300">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[var(--color-accent-maroon)] transition-colors duration-300" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z"></path>
                <rect x="3" y="6" width="12" height="12" rx="2" ry="2"></rect>
              </svg>
            </div>
            <h3 className="text-card-title mb-3 tracking-wide">
              AI Mock Interview
            </h3>
            <p className="text-body-text text-sm md:text-base font-medium mb-10 text-pretty">
              Practice realistic technical and HR interviews with real-time feedback and behavioral analysis.
            </p>
            {/* Visual Decoration: Audio Wave Form */}
            <div className="mt-auto relative w-full h-[200px] rounded-2xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] flex flex-col items-center justify-center overflow-hidden transition-all duration-500">
              
              <div className="relative z-10 w-20 h-20 rounded-full bg-white border border-[var(--color-border)] flex items-center justify-center shadow-sm">
                <div className="w-14 h-14 rounded-full bg-[var(--color-accent-maroon)] flex items-center justify-center shadow-md">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" y1="19" x2="12" y2="22"></line>
                  </svg>
                </div>
              </div>
              
              {/* Audio waves visual */}
              <div className="absolute top-1/2 -translate-y-1/2 left-6 sm:left-14 flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-2.5 h-6 bg-[var(--color-accent-gold)] rounded-full animate-[ping_1.5s_ease-in-out_infinite_alternate]"></div>
                <div className="w-2.5 h-12 bg-[var(--color-accent-gold)] rounded-full animate-[ping_1.2s_ease-in-out_infinite_alternate]" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2.5 h-8 bg-[var(--color-accent-gold)] rounded-full animate-[ping_1.8s_ease-in-out_infinite_alternate]" style={{ animationDelay: '300ms' }}></div>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-6 sm:right-14 flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-2.5 h-7 bg-[var(--color-accent-gold)] rounded-full animate-[ping_1.6s_ease-in-out_infinite_alternate]" style={{ animationDelay: '200ms' }}></div>
                <div className="w-2.5 h-14 bg-[var(--color-accent-gold)] rounded-full animate-[ping_1.1s_ease-in-out_infinite_alternate]" style={{ animationDelay: '50ms' }}></div>
                <div className="w-2.5 h-5 bg-[var(--color-accent-gold)] rounded-full animate-[ping_1.4s_ease-in-out_infinite_alternate]" style={{ animationDelay: '250ms' }}></div>
              </div>
            </div>
          </Card>

          {/* Small Card 4: Analytics Dashboard */}
          <Card className="flex flex-col h-full group p-8 lg:p-10" interactive>
            <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-gold)]/10 flex items-center justify-center border border-[var(--color-accent-gold)]/20 mb-5 transition-all duration-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[var(--color-accent-gold)] transition-colors duration-300" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
            </div>
            <h3 className="text-card-title mb-2 transition-colors duration-300">
              Analytics Dashboard
            </h3>
            <p className="text-body-text text-sm md:text-base mb-6">
              Monitor preparation progress with beautiful visual insights and performance metrics.
            </p>
            {/* Visual: Area Line Chart */}
            <div className="mt-auto relative w-full h-20">
              <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none" className="text-[var(--color-accent-gold)] absolute bottom-0 left-0 w-full h-full">
                {/* Area Fill */}
                <path d="M0 40 Q 15 25 30 35 T 60 15 T 100 5 L 100 40 Z" fill="currentColor" fillOpacity="0.15" className="group-hover:fill-opacity-30 transition-opacity duration-300" />
                {/* Chart Line */}
                <path d="M0 40 Q 15 25 30 35 T 60 15 T 100 5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="transition-all duration-300" />
              </svg>
            </div>
          </Card>

        </div>
      </div>
    </Section>
  )
}
