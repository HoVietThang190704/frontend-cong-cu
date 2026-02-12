"use client";
import React from 'react';
import { cn } from '@/src/lib/utils';

export type AspectRatioProps = React.HTMLAttributes<HTMLDivElement> & {
  ratio?: number; // width / height
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  preserve?: 'auto' | 'cover' | 'contain';
};

const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(({ ratio = 16 / 9, children, className, style, preserve = 'auto', ...props }, ref) => {
  // Use native aspect-ratio where available, otherwise fallback to padding-top technique.
  const wrapperStyle: React.CSSProperties = {
    aspectRatio: `${ratio}`,
    ...style,
  } as React.CSSProperties;

  const innerClass = preserve === 'cover' ? 'w-full h-full object-cover' : preserve === 'contain' ? 'w-full h-full object-contain' : 'w-full h-full';

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)} style={wrapperStyle} {...props}>
      <div className={cn('absolute inset-0', innerClass)}>{children}</div>
    </div>
  );
});

AspectRatio.displayName = 'AspectRatio';

export default AspectRatio;
