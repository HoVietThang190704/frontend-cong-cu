import React from 'react';
import { cn } from '@/lib/utils';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return <textarea ref={ref} className={cn('w-full border rounded px-2 py-1 bg-white/5', className)} {...props} />;
});

Textarea.displayName = 'Textarea';

export default Textarea;
