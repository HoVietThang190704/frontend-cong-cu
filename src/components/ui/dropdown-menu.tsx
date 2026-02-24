"use client";
import React from 'react';
import { cn } from '@/src/lib/utils/utils';

export type DropdownMenuProps = React.HTMLAttributes<HTMLDivElement> & {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ trigger, open = false, onOpenChange, className, children, ...props }) => {
  const [internalOpen, setInternalOpen] = React.useState(open);
  React.useEffect(() => setInternalOpen(open), [open]);
  const setOpen = (v: boolean) => {
    setInternalOpen(v);
    onOpenChange?.(v);
  };

  return (
    <div className={cn('relative inline-block', className)} {...props}>
      <div onClick={() => setOpen(!internalOpen)}>{trigger}</div>
      {internalOpen ? (
        <div className="absolute z-50 mt-2 min-w-[10rem] overflow-hidden rounded-md border border-white/10 bg-slate-950/90 p-2 shadow-lg">
          {React.Children.map(children, (child) => (
            <div className="px-2 py-1 text-sm text-gray-200 hover:bg-white/5 cursor-pointer">{child}</div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

DropdownMenu.displayName = 'DropdownMenu';

export default DropdownMenu;
