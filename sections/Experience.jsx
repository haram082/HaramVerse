'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { insights } from '../constants';
import styles from '../styles';
import { MapPin, Calendar, X, Sparkles } from 'lucide-react';

// --- Experience Canvas Background (Comets & Stars) ---
const ExperienceCanvas = () => {
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

const Experience = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [rotation, setRotation] = useState(0);
  const requestRef = useRef();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const animate = (time) => {
      if (selectedId === null) {
        setRotation((prev) => (prev + 0.25) % 360);
      }
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', checkMobile);
      cancelAnimationFrame(requestRef.current);
    };
  }, [selectedId]);

  const radiusX = 280; 
  const radiusY = 140;
  const total = insights.length;

  return (
    <section id="experience" className="relative w-full min-h-screen bg-black overflow-hidden py-16 flex flex-col items-center justify-center">
      <ExperienceCanvas />

      {/* Heading */}
      <div className="relative z-10 text-center mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-3 py-1 w-fit mx-auto rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4"
        >
          <Sparkles size={12} className="text-cyan-400" />
          <span className="text-cyan-400 text-[10px] font-bold tracking-[0.3em] uppercase">Work Experience</span>
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-white text-4xl md:text-6xl font-black"
        >
          Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Orbit</span>
        </motion.h2>
      </div>

      <div className="relative flex-1 w-full max-w-6xl mx-auto flex items-center justify-center">
        {!isMobile ? (
          <div className="relative w-full h-[500px] flex items-center justify-center">
            
            {/* The Path */}
            <div 
              className="absolute border border-white/5 rounded-[100%] pointer-events-none"
              style={{ width: radiusX * 2, height: radiusY * 2 }}
            />

            {/* Central Photo */}
            <div className="relative z-20 w-32 h-32 rounded-full p-1 bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_50px_rgba(6,182,212,0.2)]">
              <div className="w-full h-full rounded-full bg-black p-1 overflow-hidden">
                <img src="/haram.jpeg" alt="Haram" className="w-full h-full rounded-full object-cover" />
              </div>
            </div>

            {/* Nodes */}
            {insights.map((item, idx) => {
              const angle = ((idx / total) * 360 + rotation) * (Math.PI / 180);
              const x = radiusX * Math.cos(angle);
              const y = radiusY * Math.sin(angle);

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedId(idx)}
                  className="absolute z-30 cursor-pointer group flex flex-col items-center"
                  style={{ 
                    transform: `translate(${x}px, ${y}px)`,
                    transition: 'none'
                  }}
                >
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 p-4 flex items-center justify-center shadow-lg group-hover:border-cyan-400 transition-colors"
                  >
                    <img src={item.imgUrl} alt="Logo" className="w-full h-full object-contain" />
                  </motion.div>
                  
                  <div className="mt-2 px-3 py-1 rounded-full bg-black/60 border border-white/5 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-[9px] font-bold uppercase whitespace-nowrap tracking-tighter">
                      {item.title.split('@')[0]}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Modal */}
            <AnimatePresence>
              {selectedId !== null && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
                  >
                    <button 
                      onClick={() => setSelectedId(null)}
                      className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
                    >
                      <X size={24} />
                    </button>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                      <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 p-4 flex items-center justify-center flex-shrink-0">
                        <img src={insights[selectedId].imgUrl} alt="Logo" className="w-full h-full object-contain" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white text-3xl font-black leading-tight mb-2">
                          {insights[selectedId].title}
                        </h3>
                        
                        <div className="flex flex-wrap gap-4 mb-6 text-[11px] font-bold uppercase tracking-widest">
                          <span className="text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full">{insights[selectedId].date}</span>
                          <span className="text-white/40 bg-white/5 px-3 py-1 rounded-full">{insights[selectedId].location}</span>
                        </div>

                        <p className="text-secondary-white text-base leading-relaxed opacity-90 border-t border-white/10 pt-6">
                          {insights[selectedId].subtitle}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="w-full px-6 space-y-4">
            {insights.map((item, idx) => (
              <div key={idx} className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 p-2 border border-white/10">
                    <img src={item.imgUrl} alt={item.title} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm leading-tight">{item.title}</h3>
                    <p className="text-cyan-400 text-[10px] font-black uppercase mt-1 tracking-widest">{item.date}</p>
                  </div>
                </div>
                <p className="text-white/60 text-xs leading-relaxed">{item.subtitle}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
