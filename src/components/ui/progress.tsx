import React from 'react';
import { cn } from '@/src/lib/utils';

export type ProgressProps = React.HTMLAttributes<HTMLDivElement> & {
  value?: number; // 0..100
};

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(({ value = 0, className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('w-full bg-gray-200 rounded overflow-hidden', className)} {...props} role="progressbar" aria-valuenow={value}>
      <div className="h-2 bg-green-500 transition-all" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
});

Progress.displayName = 'Progress';

export default Progress;
