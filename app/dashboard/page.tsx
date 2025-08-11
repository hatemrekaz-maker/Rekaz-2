'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { AnyRecord } from '@/lib/db/dexie';
import { db } from '@/lib/db/dexie';
import { KpiCard } from '@/components/KpiCard';
import { ChartCompletedOverTime } from '@/components/ChartCompletedOverTime';
import { ChartStatusBreakdown } from '@/components/ChartStatusBreakdown';
import { ChartWnscDurations } from '@/components/ChartWnscDurations';
import { bucketByDay, histogram } from '@/lib/chart-helpers';
import { ConcaveBevelButton } from '@/components/ConcaveBevelButton';
import { exportCSV } from '@/lib/export/csv';

export default function DashboardPage(){
  const [rows, setRows] = useState<AnyRecord[]>([]);

  useEffect(()=>{
    let alive = true;
    db.records.toArray().then(r => { if(alive) setRows(r); });
    return ()=>{ alive = false; };
  }, []);

  const woCompleted = useMemo(()=> rows.filter(r => r.refType==='WO' && (r as any).status === 'Completed').length, [rows]);
  const wnscCompleted = useMemo(()=> rows.filter(r => r.refType==='WNSC' && (r as any).endDate).length, [rows]);
  const avgWnsc = useMemo(()=> {
    const x = rows.filter(r => r.refType==='WNSC' && (r as any).durationDays).map(r => (r as any).durationDays as number);
    if(x.length === 0) return '—';
    const avg = x.reduce((a,b)=>a+b,0) / x.length;
    return avg.toFixed(1);
  }, [rows]);

  const completedOverTime = useMemo(()=>{
    const completed = rows.filter(r => (r.refType==='WO' && (r as any).status === 'Completed') || (r.refType==='WNSC' && (r as any).endDate));
    return bucketByDay(completed, r => r.refType==='WO' ? (r as any).date : (r as any).endDate);
  }, [rows]);

  const statusBreakdown = useMemo(()=>{
    const wo = rows.filter(r => r.refType==='WO') as any[];
    const statuses = ['Open','WaitForApproval','Approved','Completed'];
    return statuses.map(s => ({ status: s, count: wo.filter(r => r.status===s).length }));
  }, [rows]);

  const wnscDurations = useMemo(()=>{
    const nums = rows.filter(r => r.refType==='WNSC' && (r as any).durationDays).map(r => (r as any).durationDays as number);
    return histogram(nums, 1);
  }, [rows]);

  function handleExportCSV(){
    const blob = exportCSV(rows);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'records.csv'; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid" style={{gap:16}}>
      <div className="grid kpi">
        <KpiCard label="إجمالي السجلات" value={rows.length} />
        <KpiCard label="WO مكتملة" value={woCompleted} />
        <KpiCard label="WNSC مكتملة" value={wnscCompleted} />
        <KpiCard label="متوسط مدة WNSC (يوم)" value={avgWnsc} />
      </div>
      <div style={{display:'flex', gap:8}}>
        <ConcaveBevelButton onClick={handleExportCSV}>تصدير CSV</ConcaveBevelButton>
      </div>
      <ChartCompletedOverTime data={completedOverTime} />
      <ChartStatusBreakdown data={statusBreakdown} />
      <ChartWnscDurations data={wnscDurations} />
    </div>
  );
}
