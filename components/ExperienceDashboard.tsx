'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, Calendar, MapPin, Award, CheckCircle2, TrendingUp, Cpu, Server, Play, Code } from 'lucide-react';

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
      role: { es: 'Practicante de Inteligencia de Negocios', en: 'Business Intelligence Intern' },
      dept: { es: 'Plataforma de Inversiones Plinco', en: 'Plinco Investment Platform' },
      period: 'Nov 2025 — Presente',
      badge: { es: 'Presente', en: 'Active' },
      badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      location: { es: 'Lima, Perú', en: 'Lima, Peru' },
      desc: {
        es: 'Desarrollo, optimización y mantenimiento de Plinco, la plataforma de inversiones de Entel S.A. Lideré la migración completa del motor de frontend de Next.js y mejoré de forma radical la velocidad de operación de datos del sistema.',
        en: 'Development, optimization, and maintenance of Plinco, Entel\'s core investment platform. Led the frontend migration to modern Next.js schemas and successfully streamlined heavy file processing workloads.'
      },
      achievements: {
        es: [
          'Desarrollé y mantuve la nueva versión de Plinco, la plataforma de inversiones de Entel, incorporando nuevas funcionalidades y realizando mejoras continuas sobre el sistema.',
          'Lideré la migración del frontend de Next.js 12.1.5 a 16.1.6, modernizando la plataforma y mejorando su rendimiento general.',
          'Optimicé los tiempos de carga de la plataforma, reduciéndolos de 15 segundos a 1.5 segundos para mejorar la experiencia del usuario.',
          'Mejoré el proceso de descarga de archivos Excel, reduciendo el tiempo de ejecución de 10 segundos a un rango de 3 a 5 segundos.',
          'Implementé mejoras en la interfaz para la modificación de múltiples proyectos, facilitando la gestión y usabilidad de la plataforma.',
          'Desarrollé validaciones para la carga de archivos, fortaleciendo el control de datos y reduciendo errores operativos dentro del sistema.'
        ],
        en: [
          'Developed and maintained the new version of Plinco, Entel\'s investment platform, adding brand-new features and introducing continuous system enhancements.',
          'Led the frontend migration from Next.js 12.1.5 to 16.1.6, modernizing the web application platform and boosting overall client performance.',
          'Optimized platform load times, successfully slashing rendering lag from 15 seconds down to just 1.5 seconds.',
          'Refactored the Excel downloading process, reducing execution runtimes from 10 seconds down to a 3-to-5 second window.',
          'Implemented bulk project operations within the UI, simplifying administrative management and user convenience.',
          'Engineered custom data validation checks during file uploads, tightening general integrity constraints and eliminating operational errors.'
        ]
      },
      metrics: [
        { value: '1.5s', label: { es: 'Tiempo de Carga', en: 'Load Time' }, icon: <TrendingUp className="w-4 h-4 text-teal-400" /> },
        { value: '10x', label: { es: 'Modificación Proy.', en: 'Project Bulk Updates' }, icon: <Server className="w-4 h-4 text-indigo-400" /> },
        { value: '100%', label: { es: 'Migración Next.js 16', en: 'Next.js 16 Migration' }, icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" /> }
      ],
      techStack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Excel Integration', 'Data Validation', 'Frontend Architecture'],
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

  const currentExp = experiences[activeTab];

  // Helper to render responsive graphic schema based on experience sector
  const renderSchemaDiagram = (type: 'analytics' | 'workflow' | 'generative') => {
    switch (type) {
      case 'analytics':
        return (
          <div className="relative w-full h-32 flex flex-col justify-between bg-neutral-50 dark:bg-black/40 rounded-xl overflow-hidden border border-neutral-200/50 dark:border-white/5 p-3">
            <div className="flex items-center justify-between font-mono text-[9px] tracking-wider text-neutral-400 dark:text-neutral-500">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                PLINCO_QUERY_LATENCY_TEST
              </span>
              <span>1.5s / OK</span>
            </div>

            <div className="space-y-2 my-auto">
              {/* Old Engine Bar (15s) */}
              <div className="space-y-0.5">
                <div className="flex justify-between text-[7px] font-mono opacity-50">
                  <span>Legacy Next.js 12 (15.0s)</span>
                  <span>100%</span>
                </div>
                <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-rose-500/50 animate-pulse" />
                </div>
              </div>

              {/* Migrated Engine Bar (1.5s) */}
              <div className="space-y-0.5">
                <div className="flex justify-between text-[8px] font-mono font-bold text-teal-600 dark:text-teal-450">
                  <span>Next.js 16 Cloud Engine (1.5s Limit)</span>
                  <span>1.5s [10x Faster]</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden relative">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "10%" }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    className="h-full bg-teal-400"
                  />
                </div>
              </div>
            </div>

            <div className="text-[7.5px] font-mono text-neutral-400 dark:text-neutral-600 tracking-wider uppercase text-right leading-none">
              SPEED_OPTIMIZER_VERIFIED_SLA
            </div>
          </div>
        );
      case 'workflow':
        return (
          <div className="relative w-full h-32 flex items-center justify-center bg-neutral-50 dark:bg-black/40 rounded-xl overflow-hidden border border-neutral-200/50 dark:border-white/5">
            <div className="flex items-center gap-2 relative">
              {/* Google Sheets Trigger */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-7 h-7 rounded-md border border-emerald-500/30 flex items-center justify-center bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 font-mono text-[9px] font-extrabold shadow-xs">
                  G_SH
                </div>
                <span className="text-[7px] font-mono font-bold opacity-50">TRIG</span>
              </div>

              {/* Connecting pipe */}
              <svg className="w-7 h-6 text-neutral-300 dark:text-neutral-800" viewBox="0 0 28 10" fill="none">
                <path d="M0 5 H28" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                <motion.circle
                  animate={{ cx: [0, 28] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  r="2"
                  cy="5"
                  className="fill-indigo-500 dark:fill-indigo-400"
                />
              </svg>

              {/* Make Router */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-9 h-9 rounded-full border border-indigo-500/30 flex items-center justify-center bg-neutral-100 dark:bg-[#111] text-indigo-600 dark:text-indigo-450 animate-pulse">
                  <Cpu className="w-4 h-4" />
                </div>
                <span className="text-[7px] font-mono font-bold text-indigo-500">MAKE</span>
              </div>

              {/* Connecting pipe */}
              <svg className="w-7 h-6 text-neutral-300 dark:text-neutral-800" viewBox="0 0 28 10" fill="none">
                <path d="M0 5 H28" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                <motion.circle
                  animate={{ cx: [0, 28] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 1 }}
                  r="2"
                  cy="5"
                  className="fill-teal-400"
                />
              </svg>

              {/* Output Integration */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-7 h-7 rounded-md border border-neutral-250 dark:border-white/10 flex items-center justify-center bg-white dark:bg-neutral-900 font-mono text-[9px] text-neutral-600 dark:text-neutral-400 shadow-xs">
                  M365
                </div>
                <span className="text-[7px] font-mono font-bold opacity-50">SYNC</span>
              </div>
            </div>

            <div className="absolute bottom-2 right-3 text-[8px] font-mono text-neutral-400 dark:text-neutral-500 tracking-widest uppercase">
              ORCHESTRATOR_MAKE_CORE
            </div>
          </div>
        );
      case 'generative':
        return (
          <div className="relative w-full h-32 flex flex-col justify-between bg-neutral-50 dark:bg-black/40 rounded-xl overflow-hidden border border-neutral-200/50 dark:border-white/5 p-3">
            <div className="flex items-center justify-between font-mono text-[9px] tracking-wider text-neutral-400 dark:text-neutral-500">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                PROMPT_RESPONSE_TOKENIZER
              </span>
              <span>30k Tok/s</span>
            </div>

            {/* Simulated prompting/generation blocks */}
            <div className="flex items-center gap-2 overflow-hidden h-10 justify-center">
              <div className="text-[8px] font-mono p-1 rounded bg-neutral-100 dark:bg-white/5 border border-black/5 dark:border-white/5 text-neutral-500 max-w-[80px] shrink-0 truncate">
                {"{prompt: 'digital'}"}
              </div>

              <div className="text-neutral-300 dark:text-neutral-800 text-xs">➔</div>

              {/* Token generator animation: typing keywords */}
              <div className="flex flex-wrap gap-1 justify-start overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0, 1, 1, 0], scale: [0.9, 1, 1, 0.9] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                  className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-amber-550/10 text-amber-600 dark:text-amber-400 border border-amber-500/10"
                >
                  [AI_Content]
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0, 1, 1, 0], scale: [0.9, 1, 1, 0.9] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-teal-550/10 text-teal-650 dark:text-teal-400 border border-teal-500/10"
                >
                  [Education]
                </motion.div>
              </div>
            </div>

            <div className="text-[7.5px] font-mono text-neutral-400 dark:text-neutral-600 tracking-wider uppercase text-right leading-none">
              GEN_AI_MODEL_ACTIVE_STUDIO
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* 1. Left side navigation company tabs */}
      <div className="lg:col-span-4 flex flex-col gap-3 w-full">
        <div className="text-xs font-mono text-neutral-550 dark:text-white/40 uppercase tracking-[0.2em] font-black mb-1.5 px-1">
          {t.tabHeader}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
          {experiences.map((exp, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={`${exp.company}-${idx}`}
                onClick={() => setActiveTab(idx)}
                className={`w-full text-left p-5 rounded-xl border transition-all text-sm font-mono tracking-tight cursor-pointer relative group flex flex-col gap-1.5 overflow-hidden active:scale-99 ${isActive
                    ? 'bg-white dark:bg-[#161616] border-neutral-900 dark:border-white/30 shadow-xl dark:shadow-[0_8px_25px_rgba(0,0,0,0.5)] text-neutral-900 dark:text-white'
                    : 'bg-white/40 dark:bg-[#0e0e0e]/50 border-neutral-200/70 dark:border-white/10 hover:border-neutral-350 dark:hover:border-white/20 text-neutral-550 dark:text-white/60 hover:text-neutral-900 dark:hover:text-white'
                  }`}
              >
                {/* Active side indicator glow bar */}
                <div
                  className={`absolute top-0 bottom-0 left-0 w-[4px] bg-gradient-to-b from-indigo-500 to-teal-400 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                />

                <div className="flex items-center justify-between w-full relative z-10 pl-1">
                  <span className="text-[10px] text-neutral-400 dark:text-white/35 tracking-widest font-black uppercase">
                    0{idx + 1} // {exp.shortLabel}
                  </span>
                  <span className={`text-xs font-mono font-bold ${isActive ? 'text-indigo-600 dark:text-teal-400' : 'text-neutral-600 dark:text-white/50'
                    }`}>
                    {exp.period.split(' — ')[0]}
                  </span>
                </div>

                <div className="flex items-center gap-3 relative z-10 pl-1 w-full mt-0.5">
                  {/* Company Logo with border radius matching portfolio theme */}
                  <div className={`w-12 h-12 rounded-xl flex-shrink-0 border flex items-center justify-center overflow-hidden shadow-xs group-hover:border-neutral-350 dark:group-hover:border-white/20 transition-all relative ${
                    exp.company === 'Entel Perú'
                      ? 'bg-white border-neutral-200 p-1.5'
                      : 'bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-[#111] dark:to-[#080808] border-neutral-200 dark:border-white/10'
                  }`}>
                    {exp.logo ? (
                      <img
                        src={exp.logo}
                        alt={exp.company}
                        className={`w-full h-full transition-transform duration-300 group-hover:scale-105 ${
                          exp.company === 'Entel Perú' ? 'object-contain' : 'object-cover'
                        }`}
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                    ) : null}

                    {/* Fallback Monogram */}
                    <div
                      className="absolute inset-0 flex items-center justify-center font-sans font-black text-xs text-neutral-800 dark:text-neutral-200"
                      style={{ display: exp.logo ? 'none' : 'flex' }}
                    >
                      {exp.company === 'Entel Perú' ? (
                        <span className="text-blue-650 dark:text-blue-400">E</span>
                      ) : exp.company === 'Nova Academy' ? (
                        <span className="text-orange-500 dark:text-orange-400">N</span>
                      ) : (
                        <span>{exp.company.charAt(0)}</span>
                      )}
                    </div>
                  </div>

                  <div className="text-left flex-1 min-w-0 space-y-0.5">
                    <span className="font-extrabold tracking-tight text-sm lg:text-[14px] font-sans block text-neutral-900 dark:text-white group-hover:translate-x-0.5 transition-transform leading-tight truncate">
                      {exp.role[language]}
                    </span>
                    <span className="text-xs font-sans text-neutral-500 dark:text-white/45 block font-medium group-hover:translate-x-0.5 transition-transform delay-75 truncate">
                      {exp.company}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Detailed selected experience view panel with custom page sliding transitions */}
      <div className="lg:col-span-8 w-full">
        <div className="text-xs font-mono text-neutral-400 dark:text-white/30 uppercase tracking-[0.2em] font-black mb-1 px-1 flex items-center justify-between">
          <span>{t.roleHeader}</span>
          <span className="text-emerald-500 flex items-center gap-1 text-[11px]">
            <span className="w-1.5 h-1.5 rounded bg-emerald-500 animate-pulse" />
            {t.verified}
          </span>
        </div>

        <div className="relative min-h-[500px] border border-neutral-300/65 dark:border-white/15 rounded-2xl bg-white/95 dark:bg-[#141414]/90 shadow-[0_8px_30px_rgba(0,0,0,0.025)] dark:shadow-[0_15px_45px_rgba(0,0,0,0.65)] backdrop-blur-md p-6 md:p-8 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 flex flex-col justify-between h-full"
            >
              {/* Header section metadata cards */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-neutral-200/50 dark:border-white/10 w-full animate-none">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  {/* Company Logo Detail with border radius matching portfolio theme */}
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex-shrink-0 border flex items-center justify-center overflow-hidden shadow-xs relative ${
                    currentExp.company === 'Entel Perú'
                      ? 'bg-white border-neutral-200 p-2'
                      : 'bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-[#111] dark:to-[#080808] border-neutral-200 dark:border-white/10'
                  }`}>
                    {currentExp.logo ? (
                      <img
                        src={currentExp.logo}
                        alt={currentExp.company}
                        className={`w-full h-full ${
                          currentExp.company === 'Entel Perú' ? 'object-contain' : 'object-cover'
                        }`}
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                    ) : null}

                    {/* Fallback Monogram */}
                    <div
                      className="absolute inset-0 flex items-center justify-center font-sans font-black text-sm md:text-base text-neutral-800 dark:text-neutral-200"
                      style={{ display: currentExp.logo ? 'none' : 'flex' }}
                    >
                      {currentExp.company === 'Entel Perú' ? (
                        <span className="text-blue-650 dark:text-blue-400">E</span>
                      ) : currentExp.company === 'Nova Academy' ? (
                        <span className="text-orange-500 dark:text-orange-400">N</span>
                      ) : (
                        <span>{currentExp.company.charAt(0)}</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`text-[10px] font-mono px-2.5 py-1 rounded font-bold border uppercase tracking-wider ${currentExp.badgeColor}`}>
                        {currentExp.badge[language]}
                      </span>
                      <span className="text-xs font-mono text-neutral-400 dark:text-white/35 flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {currentExp.period}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black font-sans text-neutral-900 dark:text-white leading-tight">
                      {currentExp.role[language]}
                    </h3>
                    <div className="text-sm font-mono text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 font-bold mt-1">
                      <Building2 className="w-4 h-4" />
                      {currentExp.dept[language]}
                    </div>
                  </div>
                </div>

                <div className="text-left md:text-right font-mono text-xs text-neutral-400 dark:text-white/30 flex items-center md:flex-col gap-1.5 md:gap-0">
                  <div className="flex items-center gap-1 justify-end">
                    <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                    {currentExp.location[language]}
                  </div>
                  <div className="text-right text-[9px] font-bold border border-black/5 dark:border-white/5 opacity-40 px-1.5 mt-1 tracking-tighter">NODE_S1 // SLA</div>
                </div>
              </div>

              {/* Main bio narrative & diagram layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-5">
                  <p className="text-sm md:text-base text-neutral-600 dark:text-white/75 leading-relaxed font-sans">
                    {currentExp.desc[language]}
                  </p>

                  {/* Bullet points achievements list */}
                  <div className="space-y-3">
                    <span className="text-xs font-mono text-neutral-400 dark:text-white/40 uppercase tracking-widest font-black block pt-2">
                      {t.achievementsTitle}
                    </span>
                    {currentExp.achievements[language].map((ach, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-neutral-600 dark:text-white/80 font-sans leading-relaxed">
                        <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500/80 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right schematic diagram visualization */}
                <div className="flex flex-col gap-3 justify-center">
                  <span className="text-xs font-mono text-neutral-400 dark:text-white/40 uppercase tracking-widest font-black block md:text-center">
                    REALTIME_GRID
                  </span>
                  {renderSchemaDiagram(currentExp.diagramType)}
                </div>
              </div>

              {/* Key numerical metric badges grid */}
              <div className="pt-5 border-t border-neutral-200/50 dark:border-white/10">
                <span className="text-xs font-mono text-neutral-400 dark:text-white/40 uppercase tracking-widest font-black block mb-3.5">
                  {t.metricsTitle}
                </span>
                <div className="grid grid-cols-3 gap-3">
                  {currentExp.metrics.map((met, idx) => (
                    <div key={idx} className="p-4 border border-neutral-200 dark:border-white/5 rounded-xl bg-neutral-50 dark:bg-black/30 flex flex-col justify-center items-center text-center shadow-xs">
                      <div className="flex items-center gap-1.5 mb-1">
                        {met.icon}
                        <span className="text-lg md:text-2xl font-black font-sans text-neutral-900 dark:text-white tracking-tight">
                          {met.value}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-550 dark:text-white/45 uppercase leading-none block font-bold">
                        {met.label[language]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech stack badge list */}
              <div className="pt-4 mt-2">
                <span className="text-xs font-mono text-neutral-400 dark:text-white/40 uppercase tracking-widest font-black block mb-2.5 flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5" />
                  {t.techTitle}
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentExp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-[10px] font-semibold font-mono bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-md text-neutral-700 dark:text-white/80 hover:bg-neutral-200 dark:hover:bg-white/10 hover:text-black dark:hover:text-white transition-colors cursor-default"
                    >
                      {tech}
                    </span>
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
