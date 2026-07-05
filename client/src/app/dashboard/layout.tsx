import Sidebar from '@/components/Sidebar'
import TopNavbar from '@/components/TopNavbar'
import { RoadmapProvider } from '@/context/RoadmapContext'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-bg-primary flex font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto bg-bg-primary p-6 lg:p-8">
          <RoadmapProvider>
            {children}
          </RoadmapProvider>
        </main>
      </div>
    </div>
  )
}
