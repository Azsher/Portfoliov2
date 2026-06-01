'use client';

import React, { useEffect, useState } from 'react';

interface HeroRoleTypewriterProps {
  language: 'es' | 'en';
}

const rolesByLanguage: Record<'es' | 'en', string[]> = {
  es: ['Full Stack Engineer', 'Arquitecto de Automatizaciones', 'L\u00edder T\u00e9cnico de IA'],
  en: ['Senior Full Stack Developer', 'Automation Architect', 'Systems & AI Tech Lead'],
};

function HeroRoleTypewriter({ language }: HeroRoleTypewriterProps) {
  const [typedRole, setTypedRole] = useState('');

  useEffect(() => {
    const roles = rolesByLanguage[language];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const currentRole = roles[roleIdx];
      if (!isDeleting) {
        setTypedRole(currentRole.substring(0, charIdx + 1));
        charIdx++;
        if (charIdx === currentRole.length) {
          isDeleting = true;
          timer = setTimeout(tick, 2200);
        } else {
          timer = setTimeout(tick, 60);
        }
      } else {
        setTypedRole(currentRole.substring(0, charIdx - 1));
        charIdx--;
        if (charIdx === 0) {
          isDeleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
          timer = setTimeout(tick, 400);
        } else {
          timer = setTimeout(tick, 30);
        }
      }
    };

    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, [language]);

  return <span>{'> '} {typedRole}</span>;
}

export default React.memo(HeroRoleTypewriter);
