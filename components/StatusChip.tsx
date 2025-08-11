import React from 'react';
export function StatusChip({children}:{children:React.ReactNode}){
  return <span className="badge">{children}</span>;
}
