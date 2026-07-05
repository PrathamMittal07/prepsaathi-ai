import { HOW_IT_WORKS } from '@/lib/constants'

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '800px',
            height: '400px',
            background: 'radial-gradient(ellipse, rgba(139, 92, 246, 0.05) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex justify-center mb-5">
            <span className="badge">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              Simple Process
            </span>
          </div>
          <h2 className="font-syne font-bold text-4xl sm:text-5xl text-text-primary leading-tight mb-5">
            Get Placement-Ready in{' '}
            <span className="gradient-text">4 Simple Steps</span>
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            PrepSaathi AI takes you from preparation to placement with a structured, AI-guided approach.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div
            className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px"
            style={{
              background:
                'linear-gradient(to right, transparent, rgba(99, 102, 241, 0.3) 20%, rgba(99, 102, 241, 0.3) 80%, transparent)',
            }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center group">
                {/* Step number circle */}
                <div className="relative mb-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center font-syne font-bold text-lg border transition-all duration-300 group-hover:border-indigo-500/50 group-hover:shadow-glow"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.08))',
                      borderColor: 'rgba(99, 102, 241, 0.25)',
                      color: '#a5b4fc',
                    }}
                  >
                    {step.step}
                  </div>
                  {/* Glow on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15), transparent 70%)',
                      filter: 'blur(8px)',
                      transform: 'scale(1.5)',
                    }}
                  />
                </div>

                <h3 className="font-syne font-semibold text-lg text-text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
