"use client";
import React from 'react';
import { cn } from '@/src/lib/utils/utils';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;

export type AvatarProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src?: string | null;
  alt?: string;
  size?: AvatarSize;
  fallback?: React.ReactNode; // content shown when image fails
  initials?: string; // automatic fallback if provided
  shape?: 'circle' | 'square';
  status?: 'online' | 'offline' | 'busy' | 'away';
  className?: string;
};

const sizeMap: Record<string, string> = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
};

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(({ src, alt, size = 'md', fallback, initials, shape = 'circle', status, className, ...props }, ref) => {
  const [errored, setErrored] = React.useState(false);

  React.useEffect(() => {
    setErrored(false);
  }, [src]);

  const resolvedSizeClass = typeof size === 'number' ? `w-[${size}px] h-[${size}px]` : sizeMap[String(size)] ?? sizeMap.md;
  const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-md';

  const showImage = !!src && !errored;

  const content = showImage ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      src={src!}
      alt={alt ?? ''}
      onError={() => setErrored(true)}
      className={cn('object-cover w-full h-full', shape === 'circle' ? 'rounded-full' : 'rounded-md')}
    />
  ) : (
    <div className={cn('flex items-center justify-center bg-white/6 text-white font-medium', shape === 'circle' ? 'rounded-full' : 'rounded-md')}>{fallback ?? initials ?? (alt ? String(alt).slice(0, 2).toUpperCase() : null)}</div>
  );

  return (
    <div ref={ref} role="img" aria-label={alt} className={cn('relative inline-block overflow-hidden bg-white/5', resolvedSizeClass, shapeClass, className)}>
      {content}
      {status ? (
        <span
          aria-hidden
          className={cn(
            'absolute right-0 bottom-0 -translate-x-1/4 translate-y-1/4 block h-3 w-3 rounded-full ring-2 ring-black',
            status === 'online' ? 'bg-emerald-400' : status === 'busy' ? 'bg-amber-400' : status === 'away' ? 'bg-yellow-400' : 'bg-gray-400'
          )}
        />
      ) : null}
    </div>
  );
});

Avatar.displayName = 'Avatar';

export default Avatar;
