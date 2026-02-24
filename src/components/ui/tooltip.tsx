import React from 'react';
import { cn } from '@/src/lib/utils/utils';

export type TooltipProps = React.HTMLAttributes<HTMLDivElement> & {
  content: React.ReactNode;
};

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(({ content, className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('relative inline-block', className)} {...props}>
      {children}
      <div className="absolute left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block z-50">
        <div className="bg-black text-white text-xs px-2 py-1 rounded">{content}</div>
      </div>
    </div>
  );
});

Tooltip.displayName = 'Tooltip';

export default Tooltip;
