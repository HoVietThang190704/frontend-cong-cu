import React from 'react';
import { cn } from '@/src/lib/utils/utils';

export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: React.ReactNode;
};

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ className, label, ...props }, ref) => {
  return (
    <label className={cn('inline-flex items-center gap-2 cursor-pointer', className)}>
      <input ref={ref} type="checkbox" className="w-4 h-4 rounded border" {...props} />
      {label && <span className="text-sm select-none">{label}</span>}
    </label>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
