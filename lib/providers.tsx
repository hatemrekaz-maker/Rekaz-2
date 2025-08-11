'use client';

import React, { createContext, useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';

type Theme = 'OMAN_OIL' | 'NAMA';
type Lang = 'ar' | 'en';

export const AppCtx = createContext<{
  theme: Theme; setTheme: (t:Theme)=>void;
  lang: Lang; setLang: (l:Lang)=>void;
  filters: any; setFilters: (f:any)=>void;
} | null>(null);

export function Providers({ children }:{children: React.ReactNode}){
  const [theme, setTheme] = useState<Theme>(() => (typeof window !== 'undefined' && localStorage.getItem('theme') === 'NAMA') ? 'NAMA' : 'OMAN_OIL');
  const [lang, setLang] = useState<Lang>(() => (typeof window !== 'undefined' && (localStorage.getItem('lang') as Lang)) || 'ar');
  const [filters, setFilters] = useState<any>(() => {
    if (typeof window === 'undefined') return {};
    try { return JSON.parse(localStorage.getItem('filters') || '{}'); } catch { return {}; }
  });

  useEffect(()=>{ document.documentElement.classList.toggle('theme-oml', theme==='OMAN_OIL'); document.documentElement.classList.toggle('theme-nam', theme==='NAMA'); localStorage.setItem('theme', theme); }, [theme]);
  useEffect(()=>{ localStorage.setItem('lang', lang); document.documentElement.lang = lang; document.documentElement.dir = lang==='ar' ? 'rtl' : 'ltr'; }, [lang]);
  useEffect(()=>{ localStorage.setItem('filters', JSON.stringify(filters)); }, [filters]);

  const value = useMemo(()=>({ theme, setTheme, lang, setLang, filters, setFilters }), [theme, lang, filters]);

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}
