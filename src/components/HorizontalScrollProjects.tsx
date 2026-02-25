import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card3D } from './Card3D';
import { projects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

export function HorizontalScrollProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const totalSections = projects.length + 1; // +1 for the title section
    const ctx = gsap.context(() => {
      gsap.to(sectionRef.current, {
        xPercent: -100 * (totalSections - 1),
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (totalSections - 1),
          end: () => "+=" + (sectionRef.current?.offsetWidth || 0),
        }
      });

      panelRefs.current.forEach((panel, index) => {
        if (!panel) return;

        const card = panel.querySelector('.project-card-shell');
        const cardImage = panel.querySelector('.project-image-parallax');
        const antiGridOffset = [-13, 14, 2][index % 3];

        if (!card || !cardImage) return;

        gsap.set(card, {
          yPercent: antiGridOffset,
        });

        gsap.to(card, {
          yPercent: antiGridOffset + (index % 2 === 0 ? -9 : 9),
          ease: 'none',
          scrollTrigger: {
            trigger: triggerRef.current,
            scrub: 1,
            start: 'top top',
            end: () => `+=${sectionRef.current?.offsetWidth || 0}`,
          },
        });

        gsap.to(cardImage, {
          xPercent: -18 - index * 4,
          ease: 'none',
          scrollTrigger: {
            trigger: triggerRef.current,
            scrub: 1,
            start: 'top top',
            end: () => `+=${sectionRef.current?.offsetWidth || 0}`,
          },
        });
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="overflow-hidden bg-black/40 backdrop-blur-sm border-t border-white/5">
      <div ref={triggerRef} className="overscroll-none">
        <div 
          ref={sectionRef} 
          className="h-screen flex flex-row relative w-fit"
          style={{ width: `${(projects.length + 1) * 100}vw` }}
        >
          <div className="h-full w-screen flex items-center justify-center px-20 border-r border-white/5 shrink-0">
            <div>
              <h2 className="text-8xl font-serif mb-4">Selected <br/> Works</h2>
              <p className="text-white/50 font-mono max-w-md">
                A curated collection of digital experiences, applications, and experiments.
                <br/><br/>
                SCROLL DOWN →
              </p>
            </div>
          </div>
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                panelRefs.current[index] = el;
              }}
              className="h-full w-screen flex items-center justify-center px-20 border-r border-white/5 relative group shrink-0"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00f0ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="w-full max-w-4xl project-card-shell">
                <span className="font-mono text-xs text-[#00f0ff] mb-4 block">0{index + 1} / 0{projects.length}</span>
                <Card3D 
                  id={project.id}
                  title={project.title}
                  subtitle={project.subtitle}
                  description={project.description}
                  image={project.image}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
