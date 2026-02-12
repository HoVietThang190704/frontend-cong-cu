"use client";
import React from 'react';
import { cn } from '@/src/lib/utils';

export type SheetSide = 'left' | 'right' | 'top' | 'bottom';
export type SheetProps = React.HTMLAttributes<HTMLDivElement> & {
  open?: boolean;
  side?: SheetSide;
  onClose?: () => void;
  className?: string;
};

const Sheet = React.forwardRef<HTMLDivElement, SheetProps>(({ open = false, side = 'right', onClose, className, children, ...props }, ref) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <aside ref={ref} className={cn('relative z-50 flex h-full flex-col bg-slate-950/90 shadow-xl', side === 'right' ? 'ml-auto w-full md:w-96' : 'w-full md:w-96', className)} {...props}>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div />
            <button aria-label="Close" onClick={onClose} className="rounded-md border border-white/6 bg-transparent p-1 text-gray-300 hover:bg-white/5">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
            </button>
          </div>
          <div className="mt-4">{children}</div>
        </div>
      </aside>
    </div>
  );
});

Sheet.displayName = 'Sheet';

export default Sheet;
