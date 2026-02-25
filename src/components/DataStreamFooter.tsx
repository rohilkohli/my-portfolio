import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Magnetic } from './Magnetic';

export function DataStreamFooter() {
  const [isHovered, setIsHovered] = useState(false);
  const [text, setText] = useState("SYSTEM_SHUTDOWN_SEQUENCE_INITIATED");
  
  // Glitch effect on hover
  useEffect(() => {
    let interval: any;
    if (isHovered) {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
      let iteration = 0;
      
      interval = setInterval(() => {
        setText(prev => 
          prev.split("")
            .map((char, index) => {
              if (index < iteration) {
                return "CONNECT_WITH_ME_NOW"[index];
              }
              return chars[Math.floor(Math.random() * chars.length)]
            })
            .join("")
        );
        
        if (iteration >= "CONNECT_WITH_ME_NOW".length) {
          clearInterval(interval);
        }
        
        iteration += 1/3;
      }, 30);
    } else {
      setText("SYSTEM_SHUTDOWN_SEQUENCE_INITIATED");
    }
    
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <footer 
      className="relative py-20 border-t border-white/10 bg-black overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Matrix Rain / Data Stream Background Effect could go here */}
      
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center">
        <div className="font-mono text-xs text-[#00f0ff] mb-8 tracking-widest animate-pulse">
          {text}
        </div>

        <div className="flex gap-8 mb-12">
          <Magnetic>
            <a href="#" className="text-white/50 hover:text-[#00f0ff] transition-colors p-4 block">
              <Github size={24} />
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#" className="text-white/50 hover:text-[#00f0ff] transition-colors p-4 block">
              <Twitter size={24} />
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#" className="text-white/50 hover:text-[#00f0ff] transition-colors p-4 block">
              <Linkedin size={24} />
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#" className="text-white/50 hover:text-[#00f0ff] transition-colors p-4 block">
              <Mail size={24} />
            </a>
          </Magnetic>
        </div>

        <div className="text-white/20 text-xs font-mono">
          © 2026 ROHIL KOHLI. ALL RIGHTS RESERVED. <br/>
          DESIGNED & DEVELOPED IN THE VOID.
        </div>
      </div>
    </footer>
  );
}
