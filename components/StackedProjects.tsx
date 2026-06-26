'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Award, Zap, Activity, GitBranch } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  sub: string;
  techs: string[];
  metrics: { key: string; value: string; labelEs: string; labelEn: string }[];
  descriptionEs: string;
  descriptionEn: string;
  demoUrl?: string;
  repoUrl?: string;
  previewUrl?: string;
}

const projectsList: Project[] = [
  {
    id: 'tocaaqui',
    title: 'TOCAAQUÍ',
    sub: 'Plataforma que conecta músicos con espacios culturales.',
    techs: ['Vue.js', 'JavaScript', 'C#', 'MySQL', 'REST API'],
    descriptionEs: 'Aplicación web que conecta músicos independientes con espacios culturales disponibles para presentaciones. Desarrollada con arquitectura Domain-Driven Design (DDD) en equipo de 5 personas.',
    descriptionEn: 'Web platform connecting independent musicians with cultural venues available for live performances. Built with Domain-Driven Design (DDD) architecture in a 5-person team.',
    demoUrl: 'https://1asi0730-2510-4370-g1-tocaaqui.github.io/Landing-Page/',
    repoUrl: 'https://github.com/1ASI0730-2510-4370-G1-TocaAqui',
    previewUrl: 'https://www.youtube.com/embed/M2A_4JCBG9s',
    metrics: [
      { key: 'throughput', value: '5', labelEs: 'Integrantes', labelEn: 'Team Members' },
      { key: 'deadlocks', value: 'DDD', labelEs: 'Arquitectura', labelEn: 'Architecture' },
      { key: 'uptime', value: '3', labelEs: 'Bounded Ctx.', labelEn: 'Bounded Ctx.' },
    ],
  },
  {
    id: 'inmoshare',
    title: 'INMOSHARE',
    sub: 'Gestión inmobiliaria con pagos compartidos entre inquilinos.',
    techs: ['Angular', 'TypeScript', 'Spring Boot', 'Java', 'MySQL'],
    descriptionEs: 'Plataforma de gestión de propiedades inmobiliarias que permite a múltiples inquilinos dividir y administrar pagos de forma colaborativa. Full-stack con backend REST en Java Spring Boot.',
    descriptionEn: 'Real estate management platform enabling multiple tenants to split and manage shared payments collaboratively. Full-stack application with a Java Spring Boot REST backend.',
    repoUrl: 'https://github.com/Azsher',
    metrics: [
      { key: 'throughput', value: '5', labelEs: 'Integrantes', labelEn: 'Team Members' },
      { key: 'deadlocks', value: 'JWT', labelEs: 'Autenticación', labelEn: 'Auth' },
      { key: 'uptime', value: '2024', labelEs: 'Año', labelEn: 'Year' },
    ],
  },
];

interface StackedProjectsProps {
  language: 'es' | 'en';
  isDark?: boolean;
}

export default function StackedProjects({ language, isDark = true }: StackedProjectsProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const t = {
    es: {
      title: 'Proyectos Destacados',
      sub: 'Arquitecturas e Integraciones de Alta Disponibilidad',
      tags: 'PILA TECNOLÓGICA',
      metrics: 'MÉTRICAS DE RENDIMIENTO',
      emptyMetrics: 'No hay telemetría disponible.',
      viewArchive: 'Ver Archivo Completo',
      telemetryStatus: 'SLA de Producción Activo',
      demoBtn: 'Ver Demo',
      demoPlaceholder: 'SISTEMA DE PREVISUALIZACIÓN ACTIVA',
      demoPlaceholderSub: 'Reemplazar por demo.gif o demo.mp4 aquí',
    },
    en: {
      title: 'Featured Works',
      sub: 'High-Availability Architectures & Integrations',
      tags: 'TECHNOLOGY STACK',
      metrics: 'OPERATIONAL TELEMETRY METRICS',
      emptyMetrics: 'No telemetry metrics registered.',
      viewArchive: 'View Full Archive',
      telemetryStatus: 'Production SLA Active',
      demoBtn: 'Watch Demo',
      demoPlaceholder: 'ACTIVE PREVIEW MONITOR',
      demoPlaceholderSub: 'Replace with demo.gif or demo.mp4 here',
    },
  }[language];

  const currentProj = projectsList[activeIdx] || projectsList[0];

  return (
    <div className="w-full relative z-10 my-16" id="projects-section">
      {/* SECTION HEADER */}
      <div className="mb-10 max-w-2xl relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-3 rounded bg-gradient-to-b from-indigo-500 to-teal-400" />
          <span className="text-xs font-mono tracking-widest text-neutral-500 dark:text-white/40 uppercase block">
            {t.sub}
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black font-sans tracking-tight text-neutral-900 dark:text-white m-0">
          {t.title}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: LIST INDEX CARDS */}
        <div className="lg:col-span-5 space-y-3.5">
          {projectsList.map((proj, idx) => {
            const isActive = idx === activeIdx;
            return (
              <div
                key={proj.id}
                className={`w-full border rounded-xl transition-all duration-350 backdrop-blur-md relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.015)] ${
                  isActive
                    ? 'bg-white/95 dark:bg-[#161616] border-neutral-900 text-neutral-900 dark:border-white/30 dark:text-white ring-1 ring-neutral-900/10 dark:ring-white/20'
                    : 'bg-white/40 dark:bg-[#0e0e0e]/50 border-neutral-300/65 dark:border-white/10 text-neutral-550 dark:text-white/50 hover:border-neutral-400 dark:hover:border-white/20 hover:text-neutral-900 dark:hover:text-white/80'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-indigo-500 to-teal-400" />
                )}
                
                <button
                  onClick={() => {
                    setActiveIdx(prev => {
                      if (prev === idx) {
                        const isMobileViewport = window.innerWidth < 1024;
                        return isMobileViewport ? -1 : idx;
                      }
                      return idx;
                    });
                  }}
                  className="w-full text-left p-6 cursor-pointer flex justify-between items-center group relative overflow-hidden active:scale-99 focus:outline-hidden"
                >
                  <div>
                    <div className="text-xs font-mono text-neutral-400 dark:text-white/40 mb-1 tracking-widest uppercase flex items-center gap-1.5 font-bold">
                      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-gradient-to-tr from-indigo-500 to-teal-400 animate-pulse' : 'bg-transparent border border-neutral-400 dark:border-white/40'}`} />
                      0{idx + 1} {"//"} ID_{proj.id.toUpperCase()}
                    </div>
                    <h3 className="text-lg font-black tracking-wider font-sans text-neutral-900 dark:text-white leading-snug">{proj.title}</h3>
                    <p className="text-sm font-mono text-neutral-405 dark:text-white/40 truncate max-w-[240px] mt-1.5">{proj.sub}</p>
                  </div>
                  <div className={`p-3 rounded-lg border flex items-center justify-center transition-all ${
                    isActive ? 'bg-neutral-900 border-neutral-900 text-white dark:bg-white dark:border-white dark:text-black' : 'border-neutral-200 dark:border-white/10 group-hover:border-neutral-400 dark:group-hover:border-white/30 text-neutral-400 dark:text-white/40 group-hover:text-neutral-900 dark:group-hover:text-white'
                  }`}>
                    <ArrowUpRight className="h-4.5 w-4.5" />
                  </div>
                </button>

                {/* Mobile inline accordion details */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="block lg:hidden overflow-hidden"
                    >
                      <div className="px-6 pb-10 pt-2 border-t border-neutral-200/50 dark:border-white/10 space-y-5">
                        {/* Description */}
                        <p className="text-xs md:text-sm text-neutral-700 dark:text-white/80 leading-relaxed font-sans mt-3">
                          {language === 'es' ? proj.descriptionEs : proj.descriptionEn}
                        </p>

                        {/* Demo Player */}
                        <div className="relative w-full aspect-video rounded-xl border border-neutral-200/80 dark:border-white/10 overflow-hidden shadow-inner my-2">
                          {proj.previewUrl ? (
                            <iframe
                              src={proj.previewUrl}
                              title={proj.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="absolute inset-0 w-full h-full"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-neutral-50/90 dark:bg-black/60 flex flex-col justify-between p-4">
                              <div className="absolute inset-0 bg-[radial-gradient(#808080_1px,transparent_1px)] [background-size:16px_16px] opacity-15 dark:opacity-[0.07] pointer-events-none" />
                              <div className="absolute top-0 left-0 w-full h-[1.5px] bg-indigo-500/35 dark:bg-indigo-400/25 animate-[bounce_8s_infinite] pointer-events-none" />
                              <div className="relative flex justify-between items-center text-[9px] font-mono uppercase tracking-widest text-neutral-450 dark:text-white/40">
                                <span className="flex items-center gap-1.5 font-bold">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                  STREAM_DEMO: ACTIVE_VIEW_MONITOR
                                </span>
                                <span className="font-bold bg-neutral-200 dark:bg-white/10 px-1.5 py-0.5 rounded text-neutral-500 dark:text-white/60">
                                  1080P // DEMO_REF
                                </span>
                              </div>
                              <div className="relative flex flex-col items-center justify-center gap-2 my-auto py-2">
                                <div className="w-10 h-10 shrink-0 rounded-full border border-neutral-300 dark:border-white/10 bg-white/90 dark:bg-[#111111]/90 backdrop-blur-md shadow-md flex items-center justify-center text-neutral-800 dark:text-white">
                                  <svg className="w-3.5 h-3.5 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                </div>
                                <span className="text-[10px] font-mono tracking-wider text-neutral-850 dark:text-white font-bold block text-center">
                                  {t.demoPlaceholder}
                                </span>
                                <span className="text-[8px] font-mono text-neutral-455 dark:text-white/40 block mt-0.5 text-center">
                                  {t.demoPlaceholderSub}
                                </span>
                              </div>
                              <div className="relative flex items-center gap-2 text-[8px] font-mono text-neutral-400 dark:text-white/40 border-t border-neutral-200/50 dark:border-white/5 pt-2">
                                <span>0:00</span>
                                <div className="flex-1 h-1 rounded bg-neutral-200 dark:bg-white/10 relative overflow-hidden">
                                  <div className="absolute top-0 left-0 h-full w-[35%] bg-gradient-to-r from-indigo-500 to-teal-400" />
                                </div>
                                <span>0:45</span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Tech Stack */}
                        <div className="space-y-2">
                          <span className="text-[9px] font-mono text-neutral-400 dark:text-white/40 block uppercase tracking-widest">
                            {"//"} {t.tags}
                          </span>
                          <div className="flex flex-wrap gap-1.5 text-xs font-mono">
                            {proj.techs.map((tech) => (
                              <span
                                key={tech}
                                className="px-2.5 py-1 border border-neutral-200/60 dark:border-white/10 bg-neutral-50/50 dark:bg-white/5 text-neutral-700 dark:text-white/80 rounded font-semibold text-[9px]"
                              >
                                {tech.toUpperCase()}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Telemetry Metrics */}
                        <div className="border-t border-dashed border-neutral-200 dark:border-white/10 pt-4 mt-2 space-y-2">
                          <span className="text-[9px] font-mono text-neutral-400 dark:text-white/40 block uppercase tracking-widest">
                            {"//"} {t.metrics}
                          </span>
                          <div className="grid grid-cols-3 gap-2">
                            {proj.metrics.map((met) => (
                              <div
                                key={met.key}
                                className="p-3 rounded-xl bg-neutral-50/50 dark:bg-white/5 border border-neutral-200/60 dark:border-white/10 text-left font-mono relative overflow-hidden"
                              >
                                <div className="absolute right-2 top-2 text-neutral-350 dark:text-white/20">
                                  {met.key === 'throughput' || met.key === 'fps' || met.key === 'io' ? (
                                    <Zap className="h-3 w-3" />
                                  ) : met.key === 'latency' || met.key === 'sockets' || met.key === 'deadlocks' ? (
                                    <GitBranch className="h-3 w-3" />
                                  ) : (
                                    <Award className="h-3 w-3" />
                                  )}
                                </div>
                                <span className="text-[9px] text-neutral-400 dark:text-white/40 block uppercase tracking-wider mb-0.5 font-bold">
                                  {language === 'es' ? met.labelEs : met.labelEn}
                                </span>
                                <span className="text-sm font-black text-neutral-900 dark:text-white block tracking-tight">
                                  {met.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Watch Demo Link */}
                        <div className="pt-5 pb-2 border-t border-neutral-200 dark:border-white/10 mt-2 flex justify-end gap-2">
                          {proj.repoUrl && (
                            <a
                              href={proj.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-4 py-2.5 border border-neutral-300 dark:border-white/10 text-neutral-800 dark:text-white bg-transparent hover:border-neutral-500 dark:hover:border-white/30 rounded-xl transition-all font-mono text-[9px] tracking-widest uppercase font-bold active:scale-98"
                            >
                              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                              </svg>
                              GitHub
                            </a>
                          )}
                          {proj.demoUrl && proj.demoUrl !== '#' && (
                            <a
                              href={proj.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2.5 border border-neutral-900 dark:border-white/15 text-white dark:text-black bg-neutral-900 dark:bg-white hover:bg-transparent dark:hover:bg-transparent hover:text-neutral-900 dark:hover:text-white hover:border-neutral-900 dark:hover:border-white rounded-xl transition-all font-mono text-[9px] tracking-widest uppercase font-bold text-center group/demobtn active:scale-98"
                            >
                              <span>{t.demoBtn}</span>
                              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/demobtn:translate-x-0.5 group-hover/demobtn:-translate-y-0.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          <div className="pt-4">
            <a
              href="#contact-section"
              className="group flex items-center justify-center gap-2.5 p-4.5 border border-neutral-200 dark:border-white/10 hover:border-neutral-950 dark:hover:border-white text-neutral-700 dark:text-white rounded-full bg-transparent hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all font-mono text-xs tracking-widest uppercase font-bold text-center"
            >
              {t.viewArchive} <ArrowUpRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: ACTIVE PROJECT INTERACTIVE DETAILS TELEMETRY */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="p-6 md:p-8 bg-white/95 dark:bg-[#141414]/90 border border-neutral-300/65 dark:border-white/15 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.025)] dark:shadow-[0_15px_45px_rgba(0,0,0,0.65)] backdrop-blur-xl relative overflow-hidden transition-all"
              style={{
                backgroundImage: isDark 
                  ? 'radial-gradient(circle at top right, rgba(99,102,241,0.08) 0%, rgba(20,184,166,0.03) 50%, transparent 100%)' 
                  : 'radial-gradient(circle at top right, rgba(99,102,241,0.04) 0%, rgba(20,184,166,0.02) 50%, transparent 100%)',
              }}
            >
              <div className="flex justify-between items-start border-b border-neutral-200 dark:border-white/10 pb-5 mb-6">
                <div>
                  <div className="flex items-center gap-2 border border-neutral-200 dark:border-white/10 rounded-full px-3 py-1 text-xs font-mono text-neutral-500 dark:text-white/60 tracking-wider bg-neutral-50 dark:bg-white/5 uppercase inline-flex mb-3 font-bold">
                    <Activity className="h-4.5 w-4.5 text-indigo-500 dark:text-indigo-400 animate-pulse" />
                    {t.telemetryStatus}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white uppercase font-sans">
                    {currentProj.title}
                  </h3>
                </div>
                <div className="text-right text-xs font-mono text-neutral-400 dark:text-white/30 hidden sm:block">
                  <div>SYS_ENG_PORTF // RES_ACTIVE</div>
                  <div>ID_NUM: {currentProj.id.toUpperCase()}</div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Description Block */}
                <p className="text-sm md:text-base text-neutral-700 dark:text-white/80 leading-relaxed font-sans mt-2">
                  {language === 'es' ? currentProj.descriptionEs : currentProj.descriptionEn}
                </p>

                {/* DEMO MEDIA */}
                <div className="relative w-full aspect-video rounded-xl border border-neutral-200/80 dark:border-white/10 overflow-hidden shadow-inner my-2">
                  {currentProj.previewUrl ? (
                    <iframe
                      src={currentProj.previewUrl}
                      title={currentProj.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-neutral-50/90 dark:bg-black/60 flex flex-col justify-between p-4">
                      <div className="absolute inset-0 bg-[radial-gradient(#808080_1px,transparent_1px)] [background-size:16px_16px] opacity-15 dark:opacity-[0.07] pointer-events-none" />
                      <div className="absolute top-0 left-0 w-full h-[1.5px] bg-indigo-500/35 dark:bg-indigo-400/25 animate-[bounce_8s_infinite] pointer-events-none" />
                      <div className="relative flex justify-between items-center text-[9px] font-mono uppercase tracking-widest text-neutral-450 dark:text-white/40">
                        <span className="flex items-center gap-1.5 font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          STREAM_DEMO: ACTIVE_VIEW_MONITOR
                        </span>
                        <span className="font-bold bg-neutral-200 dark:bg-white/10 px-1.5 py-0.5 rounded text-neutral-500 dark:text-white/60">
                          1080P // DEMO_REF
                        </span>
                      </div>
                      <div className="relative flex flex-col items-center justify-center gap-2 my-auto py-2">
                        <div className="w-12 h-12 shrink-0 rounded-full border border-neutral-300 dark:border-white/10 bg-white/90 dark:bg-[#111111]/90 backdrop-blur-md shadow-md flex items-center justify-center text-neutral-800 dark:text-white">
                          <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                        <span className="text-[11px] font-mono tracking-wider text-neutral-800 dark:text-white font-bold block text-center">
                          {t.demoPlaceholder}
                        </span>
                        <span className="text-[9px] font-mono text-neutral-450 dark:text-white/40 block text-center">
                          {t.demoPlaceholderSub}
                        </span>
                      </div>
                      <div className="relative flex items-center gap-3 text-[9px] font-mono text-neutral-400 dark:text-white/40 border-t border-neutral-200/50 dark:border-white/5 pt-3">
                        <span>0:00</span>
                        <div className="flex-1 h-1 rounded bg-neutral-200 dark:bg-white/10 relative overflow-hidden">
                          <div className="absolute top-0 left-0 h-full w-[35%] bg-gradient-to-r from-indigo-500 to-teal-400" />
                        </div>
                        <span>0:45</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tech Stack Horizontal List */}
                <div>
                  <span className="text-xs font-mono text-neutral-400 dark:text-white/40 block mb-2.5 uppercase tracking-widest">
                    {"//"} {t.tags}
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs md:text-sm font-mono">
                    {currentProj.techs.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 border border-neutral-200/60 dark:border-white/10 bg-neutral-50/50 dark:bg-white/5 text-neutral-700 dark:text-white/80 rounded hover:border-neutral-400 dark:hover:border-white/30 hover:bg-neutral-100 dark:hover:bg-white/10 transition-all font-semibold"
                      >
                        {tech.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Telemetry Metrics Grid */}
                <div className="border-t border-dashed border-neutral-200 dark:border-white/10 pt-5 mt-6">
                  <span className="text-xs font-mono text-neutral-400 dark:text-white/40 block mb-3 uppercase tracking-widest">
                    {"//"} {t.metrics}
                  </span>
                  <div className="grid grid-cols-3 gap-3">
                    {currentProj.metrics.map((met) => (
                      <div
                        key={met.key}
                        className="p-4 rounded-xl bg-neutral-50/50 dark:bg-white/5 border border-neutral-200/60 dark:border-white/10 text-left font-mono relative overflow-hidden group hover:border-neutral-400 dark:hover:border-white/30 transition-all"
                      >
                        <div className="absolute right-2.5 top-2.5 text-[10px] text-neutral-350 dark:text-white/20 uppercase">
                          {met.key === 'throughput' || met.key === 'fps' || met.key === 'io' ? (
                            <Zap className="h-3.5 w-3.5" />
                          ) : met.key === 'latency' || met.key === 'sockets' || met.key === 'deadlocks' ? (
                            <GitBranch className="h-3.5 w-3.5" />
                          ) : (
                            <Award className="h-3.5 w-3.5" />
                          )}
                        </div>
                        <span className="text-[10px] md:text-[11px] text-neutral-400 dark:text-white/40 block uppercase tracking-wider mb-1 font-bold">
                          {language === 'es' ? met.labelEs : met.labelEn}
                        </span>
                        <span className="text-lg md:text-2xl font-black text-neutral-900 dark:text-white block tracking-tight">
                          {met.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTA: Watch/View Demo Button */}
                <div className="pt-6 border-t border-neutral-200 dark:border-white/10 mt-6 flex justify-end gap-3">
                  {currentProj.repoUrl && (
                    <a
                      href={currentProj.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3.5 border border-neutral-300 dark:border-white/10 text-neutral-800 dark:text-white bg-transparent hover:border-neutral-500 dark:hover:border-white/30 rounded-xl transition-all font-mono text-xs tracking-widest uppercase font-bold text-center active:scale-98"
                    >
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </a>
                  )}
                  {currentProj.demoUrl && currentProj.demoUrl !== '#' && (
                    <a
                      href={currentProj.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3.5 border border-neutral-900 dark:border-white/15 text-white dark:text-black bg-neutral-900 dark:bg-white hover:bg-transparent dark:hover:bg-transparent hover:text-neutral-900 dark:hover:text-white hover:border-neutral-900 dark:hover:border-white rounded-xl transition-all font-mono text-xs tracking-widest uppercase font-bold text-center group/demobtn active:scale-98 shadow-sm pointer-events-auto"
                    >
                      <span>{t.demoBtn}</span>
                      <ArrowUpRight className="h-4.5 w-4.5 transition-transform group-hover/demobtn:translate-x-0.5 group-hover/demobtn:-translate-y-0.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
