"use client";
import React from 'react';
import { cn } from '@/src/lib/utils/utils';

export type PopoverProps = React.HTMLAttributes<HTMLDivElement> & {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  align?: 'start' | 'center' | 'end';
  content?: React.ReactNode;
  trigger?: React.ReactNode;
};

const Popover: React.FC<PopoverProps> = ({ open = false, onOpenChange, align = 'center', content, trigger, className, children, ...props }) => {
  const [internalOpen, setInternalOpen] = React.useState(open);
  React.useEffect(() => setInternalOpen(open), [open]);
  const setOpen = (v: boolean) => {
    setInternalOpen(v);
    onOpenChange?.(v);
  };

  const alignClass = align === 'start' ? 'left-0' : align === 'end' ? 'right-0' : 'left-1/2 -translate-x-1/2';

  return (
    <div className={cn('relative inline-block', className)} {...props}>
      <div onClick={() => setOpen(!internalOpen)}>{trigger ?? children}</div>
      {internalOpen ? (
        <div className={cn('absolute z-50 mt-2 w-max rounded-md border border-white/10 bg-slate-950/90 p-3 shadow-lg', alignClass)} role="dialog">
          {content}
        </div>
      ) : null}
    </div>
  );
};

Popover.displayName = 'Popover';

export default Popover;
