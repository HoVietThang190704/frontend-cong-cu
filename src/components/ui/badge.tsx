"use client";
import React from 'react';
import { cn } from '@/src/lib/utils/utils';

export type BadgeVariant = 'default' | 'success' | 'danger' | 'info' | 'alpha';
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg' | number;

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  size?: BadgeSize;
  pill?: boolean;
  count?: number | string;
  ariaLabel?: string;
};

const sizeMap: Record<string, string> = {
  xs: 'text-[10px] px-1.5 h-5',
  sm: 'text-xs px-2 h-6',
  md: 'text-sm px-3 h-7',
  lg: 'text-base px-3 h-8',
};

const variantMap: Record<BadgeVariant, string> = {
  default: 'bg-white/6 text-gray-50',
  success: 'bg-emerald-600/20 text-emerald-300',
  danger: 'bg-rose-600/20 text-rose-300',
  info: 'bg-blue-600/20 text-blue-300',
  alpha: 'bg-white/3 text-gray-200',
};

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({ variant = 'default', size = 'md', pill = false, className, children, count, ariaLabel, ...props }, ref) => {
  const sizeClass = typeof size === 'number' ? `h-[${size}px] px-3 text-sm` : sizeMap[String(size)] ?? sizeMap.md;
  const rounded = pill ? 'rounded-full' : 'rounded-md';

  return (
    <span
      ref={ref}
      role="status"
      aria-label={ariaLabel}
      className={cn('inline-flex items-center gap-2', sizeClass, rounded, variantMap[variant], className)}
      {...props}
    >
      {children}
      {typeof count !== 'undefined' ? <span className="ml-1 inline-flex items-center justify-center rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium">{count}</span> : null}
    </span>
  );
});

Badge.displayName = 'Badge';

export default Badge;
