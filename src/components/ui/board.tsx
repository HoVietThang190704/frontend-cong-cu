"use client";
import React from 'react';
import { cn } from '@/src/lib/utils/utils';

export type BoardProps = React.HTMLAttributes<HTMLDivElement> & {
  rows: number;
  cols: number;
  children?: React.ReactNode;
};

const Board = React.forwardRef<HTMLDivElement, BoardProps>(({ rows, cols, className, children, ...props }, ref) => {
  const style: React.CSSProperties = { gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` };

  return (
    <div ref={ref} style={style} className={cn('grid gap-0', className)} {...props}>
      {children}
    </div>
  );
});

Board.displayName = 'Board';

export default Board;
