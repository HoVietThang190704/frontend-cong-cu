import React from 'react';
import { cn } from '@/src/lib/utils';

export type NavItem = { label: string; href?: string; children?: React.ReactNode };
export type NavigationMenuProps = React.HTMLAttributes<HTMLElement> & {
  items?: NavItem[];
};

const NavigationMenu = React.forwardRef<HTMLElement, NavigationMenuProps>(({ className, items = [], children, ...props }, ref) => {
  if (items && items.length) {
    return (
      <nav ref={ref} className={cn('flex items-center', className)} {...props}>
        <ul className="flex gap-2">
          {items.map((it, i) => (
            <li key={i}>
              {it.href ? (
                <a className="text-sm text-gray-700 hover:underline" href={it.href}>
                  {it.label}
                </a>
              ) : (
                <span className="text-sm text-gray-700">{it.label}</span>
              )}
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <nav ref={ref} className={cn('flex items-center', className)} {...props}>
      {children}
    </nav>
  );
});

NavigationMenu.displayName = 'NavigationMenu';

export default NavigationMenu;
