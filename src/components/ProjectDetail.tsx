import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function ProjectDetail() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-8 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="bg-noise" />
      
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-white/60 hover:text-white transition-colors z-20">
        <ArrowLeft size={20} />
        <span className="font-mono text-sm uppercase tracking-widest">Back to Home</span>
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl text-center z-10"
      >
        <span className="font-mono text-xs text-metallic uppercase tracking-widest mb-4 block">Project Detail</span>
        <h1 className="text-5xl md:text-7xl font-serif mb-6">Work in Progress</h1>
        <p className="text-white/50 text-lg leading-relaxed mb-8">
          This project case study is currently being documented. 
          Check back soon for a deep dive into the design process and technical implementation.
        </p>
        
        <div className="p-1 rounded-2xl bg-gradient-to-br from-white/10 to-transparent inline-block">
          <div className="bg-[#1a1a1a] rounded-xl px-8 py-4 border border-white/5">
            <span className="font-mono text-xs text-white/40">STATUS: COMING SOON</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
