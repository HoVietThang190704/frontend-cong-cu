import React from 'react';
import { cn } from '@/src/lib/utils/utils';

export type ScrollAreaProps = React.HTMLAttributes<HTMLDivElement> & {
  maxHeight?: string;
};

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(({ className, children, maxHeight = 'none', ...props }, ref) => {
  const style = maxHeight !== 'none' ? { maxHeight } : undefined;

  return (
    <div ref={ref} className={cn('overflow-auto', className)} style={style} {...props}>
      {children}
    </div>
  );
});

ScrollArea.displayName = 'ScrollArea';

export default ScrollArea;
