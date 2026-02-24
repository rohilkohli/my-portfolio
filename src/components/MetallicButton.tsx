import React from 'react';
import { motion } from 'motion/react';

export function MetallicButton({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative px-8 py-4 bg-black text-[#00f0ff] font-mono font-bold uppercase tracking-widest rounded-sm overflow-hidden group border border-[#00f0ff]/30"
    >
      <div className="absolute inset-0 bg-[#00f0ff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00f0ff]" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff]" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00f0ff]" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00f0ff]" />
    </motion.button>
  );
}
