import React from 'react';
import { motion } from 'motion/react';

const MarqueeItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-8 px-4">
    <span className="text-4xl md:text-6xl font-serif italic text-white/20 whitespace-nowrap">
      {text}
    </span>
    <div className="w-2 h-2 rounded-full bg-white/20" />
  </div>
);

export function MarqueeBanner() {
  const items = [
    "Software Development",
    "System Architecture",
    "BITS Pilani",
    "Full Stack Engineering",
    "UI/UX Design",
    "React Ecosystem",
    "Node.js",
    "Cloud Native",
    "Wipro Scholar"
  ];

  return (
    <div className="relative w-full py-12 overflow-hidden border-y border-white/5 bg-white/[0.02] backdrop-blur-sm z-20">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-transparent to-[#0f0f0f] z-10 pointer-events-none" />
      
      <div className="flex">
        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex items-center"
        >
          {[...items, ...items, ...items].map((item, index) => (
            <MarqueeItem key={index} text={item} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
