import Navbar from '@/sections/Navbar'
import Hero from '@/sections/Hero'
import Features from '@/sections/Features'
import WhyUs from '@/sections/WhyUs'
import HowItWorks from '@/sections/HowItWorks'
import CTA from '@/sections/CTA'
import Footer from '@/sections/Footer'
import PageContainer from '@/components/PageContainer'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#F8F5EF] overflow-x-hidden">
      
      {/* Global Seamless Background Gradients & Noise */}
      <div className="absolute top-0 right-0 w-[70vw] h-[70vw] bg-[radial-gradient(circle_at_center,rgba(200,154,61,0.04)_0%,transparent_60%)] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute top-[20%] left-[-10%] w-[60vw] h-[60vw] bg-[radial-gradient(circle_at_center,rgba(142,44,75,0.04)_0%,transparent_60%)] rounded-full pointer-events-none" />
      <div className="absolute top-[60%] right-[-10%] w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_center,rgba(200,154,61,0.03)_0%,transparent_60%)] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.12] mix-blend-overlay pointer-events-none" style={{ backgroundRepeat: 'repeat' }}></div>

      {/* Global Decorative Elements (Silhouettes/Emojis) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-[5%] left-[8%] text-[100px] opacity-[0.04] blur-[1px] transform -rotate-12 grayscale">🪴</div>
        <div className="absolute top-[12%] left-[45%] text-[80px] opacity-[0.04] blur-[1px] transform rotate-12 grayscale">☕</div>
        <div className="absolute top-[8%] right-[15%] text-[110px] opacity-[0.04] blur-[1px] transform rotate-6 grayscale">💻</div>
        <div className="absolute top-[20%] left-[10%] text-[90px] opacity-[0.04] blur-[1px] transform -rotate-6 grayscale">📓</div>
        <div className="absolute top-[25%] right-[8%] text-[100px] opacity-[0.04] blur-[1px] transform rotate-12 grayscale">🎧</div>
        <div className="absolute top-[18%] right-[30%] text-[80px] opacity-[0.04] blur-[1px] transform -rotate-12 grayscale">🖊️</div>
      </div>

      <Navbar />
      
      {/* Hero sits naturally full width */}
      <Hero />
      
      {/* Rest of the content wrapped tightly */}
      <PageContainer>
        <Features />
        <WhyUs />
        <HowItWorks />
        <CTA />
        <Footer />
      </PageContainer>
    </main>
  )
}
