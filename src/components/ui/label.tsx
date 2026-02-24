import React from 'react';
import { cn } from '@/src/lib/utils/utils';

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  hint?: React.ReactNode;
  optionalText?: string;
  requiredIndicator?: boolean;
};

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, children, hint, optionalText = 'Optional', requiredIndicator = true, required, ...props }, ref) => {
  return (
    <label ref={ref} className={cn('space-y-1 text-sm font-medium text-gray-100', className)} {...props}>
      <span className="flex items-center gap-1">
        <span>{children}</span>
        {required && requiredIndicator ? (
          <span aria-hidden="true" className="text-red-400">
            *
          </span>
        ) : null}
        {!required && optionalText ? <span className="text-[11px] uppercase tracking-wide text-gray-500">{optionalText}</span> : null}
      </span>
      {hint ? <span className="block text-xs font-normal text-gray-400">{hint}</span> : null}
    </label>
  );
});

Label.displayName = 'Label';

export default Label;
