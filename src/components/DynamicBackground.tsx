import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

export function DynamicBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const springConfig = { damping: 30, stiffness: 100 };
  
  // Parallax layers
  const x1 = useSpring(useTransform(mouseX, [0, window.innerWidth], [-20, 20]), springConfig);
  const y1 = useSpring(useTransform(mouseY, [0, window.innerHeight], [-20, 20]), springConfig);
  
  const x2 = useSpring(useTransform(mouseX, [0, window.innerWidth], [30, -30]), springConfig);
  const y2 = useSpring(useTransform(mouseY, [0, window.innerHeight], [30, -30]), springConfig);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Layer 1: Subtle Cyan Glow */}
      <motion.div 
        style={{ x: x1, y: y1 }}
        className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#00f0ff]/5 rounded-full blur-[120px] opacity-50 mix-blend-screen" 
      />
      
      {/* Layer 2: White/Grey Accent */}
      <motion.div 
        style={{ x: x2, y: y2 }}
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] opacity-30" 
      />
      
      {/* Layer 3: Floating Elements */}
      <motion.div
        style={{ x: useTransform(x1, v => v * 1.5), y: useTransform(y1, v => v * 1.5) }}
        className="absolute top-1/3 right-1/4 w-64 h-64 border border-white/5 rounded-full opacity-20"
      />
       <motion.div
        style={{ x: useTransform(x2, v => v * 1.2), y: useTransform(y2, v => v * 1.2) }}
        className="absolute bottom-1/3 left-1/4 w-96 h-96 border border-[#00f0ff]/10 rounded-full opacity-20"
      />
    </div>
  );
}
