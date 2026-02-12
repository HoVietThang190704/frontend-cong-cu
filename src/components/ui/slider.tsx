"use client";
import React from 'react';
import { cn } from '@/src/lib/utils';

export type SliderMark = {
  value: number;
  label?: React.ReactNode;
};

export type SliderProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  showValue?: boolean;
  formatValue?: (value: number) => React.ReactNode;
  marks?: SliderMark[];
  onValueChange?: (value: number) => void;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(({ className, min = 0, max = 100, step = 1, value, defaultValue, disabled, showValue = true, formatValue = (val) => `${val}`, marks = [], onChange, onValueChange, ...props }, ref) => {
  const isControlled = value !== undefined;
  const numericMin = Number(min);
  const numericMax = Number(max);
  const range = Math.max(1, numericMax - numericMin);
  const [internalValue, setInternalValue] = React.useState<number>(() => {
    if (typeof value === 'number') return value;
    if (typeof defaultValue === 'number') return Number(defaultValue);
    return numericMin;
  });

  const currentValue = clamp(
    isControlled && typeof value === 'number' ? value : internalValue,
    numericMin,
    numericMax,
  );

  const progress = ((currentValue - numericMin) / range) * 100;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const next = Number(event.target.value);
    if (!isControlled) setInternalValue(next);
    onValueChange?.(next);
    onChange?.(event);
  };

  const markItems = marks.filter((mark) => typeof mark.value === 'number').map((mark, index) => {
    const ratio = clamp((mark.value - numericMin) / range, 0, 1);
    const offset = `${ratio * 100}%`;
    return (
      <div key={`${mark.value}-${index}`} className="absolute flex flex-col items-center text-[10px] text-gray-400" style={{ left: offset }}>
        <span className="block h-2 w-px bg-white/40" />
        {mark.label ? <span className="mt-1 whitespace-nowrap">{mark.label}</span> : null}
      </div>
    );
  });

  return (
    <div className={cn('flex flex-col gap-2 text-sm text-gray-200', className)} aria-disabled={disabled}>
      <div className={cn('rounded-2xl border border-white/10 bg-white/5 p-3 shadow-inner backdrop-blur', disabled ? 'opacity-60' : undefined)}>
        <div className="relative h-6 w-full select-none">
          <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-white/10" />
          <div className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-blue-500 transition-[width]" style={{ width: `${progress}%` }} />
          <div className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border border-white/70 bg-blue-500 shadow-lg transition-[left]" style={{ left: `calc(${progress}% - 8px)` }} />
          <input ref={ref} type="range" min={min} max={max} step={step} value={currentValue} disabled={disabled} onChange={handleChange} {...props} className="absolute inset-0 h-6 w-full cursor-pointer opacity-0" />
        </div>
        {marks.length ? <div className="relative mt-4 h-6 w-full">{markItems}</div> : null}
      </div>
      {showValue ? (
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span className="font-medium text-white">{formatValue(currentValue)}</span>
          <span>
            {numericMin} – {numericMax}
          </span>
        </div>
      ) : null}
    </div>
  );
});

Slider.displayName = 'Slider';

export default Slider;
