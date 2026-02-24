"use client";
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/src/lib/utils/utils';

export type InputOTPProps = {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  autoFocus?: boolean;
  className?: string;
};

const InputOTP = React.forwardRef<HTMLDivElement, InputOTPProps>(({ length = 6, value = '', onChange, autoFocus = false, className }, ref) => {
  const isControlled = value !== undefined;
  const [internalVals, setInternalVals] = useState<string[]>(() => Array.from({ length }, (_, i) => value?.[i] ?? ''));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  // Derive a view of internal values that matches `length` without setting state in an effect
  const adjustedInternalVals = internalVals.length === length ? internalVals : Array.from({ length }, (_, i) => internalVals[i] ?? '');

  useEffect(() => {
    if (autoFocus) inputsRef.current[0]?.focus();
  }, [autoFocus]);

  const vals = isControlled ? Array.from({ length }, (_, i) => value[i] ?? '') : adjustedInternalVals;

  function setAt(i: number, ch: string) {
    const char = ch.slice(-1);
    if (isControlled) {
      const copy = Array.from({ length }, (_, j) => value[j] ?? '');
      copy[i] = char;
      onChange?.(copy.join(''));
    } else {
      const copy = internalVals.slice();
      copy[i] = char;
      setInternalVals(copy);
      onChange?.(copy.join(''));
    }
  }

  function onKey(e: React.KeyboardEvent, i: number) {
    if (e.key === 'Backspace' && !vals[i] && i > 0) {
      inputsRef.current[i - 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && i > 0) inputsRef.current[i - 1]?.focus();
    if (e.key === 'ArrowRight' && i < length - 1) inputsRef.current[i + 1]?.focus();
  }

  return (
    <div ref={ref} className={cn('flex gap-2', className)}>
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          ref={(el) => { inputsRef.current[i] = el }}
          value={vals[i] ?? ''}
          onChange={(e) => {
            const v = e.target.value.replace(/\s/g, '').slice(-1);
            setAt(i, v);
            if (v && i < length - 1) inputsRef.current[i + 1]?.focus();
          }}
          onKeyDown={(e) => onKey(e, i)}
          inputMode="numeric"
          className="w-10 h-10 text-center border rounded"
        />
      ))}
    </div>
  );
});

InputOTP.displayName = 'InputOTP';

export default InputOTP;