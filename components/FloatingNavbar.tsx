'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, Globe, ChevronDown, Check } from 'lucide-react';
import { useMobile } from '@/hooks/use-mobile';

interface FloatingNavbarProps {
  language: 'es' | 'en';
  setLanguage: (lang: 'es' | 'en') => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
}

export default function FloatingNavbar({
  language,
  setLanguage,
  isDarkMode,
  setIsDarkMode,
}: FloatingNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const isMobile = useMobile();

  // Monitor window scroll to swap backdrop glass states
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: { es: 'Inicio', en: 'Start' }, id: 'hero-section' },
    { label: { es: 'Sobre Mí', en: 'About' }, id: 'about-section' },
    ...(isMobile ? [] : [{ label: { es: 'Stack', en: 'Stack' }, id: 'sandbox-section' }]),
    { label: { es: 'Experiencia', en: 'Experience' }, id: 'experience-section' },
    { label: { es: 'Proyectos', en: 'Projects' }, id: 'projects-section' },
    { label: { es: 'Contacto', en: 'Transmit' }, id: 'contact-section' },
  ];

  const handleScrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-[100] p-4 md:p-6 pointer-events-none flex justify-center">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto flex items-center justify-between w-full max-w-5xl h-14 md:h-16 px-4 md:px-6 rounded-full transition-all duration-500 ${
          scrolled
            ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-2xl shadow-indigo-500/[0.03]'
            : 'bg-white/40 dark:bg-white/5 backdrop-blur-md border border-neutral-200/20 dark:border-white/5 shadow-xs'
        }`}
      >
        {/* Brand/Logo Identifier */}
        <div 
          onClick={() => handleScrollTo('hero-section')} 
          className="flex items-center gap-2 cursor-pointer group select-none"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-indigo-500 to-teal-400 group-hover:scale-125 transition-transform duration-300" />
          <span className="text-sm font-bold tracking-tighter text-neutral-900 dark:text-white font-mono uppercase">
            O_ANTAYHUA
          </span>
        </div>

        {/* Desktop Anchor Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScrollTo(item.id)}
              className="text-xs tracking-widest font-mono uppercase text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors duration-200 cursor-pointer"
            >
              <span className="text-[10px] opacity-35 mr-1.5 font-sans">{"//"}</span>
              {item.label[language]}
            </button>
          ))}
        </div>

        {/* Action Controls & Utilities (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          {/* Custom Dropdown language selector */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              onBlur={() => setTimeout(() => setLangMenuOpen(false), 200)}
              className="rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-xs font-mono tracking-tighter h-8 px-3 cursor-pointer flex items-center gap-1.5 transition-all text-neutral-800 dark:text-neutral-200"
            >
              <Globe className="w-3.5 h-3.5 opacity-70" />
              <span className="font-bold">{language.toUpperCase()}</span>
              <ChevronDown className={`w-3 h-3 opacity-60 transition-transform duration-200 ${langMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {langMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 5 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className="absolute right-0 mt-1.5 w-24 rounded-2xl bg-white/95 dark:bg-neutral-950/95 border border-black/5 dark:border-white/10 shadow-xl backdrop-blur-md p-1 z-50 flex flex-col gap-0.5"
                >
                  <button
                    onClick={() => setLanguage('es')}
                    className="flex items-center justify-between px-3 py-1.5 rounded-xl text-[10px] font-mono hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer text-neutral-800 dark:text-neutral-200"
                  >
                    ESPAÑOL {language === 'es' && <Check className="w-3 h-3 text-indigo-500" />}
                  </button>
                  <button
                    onClick={() => setLanguage('en')}
                    className="flex items-center justify-between px-3 py-1.5 rounded-xl text-[10px] font-mono hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer text-neutral-800 dark:text-neutral-200"
                  >
                    ENGLISH {language === 'en' && <Check className="w-3 h-3 text-indigo-500" />}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme switcher */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-8 h-8 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 flex items-center justify-center text-neutral-800 dark:text-neutral-200 cursor-pointer transition-all active:scale-95 shadow-xs"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Mobile controls (hamburguer menu & theme switcher trigger) */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-black/5 dark:border-white/10 flex items-center justify-center text-neutral-800 dark:text-neutral-200 cursor-pointer shadow-xs"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-8 h-8 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-md"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown Overlay Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-22 left-4 right-4 rounded-[2rem] bg-white/95 dark:bg-black/95 border border-black/5 dark:border-white/10 shadow-2xl backdrop-blur-2xl p-6 pointer-events-auto z-[99] flex flex-col gap-6"
          >
            {/* Primary Mobile Links */}
            <div className="flex flex-col gap-4 py-2">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleScrollTo(item.id)}
                  className="text-left text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white hover:pl-2 transition-all duration-200 cursor-pointer flex items-center gap-1.5"
                >
                  <span className="text-indigo-500 font-mono text-sm">0{index + 1}.</span>
                  {item.label[language].toUpperCase()}
                </motion.button>
              ))}
            </div>

            {/* Separated lower utility panel */}
            <div className="border-t border-black/5 dark:border-white/10 pt-5 flex flex-col gap-4">
              {/* Language toggle cards */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">
                  {language === 'es' ? 'IDIOMA' : 'LANGUAGE'}
                </span>
                <div className="flex bg-neutral-100 dark:bg-neutral-900 rounded-full p-0.5 border border-black/5 dark:border-white/5">
                  <button
                    onClick={() => setLanguage('es')}
                    className={`text-[10px] font-mono tracking-tight rounded-full py-1.5 px-4 cursor-pointer transition-all ${
                      language === 'es'
                        ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-bold shadow-xs'
                        : 'text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-350'
                    }`}
                  >
                    ESPAÑOL
                  </button>
                  <button
                    onClick={() => setLanguage('en')}
                    className={`text-[10px] font-mono tracking-tight rounded-full py-1.5 px-4 cursor-pointer transition-all ${
                      language === 'en'
                        ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-bold shadow-xs'
                        : 'text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-350'
                    }`}
                  >
                    ENGLISH
                  </button>
                </div>
              </div>

              {/* Minimalist footer metadata stamp */}
              <div className="text-[9px] font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase mt-2">
                © OSCAR_ANTAYHUA // {new Date().getFullYear()}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
