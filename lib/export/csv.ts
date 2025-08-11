export function exportCSV(records: any[]): Blob {
  const headers = [
    'id','company','refType','refNumber',
    'date','status','description','photosBefore','photosAfter',
    'startDate','endDate','durationDays','notes',
    'tags','createdAt','updatedAt'
  ];
  if(records.length === 0){
    const content = headers.join(',') + '\n';
    return new Blob([content], { type: 'text/csv' });
  }
  const rows = records.map(r => [
    r.id, r.company, r.refType, r.refNumber,
    r.date ?? '', r.status ?? '', r.description ?? '', (r.photosBefore||[]).join('|'), (r.photosAfter||[]).join('|'),
    r.startDate ?? '', r.endDate ?? '', r.durationDays ?? '', r.notes ?? '',
    (r.tags||[]).join('|'), r.createdAt, r.updatedAt
  ].map(v => typeof v === 'string' ? JSON.stringify(v) : String(v)));
  const content = [headers.join(','), ...rows.map(r => r.join(','))].join('\n') + '\n';
  return new Blob([content], { type: 'text/csv' });
}
