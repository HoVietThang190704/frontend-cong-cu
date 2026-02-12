"use client";
import React from 'react';
import { cn } from '@/src/lib/utils';

export type MineCounterProps = React.HTMLAttributes<HTMLDivElement> & {
  count: number;
};

const MineCounter = React.forwardRef<HTMLDivElement, MineCounterProps>(({ count, className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('font-mono bg-black text-white px-2 py-1 rounded', className)} {...props}>
      {String(Math.max(0, count)).padStart(3, '0')}
    </div>
  );
});

MineCounter.displayName = 'MineCounter';

export default MineCounter;
