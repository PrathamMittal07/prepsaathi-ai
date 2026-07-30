'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, Sparkles, Trash2, Check, User, Loader2 } from 'lucide-react';
import { useCareerCoach } from '../context/CareerCoachContext';
import { careerApi } from '@/lib/api/career';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const SUGGESTED_QUESTIONS = [
  "How can I improve my resume?",
  "What skills should I learn for Backend Development?",
  "Prepare me for Amazon interviews.",
  "How can I improve my Resume Match Score?"
];

export function CoachChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { coachData } = useCareerCoach();
  
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    
    const newMsg: Message = { role: 'user', content: text };
    const history = [...messages];
    
    setMessages([...history, newMsg]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await careerApi.chatWithCoach(text, history);
      setMessages([...history, newMsg, { role: 'assistant', content: response.reply }]);
    } catch (err: any) {
      setError(err.message || 'Failed to communicate with coach');
      // Revert user message on failure so they can try again, or just let them retry
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const clearChat = () => {
    if (confirm('Are you sure you want to clear the conversation?')) {
      setMessages([]);
      setError(null);
    }
  };

  return (
    <div className={`bg-gradient-to-br from-indigo-50 to-purple-50 rounded-[2rem] p-4 md:p-8 border border-indigo-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col relative w-full transition-all duration-300 ${messages.length > 0 ? 'h-[600px]' : 'h-auto'}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-3">
          <Bot className="text-indigo-500" size={24} /> AI Career Coach
        </h3>
        {messages.length > 0 && (
          <button 
            onClick={clearChat}
            className="text-xs font-bold text-slate-500 hover:text-red-500 flex items-center gap-1 transition-colors"
          >
            <Trash2 size={14} /> Clear Chat
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto mb-4 pr-2 space-y-4 custom-scrollbar flex flex-col">
        {messages.length === 0 ? (
          <div className="flex flex-col justify-start text-left mt-2 w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm shrink-0">
                <Sparkles size={20} />
              </div>
              <h4 className="font-bold text-slate-800 text-xl">
                Hi {coachData?.firstName ? `${coachData.firstName} 👋` : '👋'}
              </h4>
            </div>
            
            <div className="mb-6 text-left w-full flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-700 mb-2">I already know:</p>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600"><Check size={14} className="text-emerald-500" /> Your profile</div>
                  <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600"><Check size={14} className="text-emerald-500" /> Your roadmap</div>
                  <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600"><Check size={14} className="text-emerald-500" /> Resume status</div>
                  <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600"><Check size={14} className="text-emerald-500" /> Placement progress</div>
                </div>
              </div>
              
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-700 mb-2">Ask me anything about:</p>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Resume improvement</div>
                  <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Interview preparation</div>
                  <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Roadmap planning</div>
                  <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Skill development</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-start gap-2 w-full mb-4">
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  className="bg-white border border-indigo-100 hover:border-indigo-300 hover:bg-indigo-50 text-indigo-700 text-sm font-medium px-4 py-2 rounded-full shadow-sm transition-colors text-left"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'assistant' && (
                  <div className="w-8 h-8 mr-3 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 shrink-0 flex items-center justify-center text-white shadow-md">
                    <Bot size={16} />
                  </div>
                )}
                
                <div 
                  className={`px-5 py-4 shadow-sm max-w-[85%] text-sm leading-relaxed prose prose-sm ${
                    m.role === 'user' 
                      ? 'bg-white rounded-2xl rounded-tr-none border border-gray-100 text-gray-800 font-medium' 
                      : 'bg-indigo-600 text-white rounded-2xl rounded-tl-none prose-invert'
                  }`}
                >
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {m.content}
                  </ReactMarkdown>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}

        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="w-8 h-8 mr-3 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 shrink-0 flex items-center justify-center text-white shadow-md">
              <Bot size={16} />
            </div>
            <div className="bg-indigo-600 text-white rounded-2xl rounded-tl-none px-5 py-4 shadow-md flex items-center gap-2 text-sm font-medium">
              <Loader2 size={16} className="animate-spin" /> Thinking...
            </div>
          </motion.div>
        )}
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl border border-red-200 text-sm flex justify-between items-center">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="font-bold underline">Dismiss</button>
          </div>
        )}

        <div ref={endOfMessagesRef} />
      </div>

      <form onSubmit={handleSubmit} className="mt-auto relative">
        <input 
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={isLoading}
          placeholder="Ask your career coach..."
          className="w-full bg-white rounded-xl border border-gray-200 pl-4 pr-12 py-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm font-medium disabled:opacity-50"
        />
        <button 
          type="submit"
          disabled={isLoading || !input.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-100 disabled:opacity-50 disabled:hover:bg-indigo-50 transition-colors"
        >
          <Send size={18} className={input.trim() && !isLoading ? 'ml-1' : ''} />
        </button>
      </form>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(99, 102, 241, 0.2);
          border-radius: 20px;
        }
        .prose-invert a {
          color: #93c5fd;
        }
        .prose-invert strong {
          color: #fde047;
        }
      `}} />
    </div>
  );
}
