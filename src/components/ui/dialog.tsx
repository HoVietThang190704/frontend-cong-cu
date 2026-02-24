"use client";
import React from 'react';
import { cn } from '@/src/lib/utils/utils';

export type DialogProps = React.HTMLAttributes<HTMLDivElement> & {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
};

const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(({ open = false, onOpenChange, title, children, className, ...props }, ref) => {
  if (!open) return null;

  return (
    <div className={cn('fixed inset-0 z-50 flex items-center justify-center p-4')}>
      <div className="absolute inset-0 bg-black/40" onClick={() => onOpenChange?.(false)} />
      <div ref={ref} className={cn('bg-white rounded shadow-lg max-w-lg w-full p-4 z-10', className)} {...props}>
        {title && <div className="text-lg font-semibold mb-2">{title}</div>}
        <div>{children}</div>
      </div>
    </div>
  );
});

Dialog.displayName = 'Dialog';

export default Dialog;
