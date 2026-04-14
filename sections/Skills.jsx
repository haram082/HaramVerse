'use client';

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code, Braces, FileCode, Coffee, Database, BarChart, Globe, 
  Atom, Zap, Wind, Server, Terminal, FlaskConical, Layers, 
  Cloud, Flame, GitBranch, Box, BookOpen, Monitor, Brain, 
  Wrench, Network, Layout
} from "lucide-react";
import styles from "../styles";

// --- Skills Data ---
const skillsData = {
  Languages: [
    { name: "Python", icon: Code },
    { name: "Java", icon: Coffee },
    { name: "JavaScript", icon: Braces },
    { name: "TypeScript", icon: FileCode },
    { name: "PHP/Hack", icon: Code },
    { name: "SQL", icon: Database },
    { name: "Haskell", icon: Code }
  ],
  Development: [
    { name: "React", icon: Atom },
    { name: "Next.js", icon: Zap },
    { name: "Tailwind", icon: Wind },
    { name: "Node.js", icon: Terminal },
    { name: "Express", icon: Server },
    { name: "Flask", icon: FlaskConical },
    { name: "Ruby on Rails", icon: Layout },
    { name: "HTML/CSS", icon: Globe }
  ],
  "Data & AI": [
    { name: "PostgreSQL", icon: Database },
    { name: "MySQL", icon: Database },
    { name: "MongoDB", icon: Database },
    { name: "Pandas", icon: Brain },
    { name: "NumPy", icon: Brain },
    { name: "Scikit-learn", icon: Brain },
    { name: "PyTorch", icon: Brain },
    { name: "R", icon: BarChart },
    { name: "Data Viz", icon: BarChart }
  ],
  "Cloud & Infra": [
    { name: "AWS", icon: Cloud },
    { name: "Firebase", icon: Flame },
    { name: "Docker", icon: Box },
    { name: "Google Cloud", icon: Cloud },
    { name: "Git/GitHub", icon: GitBranch }
  ],
  Ecosystem: [
    { name: "Prisma", icon: Layers },
    { name: "tRPC", icon: Network },
    { name: "GraphQL", icon: Network },
    { name: "REST APIs", icon: Network },
    { name: "SQLAlchemy", icon: Layers },
    { name: "VS Code", icon: Monitor },
    { name: "Jupyter", icon: BookOpen }
  ]
};

// --- Custom Comet Background ---
const CometBackground = () => {
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

const SkillPill = ({ skill, index }) => {
  const [glowColor] = useState(() => Math.random() > 0.5 ? "rgba(6, 182, 212, 0.4)" : "rgba(168, 85, 247, 0.4)");
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: (Math.random() - 0.5) * 200, y: (Math.random() - 0.5) * 200 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ 
        opacity: 0, 
        x: (Math.random() - 0.5) * 500, 
        y: (Math.random() - 0.5) * 500,
        transition: { duration: 0.4, ease: "easeIn" }
      }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        delay: index * 0.05 
      }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: `0 0 20px ${glowColor}`,
        borderColor: glowColor
      }}
      className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white/90 cursor-default transition-all duration-300"
    >
      <skill.icon size={16} className="text-cyan-400" />
      <span className="text-sm font-medium whitespace-nowrap">{skill.name}</span>
    </motion.div>
  );
};

const Skills = () => {
  const [activeTab, setActiveTab] = useState("Languages");
  const tabs = Object.keys(skillsData);

  return (
    <section id="skills" className="relative w-full min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden py-24">
      <CometBackground />
      
      {/* Content Container */}
      <motion.div 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className={`${styles.innerWidth} mx-auto px-6 relative z-10 flex flex-col items-center`}
      >
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-cyan-400 text-sm font-black uppercase tracking-[0.3em] mb-4"
          >
            Capabilities
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white text-4xl md:text-7xl font-black"
          >
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Skills</span>
          </motion.h2>
        </div>

        {/* Tab System */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-8 mb-12 border-b border-white/5 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="relative px-4 py-2 text-sm font-bold tracking-widest uppercase transition-colors"
            >
              <span className={activeTab === tab ? "text-white" : "text-white/30 hover:text-white/60"}>
                {tab}
              </span>
              {activeTab === tab && (
                <motion.div
                  layoutId="skillsTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-500 shadow-[0_0_10px_#06b6d4]"
                />
              )}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="w-full max-w-4xl mt-4 flex items-start justify-center min-h-[300px]">
          <div className="flex flex-wrap justify-center gap-4">
            <AnimatePresence mode="popLayout">
              {skillsData[activeTab].map((skill, index) => (
                <SkillPill 
                  key={`${activeTab}-${skill.name}`} 
                  skill={skill} 
                  index={index} 
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
