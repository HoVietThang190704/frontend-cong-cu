import React from 'react';
import { cn } from '@/src/lib/utils/utils';

export type Crumb = { label: string; href?: string };
export type BreadcrumbProps = React.HTMLAttributes<HTMLElement> & {
  items: Crumb[];
};

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(({ className, items, ...props }, ref) => {
  return (
    <nav ref={ref} aria-label="Breadcrumb" className={cn('text-sm text-gray-600', className)} {...props}>
      <ol className="flex gap-2 items-center">
        {items.map((it, i) => (
          <li key={i} className="flex items-center">
            {i > 0 && <span className="mx-1 text-gray-400">/</span>}
            {it.href ? (
              <a className="hover:underline" href={it.href}>
                {it.label}
              </a>
            ) : (
              <span>{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
});

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;
