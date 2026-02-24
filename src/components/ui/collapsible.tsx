"use client";
import React from 'react';
import { cn } from '@/src/lib/utils/utils';

export type CollapsibleProps = React.HTMLAttributes<HTMLDivElement> & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  disabled?: boolean;
  className?: string;
};

const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(({ open, defaultOpen = false, onOpenChange, title, disabled = false, className, children, ...props }, ref) => {
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = React.useState<boolean>(defaultOpen);
  const isOpen = isControlled ? Boolean(open) : internalOpen;

  React.useEffect(() => {
    if (isControlled) setInternalOpen(Boolean(open));
  }, [isControlled, open]);

  const setOpen = (v: boolean) => {
    if (!isControlled) setInternalOpen(v);
    onOpenChange?.(v);
  };

  return (
    <div ref={ref} className={cn('rounded-md border border-white/6 p-3', className)} {...props}>
      <div className="flex items-center justify-between">
        <div className={cn('font-medium text-white', disabled ? 'opacity-50' : '')}>{title}</div>
        <button
          type="button"
          aria-expanded={isOpen}
          onClick={() => !disabled && setOpen(!isOpen)}
          disabled={disabled}
          className={cn('rounded-md border border-white/6 p-1 text-gray-300 hover:bg-white/5', disabled ? 'cursor-not-allowed' : '')}
        >
          <svg className={cn('h-4 w-4 transition-transform', isOpen ? 'rotate-180' : 'rotate-0')} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
        </button>
      </div>
      <div className="mt-3 text-sm text-gray-300" hidden={!isOpen}>
        {isOpen ? children : null}
      </div>
    </div>
  );
});

Collapsible.displayName = 'Collapsible';

export default Collapsible;
