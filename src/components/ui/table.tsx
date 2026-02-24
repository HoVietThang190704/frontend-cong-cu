"use client";
import React from 'react';
import { cn } from '@/src/lib/utils/utils';

export type Column<T> = {
  key: keyof T;
  header?: React.ReactNode;
  cell?: (row: T, rowIndex: number) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  width?: string;
};

export type TableProps<T> = React.TableHTMLAttributes<HTMLTableElement> & {
  columns: Column<T>[];
  data: T[];
  rowKey?: (row: T, index: number) => string;
  className?: string;
};

function defaultRowKey<T>(row: T, idx: number) {
  return idx.toString();
}

const Table = <T,>({ columns, data, rowKey = defaultRowKey, className, ...props }: TableProps<T>) => {
  return (
    <div className={cn('overflow-auto', className)}>
      <table className="min-w-full table-auto text-sm text-left" {...props}>
        <thead className="border-b border-white/10 text-xs uppercase tracking-wide text-gray-400">
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} style={col.width ? { width: col.width } : undefined} className={cn('px-3 py-2', col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left')}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={rowKey(row, idx)} className="border-b border-white/6 last:border-0 hover:bg-white/2">
              {columns.map((col) => (
                <td key={String(col.key)} className={cn('px-3 py-2 align-top', col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left')}>{col.cell ? col.cell(row, idx) : (row[col.key] as unknown as React.ReactNode)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.displayName = 'Table';

export default Table;
