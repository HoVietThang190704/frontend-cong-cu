"use client";
import React from 'react';
import { cn } from '@/src/lib/utils';

export type CalendarProps = React.InputHTMLAttributes<HTMLInputElement> & {
  value?: string; // YYYY-MM-DD
  onChange?: (value: string) => void;
};

const Calendar = React.forwardRef<HTMLInputElement, CalendarProps>(({ className, value, onChange, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type="date"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className={cn('border rounded px-2 py-1 bg-white/5', className)}
      {...props}
    />
  );
});

Calendar.displayName = 'Calendar';

export default Calendar;