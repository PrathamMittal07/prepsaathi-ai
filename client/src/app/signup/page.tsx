import Link from 'next/link'
import { BrainCircuit } from 'lucide-react'
import Button from '@/components/Button'

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-bg-primary flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px]" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Link href="/" className="flex items-center justify-center gap-2 group mb-8">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <BrainCircuit className="w-6 h-6 text-white" />
          </div>
          <span className="font-syne font-bold text-2xl tracking-tight text-text-primary">
            Prep<span className="text-indigo-400">Saathi</span> AI
          </span>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-bold font-syne tracking-tight text-text-primary">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-text-secondary">
          Join thousands of students preparing smarter
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="glass-card py-8 px-4 shadow sm:rounded-2xl sm:px-10">
          <form className="space-y-5" action="#" method="POST">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-primary">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none block w-full px-3 py-2.5 border border-white/10 rounded-xl shadow-sm bg-white/5 text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm transition-colors"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-primary">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2.5 border border-white/10 rounded-xl shadow-sm bg-white/5 text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm transition-colors"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-primary">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-3 py-2.5 border border-white/10 rounded-xl shadow-sm bg-white/5 text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-text-primary">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-3 py-2.5 border border-white/10 rounded-xl shadow-sm bg-white/5 text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button variant="primary" size="lg" className="w-full justify-center">
                Create Account
              </Button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-text-secondary">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
              Sign in instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
