import { zonedTimeToUtc, utcToZonedTime, formatInTimeZone } from 'date-fns-tz';
import { startOfDay, differenceInCalendarDays, parseISO } from 'date-fns';

export const MUSCAT_TZ = 'Asia/Muscat';

export function toMuscatDate(ms: number){ return utcToZonedTime(ms, MUSCAT_TZ); }
export function startOfMuscatDay(ms: number){ return startOfDay(utcToZonedTime(ms, MUSCAT_TZ)); }

export function durationDays(startMs: number, endMs: number){
  // calendar days in Asia/Muscat
  const s = startOfMuscatDay(startMs);
  const e = startOfMuscatDay(endMs);
  return Math.max(0, differenceInCalendarDays(e, s) + 1);
}

export function bucketByDay(records: any[], accessor: (r:any)=>number | undefined){
  const map = new Map<string, number>();
  for(const r of records){
    const ms = accessor(r);
    if(!ms) continue;
    const key = formatInTimeZone(ms, MUSCAT_TZ, 'yyyy-MM-dd');
    map.set(key, (map.get(key) || 0) + 1);
  }
  return Array.from(map.entries()).sort(([a],[b])=>a.localeCompare(b)).map(([date,count])=>({date,count}));
}

export function histogram(numbers: number[], binSize = 1){
  if(numbers.length === 0) return [];
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);
  const start = Math.floor(min / binSize) * binSize;
  const end = Math.ceil(max / binSize) * binSize;
  const bins: {bin: string, count: number}[] = [];
  for(let x = start; x <= end; x += binSize){
    bins.push({bin: `${x}-${x+binSize-1}`, count: 0});
  }
  for(const n of numbers){
    const idx = Math.floor((n - start) / binSize);
    if(bins[idx]) bins[idx].count++;
  }
  return bins;
}
