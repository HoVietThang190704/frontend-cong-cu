"use client";
import React from 'react';
import { cn } from '@/src/lib/utils/utils';

export type SidebarProps = React.HTMLAttributes<HTMLElement> & {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(({ className, children, open = true, onOpenChange, ...props }, ref) => {
  if (!open) return null;
  return (
    <aside ref={ref} className={cn('w-64 bg-white/5 border-r p-4', className)} {...props}>
      <div className="flex justify-end mb-2">
        <button className="text-sm text-gray-500" onClick={() => onOpenChange?.(false)}>Close</button>
      </div>
      {children}
    </aside>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
