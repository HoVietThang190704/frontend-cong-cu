"use client";
import React from 'react';
import { cn } from '@/src/lib/utils/utils';
import Sheet from './sheet';

export type DrawerProps = React.HTMLAttributes<HTMLDivElement> & {
  open?: boolean;
  onClose?: () => void;
  className?: string;
};

const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(({ open = false, onClose, className, children, ...props }, ref) => {
  return (
    <Sheet open={open} side="right" onClose={onClose} className={cn(className)}>
      <div ref={ref} {...props}>
        {children}
      </div>
    </Sheet>
  );
});

Drawer.displayName = 'Drawer';

export default Drawer;
