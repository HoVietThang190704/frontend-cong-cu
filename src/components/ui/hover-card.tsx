"use client";
import React from 'react';
import { cn } from '@/src/lib/utils';

export type HoverCardProps = React.HTMLAttributes<HTMLDivElement> & {
  content?: React.ReactNode;
};

const HoverCard: React.FC<HoverCardProps> = ({ content, children, className, ...props }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className={cn('relative inline-block', className)} {...props} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}>
      {children}
      {open ? (
        <div className="absolute z-50 mt-2 w-max rounded-md border border-white/10 bg-slate-950/90 p-2 shadow-lg">{content}</div>
      ) : null}
    </div>
  );
};

HoverCard.displayName = 'HoverCard';

export default HoverCard;
