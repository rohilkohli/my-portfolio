import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface Props {
  children: React.ReactNode;
  offset?: number;
}

export function ParallaxSection({ children, offset = 50 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <div ref={ref} className="relative">
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}
