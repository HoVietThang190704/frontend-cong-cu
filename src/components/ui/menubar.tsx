"use client";
import React from 'react';
import { cn } from '@/src/lib/utils';

export type MenubarProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
};

const Menubar = React.forwardRef<HTMLDivElement, MenubarProps>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} role="menubar" className={cn('flex items-center gap-2 px-2 py-1 bg-transparent', className)} {...props}>
      {children}
    </div>
  );
});

Menubar.displayName = 'Menubar';

export default Menubar;
