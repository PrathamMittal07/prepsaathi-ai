import { BrainCircuit, Map, FileText, Video, GraduationCap } from 'lucide-react'
import ChatInput from '@/components/ChatInput'

const suggestions = [
  { icon: Map, text: "Generate a DSA roadmap" },
  { icon: FileText, text: "Analyze my resume" },
  { icon: Video, text: "Create interview questions" },
  { icon: GraduationCap, text: "Help me prepare for placements" },
]

export default function AssistantPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto w-full animate-fade-in-up">
      {/* Empty State / Welcome Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.3)] mb-8">
          <BrainCircuit className="w-8 h-8 text-white" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold font-syne text-text-primary mb-10 text-center tracking-tight">
          How can PrepSaathi AI help you today?
        </h1>

        {/* Suggestion Chips */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl w-full mb-12">
          {suggestions.map((item, idx) => (
            <button 
              key={idx}
              className="flex items-center gap-3 p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300 text-left group"
            >
              <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-text-secondary group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-colors">
                <item.icon className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                {item.text}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="pt-6 pb-2 px-4 w-full">
        <ChatInput />
        <p className="text-center text-xs text-text-secondary mt-4 mb-2">
          AI Assistant can make mistakes. Consider verifying important information.
        </p>
      </div>
    </div>
  )
}
