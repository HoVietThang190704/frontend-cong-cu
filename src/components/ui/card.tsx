import React from 'react';
import { cn } from '@/src/lib/utils';

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {};

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('bg-white/6 backdrop-blur-md border border-white/6 rounded-lg p-4 shadow-sm', className)}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
