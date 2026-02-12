import React from 'react';
import { cn } from '@/src/lib/utils';

export type SwitchProps = React.InputHTMLAttributes<HTMLInputElement> & {};

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(({ className, ...props }, ref) => {
  return (
    <label className={cn('inline-flex items-center cursor-pointer', className)}>
      <input ref={ref} type="checkbox" className="sr-only" {...props} />
      <span className={"w-10 h-5 bg-gray-300 rounded-full relative transition-colors"}>
        <span className={"absolute left-0 top-0 w-5 h-5 bg-white rounded-full transform transition-transform"} />
      </span>
    </label>
  );
});

Switch.displayName = 'Switch';

export default Switch;
