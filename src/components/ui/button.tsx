import React from 'react';
import { cn } from '@/src/lib/utils';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'ghost' | 'danger';
};

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  default: 'bg-blue-600 text-white hover:bg-blue-700',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
  danger: 'bg-red-600 text-white hover:bg-red-700',
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = 'default', children, ...props }, ref) => {
  return (
    <button ref={ref} className={cn('inline-flex items-center justify-center px-3 py-1 rounded-md font-medium', variantClasses[variant], className)} {...props}>
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
