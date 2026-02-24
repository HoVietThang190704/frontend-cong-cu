"use client";
import React from 'react';
import { cn } from '@/src/lib/utils/utils';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const createPageRange = (totalPages: number, currentPage: number, siblings: number) => {
  const pages: Array<number | 'ellipsis'> = [];
  const start = Math.max(2, currentPage - siblings);
  const end = Math.min(totalPages - 1, currentPage + siblings);

  pages.push(1);
  if (start > 2) pages.push('ellipsis');

  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }

  if (end < totalPages - 1) pages.push('ellipsis');
  if (totalPages > 1) pages.push(totalPages);

  return pages;
};

export type PaginationProps = React.HTMLAttributes<HTMLElement> & {
  totalItems: number;
  pageSize?: number;
  currentPage?: number;
  defaultPage?: number;
  siblings?: number;
  onPageChange?: (page: number) => void;
  showSummary?: boolean;
};

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(({ className, totalItems, pageSize = 10, currentPage, defaultPage = 1, siblings = 1, onPageChange, showSummary = true, ...props }, ref) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const isControlled = currentPage !== undefined;
  const [internalPage, setInternalPage] = React.useState(defaultPage);
  const activePage = clamp(isControlled ? Number(currentPage) : internalPage, 1, totalPages);

  const setPage = (page: number) => {
    const next = clamp(page, 1, totalPages);
    if (!isControlled) setInternalPage(next);
    onPageChange?.(next);
  };

  const pages = React.useMemo(() => createPageRange(totalPages, activePage, siblings), [activePage, siblings, totalPages]);
  const hasItems = totalItems > 0;
  const startItem = hasItems ? (activePage - 1) * pageSize + 1 : 0;
  const endItem = hasItems ? Math.min(totalItems, activePage * pageSize) : 0;

  const baseButtonClass = 'h-9 min-w-9 rounded-full border px-3 text-sm font-medium transition';

  return (
    <nav ref={ref} aria-label="Pagination" className={cn('flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-gray-100 shadow-xl backdrop-blur', className)} {...props}>
      {showSummary ? (
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs uppercase tracking-wide text-gray-400">
          <span>{hasItems ? `Showing ${startItem}-${endItem} of ${totalItems}` : 'No results yet'}</span>
          <span className="text-gray-300">Page {activePage} · {totalPages} total</span>
        </div>
      ) : null}
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" className={cn(baseButtonClass, 'border-white/10 bg-white/5 text-gray-300 hover:border-white/30 hover:text-white disabled:opacity-40')} onClick={() => setPage(activePage - 1)} disabled={activePage === 1}>
          Previous
        </button>
        <div className="flex items-center gap-1">
          {pages.map((page, index) =>
            page === 'ellipsis' ? (
              <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
                …
              </span>
            ) : (
              <button type="button" key={page} onClick={() => setPage(page)} className={cn(baseButtonClass, page === activePage ? 'border-blue-500 bg-blue-600 text-white shadow-lg' : 'border-transparent bg-white/5 text-gray-300 hover:border-white/30 hover:text-white')} aria-current={page === activePage ? 'page' : undefined}>
                {page}
              </button>
            ),
          )}
        </div>
        <button type="button" className={cn(baseButtonClass, 'border-white/10 bg-white/5 text-gray-300 hover:border-white/30 hover:text-white disabled:opacity-40 ml-auto')} onClick={() => setPage(activePage + 1)} disabled={activePage === totalPages}>
          Next
        </button>
      </div>
    </nav>
  );
});

Pagination.displayName = 'Pagination';

export default Pagination;
