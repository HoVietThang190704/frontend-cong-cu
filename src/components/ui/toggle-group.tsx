"use client";
import React from 'react';
import { cn } from '@/src/lib/utils';

export type ToggleGroupType = 'single' | 'multiple';

export type ToggleGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  type?: ToggleGroupType;
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[] | undefined) => void;
  children?: React.ReactNode;
  className?: string;
};

const ToggleGroupContext = React.createContext<{
  type: ToggleGroupType;
  value?: string | string[];
  toggle: (val: string) => void;
} | null>(null);

export const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(({ type = 'single', value, defaultValue, onValueChange, className, children, ...props }, ref) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState<string | string[] | undefined>(defaultValue);
  const current = isControlled ? value : internalValue;

  const toggle = (val: string) => {
    if (type === 'single') {
      const next = String(current) === val ? undefined : val;
      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
    } else {
      const arr = Array.isArray(current) ? [...current] : [];
      const idx = arr.indexOf(val);
      if (idx === -1) arr.push(val);
      else arr.splice(idx, 1);
      if (!isControlled) setInternalValue(arr);
      onValueChange?.(arr);
    }
  };

  return (
    <ToggleGroupContext.Provider value={{ type, value: current, toggle }}>
      <div ref={ref} role="group" className={cn('inline-flex items-center gap-2', className)} {...props}>
        {children}
      </div>
    </ToggleGroupContext.Provider>
  );
});

ToggleGroup.displayName = 'ToggleGroup';

export type ToggleGroupItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  value: string;
  className?: string;
};

export const ToggleGroupItem: React.FC<ToggleGroupItemProps> = ({ value, className, children, ...props }) => {
  const ctx = React.useContext(ToggleGroupContext);
  if (!ctx) throw new Error('ToggleGroupItem must be used inside ToggleGroup');

  const { value: groupValue, toggle } = ctx;
  const pressed = ctx.type === 'single' ? String(groupValue) === value : Array.isArray(groupValue) && groupValue.includes(value);

  return (
    <button
      {...props}
      role="switch"
      aria-checked={pressed}
      onClick={() => toggle(value)}
      className={cn('rounded-md border px-3 py-1 text-sm transition-colors', pressed ? 'bg-blue-600 text-white' : 'bg-white/6 text-gray-200', className)}
    >
      {children}
    </button>
  );
};

export default ToggleGroup;
