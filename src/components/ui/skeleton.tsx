"use client";
import React from 'react';
import { cn } from '@/src/lib/utils/utils';

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
  width?: string | number;
  height?: string | number;
  rounded?: boolean | 'sm' | 'md' | 'lg' | 'full';
  animate?: boolean;
};

const roundMap: Record<string, string> = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(({ className, width, height, rounded = true, animate = true, ...props }, ref) => {
  const style: React.CSSProperties = {};
  if (typeof width === 'number') style.width = `${width}px`;
  else if (typeof width === 'string') style.width = width;
  if (typeof height === 'number') style.height = `${height}px`;
  else if (typeof height === 'string') style.height = height;

  const roundedClass = typeof rounded === 'string' ? (roundMap[rounded] ?? 'rounded-md') : rounded ? 'rounded-md' : '';

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn('bg-white/4 animate-pulse', roundedClass, className, animate ? 'bg-gradient-to-r from-white/6 via-white/10 to-white/6' : undefined)}
      style={style}
      {...props}
    />
  );
});

Skeleton.displayName = 'Skeleton';

export default Skeleton;
