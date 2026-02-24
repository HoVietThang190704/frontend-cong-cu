import React from 'react';
import { cn } from '@/src/lib/utils/utils';

export type RadioOption = { label: React.ReactNode; value: string };
export type RadioGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  name?: string;
  value?: string;
  defaultValue?: string;
  options: RadioOption[];
  onChange?: (value: string) => void;
};

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(({ className, options, name, value, defaultValue, onChange, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('flex gap-2 items-center', className)} {...props}>
      {options.map((opt) => (
        <label key={opt.value} className="inline-flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={name}
            value={opt.value}
            defaultChecked={defaultValue === opt.value}
            checked={value !== undefined ? value === opt.value : undefined}
            onChange={() => onChange?.(opt.value)}
            className="w-4 h-4"
          />
          <span className="text-sm select-none">{opt.label}</span>
        </label>
      ))}
    </div>
  );
});

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
