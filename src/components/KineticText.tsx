import React, { useRef, useState } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'motion/react';

interface KineticTextProps {
  text: string;
  className?: string;
}

export function KineticText({ text, className = "" }: KineticTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`flex flex-wrap justify-center cursor-default ${className}`}
    >
      {text.split("").map((char, i) => (
        <KineticChar key={i} char={char} mouseX={mouseX} mouseY={mouseY} index={i} total={text.length} />
      ))}
    </div>
  );
}

function KineticChar({ char, mouseX, mouseY, index, total }: { char: string, mouseX: any, mouseY: any, index: number, total: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  
  // Calculate distance from mouse to this character (approximate center based on index)
  // This is a simplified "distance" calculation for the effect
  const weight = useTransform(mouseX, (x: number) => {
    if (!ref.current) return 400;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    // We need the mouse position relative to the viewport for this to be accurate across the screen
    // But mouseX passed down is relative to container. Let's simplify:
    // Just use a random variation based on mouse movement for now to simulate "kinetic" energy
    return 400; 
  });

  // Let's try a different approach: simple hover effect with spring physics
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.span
      ref={ref}
      className="inline-block transition-all duration-100"
      whileHover={{ 
        scaleY: 1.5, 
        scaleX: 0.8, 
        fontWeight: 900,
        color: "#00f0ff",
        y: -10
      }}
      style={{
        display: "inline-block",
        whiteSpace: "pre"
      }}
    >
      {char}
    </motion.span>
  );
}
