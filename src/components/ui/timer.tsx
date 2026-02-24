"use client";
import React, { useEffect, useState } from 'react';
import { cn } from '@/src/lib/utils/utils';

export type TimerProps = React.HTMLAttributes<HTMLDivElement> & {
  running?: boolean;
  startAt?: number; // seconds
  onTick?: (seconds: number) => void;
};

function formatTime(s: number) {
  const mm = Math.floor(s / 60)
    .toString()
    .padStart(2, '0');
  const ss = (s % 60).toString().padStart(2, '0');
  return `${mm}:${ss}`;
}

const Timer = React.forwardRef<HTMLDivElement, TimerProps>(({ running = false, startAt = 0, className, onTick, ...props }, ref) => {
  const [seconds, setSeconds] = useState<number>(startAt);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSeconds((s) => {
        const next = s + 1;
        onTick?.(next);
        return next;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [running, onTick]);

  useEffect(() => {
    const t = setTimeout(() => setSeconds(startAt), 0);
    return () => clearTimeout(t);
  }, [startAt]);

  return (
    <div ref={ref} className={cn('font-mono bg-black text-white px-2 py-1 rounded', className)} {...props}>
      {formatTime(seconds)}
    </div>
  );
});

Timer.displayName = 'Timer';

export default Timer;
