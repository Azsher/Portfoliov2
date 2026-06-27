'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Zap, Cpu, Terminal, Shield } from 'lucide-react';
import { useMobile } from '@/hooks/use-mobile';

type MasteryLevel = 'intermedio' | 'avanzado' | 'experto';

interface TechDetails {
  mastery: MasteryLevel;
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
  JavaScript: {
    mastery: 'avanzado',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg',
    es: {
      title: 'JavaScript',
      description: 'Base del desarrollo frontend en Entel y proyectos universitarios. Consumo de APIs REST, manejo de eventos asíncronos y lógica de UI dinámica en la plataforma de inversiones.',
      practices: 'Preferir const/let sobre var, usar async/await para peticiones, modularizar lógica en funciones puras y evitar mutaciones directas del DOM.',
    },
    en: {
      title: 'JavaScript',
      description: 'Foundation of frontend development at Entel and university projects. REST API consumption, async event handling, and dynamic UI logic in the investment platform.',
      practices: 'Prefer const/let over var, use async/await for requests, modularize logic into pure functions, and avoid direct DOM mutations.',
    },
  },
  TypeScript: {
    mastery: 'avanzado',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg',
    es: {
      title: 'TypeScript',
      description: 'Usado en Entel sobre Next.js para tipar componentes, hooks y contratos de API en la plataforma de inversiones. Reduce errores en tiempo de compilación y facilita el trabajo en equipo sobre una base de código compartida.',
      practices: 'Definir interfaces claras para modelos de datos, evitar el uso de "any", aprovechar tipos utilitarios como Partial o Pick para mayor flexibilidad.',
    },
    en: {
      title: 'TypeScript',
      description: 'Used at Entel on top of Next.js to type components, hooks, and API contracts in the investment platform. Reduces compile-time errors and eases collaborative work on a shared codebase.',
      practices: 'Define clear interfaces for data models, avoid "any" types, and leverage utility types like Partial or Pick for flexibility.',
    },
  },
  'Vue.js': {
    mastery: 'avanzado',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg',
    es: {
      title: 'Vue.js',
      description: 'Framework principal en el proyecto universitario TocaAquí, una plataforma de gestión de músicos y espacios culturales. Componentes SFC, Vue Router y comunicación entre componentes con props y emit.',
      practices: 'Separar lógica de negocio en composables reutilizables, usar v-model con moderación y mantener componentes enfocados en una sola responsabilidad.',
    },
    en: {
      title: 'Vue.js',
      description: 'Primary framework in the TocaAquí university project, a platform for managing musicians and cultural venues. SFC components, Vue Router, and component communication via props and emit.',
      practices: 'Extract business logic into reusable composables, use v-model sparingly, and keep components focused on a single responsibility.',
    },
  },
  Angular: {
    mastery: 'intermedio',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/angularjs/angularjs-original.svg',
    es: {
      title: 'Angular',
      description: 'Usado en el proyecto universitario Inmoshare, una plataforma de gestión de inmuebles. Módulos por feature, servicios con inyección de dependencias, reactive forms e integración con Spring Boot via HttpClient.',
      practices: 'Organizar por módulos por feature, usar observables de RxJS para estado asíncrono y separar la lógica HTTP en servicios independientes del componente.',
    },
    en: {
      title: 'Angular',
      description: 'Used in the Inmoshare university project, a property management platform. Feature modules, services with dependency injection, reactive forms, and Spring Boot integration via HttpClient.',
      practices: 'Organize by feature modules, use RxJS observables for async state, and separate HTTP logic into services independent from components.',
    },
  },
  'Next.js': {
    mastery: 'avanzado',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg',
    es: {
      title: 'Next.js',
      description: 'Framework principal en Entel para la plataforma de inversiones. Lideré la migración de Next.js 12 a 16, reduciendo los tiempos de carga de 15s a 1.5s (10x). Implementé nuevos flujos de trabajo y dashboards financieros con datos en tiempo real.',
      practices: 'Usar App Router con componentes server-side por defecto, evitar "use client" innecesario y aprovechar el caché nativo de fetch para reducir llamadas redundantes.',
    },
    en: {
      title: 'Next.js',
      description: 'Primary framework at Entel for the investment platform. Led the migration from Next.js 12 to 16, cutting load times from 15s to 1.5s (10x). Built new internal workflows and real-time financial dashboards.',
      practices: 'Use App Router with server components by default, avoid unnecessary "use client", and leverage native fetch caching to reduce redundant API calls.',
    },
  },
  'C#': {
    mastery: 'intermedio',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg',
    es: {
      title: 'C# / .NET',
      description: 'Backend del proyecto universitario TocaAquí. API RESTful con arquitectura DDD, entidades de dominio, repositorios y servicios de aplicación para la gestión de músicos y espacios culturales.',
      practices: 'Separar capas de dominio, aplicación e infraestructura, usar DTOs para comunicación entre capas y mantener las entidades libres de lógica de persistencia.',
    },
    en: {
      title: 'C# / .NET',
      description: 'Backend for the TocaAquí university project. RESTful API with DDD architecture, domain entities, repositories, and application services for managing musicians and cultural spaces.',
      practices: 'Separate domain, application, and infrastructure layers, use DTOs for inter-layer communication, and keep entities free from persistence logic.',
    },
  },
  'Spring Boot': {
    mastery: 'intermedio',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/spring/spring-original.svg',
    es: {
      title: 'Java / Spring Boot',
      description: 'Backend del proyecto universitario Inmoshare. REST API con Spring MVC, JPA para persistencia en MySQL, autenticación JWT y sistema de pagos compartidos entre múltiples inquilinos.',
      practices: 'Usar @Service y @Repository para separar responsabilidades, validar DTOs con Bean Validation y configurar seguridad con Spring Security de forma granular.',
    },
    en: {
      title: 'Java / Spring Boot',
      description: 'Backend for the Inmoshare university project. REST API with Spring MVC, JPA for MySQL persistence, JWT authentication, and shared payment system across multiple tenants.',
      practices: 'Use @Service and @Repository to separate concerns, validate DTOs with Bean Validation, and configure security granularly with Spring Security.',
    },
  },
  MySQL: {
    mastery: 'avanzado',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg',
    es: {
      title: 'MySQL / SQL',
      description: 'Base de datos principal en los proyectos universitarios TocaAquí e Inmoshare. Diseño de esquemas normalizados, relaciones entre entidades, consultas con JOINs complejos y optimización de índices.',
      practices: 'Normalizar hasta 3NF como mínimo, usar claves foráneas con restricciones adecuadas y evitar consultas N+1 cargando relaciones de forma eficiente.',
    },
    en: {
      title: 'MySQL / SQL',
      description: 'Primary database in the TocaAquí and Inmoshare university projects. Normalized schema design, entity relationships, complex JOIN queries, and index optimization.',
      practices: 'Normalize to at least 3NF, use foreign keys with proper constraints, and avoid N+1 queries by loading relationships efficiently.',
    },
  },
  Django: {
    mastery: 'avanzado',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/django/django-plain.svg',
    es: {
      title: 'Django (Python Backend)',
      description: 'Backend de la plataforma de inversiones en Entel. API REST con Django REST Framework conectada al frontend Next.js. Implementé optimizaciones en la capa de datos que redujeron los tiempos de descarga de reportes Excel de 10s a 3-5s.',
      practices: 'Separar lógica de negocio en servicios fuera de las vistas, usar serializers para validación de entrada y aprovechar el ORM para consultas eficientes evitando queries N+1.',
    },
    en: {
      title: 'Django (Python Backend)',
      description: 'Backend of the investment platform at Entel. REST API with Django REST Framework connected to the Next.js frontend. Implemented data layer optimizations that reduced Excel report download times from 10s to 3-5s.',
      practices: 'Keep business logic in service layers outside views, use serializers for input validation, and leverage the ORM for efficient queries avoiding N+1 patterns.',
    },
  },
  Python: {
    mastery: 'avanzado',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
    es: {
      title: 'Python',
      description: 'Lenguaje del backend en Entel (Django). Implementé mejoras en la capa de datos de la plataforma de inversiones, scripts de procesamiento y optimizaciones de consultas que impactaron directamente en el rendimiento de la plataforma.',
      practices: 'Usar entornos virtuales para aislar dependencias, preferir list comprehensions para transformaciones simples y documentar funciones con type hints.',
    },
    en: {
      title: 'Python',
      description: 'Backend language at Entel (Django). Implemented data layer improvements in the investment platform, processing scripts, and query optimizations that directly impacted platform performance.',
      practices: 'Use virtual environments to isolate dependencies, prefer list comprehensions for simple transforms, and document functions with type hints.',
    },
  },
  n8n: {
    mastery: 'avanzado',
    logo: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/n8n-icon.png',
    es: {
      title: 'n8n & Automatización',
      description: 'Herramienta de automatización open-source para orquestar flujos entre sistemas. Experiencia conectando APIs, bases de datos y servicios externos en pipelines con manejo de errores y lógica condicional.',
      practices: 'Modularizar flujos en subflujos reutilizables, configurar nodos de error globales para cada workflow y validar payloads entrantes antes de procesarlos.',
    },
    en: {
      title: 'n8n & Automation',
      description: 'Open-source automation tool for orchestrating flows between systems. Experience connecting APIs, databases, and external services in pipelines with error handling and conditional logic.',
      practices: 'Modularize flows into reusable subflows, configure global error handler nodes per workflow, and validate incoming payloads before processing.',
    },
  },
  'Make.com': {
    mastery: 'experto',
    logo: 'https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/light/make-color.png',
    es: {
      title: 'Make.com (Integromat)',
      description: 'Herramienta principal de automatización en Nova Academy. Diseñé e implementé 5 procesos clave integrando Google Sheets, formularios y APIs externas, logrando una reducción del 20% en tiempos de ejecución y 15% en errores manuales. Certificaciones Make Foundation y Make Basic obtenidas.',
      practices: 'Estructurar escenarios en módulos lógicos independientes, usar filtros para evitar ejecuciones innecesarias y documentar cada módulo con notas descriptivas.',
    },
    en: {
      title: 'Make.com (Integromat)',
      description: 'Primary automation tool at Nova Academy. Designed and implemented 5 key processes integrating Google Sheets, forms, and external APIs, achieving 20% reduction in execution time and 15% fewer manual errors. Make Foundation and Make Basic certifications obtained.',
      practices: 'Structure scenarios into independent logical modules, use filters to avoid unnecessary executions, and document each module with descriptive notes.',
    },
  },
  Git: {
    mastery: 'avanzado',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg',
    es: {
      title: 'Git & GitHub',
      description: 'Control de versiones en todos mis proyectos profesionales y académicos. En Entel trabajo con ramas por feature, pull requests con revisión de código y resolución de conflictos en un equipo de desarrollo activo.',
      practices: 'Escribir mensajes de commit descriptivos en tiempo presente, trabajar en ramas separadas por feature y revisar diffs antes de cada merge.',
    },
    en: {
      title: 'Git & GitHub',
      description: 'Version control across all professional and academic projects. At Entel I work with feature branches, pull requests with code review, and conflict resolution in an active development team.',
      practices: 'Write descriptive commit messages in present tense, work on separate feature branches, and review diffs before each merge.',
    },
  },
  'HTML/CSS': {
    mastery: 'avanzado',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg',
    es: {
      title: 'HTML & CSS',
      description: 'Base estructural en todos mis proyectos web, incluyendo la plataforma de inversiones en Entel. Layouts con Flexbox y Grid, responsive design, y base para frameworks como Tailwind CSS y React.',
      practices: 'Usar etiquetas semánticas para accesibilidad, evitar estilos inline, mantener specificity baja y organizar CSS en capas (base, componentes, utilidades).',
    },
    en: {
      title: 'HTML & CSS',
      description: 'Structural foundation across all my web projects, including the investment platform at Entel. Flexbox and Grid layouts, responsive design, and foundation for frameworks like Tailwind CSS and React.',
      practices: 'Use semantic tags for accessibility, avoid inline styles, keep specificity low, and organize CSS in layers (base, components, utilities).',
    },
  },
  React: {
    mastery: 'avanzado',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg',
    es: {
      title: 'React',
      description: 'Base de Next.js en Entel. Construí componentes reutilizables para el dashboard financiero de la plataforma de inversiones, implementé hooks para gestión de estado y operaciones masivas sobre proyectos de inversión en tiempo real.',
      practices: 'Extraer lógica en custom hooks, evitar prop drilling con Context o estado local, y memorizar con useMemo/useCallback solo cuando el profiling lo justifique.',
    },
    en: {
      title: 'React',
      description: 'Foundation of Next.js at Entel. Built reusable components for the financial dashboard of the investment platform, implemented hooks for state management, and bulk operations on investment projects in real time.',
      practices: 'Extract logic into custom hooks, avoid prop drilling with Context or local state, and memoize with useMemo/useCallback only when profiling justifies it.',
    },
  },
  'Tailwind CSS': {
    mastery: 'avanzado',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg',
    es: {
      title: 'Tailwind CSS',
      description: 'Framework de utilidades usado en Entel y en este portfolio. Permite construir interfaces consistentes y responsive directamente en JSX, con dark mode nativo y componentes altamente personalizables.',
      practices: 'Evitar clases inline repetidas extrayendo componentes, usar el theme de Tailwind para tokens de diseño y aprovechar los plugins oficiales para forms y typography.',
    },
    en: {
      title: 'Tailwind CSS',
      description: 'Utility-first framework used at Entel and in this portfolio. Enables building consistent, responsive interfaces directly in JSX, with native dark mode and highly customizable components.',
      practices: 'Avoid repeated inline classes by extracting components, use the Tailwind theme for design tokens, and leverage official plugins for forms and typography.',
    },
  },
  Astro: {
    mastery: 'intermedio',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/astro/astro-original.svg',
    es: {
      title: 'Astro',
      description: 'Framework estático con arquitectura Islands explorado en proyectos personales. Construcción de landing pages con integración de componentes React, con cero JavaScript enviado al cliente por defecto.',
      practices: 'Usar componentes .astro para páginas estáticas y reservar Islands interactivos solo donde la UI lo requiera, manteniendo el bundle de JS mínimo.',
    },
    en: {
      title: 'Astro',
      description: 'Static framework with Islands architecture explored in personal projects. Building landing pages with React component integration, shipping zero JavaScript to the client by default.',
      practices: 'Use .astro components for static pages and reserve interactive Islands only where the UI requires it, keeping the JS bundle minimal.',
    },
  },
  'Node.js': {
    mastery: 'intermedio',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg',
    es: {
      title: 'Node.js',
      description: 'Runtime del ecosistema JavaScript usado en todos mis proyectos frontend. Manejo de dependencias con npm, scripts de build y automatizaciones de desarrollo en el entorno Next.js de Entel.',
      practices: 'Usar módulos ES en lugar de CommonJS cuando sea posible, manejar errores asíncronos con try/catch en async/await y evitar bloquear el event loop con operaciones síncronas pesadas.',
    },
    en: {
      title: 'Node.js',
      description: 'JavaScript ecosystem runtime used across all my frontend projects. Dependency management with npm, build scripts, and development automations in the Entel Next.js environment.',
      practices: 'Use ES modules over CommonJS when possible, handle async errors with try/catch in async/await, and avoid blocking the event loop with heavy synchronous operations.',
    },
  },
  Java: {
    mastery: 'intermedio',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg',
    es: {
      title: 'Java',
      description: 'Lenguaje backend en el proyecto universitario Inmoshare con Spring Boot. POO, colecciones, streams y JPA para persistencia. Capas de servicio y repositorio siguiendo principios SOLID.',
      practices: 'Aplicar principios SOLID en diseño de clases, usar Optional para evitar NullPointerExceptions y preferir streams a bucles imperativos para transformaciones de datos.',
    },
    en: {
      title: 'Java',
      description: 'Backend language in the Inmoshare university project with Spring Boot. OOP, collections, streams, and JPA for persistence. Service and repository layers following SOLID principles.',
      practices: 'Apply SOLID principles in class design, use Optional to avoid NullPointerExceptions, and prefer streams over imperative loops for data transformations.',
    },
  },
  'REST APIs': {
    mastery: 'avanzado',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/fastapi/fastapi-original.svg',
    es: {
      title: 'REST APIs',
      description: 'Diseño y consumo de APIs RESTful en todos mis proyectos profesionales. En Entel integré el frontend Next.js con el backend Django de la plataforma de inversiones. En proyectos universitarios trabajé con APIs en C#/.NET y Spring Boot con autenticación JWT.',
      practices: 'Seguir convenciones REST (verbos HTTP correctos, códigos de estado semánticos), versionar endpoints desde el inicio y documentar contratos con OpenAPI para facilitar integración.',
    },
    en: {
      title: 'REST APIs',
      description: 'Design and consumption of RESTful APIs across all professional projects. At Entel I integrated the Next.js frontend with the Django backend of the investment platform. In university projects I worked with C#/.NET and Spring Boot APIs with JWT authentication.',
      practices: 'Follow REST conventions (correct HTTP verbs, semantic status codes), version endpoints from the start, and document contracts with OpenAPI to ease integration.',
    },
  },
  PostgreSQL: {
    mastery: 'intermedio',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg',
    es: {
      title: 'PostgreSQL',
      description: 'Base de datos relacional avanzada explorada en proyectos personales y de estudio. Consultas con CTEs, window functions y optimización de índices para análisis de datos.',
      practices: 'Usar índices parciales para consultas frecuentes con filtros, aprovechar EXPLAIN ANALYZE para diagnosticar consultas lentas y separar schemas por dominio funcional.',
    },
    en: {
      title: 'PostgreSQL',
      description: 'Advanced relational database explored in personal and study projects. Queries with CTEs, window functions, and index optimization for data analysis.',
      practices: 'Use partial indexes for frequent filtered queries, leverage EXPLAIN ANALYZE to diagnose slow queries, and separate schemas by functional domain.',
    },
  },
  'Power Automate': {
    mastery: 'avanzado',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Microsoft_Power_Automate_%282025-present%29.svg/1280px-Microsoft_Power_Automate_%282025-present%29.svg.png',
    es: {
      title: 'Power Automate',
      description: 'Automatización de flujos dentro del ecosistema Microsoft 365 en Nova Academy. Integré SharePoint, Outlook y Teams para eliminar tareas manuales repetitivas, como parte de la reducción del 20% en tiempos de ejecución de procesos.',
      practices: 'Agrupar acciones relacionadas en bloques de scope, manejar errores con bloques try-catch nativos y registrar ejecuciones en listas SharePoint para auditoría.',
    },
    en: {
      title: 'Power Automate',
      description: 'Flow automation within the Microsoft 365 ecosystem at Nova Academy. Integrated SharePoint, Outlook, and Teams to eliminate repetitive manual tasks, contributing to a 20% reduction in process execution times.',
      practices: 'Group related actions into scope blocks, handle errors with native try-catch scopes, and log executions to SharePoint lists for auditing.',
    },
  },
  'Apps Script': {
    mastery: 'intermedio',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_Apps_Script.svg',
    es: {
      title: 'Google Apps Script',
      description: 'Scripts de automatización sobre Google Workspace en Nova Academy. Generación automática de reportes en Sheets, envío de correos desde Gmail y sincronización de datos entre formularios y hojas de cálculo como complemento a los flujos de Make.',
      practices: 'Evitar llamadas al servicio en loops, cachear datos con CacheService para reducir cuota de ejecución y estructurar el código en funciones pequeñas y reutilizables.',
    },
    en: {
      title: 'Google Apps Script',
      description: 'Automation scripts on Google Workspace at Nova Academy. Automatic report generation in Sheets, email sending from Gmail, and data syncing between forms and spreadsheets as a complement to Make flows.',
      practices: 'Avoid service calls inside loops, cache data with CacheService to reduce execution quota, and structure code into small reusable functions.',
    },
  },
  SQL: {
    mastery: 'avanzado',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/azuresqldatabase/azuresqldatabase-original.svg',
    es: {
      title: 'SQL',
      description: 'Consultas relacionales aplicadas en MySQL (TocaAquí, Inmoshare) y en el ORM de Django en Entel. JOINs complejos, subconsultas y agregaciones para reportes financieros. Certificación SQL Intermediate en HackerRank (2025).',
      practices: 'Filtrar antes de hacer JOIN para reducir el dataset, usar aliases descriptivos, evitar SELECT * en producción y validar planes de ejecución en consultas críticas.',
    },
    en: {
      title: 'SQL',
      description: 'Relational queries applied in MySQL (TocaAquí, Inmoshare) and Django ORM at Entel. Complex JOINs, subqueries, and aggregations for financial reports. SQL Intermediate certification on HackerRank (2025).',
      practices: 'Filter before joining to reduce dataset size, use descriptive aliases, avoid SELECT * in production, and validate execution plans on critical queries.',
    },
  },
  NoSQL: {
    mastery: 'intermedio',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg',
    es: {
      title: 'NoSQL / MongoDB',
      description: 'Bases de datos no relacionales estudiadas de forma independiente. Modelado de documentos embebidos vs referenciados según patrones de acceso. Certificación MongoDB Intro (2023).',
      practices: 'Diseñar el esquema según cómo se consultan los datos (query-driven design), evitar documentos excesivamente anidados y usar índices compuestos para consultas frecuentes.',
    },
    en: {
      title: 'NoSQL / MongoDB',
      description: 'Non-relational databases studied independently. Embedded vs referenced document modeling based on access patterns. MongoDB Intro certification (2023).',
      practices: 'Design schema based on how data is queried (query-driven design), avoid deeply nested documents, and use compound indexes for frequent queries.',
    },
  },
  'Power BI': {
    mastery: 'intermedio',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg',
    es: {
      title: 'Power BI',
      description: 'Dashboards interactivos para visualización de datos en proyectos académicos. Conexión a Excel y SQL, métricas calculadas con DAX y diseño de reportes orientados al usuario final.',
      practices: 'Modelar las relaciones entre tablas antes de crear medidas, usar DAX en lugar de columnas calculadas cuando sea posible y mantener los reportes simples y orientados al usuario final.',
    },
    en: {
      title: 'Power BI',
      description: 'Interactive dashboards for data visualization in academic projects. Excel and SQL connections, DAX for calculated metrics, and end-user oriented report design.',
      practices: 'Model table relationships before creating measures, prefer DAX measures over calculated columns when possible, and keep reports simple and end-user focused.',
    },
  },
  'G. Workspace': {
    mastery: 'avanzado',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Workspace_Logo.svg/512px-Google_Workspace_Logo.svg.png',
    es: {
      title: 'Google Workspace',
      description: 'Suite central en Nova Academy para automatizar procesos de contenido y comunicación. Integré Google Sheets, Drive, Forms y Gmail en flujos de Make y Apps Script, logrando reportes automáticos y una reducción del 15% en errores manuales.',
      practices: 'Usar plantillas reutilizables en Docs y Sheets, organizar Drive con estructura de carpetas consistente y automatizar notificaciones con Google Forms + Apps Script.',
    },
    en: {
      title: 'Google Workspace',
      description: 'Central suite at Nova Academy for automating content and communication processes. Integrated Google Sheets, Drive, Forms, and Gmail into Make and Apps Script flows, achieving automatic reports and a 15% reduction in manual errors.',
      practices: 'Use reusable templates in Docs and Sheets, organize Drive with a consistent folder structure, and automate notifications with Google Forms + Apps Script.',
    },
  },
  'IA Generativa': {
    mastery: 'avanzado',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/512px-ChatGPT_logo.svg.png',
    es: {
      title: 'IA Generativa (ChatGPT / Gemini)',
      description: 'Rol dedicado en Nova Academy como Gen AI Trainee. Usé herramientas de IA para crear +20 piezas de contenido digital, aumentar interacción en redes un 15% y mejorar la eficiencia de creación de contenido en un 30%.',
      practices: 'Estructurar prompts con rol, contexto, tarea y formato esperado. Iterar sobre el output con prompts de refinamiento y mantener un banco de prompts reutilizables por caso de uso.',
    },
    en: {
      title: 'Generative AI (ChatGPT / Gemini)',
      description: 'Dedicated Gen AI Trainee role at Nova Academy. Used AI tools to create 20+ digital content pieces, increase social media engagement by 15%, and improve content creation efficiency by 30%.',
      practices: 'Structure prompts with role, context, task, and expected format. Iterate on output with refinement prompts and maintain a reusable prompt library per use case.',
    },
  },
  Scrum: {
    mastery: 'avanzado',
    logo: 'https://vectorseek.com/wp-content/uploads/2023/10/Scrum-Logo-Vector.svg-.png',
    es: {
      title: 'Scrum & Metodologías Ágiles',
      description: 'Aplicado en equipos de desarrollo tanto en Entel como en proyectos universitarios. Sprints, backlog grooming, daily standups y retrospectivas. Certificación Scrum Foundation (CertiProf, 2023).',
      practices: 'Definir criterios de aceptación claros antes del sprint, estimar con story points en equipo y priorizar el backlog según valor de negocio, no urgencia técnica.',
    },
    en: {
      title: 'Scrum & Agile Methodologies',
      description: 'Applied in development teams at both Entel and university projects. Sprints, backlog grooming, daily standups, and retrospectives. Scrum Foundation certification (CertiProf, 2023).',
      practices: 'Define clear acceptance criteria before the sprint, estimate with team story points, and prioritize backlog by business value rather than technical urgency.',
    },
  },
  Jira: {
    mastery: 'intermedio',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/jira/jira-original.svg',
    es: {
      title: 'Jira & Trello',
      description: 'Gestión de tareas en equipos de desarrollo. Tableros Kanban, backlog grooming y trazabilidad de issues en proyectos universitarios (TocaAquí, Inmoshare) y coordinación de tareas en Entel.',
      practices: 'Mantener las tareas atómicas y completables en un sprint, vincular issues con commits de GitHub y actualizar el estado en tiempo real para visibilidad del equipo.',
    },
    en: {
      title: 'Jira & Trello',
      description: 'Task management in development teams. Kanban boards, backlog grooming, and issue traceability in university projects (TocaAquí, Inmoshare) and task coordination at Entel.',
      practices: 'Keep tasks atomic and completable within a sprint, link issues to GitHub commits, and update status in real time for team visibility.',
    },
  },
  Claude: {
    mastery: 'avanzado',
    logo: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/claude-ai-icon.png',
    es: {
      title: 'Claude (Anthropic)',
      description: 'Modelo de IA conversacional usado para razonamiento complejo, generación de código, análisis de requisitos y asistencia en arquitectura de software. Integrado en flujos de trabajo de desarrollo en Entel.',
      practices: 'Estructurar conversaciones con contexto claro, aprovechar el análisis multi-paso para problemas complejos y combinar con herramientas como Claude Code para workflows end-to-end.',
    },
    en: {
      title: 'Claude (Anthropic)',
      description: 'Conversational AI model used for complex reasoning, code generation, requirements analysis, and software architecture assistance. Integrated into development workflows at Entel.',
      practices: 'Structure conversations with clear context, leverage multi-step reasoning for complex problems, and combine with tools like Claude Code for end-to-end workflows.',
    },
  },
  'Claude Code': {
    mastery: 'avanzado',
    logo: 'https://storage.ghost.io/c/0d/9f/0d9f505b-12d0-4a29-bd07-db0c186a006e/content/images/2026/01/Claude.png',
    es: {
      title: 'Claude Code',
      description: 'CLI de codificación asistida por IA de Anthropic. Usado para refactoring, debugging, generación de componentes y análisis de codebases completos directamente desde la terminal.',
      practices: 'Dar contexto explícito del codebase antes de pedir cambios, usar /clear para sesiones limpias en tareas nuevas y combinar con MCP servers para integrar herramientas externas.',
    },
    en: {
      title: 'Claude Code',
      description: "Anthropic's AI-assisted coding CLI. Used for refactoring, debugging, component generation, and full codebase analysis directly from the terminal.",
      practices: 'Provide explicit codebase context before requesting changes, use /clear for clean sessions on new tasks, and combine with MCP servers to integrate external tools.',
    },
  },
  MCP: {
    mastery: 'intermedio',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Model_Context_Protocol_logo.svg/3840px-Model_Context_Protocol_logo.svg.png',
    es: {
      title: 'Model Context Protocol (MCP)',
      description: 'Protocolo estándar de Anthropic para conectar modelos de IA con herramientas y fuentes de datos externas. Experiencia configurando MCP servers para integrar bases de datos, APIs y servicios en flujos de agentes.',
      practices: 'Definir herramientas MCP con schemas claros y descripciones precisas, separar servidores por dominio funcional y versionar las configuraciones junto al código del proyecto.',
    },
    en: {
      title: 'Model Context Protocol (MCP)',
      description: "Anthropic's standard protocol for connecting AI models to external tools and data sources. Experience configuring MCP servers to integrate databases, APIs, and services into agent workflows.",
      practices: 'Define MCP tools with clear schemas and precise descriptions, separate servers by functional domain, and version configurations alongside project code.',
    },
  },
  SDD: {
    mastery: 'intermedio',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/markdown/markdown-original.svg',
    es: {
      title: 'SDD (Spec-Driven Development)',
      description: 'Metodología de desarrollo guiado por especificaciones: documentar el comportamiento esperado antes de escribir código. Aplicado en proyectos universitarios y en flujos con IA para reducir ambigüedad y alinear al equipo.',
      practices: 'Escribir la especificación en lenguaje natural antes de codificar, validar con el equipo antes de implementar y usar las specs como fuente de verdad para pruebas y revisiones de código.',
    },
    en: {
      title: 'SDD (Spec-Driven Development)',
      description: 'Specification-driven development methodology: documenting expected behavior before writing code. Applied in university projects and AI-assisted flows to reduce ambiguity and align the team.',
      practices: 'Write the spec in natural language before coding, validate with the team before implementing, and use specs as the source of truth for tests and code reviews.',
    },
  },
  Skills: {
    mastery: 'intermedio',
    logo: 'https://skillshubmcp.com/images/find-skills.jpg',
    es: {
      title: 'Claude Code Skills',
      description: 'Sistema de habilidades personalizadas para Claude Code: comandos slash que encapsulan flujos repetitivos como code review, generación de tests o deploy. Permite estandarizar cómo el agente aborda tareas específicas del proyecto.',
      practices: 'Diseñar cada skill con un prompt claro, delimitar su alcance a una sola tarea y documentar las entradas esperadas para que el agente pueda ejecutarlo sin ambigüedad.',
    },
    en: {
      title: 'Claude Code Skills',
      description: 'Custom skill system for Claude Code: slash commands that encapsulate repetitive workflows like code review, test generation, or deploy. Enables standardizing how the agent handles project-specific tasks.',
      practices: 'Design each skill with a clear prompt, scope it to a single task, and document expected inputs so the agent can execute it without ambiguity.',
    },
  },
  NotebookLM: {
    mastery: 'avanzado',
    logo: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/notebooklm-icon.png',
    es: {
      title: 'NotebookLM',
      description: 'Herramienta de Google para análisis y síntesis de documentos con IA. Usada para procesar documentación técnica extensa, generar resúmenes estructurados y crear bases de conocimiento a partir de múltiples fuentes.',
      practices: 'Cargar fuentes específicas y acotadas por tema, formular preguntas concretas para obtener síntesis precisas y usar los audio overviews para revisiones rápidas de contenido extenso.',
    },
    en: {
      title: 'NotebookLM',
      description: "Google's AI-powered document analysis and synthesis tool. Used to process extensive technical documentation, generate structured summaries, and build knowledge bases from multiple sources.",
      practices: 'Load specific, topic-scoped sources, ask concrete questions to get precise syntheses, and use audio overviews for quick reviews of extensive content.',
    },
  },
  Perplexity: {
    mastery: 'avanzado',
    logo: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/perplexity.webp',
    es: {
      title: 'Perplexity AI',
      description: 'Motor de búsqueda con IA para investigación técnica y validación de información. Usado para explorar tendencias del ecosistema, comparar librerías y obtener respuestas fundamentadas con fuentes verificables en tiempo real.',
      practices: 'Usar el modo Pro para búsquedas técnicas profundas, citar las fuentes retornadas antes de implementar soluciones y combinar con Claude para razonamiento sobre los resultados obtenidos.',
    },
    en: {
      title: 'Perplexity AI',
      description: 'AI-powered search engine for technical research and information validation. Used to explore ecosystem trends, compare libraries, and get sourced answers with verifiable real-time references.',
      practices: 'Use Pro mode for deep technical searches, verify returned sources before implementing solutions, and combine with Claude for reasoning over the results.',
    },
  },
  Gemini: {
    mastery: 'intermedio',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Google_Gemini_icon_2025.svg/960px-Google_Gemini_icon_2025.svg.png?_=20250728014952',
    es: {
      title: 'Gemini',
      description: 'Modelo multimodal de Google integrado en el ecosistema de herramientas Google Workspace. Usado para análisis de imágenes, procesamiento de documentos largos y asistencia en flujos de contenido y automatización.',
      practices: 'Aprovechar la ventana de contexto extensa para procesar documentos completos, usar Gemini en Google Docs/Sheets para flujos integrados y explorar sus capacidades multimodales para análisis visual.',
    },
    en: {
      title: 'Gemini',
      description: "Google's multimodal model integrated into the Google Workspace ecosystem. Used for image analysis, long document processing, and assistance in content and automation workflows.",
      practices: 'Leverage the large context window to process full documents, use Gemini in Google Docs/Sheets for integrated workflows, and explore multimodal capabilities for visual analysis.',
    },
  },
};

interface MatterSandboxProps {
  language: 'es' | 'en';
}

const mobileCategories: { labelEs: string; labelEn: string; keys: string[] }[] = [
  {
    labelEs: 'Frontend',
    labelEn: 'Frontend',
    keys: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue.js', 'Angular', 'Astro', 'Tailwind CSS', 'HTML/CSS'],
  },
  {
    labelEs: 'Backend & APIs',
    labelEn: 'Backend & APIs',
    keys: ['Django', 'Python', 'Spring Boot', 'Java', 'C#', 'Node.js', 'REST APIs'],
  },
  {
    labelEs: 'Automatización',
    labelEn: 'Automation',
    keys: ['n8n', 'Make.com', 'Power Automate', 'Apps Script', 'IA Generativa'],
  },
  {
    labelEs: 'IA & Agentes',
    labelEn: 'AI & Agents',
    keys: ['Claude', 'Claude Code', 'MCP', 'SDD', 'Skills', 'NotebookLM', 'Perplexity', 'Gemini'],
  },
  {
    labelEs: 'Datos & DevOps',
    labelEn: 'Data & DevOps',
    keys: ['MySQL', 'PostgreSQL', 'Git', 'Google Workspace'],
  },
];

const ALL = '__all__';

export default function MatterSandbox({ language }: MatterSandboxProps) {
  const isMobile = useMobile();
  const [selectedTech, setSelectedTech] = useState<string>('JavaScript');
  const [filterCat, setFilterCat]       = useState<string>(ALL);
  const [filterLvl, setFilterLvl]       = useState<MasteryLevel | typeof ALL>(ALL);

  const t = {
    es: { mastery: 'Nivel', practices: 'Mejores Prácticas', all: 'Todos', showing: 'Mostrando' },
    en: { mastery: 'Level', practices: 'Best Practices',    all: 'All',   showing: 'Showing'   },
  }[language];

  const masteryLabels: Record<MasteryLevel, { es: string; en: string }> = {
    intermedio: { es: 'Intermedio', en: 'Intermediate' },
    avanzado:   { es: 'Avanzado',   en: 'Advanced'     },
    experto:    { es: 'Experto',    en: 'Expert'        },
  };
  const masteryStyles: Record<MasteryLevel, string> = {
    intermedio: 'bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-700/40',
    avanzado:   'bg-indigo-100 text-indigo-700 border-indigo-300 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-700/40',
    experto:    'bg-teal-100 text-teal-700 border-teal-300 dark:bg-teal-900/30 dark:text-teal-400 dark:border-teal-700/40',
  };
  const masteryActiveCls: Record<MasteryLevel, string> = {
    intermedio: 'bg-amber-500 text-white border-amber-500',
    avanzado:   'bg-indigo-600 text-white border-indigo-600',
    experto:    'bg-teal-500 text-white border-teal-500',
  };

  // All unique techs flattened
  const allKeys = mobileCategories.flatMap(c => c.keys).filter(k => techRegistry[k]);

  // Apply filters
  const visibleKeys = allKeys.filter(key => {
    const data = techRegistry[key];
    const catMatch = filterCat === ALL || mobileCategories.find(c => (language === 'es' ? c.labelEs : c.labelEn) === filterCat)?.keys.includes(key);
    const lvlMatch = filterLvl === ALL || data.mastery === filterLvl;
    return catMatch && lvlMatch;
  });

  const currentTechData = techRegistry[selectedTech];

  // Keep selection valid when filters change
  React.useEffect(() => {
    if (!visibleKeys.includes(selectedTech) && visibleKeys.length > 0) {
      setSelectedTech(visibleKeys[0]);
    }
  }, [filterCat, filterLvl]);

  const filterBar = (
    <div className="space-y-3 mb-5">
      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilterCat(ALL)}
          className={`px-3 py-1.5 rounded-lg border text-[11px] font-mono font-bold tracking-wide transition-all cursor-pointer ${
            filterCat === ALL
              ? 'bg-neutral-900 dark:bg-white text-white dark:text-black border-neutral-900 dark:border-white'
              : 'bg-transparent text-neutral-500 dark:text-white/40 border-neutral-200 dark:border-white/10 hover:border-neutral-400 dark:hover:border-white/30 hover:text-neutral-800 dark:hover:text-white/70'
          }`}
        >
          {t.all}
        </button>
        {mobileCategories.map(cat => {
          const label = language === 'es' ? cat.labelEs : cat.labelEn;
          const active = filterCat === label;
          return (
            <button
              key={label}
              onClick={() => setFilterCat(active ? ALL : label)}
              className={`px-3 py-1.5 rounded-lg border text-[11px] font-mono font-bold tracking-wide transition-all cursor-pointer ${
                active
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-black border-neutral-900 dark:border-white'
                  : 'bg-transparent text-neutral-500 dark:text-white/40 border-neutral-200 dark:border-white/10 hover:border-neutral-400 dark:hover:border-white/30 hover:text-neutral-800 dark:hover:text-white/70'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
      {/* Level filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-[10px] font-mono text-neutral-400 dark:text-white/25 uppercase tracking-widest mr-1">
          {t.mastery}:
        </span>
        <button
          onClick={() => setFilterLvl(ALL)}
          className={`px-3 py-1.5 rounded-lg border text-[11px] font-mono font-bold tracking-wide transition-all cursor-pointer ${
            filterLvl === ALL
              ? 'bg-neutral-900 dark:bg-white text-white dark:text-black border-neutral-900 dark:border-white'
              : 'bg-transparent text-neutral-500 dark:text-white/40 border-neutral-200 dark:border-white/10 hover:border-neutral-400 dark:hover:border-white/30 hover:text-neutral-800 dark:hover:text-white/70'
          }`}
        >
          {t.all}
        </button>
        {(['intermedio', 'avanzado', 'experto'] as MasteryLevel[]).map(lvl => {
          const active = filterLvl === lvl;
          return (
            <button
              key={lvl}
              onClick={() => setFilterLvl(active ? ALL : lvl)}
              className={`px-3 py-1.5 rounded-lg border text-[11px] font-mono font-bold tracking-wide transition-all cursor-pointer ${
                active
                  ? masteryActiveCls[lvl]
                  : 'bg-transparent text-neutral-500 dark:text-white/40 border-neutral-200 dark:border-white/10 hover:border-neutral-400 dark:hover:border-white/30 hover:text-neutral-800 dark:hover:text-white/70'
              }`}
            >
              {masteryLabels[lvl][language]}
            </button>
          );
        })}
      </div>
    </div>
  );

  const pillGrid = (
    <div className="flex flex-wrap gap-2">
      {visibleKeys.map(key => {
        const data = techRegistry[key];
        const isSelected = key === selectedTech;
        return (
          <motion.button
            key={key}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            onClick={() => setSelectedTech(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-mono font-semibold transition-all duration-150 cursor-pointer active:scale-95 ${
              isSelected
                ? 'bg-neutral-950 dark:bg-white text-white dark:text-black border-neutral-950 dark:border-white shadow-sm'
                : 'bg-white/70 dark:bg-white/[0.04] text-neutral-700 dark:text-white/65 border-neutral-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/[0.08] hover:border-neutral-400 dark:hover:border-white/25 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            {data.logo && (
              <img
                src={data.logo}
                alt={key}
                className="w-4 h-4 object-contain flex-shrink-0"
                referrerPolicy="no-referrer"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
            )}
            {key}
          </motion.button>
        );
      })}
      {visibleKeys.length === 0 && (
        <p className="text-xs font-mono text-neutral-400 dark:text-white/30 py-4">
          {language === 'es' ? 'Sin resultados para este filtro.' : 'No results for this filter.'}
        </p>
      )}
    </div>
  );

  const counter = (
    <p className="text-[10px] font-mono text-neutral-400 dark:text-white/25 mt-4">
      {t.showing} {visibleKeys.length} / {allKeys.length}
    </p>
  );

  const detailPanel = currentTechData ? (
    <motion.div
      key={selectedTech}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="rounded-2xl border border-neutral-300/65 dark:border-white/15 bg-white/95 dark:bg-[#141414]/90 backdrop-blur-md overflow-hidden"
    >
      <div className="px-6 py-5 border-b border-neutral-200/50 dark:border-white/10">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xl border border-indigo-500/20 dark:border-teal-400/15 bg-gradient-to-br from-indigo-500/5 to-teal-500/5 flex items-center justify-center w-11 h-11 flex-shrink-0">
            {currentTechData.logo ? (
              <img src={currentTechData.logo} alt={selectedTech} className="w-6 h-6 object-contain" referrerPolicy="no-referrer" />
            ) : (
              <span className="font-mono text-xs font-bold text-neutral-800 dark:text-neutral-100">{selectedTech}</span>
            )}
          </span>
          <div>
            <h4 className="text-base font-bold text-neutral-900 dark:text-white font-mono">{currentTechData[language].title}</h4>
            <span className={`mt-1 inline-block px-2.5 py-0.5 rounded-full border text-[10px] font-bold font-mono uppercase tracking-wider ${masteryStyles[currentTechData.mastery]}`}>
              {masteryLabels[currentTechData.mastery][language]}
            </span>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-5">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-2">
            <Terminal className="h-3 w-3" />
            {language === 'es' ? 'Descripción' : 'Description'}
          </div>
          <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 font-sans">
            {currentTechData[language].description}
          </p>
        </div>
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-2">
            <Shield className="h-3 w-3" />
            {t.practices}
          </div>
          <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400 font-mono italic">
            &gt; {currentTechData[language].practices}
          </p>
        </div>
        <div className="pt-2 border-t border-dashed border-neutral-200 dark:border-neutral-800 flex items-center gap-2 text-[10px] font-mono text-neutral-400">
          <Zap className="h-3.5 w-3.5 text-neutral-500" />
          <span>REF: {selectedTech} // {t.mastery}: {masteryLabels[currentTechData.mastery][language]}</span>
        </div>
      </div>
    </motion.div>
  ) : (
    <div className="rounded-2xl border border-neutral-200 dark:border-white/10 bg-white/60 dark:bg-[#0e0e0e]/60 p-8 flex flex-col items-center justify-center text-center">
      <Cpu className="h-8 w-8 text-neutral-300 dark:text-neutral-700 animate-pulse mb-3" />
      <p className="text-xs font-mono text-neutral-400">{language === 'es' ? 'Selecciona una tecnología' : 'Select a technology'}</p>
    </div>
  );

  if (isMobile) {
    return (
      <div className="w-full space-y-4" id="sandbox-section">
        {filterBar}
        {pillGrid}
        {counter}
        <div className="pt-2">{detailPanel}</div>
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8" id="sandbox-section">
      <div className="lg:col-span-7">
        {filterBar}
        {pillGrid}
        {counter}
      </div>
      <div className="lg:col-span-5 lg:sticky lg:top-24 self-start">
        {detailPanel}
      </div>
    </div>
  );
}
