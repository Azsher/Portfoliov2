'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, Calendar, MapPin, Award, CheckCircle2, TrendingUp, Cpu, Server, Code } from 'lucide-react';

interface ExperienceDashboardProps {
  language: 'es' | 'en';
}

interface MetricItem {
  value: string;
  label: { es: string; en: string };
  icon: React.ReactNode;
}

interface ExperienceItem {
  company: string;
  shortLabel: string;
  role: { es: string; en: string };
  dept: { es: string; en: string };
  period: string;
  badge: { es: string; en: string };
  badgeColor: string;
  location: { es: string; en: string };
  desc: { es: string; en: string };
  achievements: { es: string[]; en: string[] };
  metrics: MetricItem[];
  techStack: string[];
  diagramType: 'analytics' | 'workflow' | 'generative';
  logo?: string;
}

export default function ExperienceDashboard({ language }: ExperienceDashboardProps) {
  const [activeTab, setActiveTab] = useState<number>(0);

  const t = {
    es: {
      sub: 'TRAYECTORIA & HISTORICO',
      title: 'Experiencia & Empresas',
      tabHeader: 'Selecciona un Cargo / Empresa',
      roleHeader: 'Detalles del Cargo',
      techTitle: 'Stack Tecnológico',
      metricsTitle: 'Métricas de Impacto',
      achievementsTitle: 'Hitos & Logros Clave',
      verified: 'SYS_ENG_RECORD // VERIFIED',
    },
    en: {
      sub: 'TRAJECTORY & CHRONICLES',
      title: 'Experience & Companies',
      tabHeader: 'Select a Role / Company',
      roleHeader: 'Role Specifications',
      techTitle: 'Technology Stack',
      metricsTitle: 'Impact Metrics',
      achievementsTitle: 'Key Milestones & Achievements',
      verified: 'SYS_ENG_RECORD // VERIFIED',
    }
  }[language];

  const experiences: ExperienceItem[] = [
    {
      company: 'Entel Perú',
      shortLabel: 'ENTEL PE',
      role: { es: 'Practicante de Desarrollo Full Stack', en: 'Full Stack Developer Intern' },
      dept: { es: 'Plataforma de Inversiones', en: 'Investment Platform' },
      period: 'Nov 2025 — Presente',
      badge: { es: 'Presente', en: 'Active' },
      badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      location: { es: 'Lima, Perú', en: 'Lima, Peru' },
      desc: {
        es: 'Desarrollo full stack de la plataforma interna de inversiones de Entel, con frontend en Next.js y backend en Django + Python. Implementé nuevos flujos de trabajo internos, construí un dashboard financiero con aprobaciones de proyectos en tiempo real y lideré una migración de Next.js que redujo los tiempos de carga 10 veces.',
        en: 'Full stack development of the internal investment platform at Entel, with a Next.js frontend and Django + Python backend. Implemented new internal workflows, built a real-time financial dashboard for project approvals, and led a Next.js migration that reduced load times by 10x.'
      },
      achievements: {
        es: [
          'Construí un dashboard financiero en tiempo real que muestra el estado de aprobación de proyectos de inversión, conectado al backend Django mediante APIs REST.',
          'Implementé nuevos flujos de trabajo dentro de la plataforma, traduciendo procesos de negocio complejos en interfaces claras y accionables para el equipo de inversiones.',
          'Lideré la migración del frontend de Next.js 12.1.5 a 16.1.6, modernizando la arquitectura y reduciendo los tiempos de carga de 15s a 1.5s (10x más rápido).',
          'Optimicé la descarga de reportes Excel, reduciendo el tiempo de ejecución de 10s a 3-5s mediante mejoras en la capa de datos del backend.',
          'Implementé operaciones masivas sobre proyectos en la UI, permitiendo gestionar múltiples registros simultáneamente sin recargar la página.',
          'Desarrollé validaciones de carga de archivos en frontend y backend, reduciendo errores operativos y fortaleciendo la integridad de los datos.'
        ],
        en: [
          'Built a real-time financial dashboard displaying project approval statuses, connected to the Django backend via REST APIs with live data updates.',
          'Implemented new internal platform workflows, translating complex business processes into clear, actionable interfaces for the investment team.',
          'Led the frontend migration from Next.js 12.1.5 to 16.1.6, modernizing the architecture and cutting load times from 15s to 1.5s (10x faster).',
          'Optimized Excel report downloads, reducing execution time from 10s to 3-5s through backend data layer improvements.',
          'Implemented bulk project operations in the UI, enabling management of multiple records simultaneously without page reloads.',
          'Developed file upload validations across frontend and backend, reducing operational errors and strengthening data integrity.'
        ]
      },
      metrics: [
        { value: '1.5s', label: { es: 'Carga Plataforma', en: 'Platform Load' }, icon: <TrendingUp className="w-4 h-4 text-teal-400" /> },
        { value: 'RT', label: { es: 'Dashboard Tiempo Real', en: 'Real-time Dashboard' }, icon: <Server className="w-4 h-4 text-indigo-400" /> },
        { value: '10x', label: { es: 'Mejora Rendimiento', en: 'Performance Gain' }, icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" /> }
      ],
      techStack: ['Next.js 16', 'React', 'TypeScript', 'Django', 'Python', 'REST APIs', 'Tailwind CSS', 'Real-time Data'],
      diagramType: 'analytics',
      logo: '/images/companies/entel.png'
    },
    {
      company: 'Nova Academy',
      shortLabel: 'NOVA PROCESS',
      role: { es: 'Trainee de Automatización de Procesos', en: 'Process Automation Trainee' },
      dept: { es: 'Automatización & Operaciones Corporativas', en: 'Automation & Corporate Operations' },
      period: 'Oct 2024 — May 2025',
      badge: { es: 'Trainee', en: 'Trainee' },
      badgeColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
      location: { es: 'Remoto', en: 'Remote' },
      desc: {
        es: 'Diseño, orquestación y despliegue de integraciones lógicas de flujos de trabajo clave en la nube mediante Make, Google Workspace y Microsoft 365, impulsando la productividad de los equipos y eliminando fricción manual.',
        en: 'Design, orchestration, and implementation of critical cloud integrations and automated pipelines using Make, Google Workspace, and Microsoft 365, driving higher team output and removing manual friction.'
      },
      achievements: {
        es: [
          'Implementé la automatización de 5 procesos clave utilizando Google Workspace y Microsoft 365, reduciendo el tiempo de ejecución en un 20%.',
          'Diseñé flujos de trabajo automatizados con Make, integrando datos de Google Sheets para generar reportes, resultando en una reducción del 15% en errores manuales.',
          'Mejoré la eficiencia operativa mediante integraciones avanzadas, optimizando la gestión de información.'
        ],
        en: [
          'Implemented the automation of 5 key business processes using Google Workspace and Microsoft 365, successfully slashing processing runtimes by 20%.',
          'Architected dynamic and automated Make integration models pulling data from Google Sheets to compile auto-reports, reducing manual entry errors by 15%.',
          'Boosted operational efficiency using sophisticated API integrations, enabling smoother centralized data management.'
        ]
      },
      metrics: [
        { value: '5+', label: { es: 'Procesos Cloud', en: 'Cloud Automations' }, icon: <Cpu className="w-4 h-4 text-indigo-400" /> },
        { value: '-20%', label: { es: 'Tiempo Ejecución', en: 'Execution Speedup' }, icon: <TrendingUp className="w-4 h-4 text-teal-400" /> },
        { value: '-15%', label: { es: 'Error Manual', en: 'Manual Errors Saved' }, icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" /> }
      ],
      techStack: ['Make (Integromat)', 'Google Workspace', 'Microsoft 365', 'Google Sheets API', 'Webhooks', 'Process Optimization'],
      diagramType: 'workflow',
      logo: '/images/companies/nova.webp'
    },
    {
      company: 'Nova Academy',
      shortLabel: 'NOVA GEN AI',
      role: { es: 'Gen AI Trainee', en: 'Gen AI Trainee' },
      dept: { es: 'Inteligencia Artificial Generativa', en: 'Generative AI Studio' },
      period: 'Apr 2024 — Oct 2024',
      badge: { es: 'Trainee', en: 'Trainee' },
      badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-450 border-amber-500/20',
      location: { es: 'Remoto', en: 'Remote' },
      desc: {
        es: 'Investigación activa de modelos de lenguaje grande (LLMs) y metodologías ágiles de ingeniería de prompts. Creación ágil de contenido digital y estratégico de educación tecnológica potenciada por herramientas de inteligencia artificial generativa.',
        en: 'Active research on Large Language Models (LLMs) and advanced prompt engineering methodologies. Fast tracking high-engagement tech education and digital assets powered by state-of-the-art Gen AI suites.'
      },
      achievements: {
        es: [
          'Recopilé y analizó información semanal sobre IA, generando más de 20 piezas de contenido digital para campañas en Instagram, LinkedIn y TikTok.',
          'Elaboré material educativo sobre IA, contribuyendo a la estrategia de comunicación y aumentando la interacción en redes sociales en un 15%.',
          'Utilicé herramientas de IA generativa para optimizar la creación de contenido, incrementando la eficiencia en un 30%.'
        ],
        en: [
          'Collected and analyzed weekly breakthrough discoveries on AI, crafting over 20 tailored digital content assets for Instagram, LinkedIn, and TikTok.',
          'Successfully authored high-fidelity educational training materials about Gen AI, improving social media interaction rates by 15%.',
          'Orchestrated generative AI systems to automate creative drafts, accelerating content delivery velocity by 30%.'
        ]
      },
      metrics: [
        { value: '20+', label: { es: 'Piezas Creadas', en: 'Content Pieces' }, icon: <Award className="w-4 h-4 text-amber-450" /> },
        { value: '+15%', label: { es: 'Interacción Redes', en: 'Social Interaction' }, icon: <TrendingUp className="w-4 h-4 text-teal-400" /> },
        { value: '+30%', label: { es: 'Eficiencia Creación', en: 'Creation Efficiency' }, icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" /> }
      ],
      techStack: ['Generative AI', 'Prompt Engineering', 'LLM Platforms', 'Content Analytics', 'Social Media API', 'AI Automation'],
      diagramType: 'generative',
      logo: '/images/companies/nova.webp'
    }
  ];



  const currentExp = experiences[activeTab] || experiences[0];

  const renderSchemaDiagram = (type: 'analytics' | 'workflow' | 'generative') => {
    switch (type) {
      case 'analytics':
        return (
          <div className="relative w-full h-32 flex flex-col justify-between bg-neutral-50 dark:bg-black/40 rounded-xl overflow-hidden border border-neutral-200/50 dark:border-white/5 p-3">
            <div className="flex items-center justify-between font-mono text-[9px] tracking-wider text-neutral-400 dark:text-neutral-500">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />INV_PLATFORM_LATENCY_TEST</span>
              <span>1.5s / OK</span>
            </div>
            <div className="space-y-2 my-auto">
              <div className="space-y-0.5">
                <div className="flex justify-between text-[7px] font-mono opacity-50"><span>Legacy Next.js 12 (15.0s)</span><span>100%</span></div>
                <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden"><div className="w-full h-full bg-rose-500/50 animate-pulse" /></div>
              </div>
              <div className="space-y-0.5">
                <div className="flex justify-between text-[8px] font-mono font-bold text-teal-600 dark:text-teal-450"><span>Next.js 16 (1.5s)</span><span>10x Faster</span></div>
                <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden relative">
                  <motion.div initial={{ width: "0%" }} animate={{ width: "10%" }} transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }} className="h-full bg-teal-400" />
                </div>
              </div>
            </div>
            <div className="text-[7.5px] font-mono text-neutral-400 dark:text-neutral-600 tracking-wider uppercase text-right leading-none">SPEED_OPTIMIZER_VERIFIED_SLA</div>
          </div>
        );
      case 'workflow':
        return (
          <div className="relative w-full h-32 flex items-center justify-center bg-neutral-50 dark:bg-black/40 rounded-xl overflow-hidden border border-neutral-200/50 dark:border-white/5">
            <div className="flex items-center gap-2 relative">
              <div className="flex flex-col items-center gap-1"><div className="w-7 h-7 rounded-md border border-emerald-500/30 flex items-center justify-center bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 font-mono text-[9px] font-extrabold shadow-xs">G_SH</div><span className="text-[7px] font-mono font-bold opacity-50">TRIG</span></div>
              <svg className="w-7 h-6 text-neutral-300 dark:text-neutral-800" viewBox="0 0 28 10" fill="none"><path d="M0 5 H28" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" /><motion.circle animate={{ cx: [0, 28] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} r="2" cy="5" className="fill-indigo-500 dark:fill-indigo-400" /></svg>
              <div className="flex flex-col items-center gap-1"><div className="w-9 h-9 rounded-full border border-indigo-500/30 flex items-center justify-center bg-neutral-100 dark:bg-[#111] text-indigo-600 dark:text-indigo-450 animate-pulse"><Cpu className="w-4 h-4" /></div><span className="text-[7px] font-mono font-bold text-indigo-500">MAKE</span></div>
              <svg className="w-7 h-6 text-neutral-300 dark:text-neutral-800" viewBox="0 0 28 10" fill="none"><path d="M0 5 H28" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" /><motion.circle animate={{ cx: [0, 28] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 1 }} r="2" cy="5" className="fill-teal-400" /></svg>
              <div className="flex flex-col items-center gap-1"><div className="w-7 h-7 rounded-md border border-neutral-250 dark:border-white/10 flex items-center justify-center bg-white dark:bg-neutral-900 font-mono text-[9px] text-neutral-600 dark:text-neutral-400 shadow-xs">M365</div><span className="text-[7px] font-mono font-bold opacity-50">SYNC</span></div>
            </div>
            <div className="absolute bottom-2 right-3 text-[8px] font-mono text-neutral-400 dark:text-neutral-500 tracking-widest uppercase">ORCHESTRATOR_MAKE_CORE</div>
          </div>
        );
      case 'generative':
        return (
          <div className="relative w-full h-32 flex flex-col justify-between bg-neutral-50 dark:bg-black/40 rounded-xl overflow-hidden border border-neutral-200/50 dark:border-white/5 p-3">
            <div className="flex items-center justify-between font-mono text-[9px] tracking-wider text-neutral-400 dark:text-neutral-500">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />PROMPT_RESPONSE_TOKENIZER</span>
              <span>30k Tok/s</span>
            </div>
            <div className="flex items-center gap-2 overflow-hidden h-10 justify-center">
              <div className="text-[8px] font-mono p-1 rounded bg-neutral-100 dark:bg-white/5 border border-black/5 dark:border-white/5 text-neutral-500 max-w-[80px] shrink-0 truncate">{"{prompt: 'digital'}"}</div>
              <div className="text-neutral-300 dark:text-neutral-800 text-xs">➔</div>
              <div className="flex flex-wrap gap-1 justify-start overflow-hidden">
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: [0, 1, 1, 0], scale: [0.9, 1, 1, 0.9] }} transition={{ duration: 3, repeat: Infinity, delay: 0 }} className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-amber-550/10 text-amber-600 dark:text-amber-400 border border-amber-500/10">[AI_Content]</motion.div>
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: [0, 1, 1, 0], scale: [0.9, 1, 1, 0.9] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-teal-550/10 text-teal-650 dark:text-teal-400 border border-teal-500/10">[Education]</motion.div>
              </div>
            </div>
            <div className="text-[7.5px] font-mono text-neutral-400 dark:text-neutral-600 tracking-wider uppercase text-right leading-none">GEN_AI_MODEL_ACTIVE_STUDIO</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-4 flex flex-col gap-3 w-full">
        <div className="text-xs font-mono text-neutral-550 dark:text-white/40 uppercase tracking-[0.2em] font-black mb-1.5 px-1">{t.tabHeader}</div>
        <div className="flex flex-col gap-2.5">
          {experiences.map((exp, idx) => {
            const isActive = activeTab === idx;
            return (
              <div key={`${exp.company}-${idx}`} className={`w-full rounded-xl border transition-all text-sm font-mono tracking-tight relative overflow-hidden ${isActive ? 'bg-white dark:bg-[#161616] border-neutral-900 dark:border-white/30 shadow-xl dark:shadow-[0_8px_25px_rgba(0,0,0,0.5)] text-neutral-900 dark:text-white' : 'bg-white/40 dark:bg-[#0e0e0e]/50 border-neutral-200/70 dark:border-white/10 hover:border-neutral-350 dark:hover:border-white/20 text-neutral-550 dark:text-white/60 hover:text-neutral-900 dark:hover:text-white'}`}>
                <div className={`absolute top-0 bottom-0 left-0 w-[4px] bg-gradient-to-b from-indigo-500 to-teal-400 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                <button
                  onClick={() => setActiveTab(prev => { if (prev === idx) { return window.innerWidth < 1024 ? -1 : idx; } return idx; })}
                  className="w-full text-left p-5 cursor-pointer relative group flex flex-col gap-1.5 active:scale-99 focus:outline-hidden"
                >
                  <div className="flex items-center justify-between w-full relative z-10 pl-1">
                    <span className="text-[10px] text-neutral-400 dark:text-white/35 tracking-widest font-black uppercase">0{idx + 1} // {exp.shortLabel}</span>
                    <span className={`text-xs font-mono font-bold ${isActive ? 'text-indigo-600 dark:text-teal-400' : 'text-neutral-600 dark:text-white/50'}`}>{exp.period.split(' — ')[0]}</span>
                  </div>
                  <div className="flex items-center gap-3 relative z-10 pl-1 w-full mt-0.5">
                    <div className={`w-12 h-12 rounded-xl flex-shrink-0 border flex items-center justify-center overflow-hidden shadow-xs transition-all relative ${exp.company === 'Entel Perú' ? 'bg-white border-neutral-200 p-1.5' : 'bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-[#111] dark:to-[#080808] border-neutral-200 dark:border-white/10'}`}>
                      {exp.logo && <img src={exp.logo} alt={exp.company} className={`w-full h-full transition-transform duration-300 group-hover:scale-105 ${exp.company === 'Entel Perú' ? 'object-contain' : 'object-cover'}`} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />}
                      <div className="absolute inset-0 flex items-center justify-center font-sans font-black text-xs text-neutral-800 dark:text-neutral-200" style={{ display: exp.logo ? 'none' : 'flex' }}>
                        {exp.company === 'Entel Perú' ? <span className="text-blue-650 dark:text-blue-400">E</span> : <span className="text-orange-500 dark:text-orange-400">N</span>}
                      </div>
                    </div>
                    <div className="text-left flex-1 min-w-0 space-y-0.5">
                      <span className="font-extrabold tracking-tight text-sm lg:text-[14px] font-sans block text-neutral-900 dark:text-white group-hover:translate-x-0.5 transition-transform leading-tight truncate">{exp.role[language]}</span>
                      <span className="text-xs font-sans text-neutral-500 dark:text-white/45 block font-medium group-hover:translate-x-0.5 transition-transform delay-75 truncate">{exp.company}</span>
                    </div>
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="block lg:hidden overflow-hidden">
                      <div className="px-5 pb-10 pt-2 border-t border-neutral-200/50 dark:border-white/10 space-y-5">
                        <p className="text-xs md:text-sm text-neutral-600 dark:text-white/75 leading-relaxed font-sans mt-3">{exp.desc[language]}</p>
                        <div className="space-y-2.5">
                          <span className="text-[9px] font-mono text-neutral-400 dark:text-white/40 uppercase tracking-widest font-black block">{t.achievementsTitle}</span>
                          {exp.achievements[language].map((ach, achIdx) => (
                            <div key={achIdx} className="flex items-start gap-2 text-xs text-neutral-600 dark:text-white/85 font-sans leading-relaxed"><CheckCircle2 className="w-4 h-4 text-emerald-500/80 shrink-0 mt-0.5" /><span>{ach}</span></div>
                          ))}
                        </div>
                        <div className="space-y-2">
                          <span className="text-[9px] font-mono text-neutral-400 dark:text-white/40 uppercase tracking-widest font-black block">REALTIME_GRID</span>
                          {renderSchemaDiagram(exp.diagramType)}
                        </div>
                        <div className="space-y-2">
                          <span className="text-[9px] font-mono text-neutral-400 dark:text-white/40 uppercase tracking-widest font-black block">{t.metricsTitle}</span>
                          <div className="grid grid-cols-3 gap-2">
                            {exp.metrics.map((met, metIdx) => (
                              <div key={metIdx} className="p-3 border border-neutral-200 dark:border-white/5 rounded-xl bg-neutral-50 dark:bg-black/30 flex flex-col justify-center items-center text-center shadow-xs">
                                <div className="flex items-center gap-1 mb-0.5">{met.icon}<span className="text-sm font-black font-sans text-neutral-900 dark:text-white tracking-tight">{met.value}</span></div>
                                <span className="text-[8px] font-mono text-neutral-550 dark:text-white/45 uppercase leading-none block font-bold">{met.label[language]}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <span className="text-[9px] font-mono text-neutral-400 dark:text-white/40 uppercase tracking-widest font-black block flex items-center gap-1.5"><Code className="w-3.5 h-3.5" />{t.techTitle}</span>
                          <div className="flex flex-wrap gap-1.5">
                            {exp.techStack.map((tech) => (<span key={tech} className="px-2.5 py-1 text-[9px] font-semibold font-mono bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-md text-neutral-700 dark:text-white/80">{tech}</span>))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      <div className="lg:col-span-8 w-full hidden lg:block">
        <div className="text-xs font-mono text-neutral-400 dark:text-white/30 uppercase tracking-[0.2em] font-black mb-1 px-1 flex items-center justify-between">
          <span>{t.roleHeader}</span>
          <span className="text-emerald-500 flex items-center gap-1 text-[11px]"><span className="w-1.5 h-1.5 rounded bg-emerald-500 animate-pulse" />{t.verified}</span>
        </div>
        <div className="relative min-h-[500px] border border-neutral-300/65 dark:border-white/15 rounded-2xl bg-white/95 dark:bg-[#141414]/90 shadow-[0_8px_30px_rgba(0,0,0,0.025)] dark:shadow-[0_15px_45px_rgba(0,0,0,0.65)] backdrop-blur-md p-6 md:p-8 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="space-y-6 flex flex-col justify-between h-full">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-neutral-200/50 dark:border-white/10 w-full">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex-shrink-0 border flex items-center justify-center overflow-hidden shadow-xs relative ${currentExp.company === 'Entel Perú' ? 'bg-white border-neutral-200 p-2' : 'bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-[#111] dark:to-[#080808] border-neutral-200 dark:border-white/10'}`}>
                    {currentExp.logo && <img src={currentExp.logo} alt={currentExp.company} className={`w-full h-full ${currentExp.company === 'Entel Perú' ? 'object-contain' : 'object-cover'}`} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />}
                    <div className="absolute inset-0 flex items-center justify-center font-sans font-black text-sm md:text-base text-neutral-800 dark:text-neutral-200" style={{ display: currentExp.logo ? 'none' : 'flex' }}>
                      {currentExp.company === 'Entel Perú' ? <span className="text-blue-650 dark:text-blue-400">E</span> : <span className="text-orange-500 dark:text-orange-400">N</span>}
                    </div>
                  </div>
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`text-[10px] font-mono px-2.5 py-1 rounded font-bold border uppercase tracking-wider ${currentExp.badgeColor}`}>{currentExp.badge[language]}</span>
                      <span className="text-xs font-mono text-neutral-400 dark:text-white/35 flex items-center gap-1.5"><Calendar className="w-4 h-4" />{currentExp.period}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black font-sans text-neutral-900 dark:text-white leading-tight">{currentExp.role[language]}</h3>
                    <div className="text-sm font-mono text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 font-bold mt-1"><Building2 className="w-4 h-4" />{currentExp.dept[language]}</div>
                  </div>
                </div>
                <div className="text-left md:text-right font-mono text-xs text-neutral-400 dark:text-white/30 flex items-center md:flex-col gap-1.5 md:gap-0">
                  <div className="flex items-center gap-1 justify-end"><MapPin className="w-3.5 h-3.5 text-neutral-500" />{currentExp.location[language]}</div>
                  <div className="text-right text-[9px] font-bold border border-black/5 dark:border-white/5 opacity-40 px-1.5 mt-1 tracking-tighter">NODE_S1 // SLA</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-5">
                  <p className="text-sm md:text-base text-neutral-600 dark:text-white/75 leading-relaxed font-sans">{currentExp.desc[language]}</p>
                  <div className="space-y-3">
                    <span className="text-xs font-mono text-neutral-400 dark:text-white/40 uppercase tracking-widest font-black block pt-2">{t.achievementsTitle}</span>
                    {currentExp.achievements[language].map((ach, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-neutral-600 dark:text-white/80 font-sans leading-relaxed"><CheckCircle2 className="w-4.5 h-4.5 text-emerald-500/80 shrink-0 mt-0.5" /><span>{ach}</span></div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-3 justify-center">
                  <span className="text-xs font-mono text-neutral-400 dark:text-white/40 uppercase tracking-widest font-black block md:text-center">REALTIME_GRID</span>
                  {renderSchemaDiagram(currentExp.diagramType)}
                </div>
              </div>

              <div className="pt-5 border-t border-neutral-200/50 dark:border-white/10">
                <span className="text-xs font-mono text-neutral-400 dark:text-white/40 uppercase tracking-widest font-black block mb-3.5">{t.metricsTitle}</span>
                <div className="grid grid-cols-3 gap-3">
                  {currentExp.metrics.map((met, idx) => (
                    <div key={idx} className="p-4 border border-neutral-200 dark:border-white/5 rounded-xl bg-neutral-50 dark:bg-black/30 flex flex-col justify-center items-center text-center shadow-xs">
                      <div className="flex items-center gap-1.5 mb-1">{met.icon}<span className="text-lg md:text-2xl font-black font-sans text-neutral-900 dark:text-white tracking-tight">{met.value}</span></div>
                      <span className="text-[10px] font-mono text-neutral-550 dark:text-white/45 uppercase leading-none block font-bold">{met.label[language]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-2">
                <span className="text-xs font-mono text-neutral-400 dark:text-white/40 uppercase tracking-widest font-black block mb-2.5 flex items-center gap-1.5"><Code className="w-3.5 h-3.5" />{t.techTitle}</span>
                <div className="flex flex-wrap gap-2">
                  {currentExp.techStack.map((tech) => (
                    <span key={tech} className="px-3 py-1.5 text-[10px] font-semibold font-mono bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-md text-neutral-700 dark:text-white/80 hover:bg-neutral-200 dark:hover:bg-white/10 hover:text-black dark:hover:text-white transition-colors cursor-default">{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
