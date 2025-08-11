'use client';
import React from 'react';
import { WNSCForm } from '@/components/RecordForm';
import { RecordList } from '@/components/RecordList';

export default function WNSCPage(){
  return (
    <div className="grid" style={{gap:16}}>
      <h1>WNSC — NAMA</h1>
      <WNSCForm />
      <RecordList />
    </div>
  );
}
