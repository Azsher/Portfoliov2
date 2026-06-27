'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import emailjs from '@emailjs/browser';
import {
  Shield,
  Clock,
  Send,
  Sparkles,
  Layers,
  Heart,
  Mail,
  Smartphone,
  CheckCircle2,
  Terminal,
  Activity,
  User,
  ExternalLink,
  Sun,
  Moon,
  Briefcase,
  Building2,
  Download,
  ArrowUpRight,
  Cpu,
  Linkedin
} from 'lucide-react';
import HeroRoleTypewriter from '@/components/HeroRoleTypewriter';
import StackedProjects from '@/components/StackedProjects';
import FloatingNavbar from '@/components/FloatingNavbar';
import ExperienceDashboard from '@/components/ExperienceDashboard';
import PageLoader from '@/components/PageLoader';
import CompanyTicker from '@/components/CompanyTicker';
import { useMobile } from '@/hooks/use-mobile';

const ThreeTunnel = dynamic(() => import('@/components/ThreeTunnel'), { ssr: false });
const MatterSandbox = dynamic(() => import('@/components/MatterSandbox'), { ssr: false });

export default function Page() {
  const isMobile = useMobile();
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const contactFormRef = React.useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [cvDownloaded, setCvDownloaded] = useState(false);

  // Load initial theme preference from localStorage or system scheme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  // Synchronize HTML dark mode class and persist selection
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);




  const languageDict = {
    es: {
      heroTitle: 'O_ANTAYHUA',
      heroSub: 'Full Stack Engineer & Arquitecto de Automatizaciones',
      heroSpecs: 'ESPECIFICACIÓN_CAPA_SISTEMA_V3.9',
      status: 'Status: Activo',
      mottoA: 'Automatizar lo redundante.',
      mottoB: 'Optimizar lo esencial.',

      panelStatus: 'ESTADO_KERNEL',
      panelActive: 'KERNEL_OK',
      panelPing: 'LATENCIA_RED',
      panelUptime: 'UPTIME_SISTEMA',
      panelSLA: 'SLA_PRODUCCIÓN',
      panelRegion: 'REGIÓN_NUBE',

      aboutTitle: 'Sobre Mí',
      aboutSub: 'CONÓCEME',
      aboutDesc1: 'Desarrollador Full Stack con experiencia real en producción. En Entel construyo la plataforma interna de inversiones con Next.js y Django — lideré la migración que redujo los tiempos de carga de 15s a 1.5s (10x) y desarrollé dashboards financieros con aprobaciones de proyectos en tiempo real.',
      aboutDesc2: 'En Nova Academy automaticé 5 procesos clave con Make.com y Power Automate, reduciendo errores manuales un 15% y tiempos de ejecución un 20%. También tuve un rol como Gen AI Trainee, donde usé IA generativa para producir +20 piezas de contenido y mejorar la eficiencia del equipo en un 30%.',
      aboutCvBtn: 'Descargar CV',
      aboutLinkIn: 'LinkedIn',
      aboutGit: 'GitHub',

      experienceTitle: 'Experiencia Profesional',
      experienceSub: 'TRAYECTORIA_LABORAL',

      companyTitle: 'Empresas Aliadas',
      companySub: 'CLIENTES_Y_SOCIOS',

      mantraTitle: 'MANIFIESTO DE DESARROLLO',
      mantraHeader: 'Ingeniería con Determinación',
      mantraDesc1: 'Cada línea de código debe tener una justificación funcional y operar en armonía recursiva.',
      mantraDesc2: 'Diseño sistemas modulares escalables previniendo bloqueos físicos y cuellos de botella mediante instrumentación activa.',

      coreStackTitle: 'PILA EXECUTORA CENTRAL',

      contactTitle: 'CONTACTO',
      contactHeader: 'Trabajemos juntos',
      contactSub: 'Estoy disponible para roles en frontend, productos AI y automatización. Escríbeme o conéctate en LinkedIn.',
      linkedinDesc: 'Si prefieres conectar directamente, encuéntrame en LinkedIn. Respondo en menos de 24 horas.',
      linkedinBtn: 'Conectar en LinkedIn',
      placeholderName: 'Tu nombre',
      placeholderEmail: 'Tu email',
      placeholderMsg: 'Cuéntame sobre el proyecto o rol...',
      btnSend: 'Enviar mensaje',
      btnSending: 'Enviando...',
      successTitle: 'Mensaje enviado',
      successDesc: 'Gracias por escribirme. Te responderé pronto.',
      errorTitle: 'Error al enviar',
      errorDesc: 'Algo salió mal. Por favor inténtalo de nuevo.',

      footerMantra: 'AI_FRONTEND // CONSTRUYENDO INTERFACES DONDE LA IA Y EL USUARIO SE ENCUENTRAN',
    },
    en: {
      heroTitle: 'O_ANTAYHUA',
      heroSub: 'Full Stack Engineer & Automation Architect',
      heroSpecs: 'SYSTEM_LAYER_SPECIFICATION_V3.9',
      status: 'Status: Active',
      mottoA: 'Automating the redundant.',
      mottoB: 'Optimizing the essential.',

      panelStatus: 'KERNEL_STATUS',
      panelActive: 'KERNEL_OK',
      panelPing: 'NETWORK_LATENCY',
      panelUptime: 'SYSTEM_UPTIME',
      panelSLA: 'PRODUCTION_SLA',
      panelRegion: 'CLOUD_REGION',

      aboutTitle: 'About Me',
      aboutSub: 'GET TO KNOW ME',
      aboutDesc1: 'Full Stack Developer with real production experience. At Entel I build the internal investment platform using Next.js and Django — I led the migration that cut load times from 15s to 1.5s (10x) and built real-time financial dashboards for project approvals.',
      aboutDesc2: 'At Nova Academy I automated 5 key processes with Make.com and Power Automate, reducing manual errors by 15% and execution times by 20%. I also served as a Gen AI Trainee, using generative AI to produce 20+ content pieces and improve team efficiency by 30%.',
      aboutCvBtn: 'Download CV',
      aboutLinkIn: 'LinkedIn',
      aboutGit: 'GitHub',

      experienceTitle: 'Professional Experience',
      experienceSub: 'WORK_CHRONOLOGY',

      companyTitle: 'Trusted By',
      companySub: 'COLLABORATED_COMPANIES',

      mantraTitle: 'DEVELOPMENT MANIFESTO',
      mantraHeader: 'Engineering with Purpose',
      mantraDesc1: 'Every line of code must demonstrate a literal functional utility and rest in recursive synergy.',
      mantraDesc2: 'I design resilient modular pipelines, eliminating physical memory blocks and routing congestions via telemetry.',

      coreStackTitle: 'CORE RUNTIME STACK',

      contactTitle: 'CONTACT',
      contactHeader: "Let's work together",
      contactSub: 'Available for frontend, AI products and automation roles. Send me a message or connect on LinkedIn.',
      linkedinDesc: 'Prefer to connect directly? Find me on LinkedIn. I usually respond within 24 hours.',
      linkedinBtn: 'Connect on LinkedIn',
      placeholderName: 'Your name',
      placeholderEmail: 'Your email',
      placeholderMsg: 'Tell me about the project or role...',
      btnSend: 'Send message',
      btnSending: 'Sending...',
      successTitle: 'Message sent',
      successDesc: 'Thanks for reaching out. I will get back to you soon.',
      errorTitle: 'Failed to send',
      errorDesc: 'Something went wrong. Please try again.',

      footerMantra: 'AI_FRONTEND // BUILDING INTERFACES WHERE AI AND USERS CONNECT',
    }
  };

  const t = languageDict[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactFormRef.current) return;

    setIsSending(true);
    setSendStatus('idle');

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        contactFormRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(() => {
        setSendStatus('success');
        contactFormRef.current?.reset();
        setTimeout(() => setSendStatus('idle'), 6000);
      })
      .catch(() => {
        setSendStatus('error');
        setTimeout(() => setSendStatus('idle'), 5000);
      })
      .finally(() => setIsSending(false));
  };

  return (
    <MotionConfig reducedMotion="never">
      <div className={`min-h-screen flex flex-col relative bg-neutral-100 dark:bg-[#0b0b0b] geometric-grid selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-black overflow-clip ${isMobile ? 'perf-mobile' : ''}`}>
        {!isLoading && (
          <>
            {/* 3D Cosmic Wireframe Grid Highway (Three.js Background) */}
            {!isMobile && (
              <div className="absolute inset-0 h-full w-full pointer-events-none opacity-30 mix-blend-screen dark:mix-blend-screen overflow-hidden">
                <ThreeTunnel isDark={isDarkMode} />
              </div>
            )}

            <>
              <div className="absolute inset-0 bg-radial-gradient from-transparent via-white/80 dark:via-[#010101]/80 to-neutral-100 dark:to-[#0a0a0a] pointer-events-none z-0" />

              {/* Subtle Ambient Glow Orbs - Violet/Indigo and Green/Teal details */}
              <div className="absolute top-[20%] left-[8%] w-[45rem] h-[45rem] rounded-full bg-indigo-500/[0.04] dark:bg-indigo-500/[0.035] blur-[150px] pointer-events-none z-0" />
              <div className="absolute top-[65%] right-[5%] w-[48rem] h-[48rem] rounded-full bg-teal-500/[0.035] dark:bg-teal-500/[0.03] blur-[160px] pointer-events-none z-0" />
              <div className="absolute top-[120%] left-[12%] w-[40rem] h-[40rem] rounded-full bg-purple-500/[0.03] dark:bg-purple-500/[0.025] blur-[140px] pointer-events-none z-0" />
              <div className="absolute top-[180%] right-[10%] w-[45rem] h-[45rem] rounded-full bg-indigo-500/[0.025] dark:bg-indigo-500/[0.02] blur-[150px] pointer-events-none z-0" />
            </>

          {/* Floating Sileo-Style toast notifications */}
          <div className="fixed top-20 right-6 z-50 pointer-events-none space-y-2">
            <AnimatePresence>
              {cvDownloaded && (
                <motion.div
                  initial={{ opacity: 0, x: 50, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 50, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="pointer-events-auto p-4 rounded-xl border border-neutral-300 dark:border-white/10 bg-white/95 dark:bg-black/95 shadow-xl flex items-center gap-3 max-w-sm backdrop-blur-md"
                >
                  <div className="h-8 w-8 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-black font-mono tracking-wider text-neutral-950 dark:text-white uppercase">
                      {language === 'es' ? 'DESCARGA COMPLETADA' : 'CV DOWNLOAD COMPLETED'}
                    </div>
                    <p className="text-[10px] font-sans text-neutral-500 dark:text-white/60 leading-tight">
                      {language === 'es' ? 'La transmisión del currículum vitae se ha completado.' : 'Document payload routed to your system.'}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Capsule-style Floating Navbar */}
          <FloatingNavbar
            language={language}
            setLanguage={setLanguage}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />

          {/* LANDING CONTENT WRAPPER */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-6 md:px-12 py-12 flex flex-col gap-12 relative z-10">

        {/* SECTION 1: SYSTEM INTRO / HERO HEADER BLOCK */}
        <section
          id="hero-section"
          className="flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[calc(100vh-6rem)] py-12 scroll-mt-16"
        >
          {/* Left Side: Content & Actions (Unboxed, elegant floating presentation) */}
          <div className="flex-1 space-y-6 flex flex-col justify-center relative z-10">
            <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {language === 'es' ? 'DISPATCH // CONEXIÓN ESTABLECIDA' : 'DISPATCH // ACTIVE SOCKET'}
            </div>

            <div className="text-xs font-mono text-neutral-400 dark:text-white/30 uppercase tracking-[0.25em] font-medium">
              {language === 'es' ? 'HOLA, MI NOMBRE ES' : 'HELLO, MY NAME IS'}
            </div>

            <h1 className="text-5xl md:text-8xl font-black font-display tracking-tight leading-none m-0 text-neutral-900 dark:text-white select-none">
              Oscar Antayhua
            </h1>

            {/* Subtitle Role with Typing indicator */}
            <div className="h-10 flex items-center">
              <p className="text-base md:text-xl lg:text-2xl font-mono tracking-[0.05em] uppercase text-indigo-600 dark:text-indigo-400 m-0 font-bold flex items-center gap-2">
                <HeroRoleTypewriter language={language} />
                <span className="w-2 h-5 bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
              </p>
            </div>

            <p className="text-sm md:text-base text-neutral-550 dark:text-white/60 leading-relaxed font-sans max-w-2xl m-0">
              {language === 'es'
                ? 'Desarrollador Full Stack enfocado en Next.js, React y Django. Construyo plataformas web de alto rendimiento, automatizo procesos con Make.com y Power Automate, e integro IA generativa en flujos de trabajo reales.'
                : 'Full Stack Developer focused on Next.js, React, and Django. I build high-performance web platforms, automate workflows with Make.com and Power Automate, and integrate generative AI into real work processes.'}
            </p>

            <div className="pt-6 flex flex-wrap gap-4">
              <a
                href="#projects-section"
                className="px-6 py-3 border border-neutral-950 hover:bg-neutral-950 hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black text-neutral-950 dark:text-white rounded-xl transition-all font-mono text-xs font-bold uppercase tracking-wider text-center cursor-pointer active:scale-98"
              >
                {language === 'es' ? 'Ver Proyectos' : 'View Projects'}
              </a>
              <a
                href="#contact-section"
                className="px-6 py-3 border border-neutral-300 dark:border-white/10 dark:hover:border-white/20 bg-neutral-150/40 dark:bg-white/5 text-neutral-750 dark:text-white/80 rounded-xl transition-all font-mono text-xs font-semibold uppercase tracking-wider text-center cursor-pointer active:scale-98"
              >
                {language === 'es' ? 'Contactar' : 'Connect'}
              </a>
            </div>
          </div>

          {/* Right Side: High-Tech Avatar Slot with Scanner sweep effect */}
          <div className="flex-shrink-0 flex items-center justify-center lg:justify-end min-h-[300px] relative z-10 w-full lg:w-auto">
            <div className="relative group/avatar">
              {/* Outer glowing border */}
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-indigo-500 via-teal-500/20 to-purple-500/10 opacity-75 blur-md group-hover/avatar:opacity-100 transition-opacity duration-500" />

              {/* Decorative rotating tick rings */}
              <div className="absolute -inset-3.5 border border-dashed border-teal-500/20 rounded-full animate-spin" style={{ animationDuration: '35s' }} />
              <div className="absolute -inset-6 border border-dotted border-neutral-300 dark:border-white/5 rounded-full animate-spin" style={{ animationDuration: '55s', animationDirection: 'reverse' }} />

              {/* Profile container - enlarged beautifully */}
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border border-neutral-300 dark:border-white/10 bg-neutral-50/50 dark:bg-[#111111] overflow-hidden flex items-center justify-center p-1.5 cursor-pointer transition-all hover:scale-103 duration-305 shadow-inner">
                <div className="relative w-full h-full rounded-full overflow-hidden border border-neutral-255/15 dark:border-white/10 bg-neutral-100/40 dark:bg-black/20 flex items-center justify-center">

                  {/* Luminous interactive scanning sweep */}
                  <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-teal-500 to-transparent shadow-[0_0_12px_#14b8a6] animate-bounce z-10 opacity-70" style={{ animationDuration: '3s' }} />

                  <img
                    src="/images/profile.webp"
                    alt="Oscar Antayhua"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fallbackNode = document.getElementById('hero-portrait-placeholder');
                      if (fallbackNode) fallbackNode.classList.remove('hidden');
                    }}
                    className="w-full h-full object-cover select-none object-center"
                  />

                  {/* SVG Blueprint backup silhouette */}
                  <div id="hero-portrait-placeholder" className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-16 h-16 text-neutral-800 dark:text-neutral-300 opacity-75" viewBox="0 0 100 100" fill="none">
                      <circle cx="50" cy="42" r="16" stroke="currentColor" strokeWidth="1.5" className="animate-pulse" />
                      <path d="M24 82C24 67 36 58 50 58C64 58 76 67 76 82" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
                    </svg>
                  </div>

                </div>
              </div>

              {/* SYS status tag pin */}
              <span className="absolute bottom-2 right-2 text-[8px] font-mono text-zinc-500 dark:text-white/30 bg-white/95 dark:bg-[#112]/95 px-2 py-0.5 border border-neutral-300 dark:border-white/10 rounded tracking-wider shadow font-bold select-none">
                SYS_IMG: OK
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 1.5: SOBRE MÍ / ABOUT ME */}
        <section
          id="about-section"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch py-12 scroll-mt-16"
        >
          {/* Main About Text card with custom liquid-glass effect */}
          <div className="lg:col-span-8 p-8 md:p-12 rounded-2xl liquid-glass relative overflow-hidden flex flex-col justify-between group/about">
            {/* Absolute Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-500/10 to-teal-500/5 blur-3xl pointer-events-none -mr-20 -mt-20 opacity-40 group-hover/about:opacity-75 transition-opacity duration-500" />

            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-3 rounded bg-gradient-to-b from-indigo-500 to-teal-400" />
                <span className="text-[10px] font-mono text-neutral-500 dark:text-white/40 uppercase tracking-widest">
                  {t.aboutSub}
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black font-sans tracking-tight text-neutral-900 dark:text-white mb-6">
                {t.aboutTitle}
              </h2>
              <div className="space-y-6 font-sans text-sm md:text-base text-neutral-600 dark:text-white/80 leading-relaxed max-w-3xl">
                <p>{t.aboutDesc1}</p>
                <p>{t.aboutDesc2}</p>
              </div>
            </div>

            {/* Resume / Portfolio transmission triggers */}
            <div className="pt-8 border-t border-neutral-200/50 dark:border-white/10 mt-8 flex flex-wrap gap-4">
              <a
                href="https://linkedin.com/in/oscar-antayhua"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-white/70 dark:bg-[#111111]/70 hover:bg-neutral-200 dark:hover:bg-neutral-900 border border-neutral-300/60 dark:border-white/10 rounded-lg text-neutral-800 dark:text-white font-mono text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all active:scale-98"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                {t.aboutLinkIn}
              </a>
              <a
                href="https://github.com/Azsher"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-white/70 dark:bg-[#111111]/70 hover:bg-neutral-200 dark:hover:bg-neutral-900 border border-neutral-300/60 dark:border-white/10 rounded-lg text-neutral-800 dark:text-white font-mono text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all active:scale-98"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                {t.aboutGit}
              </a>
              <button
                onClick={() => {
                  setCvDownloaded(true);
                  setTimeout(() => setCvDownloaded(false), 5000);
                }}
                className="px-5 py-2.5 bg-neutral-900 border border-neutral-900 dark:border-white text-white dark:text-black dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-100 rounded-lg font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all active:scale-98 cursor-pointer"
              >
                <Download className="h-4 w-4" />
                {t.aboutCvBtn}
              </button>
            </div>
          </div>

          {/* Interactive Biometric Tech Profile sidebar card */}
          <div className="lg:col-span-4 p-8 border border-neutral-300/65 dark:border-white/15 rounded-2xl bg-white/95 dark:bg-[#141414]/90 shadow-[0_8px_30px_rgba(0,0,0,0.025)] dark:shadow-[0_15px_45px_rgba(0,0,0,0.65)] backdrop-blur-md relative overflow-hidden flex flex-col justify-between transition-all min-h-[380px] group/biometric">
            <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-gradient-to-tr from-indigo-500/5 via-teal-500/5 to-transparent blur-2xl pointer-events-none opacity-40 group-hover/biometric:opacity-75 transition-opacity duration-500" />

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-2 rounded bg-gradient-to-r from-indigo-500 to-teal-400" />
                <span className="text-[10px] font-mono text-neutral-400 dark:text-white/40 block tracking-widest uppercase">
                  IDENTITY_INDEX_TELEMETRY
                </span>
              </div>
              <div className="relative w-full h-44 bg-neutral-100/40 dark:bg-neutral-800/20 border border-neutral-200/65 dark:border-white/5 rounded-xl flex items-center justify-center overflow-hidden">
                {/* Abstract geometric SVG technical portrait representing 'me' as high-tech wireframe */}
                <svg className="w-24 h-24 text-neutral-800 dark:text-white/80" viewBox="0 0 100 100" fill="none">
                  {/* Outer circle radar details */}
                  <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" className="animate-spin text-indigo-500/35 dark:text-indigo-400/25" style={{ animationDuration: '40s' }} />
                  <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="0.5" className="text-teal-500/25 dark:text-teal-400/15" />

                  {/* Grid overlay */}
                  <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="0.25" opacity="0.3" />
                  <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="0.25" opacity="0.3" />

                  {/* Stylized Developer Silhouette drawing using vectors */}
                  <path d="M50 32C56.6274 32 62 26.6274 62 20C62 13.3726 56.6274 8 50 8C43.3726 8 38 13.3726 38 20C38 26.6274 43.3726 32 50 32Z" stroke="currentColor" strokeWidth="1.5" className="animate-pulse text-indigo-500 dark:text-indigo-450" />
                  <path d="M22 84C22 66.3269 34.536 52 50 52C65.464 52 78 66.3269 78 84" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-teal-500 dark:text-teal-400" />
                  <path d="M30 65L42 56" stroke="currentColor" strokeWidth="0.75" className="text-neutral-500" />
                  <path d="M70 65L58 56" stroke="currentColor" strokeWidth="0.75" className="text-neutral-500" />

                  {/* Target crosshairs */}
                  <circle cx="50" cy="20" r="2.5" className="fill-teal-500 dark:fill-teal-400" />
                  <circle cx="50" cy="62" r="1.5" className="fill-indigo-500 dark:fill-indigo-400" />
                  <circle cx="35" cy="74" r="1.5" className="fill-teal-500 dark:fill-teal-400" />
                  <circle cx="65" cy="74" r="1.5" className="fill-indigo-500 dark:fill-indigo-400" />
                </svg>
                {/* Corner crosshairs like high-tech blueprints */}
                <div className="absolute top-2 left-2 text-[8px] font-mono opacity-35 text-neutral-450 dark:text-white/30">[+]</div>
                <div className="absolute top-2 right-2 text-[8px] font-mono opacity-35 text-neutral-450 dark:text-white/30">[REC]</div>
                <div className="absolute bottom-2 left-2 text-[8px] font-mono opacity-35 text-neutral-450 dark:text-white/30">SYS_V3</div>
                <div className="absolute bottom-2 right-2 text-[8px] font-mono opacity-35 text-neutral-450 dark:text-white/30">O_A</div>
              </div>
            </div>

            {/* Technical metrics */}
            <div className="space-y-3 font-mono text-[11px] pt-4">
              <div className="flex justify-between items-center border-b border-neutral-200 dark:border-white/5 pb-1.5">
                <span className="text-neutral-500 dark:text-white/40 uppercase">DESIG_ID</span>
                <span className="font-bold text-neutral-900 dark:text-white text-right">FULLSTACK_DEV</span>
              </div>
              <div className="flex justify-between items-center border-b border-neutral-200 dark:border-white/5 pb-1.5">
                <span className="text-neutral-500 dark:text-white/40 uppercase">EFF_EXP</span>
                <span className="font-bold text-neutral-900 dark:text-white text-right">2.00+ YEARS</span>
              </div>
              <div className="flex justify-between items-center border-b border-neutral-200 dark:border-white/5 pb-1.5">
                <span className="text-neutral-500 dark:text-white/40 uppercase">LOC_REM</span>
                <span className="text-teal-600 dark:text-teal-400 font-bold uppercase tracking-wider text-right">LIMA, PERU</span>
              </div>
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-neutral-500 dark:text-white/40 uppercase">STATUS</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 text-right">OPEN TO WORK</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: INTERACTIVE DISCOVERY PLAYGROUND (SANDBOX) */}
        <section className="space-y-6 flex flex-col py-8 scroll-mt-16" id="sandbox-section">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-3 rounded bg-gradient-to-b from-indigo-500 to-teal-400" />
              <span className="text-[10px] font-mono tracking-widest text-neutral-500 dark:text-white/40 uppercase block">
                LAB_EQUATIONS / FORCE_MATRICES
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black font-sans tracking-tight text-neutral-900 dark:text-white">
              {language === 'es' ? 'Stack y Tecnologías' : 'Stack & Technologies'}
            </h2>
          </div>
          <MatterSandbox language={language} />
        </section>

        {/* SECTION 2.5: EXPERIENCIA PROFESIONAL & EMPRESAS */}
        <section id="experience-section" className="space-y-8 flex flex-col py-8 scroll-mt-16 bg-transparent relative">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-3 rounded bg-gradient-to-b from-indigo-500 to-teal-400" />
              <span className="text-[10px] font-mono tracking-widest text-neutral-500 dark:text-white/40 uppercase block">
                {t.experienceSub}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black font-sans tracking-tight text-neutral-900 dark:text-white">
              {t.experienceTitle}
            </h2>
          </div>

          <ExperienceDashboard language={language} />
        </section>

        {/* COMPANY TICKER */}
        <div className="w-full">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-2.5 rounded bg-gradient-to-r from-indigo-500 to-teal-400" />
            <span className="text-xs font-bold tracking-widest text-neutral-400 dark:text-white/40 font-mono uppercase">
              {language === 'es' ? 'EMPRESAS_ALIADAS' : 'TRUSTED_BY'}
            </span>
          </div>
        </div>
        <div className="w-full my-6" style={{ paddingTop: '18px' }}>
          <CompanyTicker />
        </div>

        {/* SECTION 4: FEATURED ARCHITECTURE & WORKS */}
        <section id="projects-section" className="flex flex-col pb-8 scroll-mt-16">
          <StackedProjects language={language} isDark={isDarkMode} />
        </section>

        {/* SECTION 5: CONTACT */}
        <div id="contact-section" className="flex flex-col py-8 scroll-mt-16 w-full">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-2.5 rounded bg-gradient-to-r from-indigo-500 to-teal-400" />
            <span className="text-xs font-bold tracking-widest text-neutral-400 dark:text-white/40 font-mono uppercase block">
              {t.contactTitle}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-sans text-neutral-900 dark:text-white mb-2">{t.contactHeader}</h2>
          <p className="text-sm text-neutral-500 dark:text-white/55 mb-10 max-w-xl">{t.contactSub}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LinkedIn Card */}
            <div className="flex flex-col items-center justify-center p-8 border border-neutral-300/65 dark:border-white/15 rounded-2xl bg-white/95 dark:bg-[#141414]/90 shadow-[0_8px_30px_rgba(0,0,0,0.025)] dark:shadow-[0_15px_45px_rgba(0,0,0,0.65)] backdrop-blur-md text-center gap-5 transition-all hover:-translate-y-0.5 duration-300">
              <div className="w-14 h-14 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/15 flex items-center justify-center">
                <Linkedin className="w-7 h-7 text-indigo-500 dark:text-indigo-400" />
              </div>
              <p className="text-sm text-neutral-500 dark:text-white/60 leading-relaxed max-w-xs">
                {t.linkedinDesc}
              </p>
              <a
                href="https://linkedin.com/in/oscar-antayhua"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold text-sm transition-all active:scale-95"
              >
                <Linkedin className="w-4 h-4" />
                {t.linkedinBtn}
              </a>
            </div>

            {/* Contact Form */}
            <div className="p-8 border border-neutral-300/65 dark:border-white/15 rounded-2xl bg-white/95 dark:bg-[#141414]/90 shadow-[0_8px_30px_rgba(0,0,0,0.025)] dark:shadow-[0_15px_45px_rgba(0,0,0,0.65)] backdrop-blur-md transition-all">
              <form ref={contactFormRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder={t.placeholderName}
                  className="w-full bg-neutral-50/90 dark:bg-[#111111]/90 border border-neutral-200/60 dark:border-white/10 hover:border-neutral-300 dark:hover:border-white/25 focus:border-neutral-800 dark:focus:border-white/60 focus:outline-none p-3.5 text-sm rounded-lg text-neutral-800 dark:text-white placeholder-neutral-400 dark:placeholder-white/25 transition-all"
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder={t.placeholderEmail}
                  className="w-full bg-neutral-50/90 dark:bg-[#111111]/90 border border-neutral-200/60 dark:border-white/10 hover:border-neutral-300 dark:hover:border-white/25 focus:border-neutral-800 dark:focus:border-white/60 focus:outline-none p-3.5 text-sm rounded-lg text-neutral-800 dark:text-white placeholder-neutral-400 dark:placeholder-white/25 transition-all"
                />
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder={t.placeholderMsg}
                  className="w-full bg-neutral-50/90 dark:bg-[#111111]/90 border border-neutral-200/60 dark:border-white/10 hover:border-neutral-300 dark:hover:border-white/25 focus:border-neutral-800 dark:focus:border-white/60 focus:outline-none p-3.5 text-sm rounded-lg text-neutral-800 dark:text-white placeholder-neutral-400 dark:placeholder-white/25 transition-all resize-none"
                />

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full p-3.5 rounded-lg bg-neutral-900 dark:bg-white hover:bg-neutral-700 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-semibold text-sm transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
                >
                  {isSending ? (
                    <>
                      <Clock className="h-4 w-4 animate-spin" />
                      {t.btnSending}
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      {t.btnSend}
                    </>
                  )}
                </button>

                <AnimatePresence>
                  {sendStatus !== 'idle' && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className={`flex items-center gap-2 text-sm rounded-lg px-4 py-3 ${
                        sendStatus === 'success'
                          ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20'
                          : 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/20'
                      }`}
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                      <span>{sendStatus === 'success' ? t.successDesc : t.errorDesc}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </div>

      </main>

      {/* FOOTER BAR */}
      <footer className="w-full border-t border-neutral-200/50 dark:border-white/10 px-6 md:px-12 py-8 mt-12 bg-white/45 dark:bg-black/50 backdrop-blur-md relative z-10 text-center lg:text-left flex flex-col lg:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
          <span className="text-[10px] font-mono text-neutral-500 dark:text-white/50 uppercase tracking-widest">
            {t.footerMantra}
          </span>
        </div>

        <div className="flex gap-4 font-mono text-[9px] text-neutral-400 dark:text-white/30 uppercase tracking-wider">
          <a href="https://github.com/Azsher" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 dark:hover:text-white flex items-center gap-1">
            <Terminal className="h-3.5 w-3.5" /> GitHub <ExternalLink className="h-2 w-2" />
          </a>
          <span>/</span>
          <a href="https://linkedin.com/in/oscar-antayhua" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 dark:hover:text-white flex items-center gap-1">
            <User className="h-3.5 w-3.5" /> LinkedIn <ExternalLink className="h-2 w-2" />
          </a>
          <span>/</span>
          <span className="text-neutral-300 dark:text-white/20">© 2026 O_ANTAYHUA_SYSTEMS</span>
        </div>
      </footer>
        </>
      )}

        <AnimatePresence>
          {isLoading && (
            <PageLoader
              language={language}
              isDark={isDarkMode}
              onComplete={() => setIsLoading(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
