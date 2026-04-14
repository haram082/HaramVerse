'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FileText, Linkedin, Github, Calendar } from 'lucide-react';
import styles from '../styles';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
];

const socialLinks = [
  { name: 'Resume', icon: FileText, href: '/resume.pdf' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/haram-yoon-b359511b0/' },
  { name: 'GitHub', icon: Github, href: 'https://www.github.com/haram082' },
  { name: 'Calendly', icon: Calendar, href: 'https://calendly.com/haram_yoon/30min' },
];

const Navbar = () => {
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Simple Scroll Spy
      const sections = ['about', 'skills', 'experience', 'projects'];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= -100 && rect.top <= 300;
        }
        return false;
      });

      if (currentSection) setActive(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`${styles.xPaddings} py-4 fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-primary-black/70 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className={`${styles.innerWidth} mx-auto flex justify-between items-center gap-8`}>
        {/* Wordmark */}
        <Link href="/">
          <motion.h2 
            whileHover={{ scale: 1.05 }}
            className="font-black text-[24px] text-white tracking-tighter cursor-pointer"
          >
            HARAM <span className="text-cyan-400">YOON</span>
          </motion.h2>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.name} className="relative">
              <Link
                href={link.href}
                onClick={() => setActive(link.name.toLowerCase())}
                className={`text-[15px] font-medium transition-colors duration-200 ${
                  active === link.name.toLowerCase() ? 'text-white' : 'text-secondary-white hover:text-white'
                }`}
              >
                {link.name}
              </Link>
              {active === link.name.toLowerCase() && (
                <motion.div
                  layoutId="activeUnderline"
                  className="absolute -bottom-[6px] left-0 right-0 h-[2px] bg-cyan-400 rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </li>
          ))}
        </ul>

        {/* Social Icons */}
        <div className="flex items-center gap-5">
          {socialLinks.map((social) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-secondary-white hover:text-cyan-400 transition-colors"
            >
              <social.icon size={20} strokeWidth={2.5} />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
