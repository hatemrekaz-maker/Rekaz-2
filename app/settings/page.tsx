'use client';
import React, { useContext } from 'react';
import { AppCtx } from '@/lib/providers';

export default function SettingsPage(){
  const ctx = useContext(AppCtx)!;
  return (
    <div className="grid" style={{gap:16}}>
      <h1>الإعدادات</h1>
      <div className="card" style={{display:'flex',gap:12,alignItems:'center'}}>
        <div>الثيم:</div>
        <button className="concave" onClick={()=>ctx.setTheme('OMAN_OIL')}>Oman Oil</button>
        <button className="concave" onClick={()=>ctx.setTheme('NAMA')}>NAMA</button>
      </div>
      <div className="card" style={{display:'flex',gap:12,alignItems:'center'}}>
        <div>اللغة / Language:</div>
        <button className="concave" onClick={()=>ctx.setLang('ar')}>العربية</button>
        <button className="concave" onClick={()=>ctx.setLang('en')}>English</button>
      </div>
      <div className="card">
        <p style={{margin:0}}><strong>Notes</strong></p>
        <ul>
          <li>No seed/demo data. Forms start blank.</li>
          <li>Offline-first after first online visit.</li>
          <li>A2HS supported on iOS.</li>
        </ul>
      </div>
    </div>
  );
}
