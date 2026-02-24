import React from 'react';
import { cn } from '@/src/lib/utils/utils';

export type SeparatorProps = React.HTMLAttributes<HTMLHRElement> & {
  vertical?: boolean;
};

const Separator = React.forwardRef<HTMLHRElement, SeparatorProps>(({ className, vertical = false, ...props }, ref) => {
  if (vertical) {
    return <hr ref={ref} className={cn('border-l border-gray-200 h-full inline-block', className)} {...props} />;
  }

  return <hr ref={ref} className={cn('border-t border-gray-200 my-2', className)} {...props} />;
});

Separator.displayName = 'Separator';

export default Separator;
