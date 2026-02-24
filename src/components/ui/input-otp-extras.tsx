"use client";
import React from 'react';
import { cn } from '@/src/lib/utils/utils';
import InputOTP, { InputOTPProps } from './input-otp';

export type InputOTPExtrasProps = InputOTPProps & {
  helperText?: React.ReactNode;
  status?: 'idle' | 'error' | 'success';
  resendDelay?: number;
  onResend?: () => Promise<void> | void;
  onComplete?: (code: string) => void;
};

const statusStyles: Record<NonNullable<InputOTPExtrasProps['status']>, { container: string; text: string }> = {
  idle: {
    container: 'border-white/10 bg-slate-950/40',
    text: 'text-gray-400',
  },
  error: {
    container: 'border-red-500/40 bg-red-500/5',
    text: 'text-red-400',
  },
  success: {
    container: 'border-emerald-400/40 bg-emerald-400/5',
    text: 'text-emerald-400',
  },
};

const InputOTPExtras = React.forwardRef<HTMLDivElement, InputOTPExtrasProps>(({ className, helperText, status = 'idle', resendDelay = 30, onResend, onComplete, length = 6, value, onChange, ...props }, ref) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState(value ?? '');
  const [cooldown, setCooldown] = React.useState(0);
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const resolvedValue = isControlled ? value ?? '' : internalValue;

  React.useEffect(() => {
    if (!isControlled) return;
    setInternalValue(value ?? '');
  }, [isControlled, value]);

  React.useEffect(() => {
    if (!cooldown) return undefined;
    timerRef.current = setInterval(() => {
      setCooldown((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [cooldown]);

  const handleChange = (next: string) => {
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
    if (next.replace(/\s/g, '').length === length) onComplete?.(next);
  };

  const handleResend = async () => {
    if (!onResend || cooldown > 0) return;
    await onResend();
    if (resendDelay > 0) setCooldown(resendDelay);
  };

  const statusConfig = statusStyles[status];
  const filled = resolvedValue.replace(/\s/g, '').length;

  return (
    <div ref={ref} className={cn('space-y-3 rounded-2xl border p-4 shadow-inner backdrop-blur', statusConfig.container, className)}>
      <div className="flex items-center justify-between text-[11px] uppercase tracking-wide text-gray-400">
        <span>Verification code</span>
        <span className="font-mono text-xs text-gray-300">
          {filled}/{length}
        </span>
      </div>
      <InputOTP {...props} length={length} value={resolvedValue} onChange={handleChange} className="justify-between" />
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
        <button type="button" onClick={handleResend} disabled={!onResend || cooldown > 0} className={cn('rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-white transition hover:border-white/40 disabled:cursor-not-allowed disabled:opacity-60')}>
          {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend code'}
        </button>
        <span className="text-gray-300">Need help? <span className="text-white">Contact support</span></span>
      </div>
      {helperText ? <p className={cn('text-xs', statusConfig.text)}>{helperText}</p> : null}
    </div>
  );
});

InputOTPExtras.displayName = 'InputOTPExtras';

export default InputOTPExtras;
