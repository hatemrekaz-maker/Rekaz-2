'use client';
import React, { createContext, useEffect, useMemo, useState } from 'react';
type Theme = 'OMAN_OIL' | 'NAMA'; type Lang = 'ar' | 'en';
export const AppCtx = createContext<{theme:Theme; setTheme:(t:Theme)=>void; lang:Lang; setLang:(l:Lang)=>void;}|null>(null);
export function Providers({ children }:{children:React.ReactNode}){
  const [theme, setTheme] = useState<Theme>(() => (typeof window !== 'undefined' && localStorage.getItem('theme') === 'NAMA') ? 'NAMA' : 'OMAN_OIL');
  const [lang, setLang] = useState<Lang>(() => (typeof window !== 'undefined' && (localStorage.getItem('lang') as Lang)) || 'ar');
  useEffect(()=>{ localStorage.setItem('theme', theme); document.documentElement.className = theme==='NAMA' ? 'theme-nam' : 'theme-oml'; }, [theme]);
  useEffect(()=>{ localStorage.setItem('lang', lang); document.documentElement.lang = lang; document.documentElement.dir = lang==='ar' ? 'rtl' : 'ltr'; }, [lang]);
  const value = useMemo(()=>({ theme, setTheme, lang, setLang }), [theme, lang]);
  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}