'use client';
import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { db, saveRecord } from '@/lib/db/dexie';
import { durationDays, MUSCAT_TZ } from '@/lib/chart-helpers';
import { ConcaveBevelButton } from './ConcaveBevelButton';

type WOStatus = 'Open' | 'WaitForApproval' | 'Approved' | 'Completed';

function toEpoch(dateStr?: string){
  if(!dateStr) return undefined;
  const d = new Date(dateStr + 'T00:00:00+04:00'); // Asia/Muscat offset; no auto fill
  return d.getTime();
}

export function WOForm(){
  const [refNumber, setRefNumber] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState<WOStatus | ''>('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string|undefined>();

  async function onSubmit(e: React.FormEvent){
    e.preventDefault();
    setError(undefined);
    if(!refNumber) return setError('refNumber required');
    if(!date) return setError('date required');
    if(!status) return setError('status required');

    const now = Date.now();
    await saveRecord({
      id: uuid(),
      company: 'OMAN_OIL',
      refType: 'WO',
      refNumber,
      date: toEpoch(date)!,
      status: status as WOStatus,
      description: description || undefined,
      createdAt: now,
      updatedAt: now
    } as any);
    setRefNumber(''); setDate(''); setStatus(''); setDescription('');
    alert('Saved');
  }

  return (
    <form className="card grid" style={{gap:12}} onSubmit={onSubmit}>
      <div><label>WO Number*</label><input value={refNumber} onChange={e=>setRefNumber(e.target.value)} placeholder="" /></div>
      <div><label>Date*</label><input type="date" value={date} onChange={e=>setDate(e.target.value)} /></div>
      <div>
        <label>Status*</label>
        <select value={status} onChange={e=>setStatus(e.target.value as any)}>
          <option value="">--</option>
          <option>Open</option>
          <option>WaitForApproval</option>
          <option>Approved</option>
          <option>Completed</option>
        </select>
      </div>
      <div><label>Description</label><textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="" /></div>
      {error && <div role="alert" style={{color:'crimson'}}>{error}</div>}
      <div><ConcaveBevelButton>Save</ConcaveBevelButton></div>
    </form>
  );
}

export function WNSCForm(){
  const [refNumber, setRefNumber] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string|undefined>();

  async function onSubmit(e: React.FormEvent){
    e.preventDefault();
    setError(undefined);
    if(!refNumber) return setError('wnscNumber required');
    if(!startDate) return setError('startDate required');
    const s = new Date(startDate + 'T00:00:00+04:00').getTime();
    const eMs = endDate ? new Date(endDate + 'T00:00:00+04:00').getTime() : undefined;
    if(eMs && eMs < s) return setError('endDate must be >= startDate');

    const now = Date.now();
    const dur = eMs ? (durationDays(s, eMs)) : undefined;

    await saveRecord({
      id: uuid(),
      company: 'NAMA',
      refType: 'WNSC',
      refNumber,
      startDate: s,
      endDate: eMs,
      durationDays: dur,
      notes: notes || undefined,
      createdAt: now,
      updatedAt: now
    } as any);
    setRefNumber(''); setStartDate(''); setEndDate(''); setNotes('');
    alert('Saved');
  }

  return (
    <form className="card grid" style={{gap:12}} onSubmit={onSubmit}>
      <div><label>WNSC Number*</label><input value={refNumber} onChange={e=>setRefNumber(e.target.value)} placeholder="" /></div>
      <div><label>Start Date*</label><input type="date" value={startDate} onChange={e=>setStartDate(e.target.value)} /></div>
      <div><label>End Date</label><input type="date" value={endDate} onChange={e=>setEndDate(e.target.value)} /></div>
      <div><label>Notes</label><textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="" /></div>
      {error && <div role="alert" style={{color:'crimson'}}>{error}</div>}
      <div><ConcaveBevelButton>Save</ConcaveBevelButton></div>
    </form>
  );
}
