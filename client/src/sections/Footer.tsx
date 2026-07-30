import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full border-t border-[var(--color-border)] bg-[var(--color-bg-primary)] pt-16 pb-8">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 lg:gap-12 mb-16">
          
          {/* Column 1: Brand */}
          <div className="col-span-1 md:col-span-1 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative w-8 h-8 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <div className="absolute inset-0 rounded-[10px] bg-[#8E2C4B] rotate-3 opacity-90 transition-transform duration-300 group-hover:rotate-6"></div>
                <div className="absolute inset-0 rounded-[10px] border-2 border-[#C89A3D] -rotate-3 transition-transform duration-300 group-hover:-rotate-6 bg-white/20 backdrop-blur-sm"></div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="relative z-10 text-white" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h6a6 6 0 0 1 0 12H4V4z"></path>
                  <path d="M4 16h6"></path>
                </svg>
              </div>
              <span className="font-sans font-extrabold text-[1.15rem] tracking-tight text-[#1D1D1D] transition-colors">
                Prep2Place
              </span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed max-w-[250px]">
              The ultimate placement preparation platform. Land your dream job with AI precision.
            </p>
          </div>

          {/* Column 2: Product */}
          <div className="col-span-1">
            <h4 className="font-sans font-bold text-text-primary mb-5 tracking-wide">Product</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="#features" className="text-sm text-text-secondary hover:text-[var(--color-accent-maroon)] transition-colors">Features</Link></li>
              <li><Link href="#how-it-works" className="text-sm text-text-secondary hover:text-[var(--color-accent-maroon)] transition-colors">How it works</Link></li>
              <li><Link href="/pricing" className="text-sm text-text-secondary hover:text-[var(--color-accent-maroon)] transition-colors">Pricing</Link></li>
              <li><Link href="/changelog" className="text-sm text-text-secondary hover:text-[var(--color-accent-maroon)] transition-colors">Changelog</Link></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="col-span-1">
            <h4 className="font-sans font-bold text-text-primary mb-5 tracking-wide">Resources</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/blog" className="text-sm text-text-secondary hover:text-[var(--color-accent-maroon)] transition-colors">Blog</Link></li>
              <li><Link href="/roadmaps" className="text-sm text-text-secondary hover:text-[var(--color-accent-maroon)] transition-colors">Free Roadmaps</Link></li>
              <li><Link href="/interview-prep" className="text-sm text-text-secondary hover:text-[var(--color-accent-maroon)] transition-colors">Interview Prep</Link></li>
              <li><Link href="/companies" className="text-sm text-text-secondary hover:text-[var(--color-accent-maroon)] transition-colors">Company Guides</Link></li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="col-span-1">
            <h4 className="font-sans font-bold text-text-primary mb-5 tracking-wide">Company</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/about" className="text-sm text-text-secondary hover:text-[var(--color-accent-maroon)] transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-sm text-text-secondary hover:text-[var(--color-accent-maroon)] transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="text-sm text-text-secondary hover:text-[var(--color-accent-maroon)] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-text-secondary hover:text-[var(--color-accent-maroon)] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <span className="text-sm text-text-muted">© 2026 Prep2Place. All rights reserved.</span>
          </div>
          
          <div className="flex items-center gap-6">
            <span className="text-sm text-text-secondary flex items-center gap-1.5 font-medium">
              Made with <span className="text-red-500 animate-pulse">❤️</span> for students
            </span>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-text-muted hover:text-[#1D1D1D] transition-colors">
              <span className="sr-only">GitHub</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-text-muted hover:text-[#1D1D1D] transition-colors">
              <span className="sr-only">Twitter</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
