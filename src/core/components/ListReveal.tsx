import React from 'react';
import { motion } from 'framer-motion';

const listRevealMemory = new Set<string>();

export function ListReveal({
  children,
  className = '',
  delay = 0,
  cacheKey,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  cacheKey?: string;
}) {
  const alreadySeen = cacheKey ? listRevealMemory.has(cacheKey) : false;

  if (alreadySeen) {
    return (
      <div
        className={className}
        style={{ opacity: 1, transform: 'translateY(0px)' }}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      onViewportEnter={() => {
        if (cacheKey) listRevealMemory.add(cacheKey);
      }}
    >
      {children}
    </motion.div>
  );
}
