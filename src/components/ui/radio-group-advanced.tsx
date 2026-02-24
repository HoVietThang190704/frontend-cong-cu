"use client";
import React, { useCallback } from 'react';
import { cn } from '@/src/lib/utils/utils';

export type RadioOption = { label: React.ReactNode; value: string };
export type RadioGroupAdvancedProps = React.HTMLAttributes<HTMLDivElement> & {
  name?: string;
  value?: string;
  defaultValue?: string;
  options: RadioOption[];
  onChange?: (value: string) => void;
};

const RadioGroupAdvanced = React.forwardRef<HTMLDivElement, RadioGroupAdvancedProps>(({ className, options, name, value, defaultValue, onChange, ...props }, ref) => {
  const onKey = useCallback((e: React.KeyboardEvent, i: number) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      const next = (i + 1) % options.length;
      onChange?.(options[next].value);
      const el = (e.currentTarget as HTMLElement).parentElement?.querySelectorAll('[role="radio"]')[next] as HTMLElement | undefined;
      el?.focus();
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      const prev = (i - 1 + options.length) % options.length;
      onChange?.(options[prev].value);
      const el = (e.currentTarget as HTMLElement).parentElement?.querySelectorAll('[role="radio"]')[prev] as HTMLElement | undefined;
      el?.focus();
    }
  }, [options, onChange]);

  return (
    <div ref={ref} role="radiogroup" className={cn('flex gap-2 items-center', className)} {...props}>
      {options.map((opt, i) => {
        const checked = value !== undefined ? value === opt.value : defaultValue === opt.value;
        return (
          <div
            key={opt.value}
            role="radio"
            tabIndex={0}
            aria-checked={checked}
            className={cn('inline-flex items-center gap-2 cursor-pointer', checked ? 'font-semibold' : '')}
            onClick={() => onChange?.(opt.value)}
            onKeyDown={(e) => onKey(e, i)}
          >
            <span className="w-3 h-3 rounded-full border flex items-center justify-center">
              {checked && <span className="w-2 h-2 rounded-full bg-black" />}
            </span>
            <span className="text-sm select-none">{opt.label}</span>
          </div>
        );
      })}
    </div>
  );
});

RadioGroupAdvanced.displayName = 'RadioGroupAdvanced';

export default RadioGroupAdvanced;