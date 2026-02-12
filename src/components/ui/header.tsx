"use client";
import React from 'react';
import { cn } from '@/src/lib/utils';

export type HeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string;
};

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(({ title, className, children, ...props }, ref) => {
  return (
    <header ref={ref} className={cn('flex items-center justify-between p-4 bg-transparent', className)} {...props}>
      <div className="text-lg font-bold">{title}</div>
      <div>{children}</div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
