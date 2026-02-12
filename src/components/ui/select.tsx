import React from 'react';
import { cn } from '@/lib/utils';

export type SelectOption = { label: string; value: string };
export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options?: SelectOption[];
};

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ className, options, children, ...props }, ref) => {
  return (
    <select ref={ref} className={cn('border rounded px-2 py-1 bg-white/5', className)} {...props}>
      {options ? options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>) : children}
    </select>
  );
});

Select.displayName = 'Select';

export default Select;
