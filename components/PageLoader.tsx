'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PageLoaderProps {
  language: 'es' | 'en';
  isDark: boolean;
  onComplete: () => void;
}

export default function PageLoader({ language, isDark, onComplete }: PageLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [timestamp, setTimestamp] = useState('');

  const title = "OSCAR ANTAYHUA";
  const subtitle = language === 'es' 
    ? "SISTEMAS DE AUTOMATIZACIÓN & DESARROLLO" 
    : "AUTOMATION SYSTEMS & DEVELOPMENT";

  const systemLogs = language === 'es' ? [
    'BOOT::Inicializando núcleo de comandos...',
    'INTEGRATION::Cargando flujos Make & n8n...',
    'DATA::Estableciendo conexiones de base de datos...',
    'INV_ENGINE::Optimizando módulos Next.js...',
    'PORTFOLIO::Renderizando entorno gráfico...',
    'SYS_READY::Sistema cargado con éxito.'
  ] : [
    'BOOT::Initializing command core...',
    'INTEGRATION::Loading Make & n8n workflows...',
    'DATA::Establishing secure telemetry connection...',
    'INV_ENGINE::Optimizing Next.js elements...',
    'PORTFOLIO::Rendering visual viewport...',
    'SYS_READY::Engine compiled successfully.'
  ];

  // Map progress (0-100) to current log message
  const logIndex = Math.min(Math.floor((progress / 100) * systemLogs.length), systemLogs.length - 1);

  // Client-side initialization for smooth dynamic timing (prevents SSR hydration mismatch)
  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      setTimestamp(new Date().toISOString().replace('T', ' ').substring(0, 19));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Smooth, organic spring/ease rendering of progress bar
  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 2400; // Elegant, premium loading timing

    const updateProgress = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const percent = Math.min((elapsed / duration) * 100, 100);

      setProgress(percent);

      if (elapsed < duration) {
        requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
      }
    };

    requestAnimationFrame(updateProgress);
  }, []);

  // Exit trigger once progress completes
  useEffect(() => {
    if (progress === 100) {
      const exitTimer = setTimeout(() => {
        onComplete();
      }, 500); // Premium brief hold
      return () => clearTimeout(exitTimer);
    }
  }, [progress, onComplete]);

  // Compute SVG circular dashoffset for loader
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Centralized theme mapping for absolute light/dark consistency
  const theme = {
    bg: isDark ? 'bg-[#030303] text-white' : 'bg-[#fafafa] text-neutral-900',
    gridOpacity: isDark ? 'opacity-[0.03]' : 'opacity-[0.015]',
    borderLines: isDark ? 'bg-neutral-800/20' : 'bg-neutral-200/50',
    outerRing: isDark ? 'border-neutral-800' : 'border-neutral-250',
    innerRingTrack: isDark ? 'text-neutral-900' : 'text-neutral-200',
    innerRingProgress: isDark ? 'text-indigo-400' : 'text-indigo-600',
    bracketAccent: isDark ? 'border-t-indigo-400/40 border-b-teal-400/30' : 'border-t-indigo-600/30 border-b-teal-555/20',
    title: isDark ? 'text-neutral-50' : 'text-neutral-905',
    subtitle: isDark ? 'text-neutral-300' : 'text-neutral-607',
    terminalBg: isDark ? 'bg-white/[0.02] border-white/5' : 'bg-neutral-100/60 border-neutral-255/15',
    terminalHeaderBorder: isDark ? 'border-white/5' : 'border-neutral-200/40',
    terminalText: isDark ? 'text-indigo-400' : 'text-indigo-605',
    terminalPrompt: isDark ? 'text-teal-400' : 'text-teal-650',
  };

  return (
    <motion.div
      id="page-preloader"
      initial={{ opacity: 1 }}
      exit={{ 
        y: '-101%',
        transition: { 
          duration: 0.9, 
          ease: [0.76, 0, 0.24, 1] // Ultra elegant custom easing for sliding shutter exit
        } 
      }}
      className={`fixed inset-0 z-[9999] flex flex-col justify-between p-6 md:p-12 select-none overflow-hidden ${theme.bg}`}
    >
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-neutral-950/20 pointer-events-none" />
      <div className={`absolute inset-0 ${theme.gridOpacity} bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none`} />
      
      {/* Structural visual lines to align with portfolio architecture */}
      <div className={`absolute top-1/4 left-0 w-full h-[1px] ${theme.borderLines} pointer-events-none`} />
      <div className={`absolute top-3/4 left-0 w-full h-[1px] ${theme.borderLines} pointer-events-none`} />
      <div className={`absolute top-0 left-10 md:left-24 w-[1px] h-full ${theme.borderLines} pointer-events-none`} />
      <div className={`absolute top-0 right-10 md:right-24 w-[1px] h-full ${theme.borderLines} pointer-events-none`} />

      {/* Top Bar Telemetry */}
      <div className="flex justify-between items-center w-full font-mono text-[9px] tracking-[0.2em] opacity-60 z-10">
        <span className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
          </span>
          {language === 'es' ? 'NÚCLEO::ACTIVO' : 'SYSTEM::ONLINE'}
        </span>
        <span className="tabular-nums">
          {mounted ? timestamp : ''}
        </span>
      </div>

      {/* Centerpiece: Calibration Orbit & Title */}
      <div className="max-w-xl mx-auto w-full flex flex-col items-center justify-center text-center gap-10 my-auto relative z-10">
        
        {/* Orbital SVG Calibration Ring */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          {/* External ticks decorative layer */}
          <div className={`absolute inset-0 rounded-full border border-dashed ${theme.outerRing} animate-spin`} style={{ animationDuration: '40s' }} />
          
          {/* Secondary rotating bracket decoration */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className={`absolute -inset-2 border border-transparent ${theme.bracketAccent} rounded-full`}
          />

          {/* Active SVG dynamic progress circle */}
          <svg className="w-20 h-20 transform -rotate-90">
            <circle
              cx="40"
              cy="40"
              r={radius}
              className={theme.innerRingTrack}
              strokeWidth="2.5"
              stroke="currentColor"
              fill="transparent"
            />
            <motion.circle
              cx="40"
              cy="40"
              r={radius}
              className={theme.innerRingProgress}
              strokeWidth="3.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>

          {/* Centered numerical counter */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold font-sans tracking-tight tabular-nums">
              {Math.min(Math.round(progress), 100)}
            </span>
            <span className="text-[7px] font-mono tracking-widest opacity-50 relative -top-0.5">PCT</span>
          </div>
        </div>

        {/* Dynamic visual headers */}
        <div className="space-y-4">
          <div className="overflow-hidden">
            <h1 className={`text-2xl md:text-4xl font-black font-sans tracking-[0.3em] md:tracking-[0.4em] ${theme.title} uppercase pl-[0.3em] md:pl-[0.4em]`}>
              {title.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.03 + 0.1,
                    duration: 0.5,
                    ease: [0.215, 0.610, 0.355, 1.000]
                  }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h1>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className={`text-[9px] md:text-[10px] font-sans tracking-[0.25em] font-medium ${theme.subtitle} leading-relaxed uppercase`}
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Terminal Live Stream Panel */}
        <div className={`w-64 p-3 ${theme.terminalBg} border rounded-lg font-mono text-[9px] text-left space-y-1 relative overflow-hidden backdrop-blur-xs`}>
          <div className={`flex items-center justify-between border-b ${theme.terminalHeaderBorder} pb-1.5 mb-1.5 opacity-55`}>
            <span>TERMINAL::STREAM</span>
            <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
          </div>
          <div className="h-10 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={logIndex}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 0.85, x: 0 }}
                exit={{ opacity: 0, x: 5 }}
                transition={{ duration: 0.2 }}
                className={`${theme.terminalText} flex items-center gap-1.5 font-bold tracking-wider truncate`}
              >
                <span className={theme.terminalPrompt}>{">"}</span>
                <span>{systemLogs[logIndex]}</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom Bar Footer */}
      <div className="w-full flex justify-between items-center text-[8px] font-mono opacity-50 z-10 tracking-[0.15em]">
        <span>OSCAR_ANTAYHUA_PORTFOLIO_V2</span>
        <span className="uppercase">
          {language === 'es' ? 'NIVEL_DE_SEGURIDAD::OK' : 'SECURITY_INTEGRITY::SECURE'}
        </span>
      </div>
    </motion.div>
  );
}
