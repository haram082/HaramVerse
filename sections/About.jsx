'use client';

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Star, Calendar, Briefcase, Sparkles } from "lucide-react";
import styles from "../styles";

// --- About Canvas Background (Comets & Stars) ---
const AboutCanvas = () => {
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
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
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
        this.speed = 1.5 + Math.random() * 3.5;
        this.angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.tailLength = 40 + Math.random() * 80;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < -200 || this.x > canvas.width + 200 || this.y < -200 || this.y > canvas.height + 200) {
          this.reset();
        }
      }
      draw() {
        ctx.save();
        const gradient = ctx.createLinearGradient(
          this.x, this.y, 
          this.x - this.vx * (this.tailLength / this.speed), 
          this.y - this.vy * (this.tailLength / this.speed)
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, "transparent");
        ctx.strokeStyle = gradient;
        ctx.lineWidth = this.size;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.vx * (this.tailLength / this.speed), this.y - this.vy * (this.tailLength / this.speed));
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fill();
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

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

const StatCard = ({ icon: Icon, label, value, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="relative p-6 rounded-2xl bg-white/10 backdrop-blur border border-white/20 hover:border-cyan-500/50 transition-all duration-300"
  >
    <div className="flex flex-col gap-3">
      <div className="p-2 w-fit rounded-lg bg-cyan-500/10 text-cyan-400">
        <Icon size={20} />
      </div>
      <div>
        <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold mb-1">{label}</p>
        <p className="text-white font-semibold text-sm md:text-base">{value}</p>
      </div>
    </div>
  </motion.div>
);

const About = () => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const stats = [
    { icon: GraduationCap, label: "School", value: "Pomona College" },
    { icon: Star, label: "GPA", value: "3.7 / 4.0" },
    { icon: Calendar, label: "Graduating", value: "May 2026" },
    { icon: Briefcase, label: "Status", value: "Incoming Meta SWE" },
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center bg-black overflow-hidden py-24"
    >
      <AboutCanvas />
      
      {/* Cursor Spotlight */}
      {!isMobile && (
        <div 
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)`
          }}
        />
      )}

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto px-6 relative z-20 flex flex-col gap-16 lg:flex-row items-center`}
      >
        {/* Spotlight opacity wrapper */}
        <div className={`flex flex-col lg:flex-row gap-16 items-center w-full transition-opacity duration-500 ${!isMobile ? 'opacity-40' : 'opacity-100'}`} style={!isMobile ? { opacity: 1 } : {}}>
          
          {/* Left Column: Bio */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1 space-y-8"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 px-3 py-1 w-fit rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <Sparkles size={14} className="text-cyan-400" />
                <span className="text-cyan-400 text-[10px] font-bold tracking-widest uppercase">My Story</span>
              </div>
              <h2 className="text-white text-4xl md:text-6xl font-black tracking-tight">
                Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Impact</span>
              </h2>
            </div>
            
            <p className="text-secondary-white text-lg md:text-xl leading-relaxed max-w-xl font-medium opacity-90">
              I'm a first-gen, low-income CS student at Pomona College who believes technology should bridge gaps, not widen them. Every project I've built — from internships to personal work — has been driven by one question: what's the real impact on the user? That mindset is what pushes me to build software that actually matters.
            </p>
          </motion.div>

          {/* Right Column: Stats Grid */}
          <div className="flex-1 grid grid-cols-2 gap-4 md:gap-6 w-full">
            {stats.map((stat, idx) => (
              <StatCard key={idx} {...stat} index={idx} />
            ))}
          </div>

        </div>
      </motion.div>
    </section>
  );
};

export default About;
