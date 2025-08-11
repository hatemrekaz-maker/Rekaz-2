import React from 'react';

export function KpiCard({label, value}:{label:string; value: string | number}){
  return (
    <div className="card">
      <div className="kv"><span>{label}</span><strong>{value}</strong></div>
    </div>
  );
}
