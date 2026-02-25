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
import { Magnetic } from './components/Magnetic';
import { CyberGrid } from './components/CyberGrid';
import { SkillsSphere } from './components/SkillsSphere';
import { TerminalContact } from './components/TerminalContact';
import { projects } from './data/projects';
import { DynamicBackground } from './components/DynamicBackground';
import { ScrollProgress } from './components/ScrollProgress';
import { VelocityScroll } from './components/VelocityScroll';
import { ParallaxSection } from './components/ParallaxSection';
import { SmoothScroll } from './components/SmoothScroll';
import { HorizontalScrollProjects } from './components/HorizontalScrollProjects';
import { KineticText } from './components/KineticText';
import { FlashlightCursor } from './components/FlashlightCursor';
import { DataStreamFooter } from './components/DataStreamFooter';
import { SoundToggle } from './components/SoundToggle';
import { NoiseOverlay } from './components/NoiseOverlay';

function Home() {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <SmoothScroll>
      <FlashlightCursor />
      <NoiseOverlay />
      <ScrollProgress />
      <SoundToggle />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center mix-blend-difference">
        <div className="text-xl font-bold tracking-tighter cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>PORTFOLIO</div>
        <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
          <Magnetic><button onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })} className="hover:opacity-50 transition-opacity cursor-pointer">WORK</button></Magnetic>
          <Magnetic><button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="hover:opacity-50 transition-opacity cursor-pointer">ABOUT</button></Magnetic>
          <Magnetic><button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="hover:opacity-50 transition-opacity cursor-pointer">CONTACT</button></Magnetic>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
        {/* 3D Scene Background */}
        <motion.div 
          style={{ opacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />
        </motion.div>

        <motion.div 
          style={{ y: yText, opacity }} 
          className="relative z-10 text-center max-w-5xl mx-auto pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-mono text-sm md:text-base text-[#00f0ff] tracking-[0.2em] mb-4 block">
              SYSTEM ONLINE // V 2.0
            </span>
            <KineticText text="ROHIL KOHLI" className="text-6xl md:text-9xl font-bold tracking-tighter mb-6 mix-blend-difference text-white" />
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
            className="pointer-events-auto inline-block"
          >
            <Magnetic>
              <MetallicButton onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
                My Journey
              </MetallicButton>
            </Magnetic>
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
      <VelocityScroll />

      {/* Work Section (Horizontal Scroll) */}
      <div id="work">
        <HorizontalScrollProjects />
      </div>

      {/* Philosophy / About Section */}
      <section id="about" className="relative z-10 py-32 px-6 bg-black/40 backdrop-blur-sm border-t border-white/5 overflow-hidden">
        <DynamicBackground />
        <div className="max-w-6xl mx-auto">
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

          {/* Technical Arsenal */}
          <div className="mt-32 flex flex-col items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00f0ff]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
              <h3 className="font-mono text-xs text-white/40 uppercase tracking-widest mb-12">Technical Arsenal</h3>
              <SkillsSphere />
              <p className="text-white/30 text-xs mt-8 font-mono">DRAG TO ROTATE</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#00f0ff]/5 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-12">
            LET'S <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/20">CONNECT</span>
          </h2>
          <TerminalContact />
        </div>
      </section>

      <DataStreamFooter />
    </SmoothScroll>
  );
}

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-[#050505] text-white selection:bg-[#00f0ff] selection:text-black font-sans">
        <div className="bg-grid" />
        <div className="bg-scanlines" />
        
        <CyberGrid />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
