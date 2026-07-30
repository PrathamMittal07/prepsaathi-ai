export default function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-[clamp(24px,5vw,80px)]">
      {children}
    </div>
  )
}
