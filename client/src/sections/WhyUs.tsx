import Section from '@/components/Section'
import Card from '@/components/Card'

export default function WhyUs() {
  return (
    <Section id="why-us">
      <div className="w-full flex flex-col items-center z-10 relative py-12 lg:py-24">
        
        {/* Section Header */}
        <div className="text-center max-w-[800px] mb-16 lg:mb-20 px-4">
          <h2 className="text-section-title mb-6 animate-fade-in-up">
            Everything You Need. <br />
            <span className="text-[var(--color-accent-maroon)]">No More Tab Switching.</span>
          </h2>
          <p className="text-body-text max-w-[650px] mx-auto text-pretty animate-fade-in-up animate-delay-1">
            Stop jumping between LeetCode, ChatGPT, and random roadmap repositories. Get the entire placement prep stack in a single platform.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="w-full max-w-[1000px] mx-auto animate-fade-in-up animate-delay-2 px-4">
          <Card className="p-2 sm:p-4 mb-16 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border-[#E8E2DA]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] border-collapse">
                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    <th className="py-5 px-6 text-left font-sans font-bold text-lg text-text-primary">Tool</th>
                    <th className="py-5 px-6 text-center font-sans font-bold text-lg text-text-primary">Primary Focus</th>
                    <th className="py-5 px-6 text-center font-sans font-bold text-lg text-text-primary">Coverage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)]">
                  {/* Row 1 */}
                  <tr className="hover:bg-black/[0.02] transition-colors">
                    <td className="py-5 px-6 flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-orange-100 text-orange-500 flex items-center justify-center font-bold text-lg font-sans">L</div>
                      <span className="font-semibold text-text-primary">LeetCode</span>
                    </td>
                    <td className="py-5 px-6 text-center text-text-secondary font-medium">Practice</td>
                    <td className="py-5 px-6 text-center">
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                    </td>
                  </tr>
                  
                  {/* Row 2 */}
                  <tr className="hover:bg-black/[0.02] transition-colors">
                    <td className="py-5 px-6 flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-blue-100 text-blue-500 flex items-center justify-center font-bold text-lg font-sans">R</div>
                      <span className="font-semibold text-text-primary">Resume Tools</span>
                    </td>
                    <td className="py-5 px-6 text-center text-text-secondary font-medium">ATS Check</td>
                    <td className="py-5 px-6 text-center">
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr className="hover:bg-black/[0.02] transition-colors">
                    <td className="py-5 px-6 flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-green-100 text-green-700 flex items-center justify-center font-bold text-lg font-sans">C</div>
                      <span className="font-semibold text-text-primary">ChatGPT</span>
                    </td>
                    <td className="py-5 px-6 text-center text-text-secondary font-medium">Mock Interview</td>
                    <td className="py-5 px-6 text-center">
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                    </td>
                  </tr>

                  {/* Row 4 */}
                  <tr className="hover:bg-black/[0.02] transition-colors">
                    <td className="py-5 px-6 flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-lg font-sans">M</div>
                      <span className="font-semibold text-text-primary">Roadmap.sh</span>
                    </td>
                    <td className="py-5 px-6 text-center text-text-secondary font-medium">Roadmaps</td>
                    <td className="py-5 px-6 text-center">
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                    </td>
                  </tr>

                  {/* Row 5 - Highlighted Prep2Place */}
                  <tr className="bg-[var(--color-accent-maroon)]/5 relative group transition-colors duration-300">
                    <td className="py-6 px-6 flex items-center gap-3 relative z-10 border-t-2 border-b-2 border-l-2 border-[var(--color-accent-maroon)] rounded-l-lg">
                      <div className="w-10 h-10 rounded-lg bg-[#8E2C4B] shadow-md flex items-center justify-center text-white font-bold text-lg font-sans">P²</div>
                      <span className="font-bold text-xl text-text-primary tracking-tight">Prep2Place</span>
                    </td>
                    <td className="py-6 px-6 text-center text-lg font-bold text-[var(--color-accent-maroon)] relative z-10 border-t-2 border-b-2 border-[var(--color-accent-maroon)]">All in One</td>
                    <td className="py-6 px-6 text-center relative z-10 border-t-2 border-b-2 border-r-2 border-[var(--color-accent-maroon)] rounded-r-lg">
                      <div className="inline-flex items-center justify-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--color-accent-gold)]" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        ))}
                      </div>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Three Value Cards */}
        <div className="w-full max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 px-4 animate-fade-in-up animate-delay-3">
          
          <Card className="p-8 text-center flex flex-col items-center group" interactive>
            <div className="w-16 h-16 rounded-2xl bg-white border border-[var(--color-border)] shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-[var(--color-accent-maroon)] transition-all duration-300 text-[var(--color-accent-maroon)]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
            </div>
            <h3 className="text-xl font-bold font-sans text-text-primary mb-3">One Dashboard</h3>
            <p className="text-body-text text-base">Your entire preparation journey tracked, analyzed, and visualized in a single, beautiful interface.</p>
          </Card>

          <Card className="p-8 text-center flex flex-col items-center group" interactive>
            <div className="w-16 h-16 rounded-2xl bg-white border border-[var(--color-border)] shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-[var(--color-accent-purple)] transition-all duration-300 text-[var(--color-accent-purple)]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            </div>
            <h3 className="text-xl font-bold font-sans text-text-primary mb-3">One Roadmap</h3>
            <p className="text-body-text text-base">Stop guessing what to study. Follow AI-generated paths strictly tailored to your target company.</p>
          </Card>

          <Card className="p-8 text-center flex flex-col items-center group" interactive>
            <div className="w-16 h-16 rounded-2xl bg-white border border-[var(--color-border)] shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-[var(--color-accent-gold)] transition-all duration-300 text-[var(--color-accent-gold)]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <h3 className="text-xl font-bold font-sans text-text-primary mb-3">One Goal</h3>
            <p className="text-body-text text-base">Everything here is explicitly designed to do exactly one thing: get you hired faster.</p>
          </Card>

        </div>

      </div>
    </Section>
  )
}
