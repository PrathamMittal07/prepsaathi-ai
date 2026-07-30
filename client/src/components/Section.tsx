export default function Section({ children, id, className = "" }: { children: React.ReactNode, id?: string, className?: string }) {
  return (
    <section id={id} className={`w-full py-24 ${className}`}>
      {children}
    </section>
  )
}
