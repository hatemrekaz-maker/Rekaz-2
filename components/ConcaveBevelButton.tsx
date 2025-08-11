'use client';
import { motion, useReducedMotion } from 'framer-motion';
import React from 'react';

export function ConcaveBevelButton({ children, onClick }:{children: React.ReactNode; onClick?: ()=>void;}){
  const reduced = useReducedMotion();
  return (
    <motion.button
      className="concave"
      whileTap={reduced ? undefined : { scale: 0.98, rotate: 0.5 }}
      onClick={onClick}
      aria-pressed="false"
    >
      {children}
    </motion.button>
  );
}
