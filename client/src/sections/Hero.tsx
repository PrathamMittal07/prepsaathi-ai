import Button from '@/components/Button'
import Badge from '@/components/Badge'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-40" />
      
      {/* Glow blobs */}
      <div
        className="glow-blob pulse-glow"
        style={{
          width: '600px',
          height: '600px',
          top: '-100px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, rgba(139, 92, 246, 0.08) 50%, transparent 70%)',
        }}
      />
      <div
        className="glow-blob"
        style={{
          width: '400px',
          height: '400px',
          bottom: '10%',
          left: '-10%',
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.08) 0%, transparent 70%)',
          animation: 'pulseGlow 6s ease-in-out infinite reverse',
        }}
      />
      <div
        className="glow-blob"
        style={{
          width: '300px',
          height: '300px',
          bottom: '20%',
          right: '-5%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
          animation: 'pulseGlow 5s ease-in-out infinite',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="animate-fade-in-up animate-delay-1 flex justify-center mb-8">
          <Badge dot>
            AI-Powered Placement Preparation Platform
          </Badge>
        </div>

        {/* Main heading */}
        <h1 className="animate-fade-in-up animate-delay-2 font-syne font-extrabold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] tracking-tight mb-6">
          Your AI-Powered
          <br />
          <span className="gradient-text">Placement Companion</span>
        </h1>

        {/* Subheading */}
        <p className="animate-fade-in-up animate-delay-3 text-text-secondary text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10 font-light">
          PrepSaathi AI helps students prepare for interviews, DSA, aptitude, resumes,
          and technical subjects using{' '}
          <span className="text-text-primary font-normal">personalized AI-driven workflows</span>.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up animate-delay-4 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button variant="primary" size="lg" href="/signup">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 1L11.5 6.5L17.5 7.5L13 12L14 18L9 15L4 18L5 12L0.5 7.5L6.5 6.5L9 1Z" fill="currentColor" />
            </svg>
            Get Started Free
          </Button>
          <Button variant="secondary" size="lg" href="#features">
            Explore Features
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
        </div>

        {/* Stats */}
        <div className="animate-fade-in-up animate-delay-5">
          <div className="inline-flex flex-wrap justify-center items-center gap-8 sm:gap-12 px-8 py-5 rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm">
            {[
              { value: '10K+', label: 'Students' },
              { value: '500+', label: 'Questions' },
              { value: '95%', label: 'Satisfaction' },
              { value: '200+', label: 'Companies' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-syne font-bold text-2xl text-text-primary">
                  {stat.value}
                </div>
                <div className="text-text-secondary text-xs font-medium mt-0.5 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero visual — floating UI card */}
        <div className="animate-fade-in-up animate-delay-6 mt-20 relative">
          <div className="relative mx-auto max-w-3xl">
            {/* Glow behind card */}
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: 'radial-gradient(ellipse at 50% 50%, rgba(99, 102, 241, 0.2), transparent 70%)',
                filter: 'blur(24px)',
                transform: 'scale(1.1)',
              }}
            />
            {/* Main card */}
            <div className="relative glass-card rounded-3xl p-6 sm:p-8 text-left">
              {/* Card header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <span className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <div className="flex-1 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center px-3">
                  <span className="text-xs text-text-muted font-mono">prepsaathi.ai/dashboard</span>
                </div>
              </div>

              {/* Dashboard preview content */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { label: 'DSA Progress', value: '68%', color: 'indigo', bar: 68 },
                  { label: 'Mock Interviews', value: '12', color: 'purple', bar: 80 },
                  { label: 'Resume Score', value: '84/100', color: 'cyan', bar: 84 },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-3 bg-white/[0.03] border border-white/[0.06] hover:border-indigo-500/30 transition-colors duration-200"
                  >
                    <div className="text-xs text-text-secondary mb-1">{item.label}</div>
                    <div className="font-syne font-bold text-lg text-text-primary mb-2">{item.value}</div>
                    <div className="h-1 rounded-full bg-white/[0.08] overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-${item.color}-500`}
                        style={{ width: `${item.bar}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* AI chat snippet */}
              <div className="rounded-xl p-4 bg-white/[0.03] border border-white/[0.06]">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 text-xs font-bold text-white">
                    AI
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      <span className="text-indigo-400 font-medium">PrepSaathi:</span> Based on your performance, I recommend focusing on{' '}
                      <span className="text-text-primary">Dynamic Programming</span> and{' '}
                      <span className="text-text-primary">Graph Traversal</span> this week. You have an interview with{' '}
                      <span className="text-indigo-400">Google</span> in 12 days. 🎯
                    </p>
                  </div>
                </div>
                {/* Typing indicator */}
                <div className="flex items-center gap-2 mt-3 ml-10">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-indigo-400"
                        style={{
                          animation: `pulseGlow 1.2s ease-in-out infinite`,
                          animationDelay: `${i * 0.2}s`,
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-text-muted">Analyzing your next task...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <div
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
          aria-hidden
        >
          <div
            className="w-1 h-2 rounded-full bg-white/60"
            style={{ animation: 'float 2s ease-in-out infinite' }}
          />
        </div>
        <span className="text-xs text-text-muted uppercase tracking-widest">Scroll</span>
      </div>
    </section>
  )
}
