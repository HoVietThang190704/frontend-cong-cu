"use client";
import React from 'react';
import { cn } from '@/src/lib/utils';

export type AlertDialogProps = React.HTMLAttributes<HTMLDivElement> & {
  open?: boolean;
  title?: React.ReactNode;
  description?: React.ReactNode;
  onClose?: () => void;
  actions?: React.ReactNode;
  role?: 'alertdialog' | 'dialog';
};

const AlertDialog = React.forwardRef<HTMLDivElement, AlertDialogProps>(({ open = false, title, description, onClose, actions, role = 'alertdialog', className, children, ...props }, ref) => {
  // Call hooks unconditionally to satisfy the Rules of Hooks
  const titleId = React.useId();
  const descriptionId = React.useId();

  if (!open) return null;

  return (
    <div className={cn('fixed inset-0 z-50 flex items-center justify-center p-4')}>
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div ref={ref} role={role} aria-modal="true" aria-labelledby={title ? titleId : undefined} aria-describedby={description ? descriptionId : undefined} className={cn('relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-slate-950/80 p-6 shadow-lg', className)} {...props}>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            {title ? <h2 id={titleId} className="text-lg font-semibold text-white">{title}</h2> : null}
            {description ? <p id={descriptionId} className="mt-1 text-sm text-gray-300">{description}</p> : null}
          </div>
          <button aria-label="Close" onClick={onClose} className="-mr-2 ml-2 rounded-md border border-white/6 bg-transparent p-1 text-gray-300 hover:bg-white/5">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
          </button>
        </div>
        <div className="mt-4 text-sm text-gray-200">{children}</div>
        {actions ? <div className="mt-6 flex justify-end gap-3">{actions}</div> : null}
      </div>
    </div>
  );
});

AlertDialog.displayName = 'AlertDialog';

export default AlertDialog;
