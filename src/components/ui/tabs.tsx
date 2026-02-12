"use client";
import React, { useState } from 'react';
import { cn } from '@/src/lib/utils';

export type TabItem = { id: string; label: React.ReactNode; content: React.ReactNode };
export type TabsProps = React.HTMLAttributes<HTMLDivElement> & {
  tabs: TabItem[];
  defaultIndex?: number;
  onChange?: (index: number) => void;
};

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(({ className, tabs, defaultIndex = 0, onChange, ...props }, ref) => {
  const [index, setIndex] = useState<number>(defaultIndex);

  function set(i: number) {
    setIndex(i);
    onChange?.(i);
  }

  return (
    <div ref={ref} className={cn('w-full', className)} {...props}>
      <div className="flex gap-2 mb-2">
        {tabs.map((t, i) => (
          <button key={t.id} className={cn('px-3 py-1 rounded', i === index ? 'bg-blue-600 text-white' : 'bg-transparent text-gray-700')} onClick={() => set(i)}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="tab-content">{tabs[index]?.content}</div>
    </div>
  );
});

Tabs.displayName = 'Tabs';

export default Tabs;
