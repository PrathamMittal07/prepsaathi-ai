import Button from '@/components/Button'

export default function CTA() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.12) 50%, rgba(34, 211, 238, 0.08) 100%)',
              borderTop: '1px solid rgba(99, 102, 241, 0.2)',
              borderBottom: '1px solid rgba(99, 102, 241, 0.2)',
            }}
          />
          {/* Grid pattern */}
          <div className="absolute inset-0 grid-pattern opacity-30" />
          {/* Glow blobs */}
          <div
            className="absolute"
            style={{
              width: '500px',
              height: '500px',
              top: '-100px',
              right: '-100px',
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
          <div
            className="absolute"
            style={{
              width: '400px',
              height: '400px',
              bottom: '-100px',
              left: '-100px',
              background: 'radial-gradient(circle, rgba(34, 211, 238, 0.1) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />

          <div className="relative z-10 text-center py-20 px-8 sm:px-16">
            <div className="flex justify-center mb-6">
              <span className="badge">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Free to Get Started
              </span>
            </div>

            <h2 className="font-syne font-bold text-4xl sm:text-5xl lg:text-6xl text-text-primary leading-tight mb-6">
              Ready to Land Your{' '}
              <span className="gradient-text">Dream Job?</span>
            </h2>

            <p className="text-text-secondary text-lg sm:text-xl max-w-xl mx-auto leading-relaxed mb-10">
              Join thousands of students using PrepSaathi AI to crack placements at top companies.
              Start your journey today — it's completely free.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" size="lg" href="/signup">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 1L11.5 6.5L17.5 7.5L13 12L14 18L9 15L4 18L5 12L0.5 7.5L6.5 6.5L9 1Z" fill="currentColor" />
                </svg>
                Start Preparing Free
              </Button>
              <Button variant="secondary" size="lg" href="#features">
                Explore Features
              </Button>
            </div>

            <p className="mt-6 text-text-muted text-sm">
              No credit card required · Works on all devices
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
