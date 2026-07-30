import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8F5EF] flex items-center justify-center relative overflow-hidden px-6 lg:px-20 py-12">
      
      {/* Seamless Global Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_center,rgba(217,164,65,0.03)_0%,transparent_70%)] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_center,rgba(142,47,82,0.03)_0%,transparent_70%)] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay pointer-events-none"></div>

      {/* Main Centered Container */}
      <div className="w-full max-w-[1400px] mx-auto flex flex-col md:grid md:grid-cols-[1fr_520px] gap-10 md:gap-[72px] relative z-10 items-start">
        
        {/* Faint Divider (Desktop only) */}
        <div className="hidden md:block absolute left-[calc(100%-520px-(72px/2))] top-0 bottom-0 w-[1px] bg-[rgba(120,100,70,0.06)] pointer-events-none"></div>

        {/* Left Column: Branding & Features */}
        <div className="hidden md:flex flex-col w-full">
          
          <Link href="/" className="flex items-center gap-3.5 group mb-[32px]">
            <div className="relative w-10 h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <div className="absolute inset-0 rounded-[12px] bg-[#8E2F52] rotate-3 opacity-90 transition-transform duration-300 group-hover:rotate-6"></div>
              <div className="absolute inset-0 rounded-[12px] border-[2.5px] border-[#D9A441] -rotate-3 transition-transform duration-300 group-hover:-rotate-6 bg-white/20 backdrop-blur-sm"></div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="relative z-10 text-white" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h6a6 6 0 0 1 0 12H4V4z"></path>
                <path d="M4 16h6"></path>
              </svg>
            </div>
            <span className="font-sans font-extrabold text-[22px] tracking-tight text-[#1E1E1E] transition-colors">
              Prep2Place
            </span>
          </Link>

          {/* Headline block aligns with top of right card */}
          <div className="flex flex-col">
            <h1 className="text-[64px] font-sans font-bold text-[#1E1E1E] mb-[24px] tracking-tight leading-[1.05]">
              Your AI <br/>
              Placement Partner.
            </h1>
            <p className="text-[#555555] text-[22px] mb-[48px] max-w-[520px] leading-[1.6]">
              Everything you need to confidently land your dream role, all in one place.
            </p>
          </div>

          {/* Elegant Journey Showcase */}
          <div className="relative bg-white/60 backdrop-blur-xl border border-white/80 rounded-[28px] p-[36px] shadow-[0_20px_50px_rgba(0,0,0,0.04)] max-w-[520px]">
            <div className="flex flex-col gap-[28px]">
              
              {/* Step 1 */}
              <div className="flex items-center gap-6 group animate-fade-in-up">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-[rgba(80,60,40,0.08)] flex items-center justify-center text-[#1D1D1D] transition-transform duration-300 group-hover:scale-110">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                </div>
                <div>
                  <div className="text-[18px] font-semibold text-[#1E1E1E] mb-1 tracking-wide">Resume Analysis</div>
                  <div className="text-[15px] text-[#555555]">ATS optimization & grading</div>
                </div>
              </div>

              {/* Connector */}
              <div className="w-[1px] h-6 bg-gradient-to-b from-[#E8E2DA] to-[#8E2F52]/20 ml-6 -my-4 animate-pulse"></div>

              {/* Step 2 */}
              <div className="flex items-center gap-6 group animate-fade-in-up animate-delay-1">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-[rgba(80,60,40,0.08)] flex items-center justify-center text-[#8E2F52] transition-transform duration-300 group-hover:scale-110 relative">
                  <div className="absolute inset-0 rounded-2xl bg-[#8E2F52]/5 animate-[pulse_3s_ease-in-out_infinite]"></div>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                </div>
                <div>
                  <div className="text-[18px] font-semibold text-[#1E1E1E] mb-1 tracking-wide">AI Roadmap</div>
                  <div className="text-[15px] text-[#555555]">Personalized company paths</div>
                </div>
              </div>

              {/* Connector */}
              <div className="w-[1px] h-6 bg-gradient-to-b from-[#8E2F52]/20 to-[#D9A441]/20 ml-6 -my-4 animate-pulse"></div>

              {/* Step 3 */}
              <div className="flex items-center gap-6 group animate-fade-in-up animate-delay-2">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-[rgba(80,60,40,0.08)] flex items-center justify-center text-[#D9A441] transition-transform duration-300 group-hover:scale-110">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                </div>
                <div>
                  <div className="text-[18px] font-semibold text-[#1E1E1E] mb-1 tracking-wide">DSA Tracker</div>
                  <div className="text-[15px] text-[#555555]">Progress & pattern mastering</div>
                </div>
              </div>

              {/* Connector */}
              <div className="w-[1px] h-6 bg-gradient-to-b from-[#D9A441]/20 to-green-500/20 ml-6 -my-4 animate-pulse"></div>

              {/* Step 4 */}
              <div className="flex items-center gap-6 group animate-fade-in-up animate-delay-3">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-[rgba(80,60,40,0.08)] flex items-center justify-center text-green-600 transition-transform duration-300 group-hover:scale-110 relative">
                  <div className="absolute inset-0 rounded-2xl bg-green-500/5 animate-[pulse_2s_ease-in-out_infinite]"></div>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <div>
                  <div className="text-[18px] font-semibold text-[#1E1E1E] mb-1 tracking-wide">Placement Ready</div>
                  <div className="text-[15px] text-[#555555]">Confident & prepared</div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column: Auth Forms */}
        <div className="w-full flex justify-center md:justify-end md:mt-[72px]">
          {/* Logo only on mobile */}
          <div className="md:hidden flex items-center justify-center gap-2 mb-8 absolute top-8 left-0 right-0">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-[10px] bg-[#8E2F52] rotate-3 opacity-90"></div>
              <div className="absolute inset-0 rounded-[10px] border-2 border-[#D9A441] -rotate-3 bg-white/20 backdrop-blur-sm"></div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="relative z-10 text-white" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h6a6 6 0 0 1 0 12H4V4z"></path>
                <path d="M4 16h6"></path>
              </svg>
            </div>
          </div>
          
          <div className="w-full max-w-[520px] relative z-10 mt-16 md:mt-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
