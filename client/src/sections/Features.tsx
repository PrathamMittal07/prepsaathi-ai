import { FEATURES } from '@/lib/constants'
import { FeatureCard } from '@/types'

function FeatureCardComponent({ feature }: { feature: FeatureCard }) {
  return (
    <div className={`glass-card rounded-2xl p-6 bg-gradient-to-br ${feature.gradient} group cursor-default`}>
      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 border ${feature.iconBg} transition-transform duration-300 group-hover:scale-110`}
      >
        {feature.icon}
      </div>

      {/* Title row */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="font-syne font-semibold text-[16px] text-text-primary leading-snug">
          {feature.title}
        </h3>
        {feature.tag && (
          <span className="flex-shrink-0 text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/25 text-indigo-400">
            {feature.tag}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>

      {/* Arrow link */}
      <div className="mt-5 flex items-center gap-1.5 text-xs font-medium text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span>Learn more</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M2 6H10M10 6L6 2M10 6L6 10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}

export default function Features() {
  return (
    <section id="features" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(99, 102, 241, 0.06) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex justify-center mb-5">
            <span className="badge">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              Everything You Need
            </span>
          </div>
          <h2 className="font-syne font-bold text-4xl sm:text-5xl text-text-primary leading-tight mb-5">
            Built for Every Stage of{' '}
            <span className="gradient-text">Placement Prep</span>
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            From DSA to interviews, resumes to quizzes — PrepSaathi AI covers every aspect
            of your placement journey in one intelligent platform.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature) => (
            <FeatureCardComponent key={feature.id} feature={feature} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <p className="text-text-secondary text-sm mb-4">
            More features coming soon — roadmaps, leaderboards, company-specific prep and more.
          </p>
          <div className="inline-flex items-center gap-2 text-indigo-400 text-sm font-medium hover:text-indigo-300 cursor-pointer transition-colors duration-200 group">
            <span>View full feature roadmap</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              <path
                d="M1 7H13M13 7L7 1M13 7L7 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
