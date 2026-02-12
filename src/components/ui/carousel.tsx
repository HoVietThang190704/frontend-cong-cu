"use client";
import React from 'react';
import { cn } from '@/src/lib/utils';

export type CarouselProps = React.HTMLAttributes<HTMLDivElement> & {
  items: React.ReactNode[];
  currentIndex?: number;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  loop?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
};

const Carousel: React.FC<CarouselProps> = ({ items, currentIndex, defaultIndex = 0, onIndexChange, loop = true, autoPlay = false, autoPlayInterval = 4000, className, ...props }) => {
  const isControlled = currentIndex !== undefined;
  const [internalIndex, setInternalIndex] = React.useState<number>(defaultIndex);
  const index = isControlled ? (currentIndex as number) : internalIndex;

  const next = React.useCallback((step = 1) => {
    let nextIndex = index + step;
    if (nextIndex >= items.length) nextIndex = loop ? 0 : items.length - 1;
    if (!isControlled) setInternalIndex(nextIndex);
    onIndexChange?.(nextIndex);
  }, [index, isControlled, items.length, loop, onIndexChange]);

  const prev = React.useCallback(() => {
    let nextIndex = index - 1;
    if (nextIndex < 0) nextIndex = loop ? items.length - 1 : 0;
    if (!isControlled) setInternalIndex(nextIndex);
    onIndexChange?.(nextIndex);
  }, [index, isControlled, items.length, loop, onIndexChange]);

  React.useEffect(() => {
    if (!autoPlay) return;
    const t = setInterval(() => next(), autoPlayInterval);
    return () => clearInterval(t);
  }, [autoPlay, next, autoPlayInterval]);

  return (
    <div className={cn('relative', className)} {...props}>
      <div className="overflow-hidden">
        <div className="flex transition-transform" style={{ transform: `translateX(-${index * 100}%)`, width: `${items.length * 100}%` }}>
          {items.map((item, idx) => (
            <div key={idx} className="flex-shrink-0 w-full">
              {item}
            </div>
          ))}
        </div>
      </div>
      <button aria-label="Previous" onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/6 p-2">‹</button>
      <button aria-label="Next" onClick={() => next()} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/6 p-2">›</button>
      <div className="mt-2 flex items-center justify-center gap-2">
        {items.map((_, idx) => (
          <button key={idx} aria-label={`Go to slide ${idx + 1}`} onClick={() => { if (!isControlled) setInternalIndex(idx); onIndexChange?.(idx); }} className={cn('h-2 w-8 rounded-full transition-all', idx === index ? 'bg-white/90 w-8' : 'bg-white/20 w-6') } />
        ))}
      </div>
    </div>
  );
};

Carousel.displayName = 'Carousel';

export default Carousel;
