"use client";
import React, { useEffect, useRef } from 'react';
import { cn } from '@/src/lib/utils/utils';

export type CheckboxAdvancedProps = React.InputHTMLAttributes<HTMLInputElement> & {
  indeterminate?: boolean;
  label?: React.ReactNode;
};

const CheckboxAdvanced = React.forwardRef<HTMLInputElement, CheckboxAdvancedProps>(({ className, indeterminate = false, label, ...props }, ref) => {
  const innerRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (innerRef.current) innerRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <label className={cn('inline-flex items-center gap-2 cursor-pointer', className)}>
      <input
        ref={(el) => {
          innerRef.current = el;
          if (typeof ref === 'function') ref(el);
          else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
        }}
        type="checkbox"
        {...props}
      />
      {label && <span className="text-sm select-none">{label}</span>}
    </label>
  );
});

CheckboxAdvanced.displayName = 'CheckboxAdvanced';

export default CheckboxAdvanced;