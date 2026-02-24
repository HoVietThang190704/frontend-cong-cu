"use client";
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/src/lib/utils/utils';

export type ContextMenuProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
  children?: React.ReactNode;
  menu?: React.ReactNode;
};

const ContextMenu = React.forwardRef<HTMLDivElement, ContextMenuProps>(({ className, children, menu, ...props }, ref) => {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    }
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, []);

  function onContext(e: React.MouseEvent) {
    e.preventDefault();
    setPos({ x: e.clientX, y: e.clientY });
    setOpen(true);
  }

  return (
    <div ref={containerRef} className={cn('relative', className)} {...props} onContextMenu={onContext}>
      {children}
      {open && (
        <div
          style={{ left: pos.x, top: pos.y }}
          className={cn('fixed z-50 min-w-[150px] bg-white border rounded shadow-md p-1')}
        >
          {menu ?? <div className="px-3 py-1 text-sm">No menu</div>}
        </div>
      )}
    </div>
  );
});

ContextMenu.displayName = 'ContextMenu';

export default ContextMenu;
