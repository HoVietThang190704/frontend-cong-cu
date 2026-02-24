"use client";
import React from 'react';
import { cn } from '@/src/lib/utils/utils';

export type CellProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  revealed?: boolean;
  flagged?: boolean;
  mine?: boolean;
  adjacent?: number;
};

const Cell = React.forwardRef<HTMLButtonElement, CellProps>(
  ({ className, revealed, flagged, mine, adjacent, ...props }, ref) => {
    const base = 'w-8 h-8 flex items-center justify-center border border-gray-300 select-none text-sm font-medium';

    const content = flagged ? '🚩' : revealed ? (mine ? '💣' : adjacent ? String(adjacent) : '') : '';

    return (
      <button
        ref={ref}
        className={cn(base, className, revealed ? 'bg-gray-200' : 'bg-gray-100')}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Cell.displayName = 'Cell';

export default Cell;
