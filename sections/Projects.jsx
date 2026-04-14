'use client';

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Sparkles, ChevronRight, Folder } from "lucide-react";
import { projects } from "../constants";
import styles from "../styles";

// --- Project Canvas Background ---
const ProjectCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let stars = [];
    let comets = [];
    const colors = ["#22d3ee", "#a855f7", "#ffffff"];

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
      init();
    };

    class Star {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.2;
        this.opacity = Math.random();
        this.speed = 0.005 + Math.random() * 0.01;
      }
      draw() {
        this.opacity += this.speed;
        if (this.opacity > 1 || this.opacity < 0) this.speed *= -1;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(this.opacity)})`;
        ctx.fill();
      }
    }

    class Comet {
      constructor() { this.reset(); }
      reset() {
        const edge = Math.floor(Math.random() * 4);
        if (edge === 0) { this.x = Math.random() * canvas.width; this.y = -50; }
        else if (edge === 1) { this.x = canvas.width + 50; this.y = Math.random() * canvas.height; }
        else if (edge === 2) { this.x = Math.random() * canvas.width; this.y = canvas.height + 50; }
        else { this.x = -50; this.y = Math.random() * canvas.height; }
        this.size = 1 + Math.random() * 1.5;
        this.speed = 1.5 + Math.random() * 4;
        this.angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.tailLength = 40 + Math.random() * 100;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < -200 || this.x > canvas.width + 200 || this.y < -200 || this.y > canvas.height + 200) this.reset();
      }
      draw() {
        ctx.save();
        const gradient = ctx.createLinearGradient(this.x, this.y, this.x - this.vx * (this.tailLength / this.speed), this.y - this.vy * (this.tailLength / this.speed));
        gradient.addColorStop(0, this.color); gradient.addColorStop(1, "transparent");
        ctx.strokeStyle = gradient; ctx.lineWidth = this.size; ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(this.x, this.y); ctx.lineTo(this.x - this.vx * (this.tailLength / this.speed), this.y - this.vy * (this.tailLength / this.speed)); ctx.stroke();
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size * 1.2, 0, Math.PI * 2); ctx.fillStyle = this.color; ctx.shadowBlur = 8; ctx.shadowColor = this.color; ctx.fill();
        ctx.restore();
      }
    }

    const init = () => {
      stars = Array.from({ length: 80 }, () => new Star());
      comets = Array.from({ length: 25 }, () => new Comet());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => s.draw());
      comets.forEach(c => { c.update(); c.draw(); });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(animationFrameId); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

const Projects = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <section id="projects" className="relative w-full min-h-screen bg-black overflow-hidden py-24 flex flex-col items-center">
      <ProjectCanvas />

      {/* Heading */}
      <div className="relative z-10 text-center mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-3 py-1 w-fit mx-auto rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4"
        >
          <Sparkles size={12} className="text-cyan-400" />
          <span className="text-cyan-400 text-[10px] font-bold tracking-[0.3em] uppercase">The Archive</span>
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-white text-4xl md:text-7xl font-black"
        >
          Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Stacks</span>
        </motion.h2>
      </div>

      {/* Fan Container */}
      <div 
        className="relative z-10 w-full max-w-6xl h-[650px] flex items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode="wait">
          {selectedIndex === null ? (
            /* Fan View */
            <div className="relative w-full h-full flex items-center justify-center">
              {projects.map((project, idx) => {
                const total = projects.length;
                const mid = (total - 1) / 2;
                const offset = idx - mid;
                
                // Wider and more staggered fan calculations
                const angle = isHovered ? offset * 15 : 0;
                const x = isHovered ? offset * 170 : 0; 
                const y = isHovered ? (Math.abs(offset) * 35 - (idx * 10)) : idx * 2; 

                return (
                  <motion.div
                    key={project.id}
                    layoutId={`project-${project.id}`}
                    onClick={() => setSelectedIndex(idx)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      rotate: angle,
                      x: x,
                      y: y,
                      zIndex: isHovered ? 50 + Math.abs(offset) : 10 + idx
                    }}
                    whileHover={{ 
                      y: y - 60,
                      scale: 1.05,
                      zIndex: 200,
                      transition: { duration: 0.2 }
                    }}
                    transition={{ type: "spring", stiffness: 150, damping: 25 }}
                    className="absolute w-[280px] h-[400px] cursor-pointer"
                  >
                    {/* Animated Project Title Label (Visible when hovered over stack) */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: -20 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute -top-12 left-1/2 -translate-x-1/2 bg-cyan-500 text-black text-[10px] font-black px-3 py-1 rounded shadow-lg whitespace-nowrap z-[210] uppercase tracking-tighter"
                        >
                          {project.title}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="w-full h-full bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-xl flex flex-col justify-between group overflow-hidden transition-colors hover:border-cyan-500/50">
                      {/* Decorative Folder Tab */}
                      <div className="absolute top-0 left-0 w-20 h-7 bg-white/5 rounded-br-xl border-r border-b border-white/10 flex items-center justify-center">
                        <Folder size={12} className="text-cyan-400" />
                      </div>

                      <div className="mt-6 flex-1 flex flex-col justify-center">
                        <div className="w-full h-32 rounded-lg bg-black/40 overflow-hidden mb-4 border border-white/5 relative group-hover:border-cyan-500/20 transition-colors">
                          <img src={project.imgUrl} alt="" className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        </div>
                        <h3 className="text-white text-lg font-black tracking-tight text-center group-hover:text-cyan-400 transition-colors line-clamp-2">
                          {project.title}
                        </h3>
                      </div>

                      <div className="space-y-3">
                        <div className="flex flex-wrap justify-center gap-1.5">
                          {project.skills?.slice(0, 3).map((skill, i) => (
                            <span key={i} className="text-[8px] font-bold uppercase tracking-widest text-white/30">
                              {skill}
                            </span>
                          ))}
                        </div>
                        <p className="text-white/10 text-[9px] font-black uppercase tracking-[0.3em] text-center border-t border-white/5 pt-3">Click to open</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            /* Selected / Inspection View */
            <motion.div
              layoutId={`project-${projects[selectedIndex].id}`}
              className="relative z-50 w-full max-w-5xl bg-[#0a0a0a] border border-cyan-500/30 rounded-3xl p-8 md:p-12 shadow-[0_0_100px_rgba(6,182,212,0.15)] flex flex-col lg:flex-row gap-12"
            >
              <button 
                onClick={() => setSelectedIndex(null)}
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/10"
              >
                Close Archive <ChevronRight size={16} />
              </button>

              <div className="flex-[1.2] space-y-8">
                <div className="space-y-4">
                  <div className="p-3 w-fit rounded-xl bg-cyan-500 text-black">
                    <Folder size={24} />
                  </div>
                  <h3 className="text-white text-4xl font-black leading-tight">
                    {projects[selectedIndex].title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {projects[selectedIndex].skills?.map((skill, i) => (
                      <span key={i} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-secondary-white text-lg leading-relaxed opacity-90 border-t border-white/10 pt-8">
                  {projects[selectedIndex].description}
                </p>

                <div className="flex gap-4 pt-4">
                  {projects[selectedIndex]?.github && (
                    <a 
                      href={projects[selectedIndex].github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                    >
                      <Github size={18} /> Source Code
                    </a>
                  )}
                  {projects[selectedIndex]?.link && (
                    <a 
                      href={projects[selectedIndex].link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 py-4 rounded-xl bg-cyan-500 text-black font-bold text-xs flex items-center justify-center gap-2 hover:bg-cyan-400 transition-colors"
                    >
                      <ExternalLink size={18} /> Live Demo
                    </a>
                  )}
                </div>
              </div>

              <div className="flex-1 h-[300px] lg:h-auto rounded-2xl overflow-hidden border border-white/10 bg-black relative shadow-2xl">
                <img 
                  src={projects[selectedIndex].imgUrl} 
                  alt={projects[selectedIndex].title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
