import Sidebar from '@/components/Sidebar'
import TopNavbar from '@/components/TopNavbar'
import { ResumeProvider } from '@/features/resume/context/ResumeContext'
import { CareerCoachProvider } from '@/features/coach/context/CareerCoachContext'
import { Toaster } from 'react-hot-toast';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-bg-primary flex font-sans">
        <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto bg-bg-primary p-6 lg:p-8">
          <ResumeProvider>
            <CareerCoachProvider>
              {children}
              <Toaster position="bottom-right" />
            </CareerCoachProvider>
          </ResumeProvider>
        </main>
      </div>
      </div>
    </ProtectedRoute>
  )
}
