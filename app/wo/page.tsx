'use client';
import React from 'react';
import { WOForm } from '@/components/RecordForm';
import { RecordList } from '@/components/RecordList';

export default function WOPage(){
  return (
    <div className="grid" style={{gap:16}}>
      <h1>WO — Oman Oil</h1>
      <WOForm />
      <RecordList />
    </div>
  );
}
