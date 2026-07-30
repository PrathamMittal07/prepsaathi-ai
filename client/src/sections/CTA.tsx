import Section from '@/components/Section'
import Button from '@/components/Button'
import Card from '@/components/Card'

export default function CTA() {
  return (
    <Section id="cta">
      <div className="w-full max-w-[1000px] mx-auto px-4 py-12 lg:py-24 animate-fade-in-up">
        
        <Card className="relative overflow-hidden text-center p-12 sm:p-20 border-[var(--color-accent-maroon)]/20 shadow-[0_20px_50px_rgba(142,44,75,0.08)] bg-white">
          
          {/* Subtle Background Glows */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,rgba(142,44,75,0.03)_0%,transparent_50%)] pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom,rgba(200,154,61,0.03)_0%,transparent_50%)] pointer-events-none"></div>

          <div className="relative z-10 flex flex-col items-center">
            
            <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] font-sans font-extrabold tracking-tight leading-tight text-text-primary mb-6">
              Your next placement <br className="hidden sm:block" />
              <span className="text-[var(--color-accent-maroon)]">starts today.</span>
            </h2>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-10 text-body-text font-medium text-base md:text-lg">
              <div className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-green-600" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>No subscriptions.</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-green-600" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>No hidden fees.</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[var(--color-accent-maroon)]" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span className="text-[var(--color-accent-maroon)] font-bold">Start free.</span>
              </div>
            </div>

            <Button variant="primary" className="h-[60px] px-12 text-lg w-full sm:w-auto shadow-[0_10px_30px_rgba(142,44,75,0.2)] hover:shadow-[0_15px_40px_rgba(142,44,75,0.3)]">
              Start Preparing Now
            </Button>
            
          </div>
        </Card>

      </div>
    </Section>
  )
}
