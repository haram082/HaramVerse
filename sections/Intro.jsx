'use client';

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

// --- Typewriter Effect Component ---
const Typewriter = ({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenTexts = 2000,
  className = "",
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = texts[currentTextIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentText.length < fullText.length) {
            setCurrentText(fullText.slice(0, currentText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), delayBetweenTexts);
          }
        } else {
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentTextIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex, texts, typingSpeed, deletingSpeed, delayBetweenTexts]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// --- Interactive Background Component (Nexus Particles) ---
const InteractiveBackground = () => {
  const canvasRef = useRef(null);
  const mousePositionRef = useRef({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${particle.opacity})`;
        ctx.fill();

        if (mousePositionRef.current.x !== null && mousePositionRef.current.y !== null) {
          const dx = mousePositionRef.current.x - particle.x;
          const dy = mousePositionRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 180) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(mousePositionRef.current.x, mousePositionRef.current.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 * (1 - distance / 180)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mousePositionRef.current = { x: null, y: null };
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

const Intro = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1, scale: 1,
      transition: { duration: 1, ease: [0.6, 0.05, 0.01, 0.9] },
    },
  };

  return (
    <section id="intro" className="relative w-full min-h-screen bg-black text-white overflow-hidden flex items-center justify-center">
      <InteractiveBackground />

      {/* Background Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.15),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.15),transparent_50%)] pointer-events-none" />

      <motion.div
        className="relative z-20 container mx-auto px-6 md:px-12 lg:px-16 max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <motion.h1 className="text-5xl md:text-6xl lg:text-7xl font-bold">
                Hi, I'm Haram{" "}
                <motion.span
                  className="inline-block ml-4"
                  animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                >
                  👋
                </motion.span>
              </motion.h1>

              <div className="text-xl md:text-2xl lg:text-3xl text-cyan-400 font-light min-h-[2.5rem]">
                <Typewriter
                  texts={[
                    "Lead Software Engineer @ ASPC",
                    "Incoming @ Meta",
                    "Pomona College '26",
                  ]}
                  typingSpeed={80}
                  deletingSpeed={50}
                  delayBetweenTexts={2000}
                />
              </div>
            </motion.div>

            <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed">
              Spearheading enterprise-level platform migrations and engineering automated data pipelines. Currently building the future of student services at Pomona College.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold text-lg overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2 text-black font-bold">
                  View Projects
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div className="absolute inset-0 bg-white/20" initial={{ x: "-100%" }} whileHover={{ x: "100%" }} transition={{ duration: 0.6 }} />
              </motion.button>

              <motion.a 
                href="mailto:haramkim082@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 border-2 border-cyan-500 rounded-lg font-semibold text-lg hover:bg-cyan-500/10 transition-colors text-white flex items-center justify-center gap-2" 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
                <Mail className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </div>

          <motion.div variants={imageVariants} className="relative flex items-center justify-center">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-3xl opacity-30"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96" 
              animate={{ 
                y: [0, -20, 0],
              }} 
              whileHover={{ 
                rotateY: 360,
                scale: 1.05
              }}
              transition={{ 
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                rotateY: { duration: 0.8, ease: "easeInOut" },
                scale: { duration: 0.2 }
              }}
              style={{ perspective: 1000, transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 p-1 shadow-[0_0_50px_rgba(6,182,212,0.3)]">
                <div className="w-full h-full rounded-full bg-black p-2">
                  <motion.img 
                    src="/me.jpg" 
                    alt="Haram Yoon" 
                    className="w-full h-full rounded-full object-cover" 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ duration: 1 }} 
                    whileHover={{ scale: 1.05 }} 
                  />
                </div>
              </div>
              <motion.div className="absolute -inset-4 border-2 border-cyan-500/30 rounded-full" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
              <motion.div className="absolute -inset-8 border-2 border-blue-500/20 rounded-full" animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} />
              <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2 }} className="absolute -bottom-4 -right-4 bg-cyan-500 text-black text-[12px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg shadow-cyan-500/50">
                Pomona '26
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="cursor-pointer" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
          <svg className="w-6 h-6 text-cyan-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default Intro;
