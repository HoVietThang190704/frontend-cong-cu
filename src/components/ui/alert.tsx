"use client";
import React from 'react';
import { cn } from '@/src/lib/utils/utils';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

export type AlertProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: AlertVariant;
  title?: React.ReactNode;
  children?: React.ReactNode;
  role?: 'alert' | 'status';
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
};

const variantStyles: Record<AlertVariant, { container: string; icon: React.ReactNode } > = {
  info: {
    container: 'border-blue-500/20 bg-blue-500/6 text-blue-200',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4" />
        <path d="M12 16h.01" />
      </svg>
    ),
  },
  success: {
    container: 'border-emerald-500/20 bg-emerald-500/6 text-emerald-200',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M20 6L9 17l-5-5" />
      </svg>
    ),
  },
  warning: {
    container: 'border-amber-400/20 bg-amber-400/6 text-amber-200',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94A2 2 0 0 0 22.18 18L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
    ),
  },
  danger: {
    container: 'border-rose-500/20 bg-rose-500/6 text-rose-200',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M18.364 5.636l-12.728 12.728" />
        <path d="M5.636 5.636l12.728 12.728" />
      </svg>
    ),
  },
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(({ variant = 'info', title, children, role = 'status', dismissible = false, onDismiss, className, ...props }, ref) => {
  const styles = variantStyles[variant];

  return (
    <div ref={ref} role={role} aria-live={role === 'alert' ? 'assertive' : 'polite'} className={cn('rounded-md border p-3 text-sm', styles.container, className)} {...props}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex-shrink-0 text-current">{styles.icon}</div>
        <div className="flex-1 min-w-0">
          {title ? <div className="font-semibold text-white">{title}</div> : null}
          {children ? <div className="mt-1 text-sm text-current">{children}</div> : null}
        </div>
        {dismissible ? (
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => onDismiss?.()}
            className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/6 bg-transparent text-gray-200 hover:bg-white/5"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>
        ) : null}
      </div>
    </div>
  );
});

Alert.displayName = 'Alert';

export default Alert;
