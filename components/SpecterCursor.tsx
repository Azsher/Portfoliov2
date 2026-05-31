'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function SpecterCursor() {
  const [isBlinking, setIsBlinking] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // Default hidden to prevent flickering on load

  const specterRef = useRef<HTMLDivElement>(null);
  const pupilRef = useRef<HTMLDivElement>(null);

  const pos = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Detect mobile or touch users
    const checkViewport = () => {
      const isTouch = window.matchMedia('(pointer: coarse)').matches;
      const isSmall = window.innerWidth < 768;
      setIsMobile(isTouch || isSmall);
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);

    if (isMobile) {
      return () => window.removeEventListener('resize', checkViewport);
    }

    // Initialize position to center of screen
    pos.current.x = window.innerWidth / 2;
    pos.current.y = window.innerHeight / 2;
    target.current.x = pos.current.x;
    target.current.y = pos.current.y;

    const handleMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Dynamic Spring physics loop
    let animId: number;
    const stiffness = 0.08;
    const damping = 0.65;

    const updatePhysics = () => {
      animId = requestAnimationFrame(updatePhysics);

      const p = pos.current;
      const t = target.current;

      // Spring equations for trailing inertia
      const ax = (t.x - p.x) * stiffness;
      const ay = (t.y - p.y) * stiffness;

      p.vx = (p.vx + ax) * damping;
      p.vy = (p.vy + ay) * damping;

      p.x += p.vx;
      p.y += p.vy;

      // Position the Specter element
      if (specterRef.current) {
        specterRef.current.style.transform = `translate3d(${p.x - 16}px, ${p.y - 16}px, 0)`;
      }

      // Calculate iris angle redirection
      if (pupilRef.current) {
        const dx = t.x - p.x;
        const dy = t.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 2) {
          const maxOffset = 5; // px maximum movement inside boundary
          const angle = Math.atan2(dy, dx);
          const offsetX = Math.cos(angle) * Math.min(maxOffset, distance * 0.08);
          const offsetY = Math.sin(angle) * Math.min(maxOffset, distance * 0.08);
          
          pupilRef.current.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
        } else {
          pupilRef.current.style.transform = 'translate3d(0, 0, 0)';
        }
      }
    };

    updatePhysics();

    // Blink schedule
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
      }, 140);
    }, 4500);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(blinkInterval);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkViewport);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={specterRef}
      className="fixed left-0 top-0 pointer-events-none z-[9999] will-change-transform"
      style={{ transform: 'translate3d(-100px, -100px, 0)' }}
    >
      {/* Visual Outer Frame: Dual fine borders reflecting industrial style */}
      <div className="relative h-8 w-8 rounded-lg flex items-center justify-center border border-neutral-400/40 dark:border-neutral-600/40 bg-white/20 dark:bg-black/20 backdrop-blur-[3px] shadow-sm transition-all duration-300">
        
        {/* Animated Inner Pupil/Eye */}
        <div 
          className="relative h-4 w-4 rounded-full border border-neutral-800 dark:border-neutral-200 flex items-center justify-center overflow-hidden transition-all duration-200 bg-neutral-50 dark:bg-neutral-900"
          style={{
            height: isBlinking ? '1px' : '16px',
            transform: isBlinking ? 'scaleY(0)' : 'scaleY(1)',
          }}
        >
          {/* Pupil Iris entity offset */}
          <div
            ref={pupilRef}
            className="h-1.5 w-1.5 rounded-full bg-neutral-900 dark:bg-white will-change-transform"
          />
        </div>

        {/* Small operational technical specs line */}
        <span className="absolute -bottom-3 text-[7px] font-mono text-neutral-400 select-none uppercase tracking-widest whitespace-nowrap">
          spctr_v1
        </span>
      </div>
    </div>
  );
}
