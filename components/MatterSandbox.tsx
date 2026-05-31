'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Engine, Runner, Bodies, Composite, Mouse, MouseConstraint, Events, Query, Body } from 'matter-js';
import { Sparkles, RefreshCw, Zap, Cpu, Terminal, Shield, ArrowUp } from 'lucide-react';

interface TechDetails {
  mastery: number;
  logo: string;
  es: {
    title: string;
    description: string;
    practices: string;
  };
  en: {
    title: string;
    description: string;
    practices: string;
  };
}

const techRegistry: Record<string, TechDetails> = {
  n8n: {
    mastery: 98,
    logo: 'https://static-00.iconduck.com/assets.00/n8n-icon-1024x1024-5gaj0kym.png',
    es: {
      title: 'n8n & Enterprise Automation',
      description: 'Arquitecturas robustas de integraciones distribuidas, subflujos recursivos con control de errores y automatizaciones nativas de IA integrando de manera avanzada bases vectoriales y agentes lógicos autónomos.',
      practices: 'Estructurar manejadores globales de errores, programar reintentos exponenciales asíncronos en peticiones externas y sanitizar payloads masivos para evitar cuellos de botella.',
    },
    en: {
      title: 'n8n & Enterprise Automation',
      description: 'Robust distributed integration architectures, recursive subflows with comprehensive error handling, and native AI automations integrating models through highly structured agent prompts.',
      practices: 'Implement centralized global error catchers, configure exponential back-off retries on complex third-party webhooks, and sanitize massive payloads to prevent memory locks.',
    },
  },
  React: {
    mastery: 95,
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg',
    es: {
      title: 'React / Next.js (App Router)',
      description: 'Interfaces interactivas de alto rendimiento y renderizado híbrido. Dominio absoluto de transiciones, micro-animaciones en el cliente e inyecciones dinámicas.',
      practices: 'Mantener componentes server-side por defecto, encapsular estados pesados en las hojas del árbol y aplicar layouts estables con transiciones fluidas de framer-motion.',
    },
    en: {
      title: 'React / Next.js (App Router)',
      description: 'High-performance interactive interfaces and hybrid rendering. Absolute mastery of transitions, micro-animations on the client, and dynamic code-splitting and asset management.',
      practices: 'Keep components server-side by default, isolate heavy mutational state at leaf levels, and construct stable layouts with fluid framer-motion routes.',
    },
  },
  FastAPI: {
    mastery: 94,
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/fastapi/fastapi-original.svg',
    es: {
      title: 'FastAPI (Python REST)',
      description: 'Microservicios asíncronos de alta disponibilidad, estructuración y validación con Pydantic y autogeneración OpenAPI integrada para desarrollo industrial.',
      practices: 'Asegurar inyección modular de dependencias reutilizables, utilizar middlewares asíncronos optimizados y exprimir la concurrencia nativa para procesamiento dinámico de datos.',
    },
    en: {
      title: 'FastAPI (Python REST)',
      description: 'High-concurrency asynchronous microservices, parsing and validation with Pydantic, and integrated OpenAPI parsing for frictionless enterprise development workflows.',
      practices: 'Enforce modular, reusable dependency injection, design custom middleware with light profiling, and maximize physical threading via clean event loop scheduling.',
    },
  },
  Python: {
    mastery: 96,
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
    es: {
      title: 'Python (Engine)',
      description: 'Desarrollo de scripts analíticos avanzados, procesamiento matemático de colas de datos estructurados e inteligencia conversacional acoplada.',
      practices: 'Aislar entornos lógicos robustos, modularizar operaciones pesadas fuera del hilo principal y aplicar tipado estricto estático mediante anotaciones y validaciones pydantic.',
    },
    en: {
      title: 'Python (Engine)',
      description: 'Advanced logical scripting, mathematical parsing of complex structured queues, and conversational engine synchronization.',
      practices: 'Maintain strict runtime isolating environments, offload processor-heavy loops cleanly, and enforce static annotations and validation steps.',
    },
  },
  TypeScript: {
    mastery: 93,
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg',
    es: {
      title: 'TypeScript (Strict Master)',
      description: 'Mapeado estricto de tipos distribuidos en proyectos Next.js/Node.js, previniendo excepciones operacionales en producción mediante un compilador infalible.',
      practices: 'Evitar terminantemente la declaración redundante de "any", emplear tipos utilitarios avanzados de mapeo y estructurar alias genéricos herméticos.',
    },
    en: {
      title: 'TypeScript (Strict Master)',
      description: 'Large-scale enterprise typing in major Node.js/Next.js systems, arresting runtime exceptions and ensuring robust compile-time contract definitions.',
      practices: 'Enforce strict compiler rules, completely bans arbitrary "any" declarations, and leverage advanced mapped utility typings.',
    },
  },
  'Node.js': {
    mastery: 92,
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg',
    es: {
      title: 'Node.js (Backend Runtime)',
      description: 'Servidores de alto rendimiento impulsados por loops asíncronos y gestión eficiente de hilos distribuidos para APIs de respuesta instantánea.',
      practices: 'Alinear imports nativos ESM nativamente, gestionar buffers asíncronos de lectura continua y monitorizar fugas de memoria en flujos persistentes basándonos en perfiles integrados.',
    },
    en: {
      title: 'Node.js (Backend Runtime)',
      description: 'High-performance backend instances driven by event loops and efficient thread allocations for instant responsive sockets and APIs.',
      practices: 'Adopt standard ES Modules, capture streams cleanly to avoid RAM exhaustion, and analyze memory logs during intense payload loops.',
    },
  },
  PostgreSQL: {
    mastery: 90,
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg',
    es: {
      title: 'PostgreSQL Database',
      description: 'Bases de datos consistentes, optimización fina de consultas mediante análisis de explicaciones, particionado relacional masivo y triggers asíncronos.',
      practices: 'Definir indexados parciales estratégicamente, normalizar rigurosamente con des-normalización justificada y configurar un pool estricto que evite el ahogamiento de conexiones.',
    },
    en: {
      title: 'PostgreSQL Database',
      description: 'ACID-compliant relational systems, fine-tuned querying via explanation profiling, complex data partitioning, and asynchronous trigger actions.',
      practices: 'Construct strategic partial indexes, apply controlled normalization models, and allocate pool caps to prevent physical connection gridlocks.',
    },
  },
  Docker: {
    mastery: 88,
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg',
    es: {
      title: 'Docker Containers',
      description: 'Empaquetado y aislamiento completo de arquitecturas full-stack dinámicas para despliegues inalterables en entornos de nube modernos.',
      practices: 'Estructurar compilaciones multi-etapa optimizando capas de Dockerfile para cache, sanitizar el contexto con ficheros .dockerignore eficientes y anular root privileges.',
    },
    en: {
      title: 'Docker Containers',
      description: 'Full packaging and resource isolating of complex full-stack infrastructures for solid, friction-free modern cloud deployments.',
      practices: 'Leverage multi-stage configurations to minimize build limits, sanitize context bundles using .dockerignore structures, and run containers as non-root.',
    },
  },
};

interface MatterSandboxProps {
  language: 'es' | 'en';
}

interface SandboxBlock {
  id: string;
  label: string;
  w: number;
  h: number;
  x: number;
  y: number;
}

export default function MatterSandbox({ language }: MatterSandboxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Engine | null>(null);
  const runnerRef = useRef<Runner | null>(null);
  const bodiesRef = useRef<Record<string, { body: Body; label: string; w: number; h: number }>>({});
  const animIdRef = useRef<number | null>(null);
  const domCacheRef = useRef<Record<string, HTMLElement | null>>({});
  const [isVisible, setIsVisible] = useState(false);
  const hasInitializedRef = useRef(false);
  
  const [blocks, setBlocks] = useState<SandboxBlock[]>([]);
  const [selectedTech, setSelectedTech] = useState<string>('n8n');
  const [gravityDirection, setGravityDirection] = useState<'down' | 'up'>('down');
  const [blocksInjectedCount, setBlocksInjectedCount] = useState<number>(0);

  const t = {
    es: {
      title: 'Sandbox Interactivo de Tecnologías',
      subtitle: 'Un espacio digital reactivo con simulación física bidimensional (Matter.js). Arrastra, lanza o colisiona los bloques para consultar mi experiencia operativa de alto nivel.',
      btnInject: 'Inyectar Bloque',
      btnGravity: 'Invertir Gravedad',
      btnReset: 'Reiniciar Escenario',
      telemetryTitle: 'Métricas de Telemetría Técnica',
      mastery: 'Nivel Tecnológico',
      practices: 'Mejores Prácticas Operacionales',
      emptySelect: 'Haz clic o arrastra un bloque para monitorizar estadísticas físicas en tiempo real.',
      promptSelect: 'Selecciona una tecnología abajo',
      gravityState: 'Estado gravedad',
      blocksCount: 'Bloques físicos',
    },
    en: {
      title: 'Interactive Technology Sandbox',
      subtitle: 'A reactive playground utilizing physical 2D equations (Matter.js). Drag, toss, or collide blocks to inspect my operational metrics and tech telemetry.',
      btnInject: 'Inject Block',
      btnGravity: 'Invert Gravity',
      btnReset: 'Reset Scenario',
      telemetryTitle: 'Technical Telemetry Metrics',
      mastery: 'Technology Expertise',
      practices: 'Operational Best Practices',
      emptySelect: 'Click or drag a block to inspect real-time physical telemetry stats.',
      promptSelect: 'Select a tech block below',
      gravityState: 'Gravity axis',
      blocksCount: 'Physical blocks',
    },
  }[language];

  // Colors based on technology blocks
  const getBlockStyle = (key: string, isSelected: boolean) => {
    if (isSelected) {
      return 'from-indigo-50/95 to-teal-50/95 border-indigo-400/90 dark:from-indigo-950/50 dark:to-teal-950/40 dark:border-indigo-500/80 text-indigo-950 dark:text-teal-50 ring-[2.5px] ring-indigo-500/15 dark:ring-indigo-400/10 shadow-[0_4px_16px_rgba(99,102,241,0.18)] scale-102';
    }
    switch (key) {
      case 'n8n': 
        return 'from-white to-neutral-100/95 border-neutral-300 dark:from-[#111111] dark:to-neutral-900/95 dark:border-neutral-800 text-neutral-850 dark:text-neutral-200 shadow-sm hover:border-indigo-500/40 dark:hover:border-indigo-400/35';
      default: 
        return 'from-white to-neutral-50/95 border-neutral-250 dark:from-[#0d0d0d] dark:to-[#121212]/95 dark:border-neutral-850 text-neutral-800 dark:text-neutral-300 shadow-xs hover:border-indigo-500/30 dark:hover:border-indigo-400/25';
    }
  };

  const getTechLabel = (key: string) => {
    if (key === 'TypeScript') return 'TS';
    if (key === 'PostgreSQL') return 'Postgres';
    return key;
  };

  const getTechLogo = (key: string) => {
    return techRegistry[key]?.logo || '';
  };

  const startSyncLoop = () => {
    const loop = () => {
      animIdRef.current = requestAnimationFrame(loop);
      const items = bodiesRef.current;
      for (const key in items) {
        const item = items[key];
        if (!domCacheRef.current[key]) {
          domCacheRef.current[key] = document.getElementById(`phys-block-${key}`);
        }
        const el = domCacheRef.current[key];
        if (el) {
          const { x, y } = item.body.position;
          const angle = item.body.angle;
          el.style.transform = `translate3d(${Math.round(x - item.w / 2)}px, ${Math.round(y - item.h / 2)}px, 0) rotate(${angle}rad)`;
        }
      }
    };
    loop();
  };

  const pausePhysics = () => {
    if (runnerRef.current) Runner.stop(runnerRef.current);
    if (animIdRef.current) {
      cancelAnimationFrame(animIdRef.current);
      animIdRef.current = null;
    }
  };

  const resumePhysics = () => {
    if (!runnerRef.current || !engineRef.current) return;
    Runner.run(runnerRef.current, engineRef.current);
    startSyncLoop();
  };

  const initPhysics = () => {
    if (!containerRef.current || !canvasRef.current) return;

    // Clean up existing animation and DOM cache
    domCacheRef.current = {};
    if (animIdRef.current) {
      cancelAnimationFrame(animIdRef.current);
      animIdRef.current = null;
    }

    // Clean up existing physics engine if any
    if (engineRef.current) {
      Engine.clear(engineRef.current);
    }
    if (runnerRef.current) {
      Runner.stop(runnerRef.current);
    }

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 450;

    // Align canvas resolution with logical dimensions to prevent dragging and click scaling issues
    canvasRef.current.width = width;
    canvasRef.current.height = height;

    // 1. ENGINE
    const engine = Engine.create({
      gravity: { y: 0.85, x: 0 },
    });
    engineRef.current = engine;

    // 2. SCENARIO BOUNDARIES (Walls, Ground, Ceiling)
    const thickness = 60;
    const ground = Bodies.rectangle(width / 2, height + thickness / 2 - 2, width * 2, thickness, {
      isStatic: true,
      restitution: 0.5,
      friction: 0.1,
      label: 'ground'
    });
    const leftWall = Bodies.rectangle(-thickness / 2 + 1, height / 2, thickness, height * 2, {
      isStatic: true,
      restitution: 0.5,
      friction: 0.1,
      label: 'leftWall'
    });
    const rightWall = Bodies.rectangle(width + thickness / 2 - 1, height / 2, thickness, height * 2, {
      isStatic: true,
      restitution: 0.5,
      friction: 0.1,
      label: 'rightWall'
    });
    const ceiling = Bodies.rectangle(width / 2, -thickness / 2 + 2, width * 2, thickness, {
      isStatic: true,
      restitution: 0.5,
      friction: 0.1,
      label: 'ceiling'
    });

    Composite.add(engine.world, [ground, leftWall, rightWall, ceiling]);

    // 3. INITIAL BLOCKS
    const techs = Object.keys(techRegistry);
    const newBodiesList: Record<string, { body: Body; label: string; w: number; h: number }> = {};
    const renderingBlocksList: SandboxBlock[] = [];

    techs.forEach((techKey, index) => {
      const blockWidth = Math.max(105, techKey.length * 11 + 45);
      const blockHeight = 44;
      
      const x = width * 0.15 + (index * ((width * 0.7) / techs.length)) + (Math.random() * 12 - 6);
      const y = 80 + index * 30 + (Math.random() * 10);

      const body = Bodies.rectangle(x, y, blockWidth, blockHeight, {
        restitution: 0.75,
        friction: 0.05,
        frictionAir: 0.015,
        label: techKey,
        angle: (Math.random() - 0.5) * 0.4,
      });

      newBodiesList[techKey] = { body, label: techKey, w: blockWidth, h: blockHeight };
      renderingBlocksList.push({ id: techKey, label: techKey, w: blockWidth, h: blockHeight, x, y });
      Composite.add(engine.world, body);
    });

    bodiesRef.current = newBodiesList;
    setBlocks(renderingBlocksList);
    setBlocksInjectedCount(techs.length);

    // 4. MOUSE CONSTRAINT DRAGGING
    const mouse = Mouse.create(canvasRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });

    Composite.add(engine.world, mouseConstraint);

    // 5. SELECTION VIA CLICK ON CANVAS
    Events.on(mouseConstraint, 'mousedown', (event) => {
      const mousePos = event.mouse.position;
      const activeBodies = Object.values(bodiesRef.current).map(item => item.body);
      
      // 1. Precise SAT check first (takes exact rotation and dimensions into account)
      const clicked = Query.point(activeBodies, mousePos);
      if (clicked.length > 0) {
        const clickedBody = clicked[0];
        const matchedItem = Object.values(bodiesRef.current).find(item => item.body === clickedBody);
        if (matchedItem) {
          setSelectedTech(matchedItem.label);
          return;
        }
      }

      // 2. Fallback distance-based checking for "near-misses"
      // Finds the absolute closest item to the mouse coordinate, preventing random loop-order overlaps
      let closestItem = null;
      let minDistance = Infinity;
      const items = Object.values(bodiesRef.current);

      for (const item of items) {
        const { x, y } = item.body.position;
        const dx = mousePos.x - x;
        const dy = mousePos.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Maximum tolerable range: half the block width/height plus a safe padding offset of 15px
        const maxThreshold = Math.max(item.w, item.h) / 2 + 15;
        if (distance < maxThreshold && distance < minDistance) {
          minDistance = distance;
          closestItem = item;
        }
      }

      if (closestItem) {
        setSelectedTech(closestItem.label);
      }
    });

    // 6. RUNNER & LOOP
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    // Start sync loop using cached DOM refs (avoids getElementById per frame)
    startSyncLoop();
  };

  // IntersectionObserver: only run physics when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1, rootMargin: '200px' }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Initialize / pause / resume physics based on visibility
  useEffect(() => {
    if (isVisible && !hasInitializedRef.current) {
      const timer = setTimeout(() => {
        initPhysics();
        hasInitializedRef.current = true;
      }, 100);
      return () => clearTimeout(timer);
    } else if (isVisible && hasInitializedRef.current) {
      resumePhysics();
    } else if (!isVisible && hasInitializedRef.current) {
      pausePhysics();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  // Debounced resize handler
  useEffect(() => {
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (hasInitializedRef.current && isVisible) {
          initPhysics();
        }
      }, 300);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      pausePhysics();
      if (engineRef.current) Engine.clear(engineRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const injectBlock = () => {
    if (!engineRef.current || !containerRef.current) return;
    const engine = engineRef.current;
    const width = containerRef.current.clientWidth;

    const extraTechs = ['n8n', 'React', 'FastAPI', 'Python', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'];
    const randomTech = extraTechs[Math.floor(Math.random() * extraTechs.length)];
    const id = `${randomTech}-${Date.now()}`;
    
    const blockWidth = Math.max(105, randomTech.length * 11 + 45);
    const blockHeight = 44;
    const x = Math.random() * (width - 120) + 60;
    const y = 35;

    const body = Bodies.rectangle(x, y, blockWidth, blockHeight, {
      restitution: 0.7,
      friction: 0.05,
      frictionAir: 0.015,
      label: randomTech,
      angle: (Math.random() - 0.5) * 0.5,
    });

    bodiesRef.current[id] = { body, label: randomTech, w: blockWidth, h: blockHeight };
    Composite.add(engine.world, body);
    
    setBlocks(prev => [...prev, { id, label: randomTech, w: blockWidth, h: blockHeight, x, y }]);
    setBlocksInjectedCount(prev => prev + 1);
  };

  const toggleGravity = () => {
    if (!engineRef.current) return;
    const newGravity = gravityDirection === 'down' ? 'up' : 'down';
    engineRef.current.gravity.y = newGravity === 'down' ? 0.85 : -0.85;
    setGravityDirection(newGravity);
  };

  const resetScenario = () => {
    initPhysics();
    setGravityDirection('down');
  };

  const currentTechData = techRegistry[selectedTech];

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 my-12" id="sandbox-section">
      <div className="lg:col-span-8 flex flex-col glassmorphism border border-neutral-300/65 dark:border-neutral-800/50 rounded-2xl overflow-hidden bg-white/90 dark:bg-black/40 shadow-[0_8px_30px_rgba(0,0,0,0.025)] backdrop-blur-xl h-[520px]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200/50 dark:border-neutral-800/50 bg-neutral-100/30 dark:bg-neutral-900/40">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-sm font-semibold tracking-wide text-neutral-800 dark:text-neutral-200 uppercase font-mono">
              matter_physics_instance v5.0
            </h3>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-neutral-500">
            <span>{t.gravityState}: <b className="text-neutral-700 dark:text-neutral-300">{gravityDirection.toUpperCase()}</b></span>
            <span>{t.blocksCount}: <b className="text-neutral-700 dark:text-neutral-300">{blocksInjectedCount}</b></span>
          </div>
        </div>

        <div ref={containerRef} className="flex-1 w-full h-full relative overflow-hidden select-none cursor-grab active:cursor-grabbing">
          {blocks.map((item) => {
            const isSelected = item.label === selectedTech;
            const logoUrl = getTechLogo(item.label);
            return (
              <div
                key={item.id}
                id={`phys-block-${item.id}`}
                className={`absolute left-0 top-0 select-none flex items-center justify-center border rounded-lg px-3 py-2 bg-gradient-to-b backdrop-blur-md pointer-events-none transition-[box-shadow,border-color,background-color] duration-150 antialiased subpixel-antialiased ${getBlockStyle(item.label, isSelected)}`}
                style={{
                  width: item.w,
                  height: item.h,
                  transformOrigin: 'center center',
                  transform: `translate3d(${Math.round(item.x - item.w / 2)}px, ${Math.round(item.y - item.h / 2)}px, 0)`,
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                  WebkitFontSmoothing: 'antialiased',
                }}
              >
                {logoUrl && (
                  <img
                    src={logoUrl}
                    alt={`${item.label} logo`}
                    className="w-4 h-4 mr-1.5 object-contain select-none pointer-events-none flex-shrink-0 filter dark:brightness-110"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                    }}
                  />
                )}
                <span className="truncate leading-none tracking-tight font-sans font-bold text-[11px]">
                  {getTechLabel(item.label)}
                </span>
              </div>
            );
          })}

          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full z-10 bg-transparent pointer-events-auto"
            style={{ touchAction: 'pan-y' }}
          />
        </div>

        <div className="px-6 py-4 border-t border-neutral-200/50 dark:border-neutral-800/50 flex flex-wrap gap-3 items-center justify-between bg-neutral-100/20 dark:bg-neutral-900/20">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={injectBlock}
              className="px-4 py-2 border border-neutral-200 dark:border-neutral-850 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-800 dark:text-neutral-200 text-xs font-mono rounded-lg flex items-center gap-2 transition-all cursor-pointer shadow-sm active:scale-98"
            >
              <Sparkles className="h-3.5 w-3.5 text-neutral-500" />
              {t.btnInject}
            </button>
            <button
              onClick={toggleGravity}
              className="px-4 py-2 border border-neutral-200 dark:border-neutral-850 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-800 dark:text-neutral-200 text-xs font-mono rounded-lg flex items-center gap-2 transition-all cursor-pointer shadow-sm active:scale-98"
            >
              <ArrowUp className={`h-3.5 w-3.5 text-neutral-500 transition-transform duration-300 ${gravityDirection === 'up' ? 'rotate-180' : ''}`} />
              {t.btnGravity}
            </button>
          </div>
          <button
            onClick={resetScenario}
            className="px-4 py-2 hover:bg-neutral-100 dark:hover:bg-slate-900 text-neutral-500 dark:text-neutral-400 text-xs font-mono rounded-lg flex items-center gap-2 transition-all cursor-pointer active:scale-98"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            {t.btnReset}
          </button>
        </div>
      </div>

      <div className="lg:col-span-4 flex flex-col glassmorphism border border-neutral-300/65 dark:border-neutral-800/50 bg-white/90 dark:bg-black/40 shadow-[0_8px_30px_rgba(0,0,0,0.025)] backdrop-blur-xl rounded-2xl h-[520px] overflow-hidden">
        <div className="px-6 py-5 border-b border-neutral-200/50 dark:border-neutral-800/50">
          <h3 className="text-sm font-semibold tracking-wider font-mono uppercase text-neutral-900 dark:text-white flex items-center gap-2">
            <Cpu className="h-4 w-4 text-neutral-500" />
            {t.telemetryTitle}
          </h3>
          <p className="text-[11px] font-mono text-neutral-400 mt-1">STATUS: BUFFER_OK</p>
        </div>

        {currentTechData ? (
          <div className="p-6 flex-1 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-xl border border-indigo-500/20 dark:border-teal-400/15 bg-gradient-to-br from-indigo-500/5 to-teal-500/5 flex items-center justify-center w-11 h-11 shadow-xs">
                  {currentTechData.logo ? (
                    <img
                      src={currentTechData.logo}
                      alt={selectedTech}
                      className="w-6 h-6 object-contain filter dark:brightness-110 select-none"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="font-mono text-xs font-bold text-neutral-850 dark:text-neutral-100">
                      {selectedTech === 'TypeScript' ? 'TS' : selectedTech === 'PostgreSQL' ? 'PG' : selectedTech}
                    </span>
                  )}
                </span>
                <div>
                  <h4 className="text-base font-bold text-neutral-900 dark:text-white font-mono">
                    {currentTechData[language].title}
                  </h4>
                  <p className="text-[10px] text-neutral-400 font-mono">MASTER_DB: DEV_MAIN</p>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-neutral-500">{t.mastery}</span>
                  <span className="font-bold text-neutral-950 dark:text-neutral-100">{currentTechData.mastery}%</span>
                </div>
                <div className="h-2 w-full bg-neutral-200/60 dark:bg-neutral-850 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-teal-400 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${currentTechData.mastery}%` }}
                  />
                </div>
              </div>

              <div className="mt-5 border border-neutral-200/50 dark:border-neutral-850 bg-neutral-50/50 dark:bg-neutral-950/40 rounded-xl p-4">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-2">
                  <Terminal className="h-3 w-3" />
                  Telemetry Log
                </div>
                <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 font-sans">
                  {currentTechData[language].description}
                </p>
              </div>

              <div className="mt-5">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-2">
                  <Shield className="h-3 w-3 text-neutral-500" />
                  {t.practices}
                </div>
                <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400 font-mono italic">
                  &gt; {currentTechData[language].practices}
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-dashed border-neutral-200 dark:border-neutral-850 mt-auto flex items-center gap-2 text-[10px] font-mono text-neutral-400">
              <Zap className="h-3.5 w-3.5 text-neutral-500" />
              <span>REF_ID: MD_0x{selectedTech.charCodeAt(0).toString(16)}</span>
            </div>
          </div>
        ) : (
          <div className="p-6 flex-1 flex flex-col justify-center items-center text-center">
            <Cpu className="h-8 w-8 text-neutral-300 dark:text-neutral-700 animate-pulse mb-3" />
            <p className="text-xs font-mono text-neutral-400 max-w-[200px]">
              {t.emptySelect}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
