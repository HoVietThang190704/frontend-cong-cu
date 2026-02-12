import React from 'react';
import { cn } from '@/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {};

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return <input ref={ref} className={cn('border rounded px-2 py-1 bg-white/5', className)} {...props} />;
});

Input.displayName = 'Input';

export default Input;
