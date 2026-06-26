'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
      description: 'Lenguaje principal para desarrollo frontend y scripting. Utilizado en proyectos como TocaAquí con Vue.js, manejo de eventos, consumo de APIs REST y lógica de UI dinámica.',
      practices: 'Preferir const/let sobre var, usar async/await para peticiones, modularizar lógica en funciones puras y evitar mutaciones directas del DOM.',
    },
    en: {
      title: 'JavaScript',
      description: 'Primary language for frontend development and scripting. Used in projects like TocaAquí with Vue.js, event handling, REST API consumption, and dynamic UI logic.',
      practices: 'Prefer const/let over var, use async/await for requests, modularize logic into pure functions, and avoid direct DOM mutations.',
    },
  },
  TypeScript: {
    mastery: 'avanzado',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg',
    es: {
      title: 'TypeScript',
      description: 'Tipado estático sobre JavaScript para proyectos Angular e Inmoshare. Mejora la detección de errores en tiempo de compilación y la mantenibilidad del código en equipos.',
      practices: 'Definir interfaces claras para modelos de datos, evitar el uso de "any", aprovechar tipos utilitarios como Partial o Pick para mayor flexibilidad.',
    },
    en: {
      title: 'TypeScript',
      description: 'Static typing on top of JavaScript for Angular projects and Inmoshare. Improves compile-time error detection and code maintainability in team environments.',
      practices: 'Define clear interfaces for data models, avoid "any" types, and leverage utility types like Partial or Pick for flexibility.',
    },
  },
  'Vue.js': {
    mastery: 'avanzado',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg',
    es: {
      title: 'Vue.js',
      description: 'Framework reactivo usado en la plataforma TocaAquí. Componentes SFC, sistema de routing con Vue Router y comunicación entre componentes con props y emit.',
      practices: 'Separar lógica de negocio en composables reutilizables, usar v-model con moderación y mantener componentes enfocados en una sola responsabilidad.',
    },
    en: {
      title: 'Vue.js',
      description: 'Reactive framework used in the TocaAquí platform. SFC components, routing with Vue Router, and component communication via props and emit.',
      practices: 'Extract business logic into reusable composables, use v-model sparingly, and keep components focused on a single responsibility.',
    },
  },
  Angular: {
    mastery: 'intermedio',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/angularjs/angularjs-original.svg',
    es: {
      title: 'Angular',
      description: 'Framework full frontend usado en Inmoshare. Módulos, servicios con inyección de dependencias, reactive forms y HttpClient para integración con APIs REST en Spring Boot.',
      practices: 'Organizar por módulos por feature, usar observables de RxJS para estado asíncrono y separar la lógica HTTP en servicios independientes del componente.',
    },
    en: {
      title: 'Angular',
      description: 'Full frontend framework used in Inmoshare. Modules, services with dependency injection, reactive forms, and HttpClient for REST API integration with Spring Boot.',
      practices: 'Organize by feature modules, use RxJS observables for async state, and separate HTTP logic into services independent from components.',
    },
  },
  'Next.js': {
    mastery: 'avanzado',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg',
    es: {
      title: 'Next.js',
      description: 'Framework React para SSR e ISR. Utilizado en la plataforma Plinco de Entel, donde participé en la migración de versiones y optimización de tiempos de carga.',
      practices: 'Usar App Router con componentes server-side por defecto, evitar "use client" innecesario y aprovechar el caché nativo de fetch para reducir llamadas redundantes.',
    },
    en: {
      title: 'Next.js',
      description: 'React framework for SSR and ISR. Used on Entel\'s Plinco platform, where I contributed to version migration and load time optimization.',
      practices: 'Use App Router with server components by default, avoid unnecessary "use client", and leverage native fetch caching to reduce redundant API calls.',
    },
  },
  'C#': {
    mastery: 'intermedio',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg',
    es: {
      title: 'C# / .NET',
      description: 'Backend del proyecto TocaAquí. API RESTful con arquitectura DDD, entidades de dominio, repositorios y servicios de aplicación para gestión de músicos y espacios culturales.',
      practices: 'Separar capas de dominio, aplicación e infraestructura, usar DTOs para comunicación entre capas y mantener las entidades libres de lógica de persistencia.',
    },
    en: {
      title: 'C# / .NET',
      description: 'Backend of the TocaAquí project. RESTful API with DDD architecture, domain entities, repositories, and application services for managing musicians and cultural spaces.',
      practices: 'Separate domain, application, and infrastructure layers, use DTOs for inter-layer communication, and keep entities free from persistence logic.',
    },
  },
  'Spring Boot': {
    mastery: 'intermedio',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/spring/spring-original.svg',
    es: {
      title: 'Java / Spring Boot',
      description: 'Backend de Inmoshare. REST API con Spring MVC, JPA para persistencia en MySQL, autenticación JWT y sistema de pagos compartidos entre múltiples inquilinos.',
      practices: 'Usar @Service y @Repository para separar responsabilidades, validar DTOs con Bean Validation y configurar seguridad con Spring Security de forma granular.',
    },
    en: {
      title: 'Java / Spring Boot',
      description: 'Inmoshare backend. REST API with Spring MVC, JPA for MySQL persistence, JWT authentication, and shared payment system across multiple tenants.',
      practices: 'Use @Service and @Repository to separate concerns, validate DTOs with Bean Validation, and configure security granularly with Spring Security.',
    },
  },
  MySQL: {
    mastery: 'avanzado',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg',
    es: {
      title: 'MySQL / SQL',
      description: 'Base de datos relacional utilizada en TocaAquí e Inmoshare. Diseño de esquemas normalizados, relaciones entre entidades, consultas con JOINs y optimización básica de índices.',
      practices: 'Normalizar hasta 3NF como mínimo, usar claves foráneas con restricciones adecuadas y evitar consultas N+1 cargando relaciones de forma eficiente.',
    },
    en: {
      title: 'MySQL / SQL',
      description: 'Relational database used in TocaAquí and Inmoshare. Normalized schema design, entity relationships, JOIN queries, and basic index optimization.',
      practices: 'Normalize to at least 3NF, use foreign keys with proper constraints, and avoid N+1 queries by loading relationships efficiently.',
    },
  },
  Django: {
    mastery: 'avanzado',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/django/django-plain.svg',
    es: {
      title: 'Django (Python Backend)',
      description: 'Backend principal en Entel. API REST con Django REST Framework, autenticación, manejo de modelos relacionales con Django ORM y despliegue en entornos de producción.',
      practices: 'Separar lógica de negocio en servicios fuera de las vistas, usar serializers para validación de entrada, y aprovechar el ORM para consultas eficientes evitando queries N+1.',
    },
    en: {
      title: 'Django (Python Backend)',
      description: 'Main backend at Entel. REST API with Django REST Framework, authentication, relational model management with Django ORM, and production environment deployment.',
      practices: 'Keep business logic in service layers outside views, use serializers for input validation, and leverage the ORM for efficient queries avoiding N+1 patterns.',
    },
  },
  Python: {
    mastery: 'avanzado',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
    es: {
      title: 'Python',
      description: 'Scripting para análisis de datos, automatización de procesos repetitivos y exploración con herramientas de IA generativa. Certificación de inmersión IA con Alura.',
      practices: 'Usar entornos virtuales para aislar dependencias, preferir list comprehensions para transformaciones simples y documentar funciones con type hints.',
    },
    en: {
      title: 'Python',
      description: 'Scripting for data analysis, automating repetitive processes, and experimenting with generative AI tooling. AI immersion certification with Alura.',
      practices: 'Use virtual environments to isolate dependencies, prefer list comprehensions for simple transforms, and document functions with type hints.',
    },
  },
  n8n: {
    mastery: 'avanzado',
    logo: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/n8n-icon.png',
    es: {
      title: 'n8n & Automatización',
      description: 'Automatización de 5 procesos clave en Nova Academy integrando Google Workspace y Microsoft 365. Reducción del 20% en tiempos de ejecución y 15% en errores manuales.',
      practices: 'Modularizar flujos en subflujos reutilizables, configurar nodos de error globales para cada workflow y validar payloads entrantes antes de procesarlos.',
    },
    en: {
      title: 'n8n & Automation',
      description: 'Automated 5 key processes at Nova Academy integrating Google Workspace and Microsoft 365. Achieved 20% reduction in execution time and 15% fewer manual errors.',
      practices: 'Modularize flows into reusable subflows, configure global error handler nodes per workflow, and validate incoming payloads before processing.',
    },
  },
  'Make.com': {
    mastery: 'experto',
    logo: 'https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/light/make-color.png',
    es: {
      title: 'Make.com (Integromat)',
      description: 'Diseño de escenarios de automatización no-code con integración a Google Sheets, formularios y APIs externas. Certificaciones Make Foundation y Make Basic obtenidas.',
      practices: 'Estructurar escenarios en módulos lógicos independientes, usar filtros para evitar ejecuciones innecesarias y documentar cada módulo con notas descriptivas.',
    },
    en: {
      title: 'Make.com (Integromat)',
      description: 'No-code automation scenario design integrating Google Sheets, forms, and external APIs. Make Foundation and Make Basic certifications obtained.',
      practices: 'Structure scenarios into independent logical modules, use filters to avoid unnecessary executions, and document each module with descriptive notes.',
    },
  },
  Git: {
    mastery: 'avanzado',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg',
    es: {
      title: 'Git & GitHub',
      description: 'Control de versiones en todos los proyectos académicos y laborales. Flujo de trabajo con ramas por feature, pull requests y resolución de conflictos en equipos de 5 personas.',
      practices: 'Escribir mensajes de commit descriptivos en tiempo presente, trabajar en ramas separadas por feature y revisar diffs antes de cada merge.',
    },
    en: {
      title: 'Git & GitHub',
      description: 'Version control across all academic and professional projects. Feature-branch workflow, pull requests, and conflict resolution in 5-person teams.',
      practices: 'Write descriptive commit messages in present tense, work on separate feature branches, and review diffs before each merge.',
    },
  },
  'HTML/CSS': {
    mastery: 'avanzado',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg',
    es: {
      title: 'HTML & CSS',
      description: 'Base estructural y de estilos en todos los proyectos web. Layouts con Flexbox y Grid, responsive design, animaciones CSS y convenciones BEM para mantenibilidad.',
      practices: 'Usar etiquetas semánticas para accesibilidad, evitar estilos inline, mantener specificity baja y organizar CSS en capas (base, componentes, utilidades).',
    },
    en: {
      title: 'HTML & CSS',
      description: 'Structural and styling foundation across all web projects. Flexbox and Grid layouts, responsive design, CSS animations, and BEM conventions for maintainability.',
      practices: 'Use semantic tags for accessibility, avoid inline styles, keep specificity low, and organize CSS in layers (base, components, utilities).',
    },
  },
  React: {
    mastery: 'avanzado',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg',
    es: {
      title: 'React',
      description: 'Librería UI declarativa base de Next.js, usada en Entel para construir componentes reutilizables, gestión de estado con hooks y renderizado eficiente del dashboard financiero en tiempo real.',
      practices: 'Extraer lógica en custom hooks, evitar prop drilling con Context o estado local, y memorizar con useMemo/useCallback solo cuando el profiling lo justifique.',
    },
    en: {
      title: 'React',
      description: 'Declarative UI library underlying Next.js, used at Entel to build reusable components, manage state with hooks, and efficiently render the real-time financial dashboard.',
      practices: 'Extract logic into custom hooks, avoid prop drilling with Context or local state, and memoize with useMemo/useCallback only when profiling justifies it.',
    },
  },
  'Tailwind CSS': {
    mastery: 'avanzado',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg',
    es: {
      title: 'Tailwind CSS',
      description: 'Framework de utilidades CSS usado en Next.js y este portfolio. Permite un diseño consistente y responsive sin salir del JSX, con soporte nativo para dark mode y animaciones.',
      practices: 'Evitar clases inline repetidas extrayendo componentes, usar el theme de Tailwind para tokens de diseño y aprovechar los plugins oficiales para forms y typography.',
    },
    en: {
      title: 'Tailwind CSS',
      description: 'Utility-first CSS framework used in Next.js and this portfolio. Enables consistent, responsive design without leaving JSX, with native dark mode and animation support.',
      practices: 'Avoid repeated inline classes by extracting components, use the Tailwind theme for design tokens, and leverage official plugins for forms and typography.',
    },
  },
  Astro: {
    mastery: 'intermedio',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/astro/astro-original.svg',
    es: {
      title: 'Astro',
      description: 'Framework estático con arquitectura Islands para sitios de contenido. Experiencia construyendo landing pages con integración de componentes React y Vue, con cero JavaScript por defecto.',
      practices: 'Usar componentes .astro para páginas estáticas y reservar Islands interactivos solo donde la UI lo requiera, manteniendo el bundle de JS mínimo.',
    },
    en: {
      title: 'Astro',
      description: 'Static framework with Islands architecture for content sites. Experience building landing pages with React and Vue component integration, shipping zero JavaScript by default.',
      practices: 'Use .astro components for static pages and reserve interactive Islands only where the UI requires it, keeping the JS bundle minimal.',
    },
  },
  'Node.js': {
    mastery: 'intermedio',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg',
    es: {
      title: 'Node.js',
      description: 'Runtime JavaScript server-side para scripts de automatización, herramientas CLI y servidores Express ligeros. Base del ecosistema npm usado en todos los proyectos frontend.',
      practices: 'Usar módulos ES en lugar de CommonJS cuando sea posible, manejar errores asíncronos con try/catch en async/await y evitar bloquear el event loop con operaciones síncronas pesadas.',
    },
    en: {
      title: 'Node.js',
      description: 'Server-side JavaScript runtime for automation scripts, CLI tools, and lightweight Express servers. Foundation of the npm ecosystem used across all frontend projects.',
      practices: 'Use ES modules over CommonJS when possible, handle async errors with try/catch in async/await, and avoid blocking the event loop with heavy synchronous operations.',
    },
  },
  Java: {
    mastery: 'intermedio',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg',
    es: {
      title: 'Java',
      description: 'Lenguaje backend principal en Inmoshare junto a Spring Boot. POO sólida, manejo de colecciones, streams y JPA para persistencia. Enfocado en capas de servicio y repositorio.',
      practices: 'Aplicar principios SOLID en diseño de clases, usar Optional para evitar NullPointerExceptions y preferir streams a bucles imperativos para transformaciones de datos.',
    },
    en: {
      title: 'Java',
      description: 'Primary backend language in Inmoshare alongside Spring Boot. Strong OOP, collections, streams, and JPA for persistence. Focused on service and repository layers.',
      practices: 'Apply SOLID principles in class design, use Optional to avoid NullPointerExceptions, and prefer streams over imperative loops for data transformations.',
    },
  },
  'REST APIs': {
    mastery: 'avanzado',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/fastapi/fastapi-original.svg',
    es: {
      title: 'REST APIs',
      description: 'Diseño y consumo de APIs RESTful en todos los proyectos: TocaAquí (C#/.NET), Inmoshare (Spring Boot), Entel (Django + Next.js). Manejo de autenticación JWT, versionado y documentación con Swagger.',
      practices: 'Seguir convenciones REST (verbos HTTP correctos, códigos de estado semánticos), versionar endpoints desde el inicio y documentar contratos con OpenAPI para facilitar integración.',
    },
    en: {
      title: 'REST APIs',
      description: 'Design and consumption of RESTful APIs across all projects: TocaAquí (C#/.NET), Inmoshare (Spring Boot), Entel (Django + Next.js). JWT authentication, versioning, and Swagger documentation.',
      practices: 'Follow REST conventions (correct HTTP verbs, semantic status codes), version endpoints from the start, and document contracts with OpenAPI to ease integration.',
    },
  },
  PostgreSQL: {
    mastery: 'intermedio',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg',
    es: {
      title: 'PostgreSQL',
      description: 'Base de datos relacional avanzada usada en entornos de producción. Soporte para tipos de datos complejos, consultas avanzadas con CTEs y window functions para análisis de datos.',
      practices: 'Usar índices parciales para consultas frecuentes con filtros, aprovechar EXPLAIN ANALYZE para diagnosticar consultas lentas y separar schemas por dominio funcional.',
    },
    en: {
      title: 'PostgreSQL',
      description: 'Advanced relational database used in production environments. Support for complex data types, advanced queries with CTEs, and window functions for data analysis.',
      practices: 'Use partial indexes for frequent filtered queries, leverage EXPLAIN ANALYZE to diagnose slow queries, and separate schemas by functional domain.',
    },
  },
  'Power Automate': {
    mastery: 'avanzado',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Microsoft_Power_Automate_%282025-present%29.svg/1280px-Microsoft_Power_Automate_%282025-present%29.svg.png',
    es: {
      title: 'Power Automate',
      description: 'Automatización de flujos de trabajo dentro del ecosistema Microsoft 365 en Nova Academy. Integración con SharePoint, Outlook y Teams para reducir tareas manuales repetitivas.',
      practices: 'Agrupar acciones relacionadas en bloques de scope, manejar errores con bloques try-catch nativos y registrar ejecuciones en listas SharePoint para auditoría.',
    },
    en: {
      title: 'Power Automate',
      description: 'Workflow automation within the Microsoft 365 ecosystem at Nova Academy. Integration with SharePoint, Outlook, and Teams to reduce repetitive manual tasks.',
      practices: 'Group related actions into scope blocks, handle errors with native try-catch scopes, and log executions to SharePoint lists for auditing.',
    },
  },
  'Apps Script': {
    mastery: 'intermedio',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_Apps_Script.svg',
    es: {
      title: 'Google Apps Script',
      description: 'Scripts de automatización sobre Google Workspace: generación automática de reportes en Sheets, envío de correos desde Gmail y sincronización de datos entre formularios y hojas de cálculo.',
      practices: 'Evitar llamadas al servicio en loops, cachear datos con CacheService para reducir cuota de ejecución y estructurar el código en funciones pequeñas y reutilizables.',
    },
    en: {
      title: 'Google Apps Script',
      description: 'Automation scripts on Google Workspace: automatic report generation in Sheets, sending emails from Gmail, and syncing data between forms and spreadsheets.',
      practices: 'Avoid service calls inside loops, cache data with CacheService to reduce execution quota, and structure code into small reusable functions.',
    },
  },
  SQL: {
    mastery: 'avanzado',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/azuresqldatabase/azuresqldatabase-original.svg',
    es: {
      title: 'SQL',
      description: 'Consultas relacionales en MySQL y entornos académicos. JOINs complejos, subconsultas, agregaciones y diseño de esquemas normalizados. Certificación SQL Intermediate en HackerRank (2025).',
      practices: 'Filtrar antes de hacer JOIN para reducir el dataset, usar aliases descriptivos, evitar SELECT * en producción y validar planes de ejecución en consultas críticas.',
    },
    en: {
      title: 'SQL',
      description: 'Relational queries in MySQL and academic environments. Complex JOINs, subqueries, aggregations, and normalized schema design. SQL Intermediate certification on HackerRank (2025).',
      practices: 'Filter before joining to reduce dataset size, use descriptive aliases, avoid SELECT * in production, and validate execution plans on critical queries.',
    },
  },
  NoSQL: {
    mastery: 'intermedio',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg',
    es: {
      title: 'NoSQL / MongoDB',
      description: 'Bases de datos no relacionales para almacenamiento flexible de documentos. Certificación MongoDB Intro (2023). Modelado de documentos embebidos vs referenciados según los patrones de acceso.',
      practices: 'Diseñar el esquema según cómo se consultan los datos (query-driven design), evitar documentos excesivamente anidados y usar índices compuestos para consultas frecuentes.',
    },
    en: {
      title: 'NoSQL / MongoDB',
      description: 'Non-relational databases for flexible document storage. MongoDB Intro certification (2023). Embedded vs referenced document modeling based on access patterns.',
      practices: 'Design schema based on how data is queried (query-driven design), avoid deeply nested documents, and use compound indexes for frequent queries.',
    },
  },
  'Power BI': {
    mastery: 'intermedio',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg',
    es: {
      title: 'Power BI',
      description: 'Creación de dashboards interactivos para visualización de datos en contextos académicos y laborales. Conexión a Excel y SQL, uso de DAX para métricas calculadas y diseño de reportes.',
      practices: 'Modelar las relaciones entre tablas antes de crear medidas, usar DAX en lugar de columnas calculadas cuando sea posible y mantener los reportes simples y orientados al usuario final.',
    },
    en: {
      title: 'Power BI',
      description: 'Interactive dashboard creation for data visualization in academic and professional contexts. Excel and SQL connections, DAX for calculated metrics, and report design.',
      practices: 'Model table relationships before creating measures, prefer DAX measures over calculated columns when possible, and keep reports simple and end-user focused.',
    },
  },
  'G. Workspace': {
    mastery: 'avanzado',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Workspace_Logo.svg/512px-Google_Workspace_Logo.svg.png',
    es: {
      title: 'Google Workspace',
      description: 'Suite de productividad usada en Nova Academy para automatizar procesos de contenido y comunicación. Dominio de Google Sheets, Drive, Forms, Gmail y Slides integrados en flujos de trabajo.',
      practices: 'Usar plantillas reutilizables en Docs y Sheets, organizar Drive con estructura de carpetas consistente y automatizar notificaciones con Google Forms + Apps Script.',
    },
    en: {
      title: 'Google Workspace',
      description: 'Productivity suite used at Nova Academy to automate content and communication processes. Proficient in Google Sheets, Drive, Forms, Gmail, and Slides integrated into workflows.',
      practices: 'Use reusable templates in Docs and Sheets, organize Drive with a consistent folder structure, and automate notifications with Google Forms + Apps Script.',
    },
  },
  'IA Generativa': {
    mastery: 'avanzado',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/512px-ChatGPT_logo.svg.png',
    es: {
      title: 'IA Generativa (ChatGPT / Gemini)',
      description: 'Uso avanzado de herramientas de IA para creación de contenido, automatización de tareas y mejora de productividad. En Nova Academy logré un 30% de mejora en eficiencia usando Gen AI.',
      practices: 'Estructurar prompts con rol, contexto, tarea y formato esperado. Iterar sobre el output con prompts de refinamiento y mantener un banco de prompts reutilizables por caso de uso.',
    },
    en: {
      title: 'Generative AI (ChatGPT / Gemini)',
      description: 'Advanced use of AI tools for content creation, task automation, and productivity improvement. At Nova Academy achieved 30% efficiency improvement using Gen AI tools.',
      practices: 'Structure prompts with role, context, task, and expected format. Iterate on output with refinement prompts and maintain a reusable prompt library per use case.',
    },
  },
  Scrum: {
    mastery: 'avanzado',
    logo: 'https://vectorseek.com/wp-content/uploads/2023/10/Scrum-Logo-Vector.svg-.png',
    es: {
      title: 'Scrum & Metodologías Ágiles',
      description: 'Certificación Scrum Foundation (CertiProf, 2023). Aplicado en todos los proyectos universitarios: sprints, backlog, daily standups, retrospectivas y entrega incremental de valor.',
      practices: 'Definir criterios de aceptación claros antes del sprint, estimar con story points en equipo y priorizar el backlog según valor de negocio, no urgencia técnica.',
    },
    en: {
      title: 'Scrum & Agile Methodologies',
      description: 'Scrum Foundation certification (CertiProf, 2023). Applied across all university projects: sprints, backlog management, daily standups, retrospectives, and incremental delivery.',
      practices: 'Define clear acceptance criteria before the sprint, estimate with team story points, and prioritize backlog by business value rather than technical urgency.',
    },
  },
  Jira: {
    mastery: 'intermedio',
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/jira/jira-original.svg',
    es: {
      title: 'Jira & Trello',
      description: 'Gestión de tareas y seguimiento de proyectos en equipos universitarios. Creación de tableros Kanban, backlog grooming y trazabilidad de issues durante el desarrollo de TocaAquí e Inmoshare.',
      practices: 'Mantener las tareas atómicas y completables en un sprint, vincular issues con commits de GitHub y actualizar el estado en tiempo real para visibilidad del equipo.',
    },
    en: {
      title: 'Jira & Trello',
      description: 'Task management and project tracking in university teams. Kanban boards, backlog grooming, and issue traceability during TocaAquí and Inmoshare development.',
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
    keys: ['Claude', 'Claude Code', 'MCP', 'SDD', 'Skills'],
  },
  {
    labelEs: 'Datos & DevOps',
    labelEn: 'Data & DevOps',
    keys: ['MySQL', 'PostgreSQL', 'Git', 'Google Workspace'],
  },
];

export default function MatterSandbox({ language }: MatterSandboxProps) {
  const isMobile = useMobile();
  const [openCategories, setOpenCategories] = useState<Record<number, boolean>>({ 0: true });
  const [selectedTech, setSelectedTech] = useState<string>('JavaScript');

  const t = {
    es: { mastery: 'Nivel', practices: 'Mejores Prácticas', emptySelect: 'Selecciona una tecnología' },
    en: { mastery: 'Level', practices: 'Best Practices',    emptySelect: 'Select a technology'        },
  }[language];

  const currentTechData = techRegistry[selectedTech];

  const masteryStyles: Record<MasteryLevel, string> = {
    intermedio: 'bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-700/40',
    avanzado:   'bg-indigo-100 text-indigo-700 border-indigo-300 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-700/40',
    experto:    'bg-teal-100 text-teal-700 border-teal-300 dark:bg-teal-900/30 dark:text-teal-400 dark:border-teal-700/40',
  };
  const masteryLabels: Record<MasteryLevel, { es: string; en: string }> = {
    intermedio: { es: 'Intermedio', en: 'Intermediate' },
    avanzado:   { es: 'Avanzado',   en: 'Advanced'     },
    experto:    { es: 'Experto',    en: 'Expert'        },
  };

  const toggleCategory = (idx: number) =>
    setOpenCategories(prev => ({ ...prev, [idx]: !prev[idx] }));

  const categoryList = mobileCategories.map((cat, catIdx) => {
    const isOpen = !!openCategories[catIdx];
    const techs = cat.keys.filter(k => techRegistry[k]);
    return (
      <div key={catIdx} className={`rounded-2xl border overflow-hidden transition-all duration-200 ${isOpen ? 'border-neutral-900 dark:border-white/25 bg-white dark:bg-[#141414]' : 'border-neutral-200 dark:border-white/10 bg-white/50 dark:bg-[#0e0e0e]/60'}`}>
        <button
          onClick={() => toggleCategory(catIdx)}
          className="w-full flex items-center justify-between px-5 py-4 cursor-pointer focus:outline-none"
        >
          <span className="text-sm font-black font-mono text-neutral-800 dark:text-white tracking-tight">
            {language === 'es' ? cat.labelEs : cat.labelEn}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-neutral-400 dark:text-white/35">{techs.length}</span>
            <svg className={`w-4 h-4 text-neutral-400 dark:text-white/40 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 border-t border-neutral-200/50 dark:border-white/10">
                <div className="grid grid-cols-2 gap-2 pt-3">
                  {techs.map(key => {
                    const data = techRegistry[key];
                    const isSelected = key === selectedTech;
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedTech(key)}
                        className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all duration-150 active:scale-95 cursor-pointer ${
                          isSelected
                            ? 'bg-white dark:bg-[#1a1a1a] border-neutral-900 dark:border-white/30 ring-1 ring-neutral-900/10 dark:ring-white/20 shadow-sm'
                            : 'bg-neutral-50 dark:bg-[#0e0e0e]/80 border-neutral-200 dark:border-white/10 hover:bg-white dark:hover:bg-[#161616] hover:border-neutral-400 dark:hover:border-white/30 hover:shadow-sm'
                        }`}
                      >
                        {data.logo && (
                          <img src={data.logo} alt={key} className="w-5 h-5 object-contain flex-shrink-0" referrerPolicy="no-referrer"
                            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                        )}
                        <span className="text-xs font-bold font-mono text-neutral-800 dark:text-white truncate">{key}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  });

  const detailPanel = currentTechData ? (
    <div className="rounded-2xl border border-neutral-300/65 dark:border-white/15 bg-white/95 dark:bg-[#141414]/90 backdrop-blur-md overflow-hidden">
      <div className="px-6 py-5 border-b border-neutral-200/50 dark:border-white/10">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xl border border-indigo-500/20 dark:border-teal-400/15 bg-gradient-to-br from-indigo-500/5 to-teal-500/5 flex items-center justify-center w-11 h-11">
            {currentTechData.logo ? (
              <img src={currentTechData.logo} alt={selectedTech} className="w-6 h-6 object-contain" referrerPolicy="no-referrer" />
            ) : (
              <span className="font-mono text-xs font-bold text-neutral-800 dark:text-neutral-100">{selectedTech}</span>
            )}
          </span>
          <div>
            <h4 className="text-base font-bold text-neutral-900 dark:text-white font-mono">{currentTechData[language].title}</h4>
            <span className={`mt-1 inline-block px-2.5 py-0.5 rounded-full border text-[10px] font-bold font-mono uppercase tracking-wider ${masteryStyles[currentTechData.mastery]}`}>
              {language === 'es' ? masteryLabels[currentTechData.mastery].es : masteryLabels[currentTechData.mastery].en}
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
          <span>REF: {selectedTech} // {t.mastery}: {language === 'es' ? masteryLabels[currentTechData.mastery].es : masteryLabels[currentTechData.mastery].en}</span>
        </div>
      </div>
    </div>
  ) : (
    <div className="rounded-2xl border border-neutral-200 dark:border-white/10 bg-white/60 dark:bg-[#0e0e0e]/60 p-8 flex flex-col items-center justify-center text-center">
      <Cpu className="h-8 w-8 text-neutral-300 dark:text-neutral-700 animate-pulse mb-3" />
      <p className="text-xs font-mono text-neutral-400">{t.emptySelect}</p>
    </div>
  );

  if (isMobile) {
    return (
      <div className="w-full space-y-3" id="sandbox-section">
        {categoryList}
        <div className="pt-1">{detailPanel}</div>
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6" id="sandbox-section">
      <div className="lg:col-span-5 space-y-2.5">
        {categoryList}
      </div>
      <div className="lg:col-span-7 lg:sticky lg:top-6">
        {detailPanel}
      </div>
    </div>
  );
}
