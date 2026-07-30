'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AuthButton } from '@/components/auth/AuthPrimitives'

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0) // 0: Welcome, 1: Companies, 2: Role, 3: Year, 4: DSA, 5: Resume, 6: Loading Dashboard
  
  // States
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])
  const [selectedRole, setSelectedRole] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [selectedDSA, setSelectedDSA] = useState('')
  const [resumeUploaded, setResumeUploaded] = useState(false)
  const [loadingStage, setLoadingStage] = useState(0)

  // Options
  const companies = ['Google', 'Microsoft', 'Amazon', 'Atlassian', 'Adobe', 'Oracle', 'Flipkart', 'Goldman Sachs']
  const roles = ['Software Engineer', 'Backend', 'Frontend', 'SDE', 'AI Engineer', 'ML Engineer']
  const years = ['2nd Year', '3rd Year', '4th Year', 'Graduate']
  const dsaLevels = ['Beginner', 'Intermediate', 'Advanced']

  // Progress Loading Simulation
  useEffect(() => {
    if (step === 6) {
      const stages = [
        { time: 1000, stage: 1 }, // Reading Resume
        { time: 2500, stage: 2 }, // Finding Weak Skills
        { time: 4000, stage: 3 }, // Mapping Company Requirements
        { time: 5500, stage: 4 }, // Creating Preparation Plan
        { time: 7000, stage: 5 }, // Complete
      ]
      
      stages.forEach(s => {
        setTimeout(() => setLoadingStage(s.stage), s.time)
      })

      setTimeout(() => {
        router.push('/dashboard')
      }, 8500)
    }
  }, [step, router])

  const toggleCompany = (company: string) => {
    if (selectedCompanies.includes(company)) {
      setSelectedCompanies(selectedCompanies.filter(c => c !== company))
    } else {
      setSelectedCompanies([...selectedCompanies, company])
    }
  }

  // Common Header for steps
  const renderHeader = (title: string, subtitle: string) => (
    <div className="mb-10 text-center animate-fade-in-up">
      <h1 className="text-3xl font-sans font-bold text-text-primary mb-3 tracking-tight">{title}</h1>
      <p className="text-text-secondary text-lg">{subtitle}</p>
    </div>
  )

  // Step 0: Welcome
  if (step === 0) {
    return (
      <div className="w-full max-w-[600px] mx-auto mt-20 p-6 flex flex-col items-center justify-center text-center animate-fade-in-up">
        <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-black/5 flex items-center justify-center mb-8">
          <span className="text-4xl">👋</span>
        </div>
        <h1 className="text-4xl font-sans font-bold text-text-primary mb-4 tracking-tight">Welcome, Pratham</h1>
        <p className="text-text-secondary text-xl mb-12 max-w-md text-pretty">
          Let's build your preparation roadmap. This takes less than 2 minutes.
        </p>
        <AuthButton className="w-full sm:w-auto px-12" onClick={() => setStep(1)}>
          Continue
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </AuthButton>
      </div>
    )
  }

  // Step 6: AI Generation
  if (step === 6) {
    const loadingSteps = [
      "Reading Resume...",
      "Finding Weak Skills...",
      "Mapping Company Requirements...",
      "Creating Preparation Plan...",
      "Almost Ready..."
    ]

    return (
      <div className="w-full max-w-[500px] mx-auto mt-24 p-6 flex flex-col items-center justify-center animate-fade-in-up">
        <div className="relative w-24 h-24 mb-10">
           <div className="absolute inset-0 border-4 border-[var(--color-accent-maroon)] rounded-full border-t-transparent animate-spin"></div>
           <div className="absolute inset-2 border-4 border-[#C89A3D] rounded-full border-b-transparent animate-[spin_1.5s_linear_infinite_reverse]"></div>
           <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-10 h-10 rounded-full bg-[var(--color-accent-maroon)] flex items-center justify-center text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
             </div>
           </div>
        </div>

        <h2 className="text-2xl font-bold font-sans mb-8">Building your roadmap...</h2>

        <div className="flex flex-col gap-4 w-full">
          {loadingSteps.map((text, idx) => {
            const isCompleted = loadingStage > idx
            const isActive = loadingStage === idx
            const isPending = loadingStage < idx

            return (
              <div key={idx} className={`flex items-center gap-4 transition-all duration-500 ${isCompleted ? 'opacity-100' : isActive ? 'opacity-100' : 'opacity-30'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-500
                  ${isCompleted ? 'bg-green-100 text-green-600' : isActive ? 'bg-[var(--color-accent-maroon)] text-white animate-pulse' : 'bg-gray-200'}`}>
                  {isCompleted ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  ) : isActive ? (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  ) : null}
                </div>
                <span className={`font-semibold ${isActive ? 'text-[var(--color-accent-maroon)]' : 'text-text-primary'}`}>
                  {text}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Main Steps Wrapper
  return (
    <div className="w-full max-w-[700px] mx-auto mt-12 p-6 z-10 relative">
      
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Step {step} of 5</span>
          <span className="text-xs font-bold text-[var(--color-accent-maroon)]">{Math.round((step/5)*100)}%</span>
        </div>
        <div className="w-full h-2 bg-black/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[var(--color-accent-maroon)] transition-all duration-500 ease-out" 
            style={{ width: `${(step/5)*100}%` }}
          />
        </div>
      </div>

      <div className="saas-card p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-[#E8E2DA]">
        
        {/* Step 1: Target Companies */}
        {step === 1 && (
          <div className="animate-fade-in-up">
            {renderHeader("Choose your dream companies", "We'll tailor your questions to their specific patterns.")}
            
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {companies.map(c => (
                <button
                  key={c}
                  onClick={() => toggleCompany(c)}
                  className={`px-6 py-3 rounded-xl border text-sm font-semibold transition-all duration-200
                    ${selectedCompanies.includes(c) 
                      ? 'border-[var(--color-accent-maroon)] bg-[var(--color-accent-maroon)]/5 text-[var(--color-accent-maroon)] shadow-sm' 
                      : 'border-black/10 bg-white hover:border-black/20 text-text-primary'}`}
                >
                  {c}
                </button>
              ))}
              <button className="px-6 py-3 rounded-xl border border-dashed border-black/20 bg-black/[0.02] text-text-secondary text-sm font-semibold hover:bg-black/5 transition-all">
                + Search More
              </button>
            </div>

            <AuthButton 
              disabled={selectedCompanies.length === 0} 
              onClick={() => setStep(2)}
              className={selectedCompanies.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}
            >
              Continue
            </AuthButton>
          </div>
        )}

        {/* Step 2: Target Role */}
        {step === 2 && (
          <div className="animate-fade-in-up">
            {renderHeader("Choose your target role", "Focus your learning path on the right architecture.")}
            
            <div className="grid grid-cols-2 gap-4 mb-12">
              {roles.map(r => (
                <button
                  key={r}
                  onClick={() => setSelectedRole(r)}
                  className={`p-4 rounded-xl border text-center font-semibold transition-all duration-200
                    ${selectedRole === r
                      ? 'border-[var(--color-accent-maroon)] bg-[var(--color-accent-maroon)]/5 text-[var(--color-accent-maroon)] shadow-sm' 
                      : 'border-black/10 bg-white hover:border-black/20 text-text-primary'}`}
                >
                  {r}
                </button>
              ))}
            </div>

            <AuthButton 
              disabled={!selectedRole} 
              onClick={() => setStep(3)}
              className={!selectedRole ? 'opacity-50 cursor-not-allowed' : ''}
            >
              Continue
            </AuthButton>
          </div>
        )}

        {/* Step 3: Current Year */}
        {step === 3 && (
          <div className="animate-fade-in-up">
            {renderHeader("Current academic year", "To calculate how much preparation time you have left.")}
            
            <div className="grid grid-cols-2 gap-4 mb-12">
              {years.map(y => (
                <button
                  key={y}
                  onClick={() => setSelectedYear(y)}
                  className={`p-4 rounded-xl border text-center font-semibold transition-all duration-200
                    ${selectedYear === y
                      ? 'border-[var(--color-accent-maroon)] bg-[var(--color-accent-maroon)]/5 text-[var(--color-accent-maroon)] shadow-sm' 
                      : 'border-black/10 bg-white hover:border-black/20 text-text-primary'}`}
                >
                  {y}
                </button>
              ))}
            </div>

            <AuthButton 
              disabled={!selectedYear} 
              onClick={() => setStep(4)}
              className={!selectedYear ? 'opacity-50 cursor-not-allowed' : ''}
            >
              Continue
            </AuthButton>
          </div>
        )}

        {/* Step 4: DSA Level */}
        {step === 4 && (
          <div className="animate-fade-in-up">
            {renderHeader("Current DSA Level", "Be honest. We'll build the roadmap from exactly where you are.")}
            
            <div className="flex flex-col gap-4 mb-12">
              {dsaLevels.map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setSelectedDSA(lvl)}
                  className={`p-5 rounded-xl border text-left font-semibold transition-all duration-200 flex items-center justify-between
                    ${selectedDSA === lvl
                      ? 'border-[var(--color-accent-maroon)] bg-[var(--color-accent-maroon)]/5 text-[var(--color-accent-maroon)] shadow-sm' 
                      : 'border-black/10 bg-white hover:border-black/20 text-text-primary'}`}
                >
                  {lvl}
                  {selectedDSA === lvl && (
                    <div className="w-5 h-5 rounded-full bg-[var(--color-accent-maroon)] flex items-center justify-center text-white">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                  )}
                </button>
              ))}
            </div>

            <AuthButton 
              disabled={!selectedDSA} 
              onClick={() => setStep(5)}
              className={!selectedDSA ? 'opacity-50 cursor-not-allowed' : ''}
            >
              Continue
            </AuthButton>
          </div>
        )}

        {/* Step 5: Resume Upload */}
        {step === 5 && (
          <div className="animate-fade-in-up">
            {renderHeader("Upload Resume", "Our AI will instantly parse your skills and analyze ATS compatibility.")}
            
            <div 
              className={`w-full h-64 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center mb-12 transition-all duration-300
                ${resumeUploaded ? 'border-green-500 bg-green-50' : 'border-[#C89A3D]/40 bg-[#C89A3D]/5 cursor-pointer hover:border-[#C89A3D]'}`}
              onClick={() => setResumeUploaded(true)}
            >
              {!resumeUploaded ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-[#C89A3D] mb-4">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  </div>
                  <h3 className="font-sans font-bold text-lg mb-1">Drag & Drop Resume</h3>
                  <p className="text-text-secondary text-sm">PDF or DOCX (Max 5MB)</p>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4 shadow-sm">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <h3 className="font-sans font-bold text-lg text-green-700 mb-1">Resume Uploaded Successfully</h3>
                  <p className="text-green-600/80 text-sm">pratham_resume_v4.pdf</p>
                </>
              )}
            </div>

            <AuthButton 
              disabled={!resumeUploaded} 
              onClick={() => setStep(6)}
              className={!resumeUploaded ? 'opacity-50 cursor-not-allowed' : ''}
            >
              Generate AI Roadmap
            </AuthButton>
          </div>
        )}
      </div>

    </div>
  )
}
