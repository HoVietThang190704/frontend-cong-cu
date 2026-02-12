"use client";
import React from 'react';
import { cn } from '@/src/lib/utils';

export type CommandItem = {
  id: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  onSelect?: () => void;
};

export type CommandProps = React.HTMLAttributes<HTMLDivElement> & {
  items: CommandItem[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
  className?: string;
};

const Command: React.FC<CommandProps> = ({ items, open = true, onOpenChange, placeholder = 'Type a command...', className, ...props }) => {
  const [internalOpen, setInternalOpen] = React.useState(open);
  const [query, setQuery] = React.useState('');
  const [active, setActive] = React.useState<number>(0);

  React.useEffect(() => setInternalOpen(open), [open]);
  const filtered = items.filter((it) => String(it.label).toLowerCase().includes(query.toLowerCase()));

  const setOpen = (v: boolean) => {
    setInternalOpen(v);
    onOpenChange?.(v);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(filtered.length - 1, a + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = filtered[active];
      if (item) item.onSelect?.();
      setOpen(false);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
    }
  };

  return (
    <div className={cn('relative w-full', className)} {...props}>
      {internalOpen ? (
        <div className="rounded-md border border-white/10 bg-slate-950/80 p-2 shadow-lg">
          <input
            className="w-full rounded-md border border-white/6 bg-transparent px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActive(0); }}
            onKeyDown={handleKey}
            placeholder={placeholder}
            aria-label={placeholder}
          />
          <ul role="listbox" className="max-h-48 overflow-auto mt-2 space-y-1">
            {filtered.map((it, idx) => (
              <li key={it.id} role="option" aria-selected={idx === active} className={cn('cursor-pointer rounded px-2 py-1', idx === active ? 'bg-white/8' : 'hover:bg-white/5')} onMouseEnter={() => setActive(idx)} onClick={() => { it.onSelect?.(); setOpen(false); }}>
                <div className="text-sm text-white">{it.label}</div>
                {it.description ? <div className="text-xs text-gray-400">{it.description}</div> : null}
              </li>
            ))}
            {filtered.length === 0 ? <li className="text-sm text-gray-400 px-2 py-1">No results</li> : null}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

Command.displayName = 'Command';

export default Command;
