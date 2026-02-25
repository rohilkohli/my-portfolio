import React, { useEffect, useRef } from 'react';

export function SkillsSphere() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const skills = [
      "React", "TypeScript", "Node.js", "Next.js", "Tailwind", 
      "Three.js", "WebGL", "GraphQL", "PostgreSQL", "AWS", 
      "Docker", "Figma", "UI/UX", "Python", "Git", "Redux",
      "Vite", "Express", "MongoDB", "Solidity"
    ];

    const tagCloud = document.createElement('div');
    tagCloud.style.position = 'relative';
    tagCloud.style.width = '300px';
    tagCloud.style.height = '300px';
    tagCloud.style.transformStyle = 'preserve-3d';
    container.appendChild(tagCloud);

    const tags: { element: HTMLDivElement; x: number; y: number; z: number }[] = [];
    const radius = 140;

    // Initialize tags on a sphere
    for (let i = 0; i < skills.length; i++) {
      const phi = Math.acos(-1 + (2 * i) / skills.length);
      const theta = Math.sqrt(skills.length * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      const tag = document.createElement('div');
      tag.textContent = skills[i];
      tag.style.position = 'absolute';
      tag.style.left = '50%';
      tag.style.top = '50%';
      tag.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
      tag.style.color = '#fff';
      tag.style.fontFamily = 'monospace';
      tag.style.fontSize = '14px';
      tag.style.fontWeight = 'bold';
      tag.style.opacity = '0.8';
      tag.style.userSelect = 'none';
      tag.style.whiteSpace = 'nowrap';
      
      tagCloud.appendChild(tag);
      tags.push({ element: tag, x, y, z });
    }

    let angleX = 0.002;
    let angleY = 0.002;

    const animate = () => {
      // Rotation matrices
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      tags.forEach((tag) => {
        // Rotate around Y
        const y1 = tag.y * cosY - tag.z * sinY;
        const z1 = tag.z * cosY + tag.y * sinY;
        
        // Rotate around X
        const x2 = tag.x * cosX - z1 * sinX;
        const z2 = z1 * cosX + tag.x * sinX;

        tag.x = x2;
        tag.y = y1;
        tag.z = z2;

        const scale = (tag.z + radius * 2) / (radius * 2); // Simple depth scaling
        const opacity = (tag.z + radius) / (radius * 2);

        tag.element.style.transform = `translate(-50%, -50%) translate3d(${tag.x}px, ${tag.y}px, ${tag.z}px) scale(${scale})`;
        tag.element.style.opacity = Math.max(0.2, opacity).toString();
        tag.element.style.zIndex = Math.floor(tag.z).toString();
        
        // Highlight logic
        if (tag.z > 100) {
            tag.element.style.color = '#00f0ff';
            tag.element.style.textShadow = '0 0 10px #00f0ff';
        } else {
            tag.element.style.color = '#fff';
            tag.element.style.textShadow = 'none';
        }
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;
        
        angleY = mouseX * 0.0001;
        angleX = -mouseY * 0.0001;
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', () => {
        angleX = 0.002;
        angleY = 0.002;
    });

    return () => {
      cancelAnimationFrame(animationId);
      container.innerHTML = ''; // Cleanup
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-[300px] h-[300px] flex items-center justify-center cursor-grab active:cursor-grabbing"
    />
  );
}
