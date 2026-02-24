/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { Card3D } from './components/Card3D';
import { MetallicButton } from './components/MetallicButton';
import { ChevronDown, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import ProjectDetail from './components/ProjectDetail';

import { MarqueeBanner } from './components/MarqueeBanner';

import { Scene3D } from './components/Scene3D';
import { GlitchText } from './components/GlitchText';
import { GlobalGlitch } from './components/GlobalGlitch';
import { Hologram } from './components/Hologram';

function Home() {
  const { scrollY, scrollYProgress } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <>
      <GlobalGlitch />
      
      {/* Glitchy Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#00f0ff] origin-left z-[100] mix-blend-difference"
        style={{ scaleX }}
      >
        <div className="absolute inset-0 bg-white opacity-50 animate-pulse" />
      </motion.div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center mix-blend-difference">
        <div className="text-xl font-bold tracking-tighter cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>PORTFOLIO</div>
        <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
          <button onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })} className="hover:opacity-50 transition-opacity cursor-pointer">WORK</button>
          <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="hover:opacity-50 transition-opacity cursor-pointer">ABOUT</button>
          <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="hover:opacity-50 transition-opacity cursor-pointer">CONTACT</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
        {/* 3D Scene Background */}
        <motion.div 
          style={{ opacity }}
          className="absolute inset-0 z-0"
        >
          <Scene3D />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />
        </motion.div>

        <motion.div 
          style={{ y: yText, opacity }} 
          className="relative z-10 text-center max-w-5xl mx-auto pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
             <h1 className="text-6xl md:text-9xl font-serif font-medium leading-[0.9] tracking-tight text-metallic-subtle flex flex-col items-center">
              <GlitchText text="Rohil" />
              <span className="italic mt-2">Kohli</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12"
          >
            Software Developer & B.Tech Student at BITS Pilani. <br/>
            Crafting premium digital experiences from Lucknow to the world.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pointer-events-auto"
          >
            <MetallicButton onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
              My Journey
            </MetallicButton>
          </motion.div>
        </motion.div>

        <motion.div 
          style={{ opacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce z-10"
        >
          <ChevronDown className="text-white/40" />
        </motion.div>
      </section>

      {/* Marquee Banner */}
      <MarqueeBanner />

      {/* Work Section */}
      <section id="work" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-white/10 pb-8">
            <div>
              <h2 className="text-4xl md:text-6xl font-serif mb-4">Selected Works</h2>
              <p className="text-white/40">Curated projects from my academic and professional journey</p>
            </div>
            <div className="hidden md:block text-right">
              <p className="font-mono text-xs text-white/40">SCROLL TO EXPLORE</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card3D 
              title="Fintech Dashboard"
              subtitle="Finance"
              description="A real-time financial monitoring tool with complex data visualization and dark mode UI."
              image="https://picsum.photos/seed/fintech/800/600"
            />
            <Card3D 
              title="Neon Commerce"
              subtitle="E-Commerce"
              description="High-performance headless commerce platform built for luxury fashion brands."
              image="https://picsum.photos/seed/fashion/800/600"
            />
            <Card3D 
              title="AI Assistant"
              subtitle="Artificial Intelligence"
              description="Voice-activated AI interface with fluid animations and natural language processing."
              image="https://picsum.photos/seed/ai/800/600"
            />
            <Card3D 
              title="Crypto Exchange"
              subtitle="Web3"
              description="Decentralized exchange interface focusing on trust, transparency and speed."
              image="https://picsum.photos/seed/crypto/800/600"
            />
             <Card3D 
              title="Spatial Audio"
              subtitle="Media"
              description="Immersive audio streaming platform with 3D sound visualization."
              image="https://picsum.photos/seed/audio/800/600"
            />
             <Card3D 
              title="Health Tracker"
              subtitle="Wellness"
              description="Biometric data visualization for elite athletes and performance tracking."
              image="https://picsum.photos/seed/health/800/600"
            />
          </div>
        </div>
      </section>

      {/* Philosophy / About Section */}
      <section id="about" className="relative z-10 py-32 px-6 bg-[#141414] overflow-hidden">
        <Hologram />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <span className="font-mono text-xs text-metallic uppercase tracking-widest mb-6 block">About Me</span>
            <h2 className="text-4xl md:text-7xl font-serif leading-tight mb-8">
              Born in Lucknow. <br />
              <span className="text-white/30">Building for the Future.</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
            {/* Education 1 */}
            <div className="border-l border-white/10 pl-8 relative group">
              <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] bg-white rounded-full opacity-20 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="font-mono text-xs text-white/40 mb-2 block">CURRENT</span>
              <h3 className="text-2xl font-serif mb-2">BITS Pilani</h3>
              <p className="text-white/80 font-medium mb-2">B.Tech in Information Systems</p>
              <p className="text-white/50 leading-relaxed text-sm">
                Pursuing under the SIM Work Integrated Learning Program sponsored by Wipro. 
                Combining academic rigor with real-world industry experience.
              </p>
            </div>

            {/* Education 2 */}
            <div className="border-l border-white/10 pl-8 relative group">
              <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] bg-white rounded-full opacity-20 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="font-mono text-xs text-white/40 mb-2 block">DIPLOMA</span>
              <h3 className="text-2xl font-serif mb-2">Dayalbagh Educational Institute</h3>
              <p className="text-white/80 font-medium mb-2">Vocational Diploma in Software Development</p>
              <p className="text-white/50 leading-relaxed text-sm">
                Completed a comprehensive 3-year program in Agra, laying a strong foundation in software engineering principles.
              </p>
            </div>

            {/* Schooling */}
            <div className="border-l border-white/10 pl-8 relative group">
              <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] bg-white rounded-full opacity-20 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="font-mono text-xs text-white/40 mb-2 block">EARLY EDUCATION</span>
              <h3 className="text-2xl font-serif mb-2">Schooling</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-white/80 font-medium">S.K.D. Academy (CBSE)</p>
                  <p className="text-white/50 text-sm">Intermediate (12th)</p>
                </div>
                <div>
                  <p className="text-white/80 font-medium">St. Ann's Convent School (ICSE)</p>
                  <p className="text-white/50 text-sm">High School (10th)</p>
                </div>
              </div>
            </div>

            {/* Background */}
            <div className="border-l border-white/10 pl-8 relative group">
              <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] bg-white rounded-full opacity-20 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="font-mono text-xs text-white/40 mb-2 block">ORIGIN</span>
              <h3 className="text-2xl font-serif mb-2">Lucknow, India</h3>
              <p className="text-white/50 leading-relaxed text-sm">
                Born and brought up in the City of Nawabs. My background combines the traditional values of my hometown with a modern, tech-driven outlook.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Footer */}
      <section id="contact" className="relative z-10 py-32 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div>
            <h2 className="text-5xl md:text-8xl font-serif mb-8 tracking-tight">Let's Talk</h2>
            <a href="mailto:hello@example.com" className="text-2xl md:text-3xl text-white/60 hover:text-white hover:underline decoration-1 underline-offset-8 transition-colors">
              hello@portfolio.design
            </a>
          </div>
          
          <div className="flex flex-col gap-6 items-start md:items-end">
            <div className="flex gap-4">
              <a href="https://github.com/rohilkohli" target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                <Github size={24} />
              </a>
              <a href="#" className="p-4 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                <Twitter size={24} />
              </a>
              <a href="https://www.linkedin.com/in/rohil-kohli-041022236" target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="#" className="p-4 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                <Mail size={24} />
              </a>
            </div>
            <p className="text-white/30 text-sm">
              © 2026 Premium Portfolio. All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default function App() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for the cursor glow
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <HashRouter>
      <div className="min-h-screen bg-[#050505] text-white selection:bg-[#00f0ff] selection:text-black font-sans">
        <div className="bg-grid" />
        <div className="bg-scanlines" />
        
        {/* Custom Cursor Glow */}
        <motion.div 
          className="fixed w-[500px] h-[500px] bg-[#00f0ff]/10 rounded-full blur-[100px] pointer-events-none z-0 mix-blend-screen"
          style={{ 
            x: springX, 
            y: springY,
            translateX: "-50%",
            translateY: "-50%"
          }}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<ProjectDetail />} />
        </Routes>
      </div>
    </HashRouter>
  );
}


