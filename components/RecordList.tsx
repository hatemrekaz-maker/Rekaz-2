'use client';
import React, { useEffect, useState } from 'react';
import { db, AnyRecord } from '@/lib/db/dexie';
import { StatusChip } from './StatusChip';

export function RecordList(){
  const [rows, setRows] = useState<AnyRecord[]>([]);
  useEffect(()=>{
    let alive = true;
    db.records.toArray().then(r => { if(alive) setRows(r.reverse()); });
    const sub = db.records.hook('creating', ()=>{});
    // quick refresh button can be added; for simplicity a manual reload suggestion
    return () => { alive = false; };
  }, []);

  if(rows.length === 0) return <div className="card" aria-live="polite">No data yet</div>;

  return (
    <div className="grid" style={{gap:12}}>
      {rows.map(r => (
        <div className="card" key={r.id}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center', gap:8}}>
            <strong>{r.refType} / {r.refNumber} — {r.company}</strong>
            {'status' in r && r.status ? <StatusChip>{(r as any).status}</StatusChip> : (r as any).endDate ? <StatusChip>Completed</StatusChip> : <StatusChip>In Progress</StatusChip>}
          </div>
          <div style={{fontSize:12, color:'#6b7280', marginTop:6}}>
            <div>Created: {new Date(r.createdAt).toLocaleString()}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
