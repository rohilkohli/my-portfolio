import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function GlobalGlitch() {
  const [isGlitching, setIsGlitching] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const triggerGlitch = () => {
      setIsGlitching(true);
      
      // Turn off glitch after short duration
      setTimeout(() => {
        setIsGlitching(false);
      }, 200 + Math.random() * 300);
      
      // Schedule next glitch
      const nextDelay = Math.random() * 15000 + 5000; // Random delay between 5s and 20s
      timeoutRef.current = setTimeout(triggerGlitch, nextDelay);
    };

    // Initial start
    timeoutRef.current = setTimeout(triggerGlitch, 5000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!isGlitching) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden mix-blend-hard-light">
      {/* Chromatic Aberration Shift */}
      <motion.div
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: [0, 0.8, 0], x: [-10, 10, -5, 5, 0] }}
        transition={{ duration: 0.2, times: [0, 0.1, 1] }}
        className="absolute inset-0 bg-red-500/20 mix-blend-screen"
        style={{ left: '4px' }}
      />
      <motion.div
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: [0, 0.8, 0], x: [10, -10, 5, -5, 0] }}
        transition={{ duration: 0.2, times: [0, 0.1, 1] }}
        className="absolute inset-0 bg-blue-500/20 mix-blend-screen"
        style={{ left: '-4px' }}
      />

      {/* Slice Glitch */}
      <motion.div
        initial={{ clipPath: 'inset(0 0 0 0)' }}
        animate={{ 
          clipPath: [
            'inset(10% 0 80% 0)',
            'inset(80% 0 5% 0)',
            'inset(30% 0 50% 0)',
            'inset(0 0 0 0)'
          ],
          x: [-5, 5, -5, 0]
        }}
        transition={{ duration: 0.3, ease: "linear" }}
        className="absolute inset-0 bg-white/10 backdrop-invert"
      />
      
      {/* Scanline Jitter */}
      <motion.div 
         initial={{ y: 0 }}
         animate={{ y: [-20, 20, -10, 10, 0] }}
         transition={{ duration: 0.2 }}
         className="absolute inset-0 backdrop-hue-rotate-90 opacity-30"
      />
    </div>
  );
}
