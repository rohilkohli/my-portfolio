import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CardProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image?: string;
}

export function Card3D({ id, title, subtitle, description, image }: CardProps) {
  const link = `/project/${id}`;
  const ref = useRef<HTMLDivElement>(null);

  // Randomize floating animation for organic feel
  const [randomConfig] = useState(() => ({
    y: Math.random() * 15 + 5, // Float distance between 5px and 20px
    duration: Math.random() * 2 + 4, // Duration between 4s and 6s
    delay: Math.random() * 2 // Start delay between 0s and 2s
  }));

  const xMv = useMotionValue(0);
  const yMv = useMotionValue(0);
  const chromaMv = useMotionValue(0);
  const pointerRef = useRef({ x: 0, y: 0, t: 0 });

  const mouseX = useSpring(xMv, { stiffness: 200, damping: 20 });
  const mouseY = useSpring(yMv, { stiffness: 200, damping: 20 });
  const chroma = useSpring(chromaMv, { stiffness: 180, damping: 22 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-12deg', '12deg']);

  // Spotlight effect
  const spotlightX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const spotlightY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);
  const spotlightGradient = useMotionTemplate`radial-gradient(600px circle at ${spotlightX} ${spotlightY}, rgba(255,255,255,0.1), transparent 40%)`;

  const redLayerX = useTransform(chroma, [0, 1], [0, -8]);
  const blueLayerX = useTransform(chroma, [0, 1], [0, 8]);
  const chromaOpacity = useTransform(chroma, [0, 1], [0, 0.4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;

    xMv.set(mouseXFromCenter / width);
    yMv.set(mouseYFromCenter / height);

    const now = performance.now();
    const prev = pointerRef.current;
    if (prev.t !== 0) {
      const dt = Math.max(now - prev.t, 16);
      const dx = e.clientX - prev.x;
      const dy = e.clientY - prev.y;
      const velocity = Math.sqrt(dx * dx + dy * dy) / dt;
      chromaMv.set(Math.min(1, velocity * 0.8));
    }
    pointerRef.current = { x: e.clientX, y: e.clientY, t: now };
  };

  const handleMouseLeave = () => {
    xMv.set(0);
    yMv.set(0);
    chromaMv.set(0);
    pointerRef.current = { x: 0, y: 0, t: 0 };
  };

  return (
    <div style={{ perspective: 1000 }} className="w-full h-full min-h-[400px]">
      <motion.div
        animate={{
          y: [0, -randomConfig.y, 0]
        }}
        transition={{
          y: {
            duration: randomConfig.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: randomConfig.delay
          }
        }}
        className="w-full h-full"
      >
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          whileHover={{ scale: 1.02, y: -10 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          className="relative w-full h-full bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col justify-between group hover:border-white/20 transition-colors duration-500 overflow-hidden shadow-2xl"
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

          <div style={{ transform: 'translateZ(50px)' }} className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <Link to={link} className="z-20">
                <span className="text-xs font-mono text-[#00f0ff]/60 uppercase tracking-widest border border-[#00f0ff]/20 px-2 py-1 rounded-sm hover:bg-[#00f0ff] hover:text-black transition-colors duration-300 cursor-pointer">{subtitle}</span>
              </Link>
              <Link to={link} className="z-20">
                <ArrowUpRight className="text-[#00f0ff]/60 group-hover:text-[#00f0ff] transition-colors hover:scale-110 duration-300" size={20} />
              </Link>
            </div>
            <h3 className="text-3xl font-serif font-bold text-white mb-2 tracking-tight">{title}</h3>
            <p className="text-white/60 text-sm leading-relaxed max-w-[90%] font-mono">
              {description}
            </p>
          </div>

          {image && (
            <div
              style={{ transform: 'translateZ(75px)' }}
              className="mt-8 rounded-xl overflow-hidden h-48 w-full relative shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent z-20" />
              <motion.img
                src={image}
                alt={title}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0 scale-100 group-hover:scale-110 transition-transform duration-700 ease-out project-image-parallax"
              />
              <motion.img
                src={image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover mix-blend-screen pointer-events-none saturate-[1.6]"
                style={{ x: redLayerX, opacity: chromaOpacity, filter: 'drop-shadow(0 0 8px rgba(255, 0, 90, 0.45))' }}
              />
              <motion.img
                src={image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover mix-blend-screen pointer-events-none saturate-[1.6]"
                style={{ x: blueLayerX, opacity: chromaOpacity, filter: 'drop-shadow(0 0 8px rgba(0, 200, 255, 0.5))' }}
              />
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
