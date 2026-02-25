import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Code, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { projects } from '../data/projects';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">Project Not Found</h1>
          <Link to="/" className="text-[#00f0ff] hover:underline">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-x-hidden">
      <div className="fixed inset-0 bg-noise opacity-[0.03] pointer-events-none" />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 p-8 z-50">
        <Link to="/" className="flex items-center gap-3 text-white/60 hover:text-[#00f0ff] transition-colors group">
          <div className="p-2 rounded-full border border-white/10 group-hover:border-[#00f0ff]/50 transition-colors">
            <ArrowLeft size={20} />
          </div>
          <span className="font-mono text-sm uppercase tracking-widest">Back to Home</span>
        </Link>
      </nav>

      {/* Hero Image */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="h-[60vh] w-full relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505] z-10" />
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-20 z-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-7xl mx-auto"
          >
            <span className="font-mono text-[#00f0ff] text-sm tracking-[0.2em] uppercase mb-4 block">{project.subtitle}</span>
            <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-6 tracking-tight">{project.title}</h1>
          </motion.div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 md:px-20 py-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Sidebar Details */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1 space-y-12"
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <User className="text-[#00f0ff] mt-1" size={20} />
                <div>
                  <h3 className="font-mono text-xs text-white/40 uppercase tracking-widest mb-1">Role</h3>
                  <p className="text-lg">{project.details.role}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Calendar className="text-[#00f0ff] mt-1" size={20} />
                <div>
                  <h3 className="font-mono text-xs text-white/40 uppercase tracking-widest mb-1">Year</h3>
                  <p className="text-lg">{project.details.year}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Layers className="text-[#00f0ff] mt-1" size={20} />
                <div>
                  <h3 className="font-mono text-xs text-white/40 uppercase tracking-widest mb-1">Client</h3>
                  <p className="text-lg">{project.details.client}</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <Code className="text-[#00f0ff]" size={20} />
                <h3 className="font-mono text-xs text-white/40 uppercase tracking-widest">Technologies</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.details.technologies.map((tech) => (
                  <span key={tech} className="px-3 py-1 border border-white/10 rounded-full text-sm text-white/80 hover:border-[#00f0ff]/50 hover:text-[#00f0ff] transition-colors cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-serif mb-6">The Challenge</h2>
              <p className="text-white/60 text-lg leading-relaxed">
                {project.details.challenge}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-serif mb-6">The Solution</h2>
              <p className="text-white/60 text-lg leading-relaxed">
                {project.details.solution}
              </p>
            </motion.div>

            {/* Mockup / Gallery Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full aspect-video bg-[#1a1a1a] rounded-2xl border border-white/10 overflow-hidden relative group"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-[#00f0ff]/40 tracking-widest uppercase">Interactive Demo Placeholder</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#00f0ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
