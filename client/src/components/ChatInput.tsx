'use client'

import { ArrowUp, Paperclip } from 'lucide-react'
import { useState } from 'react'

export default function ChatInput() {
  const [query, setQuery] = useState('')

  return (
    <div className="relative max-w-3xl mx-auto w-full group">
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-[28px] blur-md opacity-50 group-focus-within:opacity-100 transition-opacity duration-500"></div>
      <div className="relative bg-bg-card border border-white/10 rounded-[24px] shadow-lg flex items-end p-2 focus-within:border-indigo-500/50 transition-colors duration-300">
        <button className="p-3 text-text-secondary hover:text-white transition-colors rounded-xl hover:bg-white/5 shrink-0">
          <Paperclip className="w-5 h-5" />
        </button>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Message PrepSaathi AI..."
          className="w-full bg-transparent border-none text-text-primary placeholder-text-secondary focus:ring-0 resize-none py-3 px-2 max-h-32 overflow-y-auto"
          rows={1}
          style={{ minHeight: '48px' }}
        />
        <button 
          className={`p-3 shrink-0 rounded-xl transition-all duration-300 ${
            query.trim().length > 0 
              ? 'bg-indigo-500 text-white hover:bg-indigo-600 shadow-[0_0_15px_rgba(99,102,241,0.5)]' 
              : 'bg-white/5 text-text-secondary cursor-not-allowed'
          }`}
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
