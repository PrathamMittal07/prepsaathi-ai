import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Map, Video, FileText, BookOpen } from 'lucide-react';

export function FooterActions() {
  const router = useRouter();

  const actions = [
    { title: 'Generate Roadmap', icon: <Map size={24} />, link: '/dashboard/dsa-roadmap', color: 'bg-purple-600 hover:bg-purple-700 shadow-purple-500/25' },
    { title: 'Start AI Interview', icon: <Video size={24} />, link: '/dashboard/interview', color: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/25' },
    { title: 'Analyze Resume', icon: <FileText size={24} />, link: '/dashboard/resume', color: 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/25' },
    { title: 'Continue Learning', icon: <BookOpen size={24} />, link: '/dashboard/learning-hub', color: 'bg-orange-600 hover:bg-orange-700 shadow-orange-500/25' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-8">
      {actions.map((action, idx) => (
        <motion.button
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 + (idx * 0.1) }}
          whileHover={{ y: -5, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push(action.link)}
          className={`relative overflow-hidden rounded-2xl p-6 text-white text-left shadow-lg transition-colors ${action.color}`}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl opacity-10 -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              {action.icon}
            </div>
            <span className="font-bold text-[16px] leading-tight pr-4">{action.title}</span>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
