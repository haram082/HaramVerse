'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Calendar, ArrowUp, Send, Sparkles } from 'lucide-react';
import styles from '../styles';

// --- Warp Speed Canvas Animation ---
const WarpBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let stars = [];
    const numStars = 150;

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
      initStars();
    };

    class Star {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = (Math.random() - 0.5) * canvas.width * 2;
        this.y = (Math.random() - 0.5) * canvas.height * 2;
        this.z = Math.random() * canvas.width;
        this.pz = this.z;
      }
      update() {
        this.z -= 8; // Speed of warp
        if (this.z <= 0) {
          this.reset();
          this.z = canvas.width;
          this.pz = this.z;
        }
      }
      draw() {
        const sx = (this.x / this.z) * (canvas.width / 2) + canvas.width / 2;
        const sy = (this.y / this.z) * (canvas.height / 2) + canvas.height / 2;
        const r = (1 - this.z / canvas.width) * 2;

        const px = (this.x / this.pz) * (canvas.width / 2) + canvas.width / 2;
        const py = (this.y / this.pz) * (canvas.height / 2) + canvas.height / 2;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(6, 182, 212, ${1 - this.z / canvas.width})`;
        ctx.lineWidth = r;
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();

        this.pz = this.z;
      }
    }

    const initStars = () => {
      stars = Array.from({ length: numStars }, () => new Star());
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Trailing effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => {
        star.update();
        star.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40 pointer-events-none" />;
};

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/haram082", color: "hover:text-white" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/haram-yoon-b359511b0/", color: "hover:text-blue-400" },
    { icon: Mail, href: "mailto:haramkim082@gmail.com", color: "hover:text-cyan-400" },
    { icon: Calendar, href: "https://calendly.com/haram_yoon/30min", color: "hover:text-purple-400" },
  ];

  return (
    <footer className="relative w-full bg-black overflow-hidden pt-40 pb-10">
      <WarpBackground />

      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/10 blur-[150px] rounded-full" />
      </div>

      <div className={`${styles.innerWidth} mx-auto px-6 relative z-10`}>
        
        {/* Contact CTA Section */}
        <div className="flex flex-col items-center text-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="p-10 md:p-16 rounded-[3rem] bg-white/5 backdrop-blur-2xl border border-white/10 w-full max-w-4xl relative overflow-hidden"
          >
            {/* Inner Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-3xl -mr-32 -mt-32" />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 justify-center mb-8"
            >
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_#06b6d4]" />
                <span className="text-cyan-400 text-xs font-black uppercase tracking-widest">Available for Summer '25</span>
              </div>
            </motion.div>

            <h2 className="text-white text-4xl md:text-7xl font-black mb-10 tracking-tighter">
              Let's Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Future</span> together.
            </h2>

            <div className="flex flex-wrap justify-center gap-6">
              <motion.a
                href="mailto:haramkim082@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white text-black font-black rounded-2xl flex items-center gap-3 shadow-2xl hover:bg-cyan-400 transition-all group"
              >
                Start a Conversation
                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.a>
              <motion.a
                href="https://calendly.com/haram_yoon/30min"
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black rounded-2xl flex items-center gap-3 backdrop-blur-md hover:bg-white/10 transition-all"
              >
                Schedule Meeting
                <Calendar size={20} />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Links & Signature */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 pt-10 border-t border-white/5">
          <div className="flex flex-col items-center md:items-start gap-4">
            <h2 className="text-white text-2xl font-black tracking-tighter">
              HARAM <span className="text-cyan-400">YOON</span>
            </h2>
            <p className="text-white/30 text-xs font-bold uppercase tracking-[0.4em]">Meta SWE Intern · ASPC Lead</p>
          </div>

          <div className="flex items-center gap-8">
            {socialLinks.map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.2 }}
                className={`text-white/40 transition-colors ${social.color}`}
              >
                <social.icon size={24} strokeWidth={2} />
              </motion.a>
            ))}
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            className="group flex flex-col items-center gap-2 text-cyan-400"
          >
            <div className="p-3 rounded-full bg-cyan-500/10 border border-cyan-500/20 group-hover:bg-cyan-500 group-hover:text-black transition-all">
              <ArrowUp size={20} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Warp Top</span>
          </motion.button>
        </div>

        <div className="mt-20 text-center">
          <p className="text-white/10 text-[10px] font-bold uppercase tracking-[0.5em]">
            &copy; 2026 Crafted with precision by Haram Yoon
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
