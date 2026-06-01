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
}

const projectsList: Project[] = [
  {
    id: 'hyper-automation',
    title: 'HYPER-AUTOMATION HUB',
    sub: 'Workflow orchestration & autonomous logical triggers.',
    techs: ['n8n', 'FastAPI', 'Python', 'Docker'],
    descriptionEs: 'Orquestación federada de flujos masivos de trabajo, integrando colas distribuidas, control recursivo de errores distribuidos y agentes autónomos de IA.',
    descriptionEn: 'Federated orchestration of massive workflow pipelines, integrating distributed event systems, comprehensive error handling, and reactive AI models.',
    demoUrl: '#',
    metrics: [
      { key: 'throughput', value: '450k/d', labelEs: 'Hilos Diarios', labelEn: 'Daily Threads' },
      { key: 'latency', value: '18ms', labelEs: 'Latencia Media', labelEn: 'Avg Latency' },
      { key: 'uptime', value: '99.99%', labelEs: 'SLA Cumplido', labelEn: 'SLA Uptime' },
    ],
  },
  {
    id: 'b2b-analytics',
    title: 'REAL-TIME B2B DASH',
    sub: 'Live operational dashboards with custom socket layers.',
    techs: ['Next.js', 'React', 'D3.js', 'TypeScript'],
    descriptionEs: 'Plataforma corporativa de analíticas en tiempo real alimentada por WebSocket estructurado, con visualizaciones fluidas mediante D3 y carga progresiva híbrida.',
    descriptionEn: 'Corporate real-time metrics tool powered by optimized custom socket streams, with fluid D3-driven render pipelines and progressive chunking.',
    demoUrl: '#',
    metrics: [
      { key: 'fps', value: '144fps', labelEs: 'Frecuencia Render', labelEn: 'Render Freq' },
      { key: 'sockets', value: '10k', labelEs: 'Conex. Simul', labelEn: 'Simul Sockets' },
      { key: 'load', value: '0.4s', labelEs: 'Carga Inicial', labelEn: 'Init Load' },
    ],
  },
  {
    id: 'cluster-db',
    title: 'SENTINEL ENGINE',
    sub: 'Self-correcting relational clustering & scaling query buffers.',
    techs: ['PostgreSQL', 'Python', 'FastAPI', 'TypeScript'],
    descriptionEs: 'Sistema de monitoreo de base de datos relacional con optimizador asíncrono inductivo que previene bloqueos físicos de lectura mediante indexación adaptativa.',
    descriptionEn: 'Relational database observer and query optimizer that intercepts read requests asynchronously to avoid deadlocks via automated index tuning.',
    demoUrl: '#',
    metrics: [
      { key: 'io', value: '5.2GB/s', labelEs: 'Ancho Banda IO', labelEn: 'IO Bandwidth' },
      { key: 'deadlocks', value: '0', labelEs: 'Interbloqueos', labelEn: 'Deadlocks' },
      { key: 'queries', value: '25k/s', labelEs: 'Rendimiento', labelEn: 'Throughput' },
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
                        <div className="relative w-full aspect-video rounded-xl border border-neutral-200/80 dark:border-white/10 bg-neutral-50/90 dark:bg-black/60 overflow-hidden group/player shadow-inner flex flex-col justify-between p-4 my-2">
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
                            <div className="w-10 h-10 shrink-0 aspect-square rounded-full border border-neutral-300 dark:border-white/10 bg-white/90 dark:bg-[#111111]/90 backdrop-blur-md shadow-md flex items-center justify-center text-neutral-800 dark:text-white hover:scale-105 transition-transform duration-300 cursor-pointer">
                              <svg className="w-3.5 h-3.5 fill-current ml-0.5" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                            <div className="text-center px-4">
                              <span className="text-[10px] font-mono tracking-wider text-neutral-850 dark:text-white font-bold block">
                                {t.demoPlaceholder}
                              </span>
                              <span className="text-[8px] font-mono text-neutral-455 dark:text-white/40 block mt-0.5">
                                {t.demoPlaceholderSub}
                              </span>
                            </div>
                          </div>

                          <div className="relative flex items-center gap-2 text-[8px] font-mono text-neutral-400 dark:text-white/40 border-t border-neutral-200/50 dark:border-white/5 pt-2">
                            <span>0:00</span>
                            <div className="flex-1 h-1 rounded bg-neutral-200 dark:bg-white/10 relative overflow-hidden">
                              <div className="absolute top-0 left-0 h-full w-[35%] bg-gradient-to-r from-indigo-500 to-teal-400" />
                            </div>
                            <span>0:45</span>
                          </div>
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
                        <div className="pt-5 pb-2 border-t border-neutral-200 dark:border-white/10 mt-2 flex justify-end">
                          <a
                            href={proj.demoUrl || '#'}
                            className="inline-flex items-center gap-2 px-4 py-2.5 border border-neutral-900 dark:border-white/15 text-white dark:text-black bg-neutral-900 dark:bg-white hover:bg-transparent dark:hover:bg-transparent hover:text-neutral-900 dark:hover:text-white hover:border-neutral-900 dark:hover:border-white rounded-xl transition-all font-mono text-[9px] tracking-widest uppercase font-bold text-center group/demobtn active:scale-98"
                          >
                            <span>{t.demoBtn}</span>
                            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/demobtn:translate-x-0.5 group-hover/demobtn:-translate-y-0.5" />
                          </a>
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

                {/* DEMO MEDIA TEMPLATE PLACEHOLDER */}
                <div className="relative w-full aspect-video rounded-xl border border-neutral-200/80 dark:border-white/10 bg-neutral-50/90 dark:bg-black/60 overflow-hidden group/player shadow-inner flex flex-col justify-between p-4 my-2">
                  {/* Grid background inside player */}
                  <div className="absolute inset-0 bg-[radial-gradient(#808080_1px,transparent_1px)] [background-size:16px_16px] opacity-15 dark:opacity-[0.07] pointer-events-none" />
                  
                  {/* Decorative horizontal bouncing scan line */}
                  <div className="absolute top-0 left-0 w-full h-[1.5px] bg-indigo-500/35 dark:bg-indigo-400/25 animate-[bounce_8s_infinite] pointer-events-none" />

                  {/* Player telemetry bar info */}
                  <div className="relative flex justify-between items-center text-[9px] font-mono uppercase tracking-widest text-neutral-450 dark:text-white/40">
                    <span className="flex items-center gap-1.5 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      STREAM_DEMO: ACTIVE_VIEW_MONITOR
                    </span>
                    <span className="font-bold bg-neutral-200 dark:bg-white/10 px-1.5 py-0.5 rounded text-neutral-500 dark:text-white/60">
                      1080P // DEMO_REF
                    </span>
                  </div>

                  {/* Play circle / prompt overlay */}
                  <div className="relative flex flex-col items-center justify-center gap-2 my-auto py-2">
                    <div className="w-12 h-12 shrink-0 aspect-square rounded-full border border-neutral-300 dark:border-white/10 bg-white/90 dark:bg-[#111111]/90 backdrop-blur-md shadow-md flex items-center justify-center text-neutral-800 dark:text-white hover:scale-105 transition-transform duration-300 cursor-pointer hover:border-neutral-400 dark:hover:border-white/20">
                      <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <div className="text-center px-4">
                      <span className="text-[11px] font-mono tracking-wider text-neutral-800 dark:text-white font-bold block">
                        {t.demoPlaceholder}
                      </span>
                      <span className="text-[9px] font-mono text-neutral-450 dark:text-white/40 block mt-0.5">
                        {t.demoPlaceholderSub}
                      </span>
                    </div>
                  </div>

                  {/* Player bottom interface */}
                  <div className="relative flex items-center gap-3 text-[9px] font-mono text-neutral-400 dark:text-white/40 border-t border-neutral-200/50 dark:border-white/5 pt-3">
                    <span>0:00</span>
                    <div className="flex-1 h-1 rounded bg-neutral-200 dark:bg-white/10 relative overflow-hidden">
                      <div className="absolute top-0 left-0 h-full w-[35%] bg-gradient-to-r from-indigo-500 to-teal-400" />
                    </div>
                    <span>0:45</span>
                  </div>
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
                <div className="pt-6 border-t border-neutral-200 dark:border-white/10 mt-6 flex justify-end">
                  <a
                    href={currentProj.demoUrl || '#'}
                    className="inline-flex items-center gap-2 px-5 py-3.5 border border-neutral-900 dark:border-white/15 text-white dark:text-black bg-neutral-900 dark:bg-white hover:bg-transparent dark:hover:bg-transparent hover:text-neutral-900 dark:hover:text-white hover:border-neutral-900 dark:hover:border-white rounded-xl transition-all font-mono text-xs tracking-widest uppercase font-bold text-center group/demobtn active:scale-98 shadow-sm flex items-center justify-center placeholder-no-referrer pointer-events-auto"
                  >
                    <span>{t.demoBtn}</span>
                    <ArrowUpRight className="h-4.5 w-4.5 transition-transform group-hover/demobtn:translate-x-0.5 group-hover/demobtn:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
