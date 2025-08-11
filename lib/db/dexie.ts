'use client';
import Dexie, { Table } from 'dexie';

export type Company = 'OMAN_OIL' | 'NAMA';
export type RefType = 'WO' | 'WNSC';
export type WOStatus = 'Open' | 'WaitForApproval' | 'Approved' | 'Completed';

export interface BaseRecord {
  id: string;
  company: Company;
  refType: RefType;
  refNumber: string;
  tags?: string[];
  createdAt: number;
  updatedAt: number;
}

export interface WORecord extends BaseRecord {
  refType: 'WO';
  date: number; // epoch ms
  status: WOStatus;
  description?: string;
  photosBefore?: string[]; // asset ids
  photosAfter?: string[];
}

export interface WNSCRecord extends BaseRecord {
  refType: 'WNSC';
  startDate: number;
  endDate?: number;
  durationDays?: number; // calendar days (Asia/Muscat)
  notes?: string;
}

export type AnyRecord = WORecord | WNSCRecord;

export interface PhotoAsset {
  id: string;
  mime: string;
  data: Blob;
  createdAt: number;
}

class RekazDB extends Dexie {
  records!: Table<AnyRecord, string>;
  photoAssets!: Table<PhotoAsset, string>;

  constructor() {
    super('rekazpwa');
    this.version(1).stores({
      records: 'id, refNumber, company, refType, status, date, startDate, endDate, updatedAt',
      photoAssets: 'id, createdAt'
    });
  }
}

export const db = new RekazDB();

export async function saveRecord(rec: AnyRecord){
  rec.updatedAt = Date.now();
  await db.records.put(rec);
  return rec;
}

export async function listRecords(): Promise<AnyRecord[]> {
  return await db.records.orderBy('updatedAt').reverse().toArray();
}

export async function deleteRecord(id: string){
  await db.records.delete(id);
}

export async function getPhoto(id: string){ return db.photoAssets.get(id); }
export async function savePhoto(id: string, mime: string, data: Blob){ return db.photoAssets.put({id, mime, data, createdAt: Date.now()}); }
