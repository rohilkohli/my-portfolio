import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CardProps {
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  link?: string;
}

export function Card3D({ title, subtitle, description, image, link = "/project" }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHidden, setIsHidden] = useState(false);
  
  // Randomize floating animation for organic feel
  const [randomConfig] = useState(() => ({
    y: Math.random() * 15 + 5, // Float distance between 5px and 20px
    duration: Math.random() * 2 + 4, // Duration between 4s and 6s
    delay: Math.random() * 2 // Start delay between 0s and 2s
  }));

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["25deg", "-25deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-25deg", "25deg"]);

  // Spotlight effect
  const spotlightX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const spotlightY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);
  const spotlightGradient = useMotionTemplate`radial-gradient(600px circle at ${spotlightX} ${spotlightY}, rgba(0, 240, 255, 0.15), transparent 40%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || isHidden) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;

    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1000 }} className={`w-full transition-all duration-500 ${isHidden ? 'h-auto' : 'h-full min-h-[400px]'}`}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={!isHidden ? { scale: 1.05, x: [0, -2, 2, -1, 1, 0], transition: { x: { repeat: Infinity, duration: 0.2 } } } : {}}
        animate={{ 
          y: isHidden ? 0 : [0, -randomConfig.y, 0],
          height: isHidden ? 'auto' : '100%'
        }}
        transition={{ 
          y: {
            duration: randomConfig.duration, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: randomConfig.delay
          },
          height: { duration: 0.4 }
        }}
        style={{
          rotateX: isHidden ? 0 : rotateX,
          rotateY: isHidden ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full bg-[#1a1a1a] border border-white/10 rounded-3xl p-8 flex flex-col justify-between group hover:border-white/20 transition-colors duration-500 overflow-hidden"
      >
        {/* Spotlight */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: spotlightGradient }}
        />

        {/* Shine effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.4) 25%, transparent 30%)'
          }}
        />

        <div style={{ transform: isHidden ? "none" : "translateZ(50px)" }} className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <Link to={link} className="z-20">
              <span className="text-xs font-mono text-[#00f0ff]/60 uppercase tracking-widest border border-[#00f0ff]/20 px-2 py-1 rounded-sm hover:bg-[#00f0ff] hover:text-black transition-colors duration-300 cursor-pointer">{subtitle}</span>
            </Link>
            <div className="flex items-center gap-3 z-20">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsHidden(!isHidden);
                }}
                className="text-[#00f0ff]/60 hover:text-[#00f0ff] transition-colors hover:scale-110 duration-300"
              >
                {isHidden ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
              <Link to={link}>
                <ArrowUpRight className="text-[#00f0ff]/60 group-hover:text-[#00f0ff] transition-colors hover:scale-110 duration-300" size={20} />
              </Link>
            </div>
          </div>
          <h3 className="text-3xl font-serif font-bold text-white mb-2 tracking-tight">{title}</h3>
          
          <AnimatePresence>
            {!isHidden && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-white/60 text-sm leading-relaxed max-w-[90%] font-mono">
                  {description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {!isHidden && image && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              style={{ transform: "translateZ(75px)" }}
              className="mt-8 rounded-xl overflow-hidden h-48 w-full relative shadow-2xl img-glitch-container"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent z-10" />
              {/* Main Image */}
              <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0 scale-100 group-hover:scale-110 transition-transform duration-700 ease-out relative z-0"
              />
              {/* Glitch Layer 1 */}
              <img 
                src={image} 
                alt="" 
                className="img-glitch absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-50 mix-blend-color-dodge z-10 pointer-events-none"
                style={{ clipPath: 'inset(10% 0 80% 0)' }}
              />
              {/* Glitch Layer 2 */}
              <img 
                src={image} 
                alt="" 
                className="img-glitch absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-50 mix-blend-exclusion z-10 pointer-events-none"
                style={{ clipPath: 'inset(80% 0 10% 0)', transform: 'translate(-5px, 0)' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

