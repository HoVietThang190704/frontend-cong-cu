"use client";
import React from 'react';
import { cn } from '@/src/lib/utils/utils';

export type ToggleProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  label?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
};

const sizeMap: Record<string, string> = {
  sm: 'h-6 w-10',
  md: 'h-8 w-12',
  lg: 'h-10 w-14',
};

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(({ pressed, defaultPressed = false, onPressedChange, label, size = 'md', className, children, ...props }, ref) => {
  const isControlled = pressed !== undefined;
  const [internalPressed, setInternalPressed] = React.useState<boolean>(defaultPressed);
  const isPressed = isControlled ? Boolean(pressed) : internalPressed;

  const handle = (next?: boolean) => {
    const v = typeof next === 'boolean' ? next : !isPressed;
    if (!isControlled) setInternalPressed(v);
    onPressedChange?.(v);
  };

  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      <button
        {...props}
        ref={ref}
        role="switch"
        aria-checked={isPressed}
        onClick={() => handle()}
        className={cn('relative inline-flex items-center rounded-full transition-colors focus:outline-none', sizeMap[size], isPressed ? 'bg-blue-600' : 'bg-white/6')}
      >
        <span className={cn('absolute left-0 top-0 h-full w-1/2 rounded-full transition-transform', isPressed ? 'translate-x-full -translate-x-1/2' : 'translate-x-0')}
        aria-hidden />
      </button>
      {label ? <span className="text-sm text-gray-200">{label}</span> : children}
    </div>
  );
});

Toggle.displayName = 'Toggle';

export default Toggle;
