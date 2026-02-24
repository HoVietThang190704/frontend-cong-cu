"use client";
import React from 'react';
import { cn } from '@/src/lib/utils/utils';

export type ResizableProps = React.HTMLAttributes<HTMLDivElement> & {
  axis?: 'x' | 'y' | 'both';
  defaultSize?: number; // in pixels for primary axis (width for x, height for y)
  min?: number;
  max?: number;
  onResize?: (size: number) => void;
  handleClassName?: string;
};

const Resizable = React.forwardRef<HTMLDivElement, ResizableProps>(({ axis = 'x', defaultSize = 300, min = 80, max = 1200, onResize, className, handleClassName, children, ...props }, ref) => {
  const [size, setSize] = React.useState<number>(defaultSize);
  const draggingRef = React.useRef(false);
  const startRef = React.useRef<{ x: number; y: number; size: number } | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!draggingRef.current || !startRef.current) return;
      if (axis === 'x' || axis === 'both') {
        const dx = e.clientX - startRef.current.x;
        const next = Math.min(max, Math.max(min, startRef.current.size + dx));
        setSize(next);
        onResize?.(next);
      }
      if (axis === 'y' || axis === 'both') {
        const dy = e.clientY - startRef.current.y;
        const next = Math.min(max, Math.max(min, startRef.current.size + dy));
        setSize(next);
        onResize?.(next);
      }
    };
    const onUp = () => {
      draggingRef.current = false;
      startRef.current = null;
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    if (draggingRef.current) {
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    }
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, [axis, min, max, onResize]);

  const handleDown = (e: React.MouseEvent) => {
    draggingRef.current = true;
    startRef.current = { x: e.clientX, y: e.clientY, size };
    document.body.style.cursor = axis === 'x' ? 'col-resize' : axis === 'y' ? 'row-resize' : 'nwse-resize';
    e.preventDefault();
  };

  const containerStyle: React.CSSProperties = axis === 'x' ? { width: `${size}px` } : axis === 'y' ? { height: `${size}px` } : { width: `${size}px`, height: 'auto' };

  return (
    <div ref={(node) => { containerRef.current = node; if (typeof ref === 'function') ref(node); else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node; }} className={cn('relative flex', className)} style={containerStyle} {...props}>
      <div className="flex-1 overflow-auto">{children}</div>
      <div
        role="separator"
        tabIndex={0}
        aria-orientation={axis === 'x' ? 'vertical' : 'horizontal'}
        onMouseDown={handleDown}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft' && (axis === 'x' || axis === 'both')) setSize((s) => Math.max(min, s - 10));
          if (e.key === 'ArrowRight' && (axis === 'x' || axis === 'both')) setSize((s) => Math.min(max, s + 10));
          if (e.key === 'ArrowUp' && (axis === 'y' || axis === 'both')) setSize((s) => Math.max(min, s - 10));
          if (e.key === 'ArrowDown' && (axis === 'y' || axis === 'both')) setSize((s) => Math.min(max, s + 10));
          onResize?.(size);
        }}
        className={cn('ml-2 -mr-2 inline-flex h-full cursor-col-resize items-center justify-center rounded p-1 text-gray-300 hover:bg-white/5', handleClassName)}
      >
        <div className="h-6 w-0.5 rounded bg-white/20" />
      </div>
    </div>
  );
});

Resizable.displayName = 'Resizable';

export default Resizable;
