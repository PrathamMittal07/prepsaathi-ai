import Link from 'next/link'

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FBF8F4] flex flex-col">
      {/* Minimal Top Bar */}
      <header className="w-full bg-white border-b border-[#E8E2DA] h-16 flex items-center justify-center">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-6 h-6 flex items-center justify-center">
            <div className="absolute inset-0 rounded-md bg-[#8E2C4B] rotate-3 opacity-90"></div>
            <div className="absolute inset-0 rounded-md border border-[#C89A3D] -rotate-3 bg-white/20 backdrop-blur-sm"></div>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="relative z-10 text-white" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h6a6 6 0 0 1 0 12H4V4z"></path>
              <path d="M4 16h6"></path>
            </svg>
          </div>
          <span className="font-sans font-extrabold text-[1rem] tracking-tight text-[#1D1D1D]">
            Prep2Place
          </span>
        </Link>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col w-full relative">
        {/* Background ambient glow */}
        <div className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] max-w-[600px] bg-[radial-gradient(circle_at_center,rgba(200,154,61,0.06)_0%,transparent_60%)] rounded-full pointer-events-none" />
        <div className="absolute bottom-[20%] left-[10%] w-[40vw] h-[40vw] max-w-[600px] bg-[radial-gradient(circle_at_center,rgba(142,44,75,0.06)_0%,transparent_60%)] rounded-full pointer-events-none" />
        
        {children}
      </main>
    </div>
  )
}
