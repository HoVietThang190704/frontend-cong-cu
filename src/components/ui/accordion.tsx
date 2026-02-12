"use client";
import React from 'react';
import { cn } from '@/src/lib/utils';

type AccordionType = 'single' | 'multiple';

export type AccordionProps = React.HTMLAttributes<HTMLDivElement> & {
  type?: AccordionType;
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[] | undefined) => void;
  className?: string;
};

type ContextValue = {
  type: AccordionType;
  value?: string | string[];
  toggle: (id: string) => void;
  isOpen: (id: string) => boolean;
  register: (id: string, ref: HTMLButtonElement | null) => void;
  focusNext: (current: string) => void;
  focusPrev: (current: string) => void;
  focusFirst: () => void;
  focusLast: () => void;
};

const AccordionContext = React.createContext<ContextValue | null>(null);

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(({ type = 'single', value, defaultValue, onValueChange, className, children, ...props }, ref) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState<string | string[] | undefined>(defaultValue);
  const currentValue = isControlled ? value : internalValue;

  const buttonsRef = React.useRef<Map<string, HTMLButtonElement | null>>(new Map());

  const register = (id: string, el: HTMLButtonElement | null) => {
    buttonsRef.current.set(id, el);
  };

  const focusList = () => Array.from(buttonsRef.current.keys());

  const focusNext = (current: string) => {
    const list = focusList();
    const idx = list.indexOf(current);
    if (idx === -1) return;
    const next = list[(idx + 1) % list.length];
    buttonsRef.current.get(next)?.focus();
  };

  const focusPrev = (current: string) => {
    const list = focusList();
    const idx = list.indexOf(current);
    if (idx === -1) return;
    const prev = list[(idx - 1 + list.length) % list.length];
    buttonsRef.current.get(prev)?.focus();
  };

  const focusFirst = () => {
    const list = focusList();
    const first = list[0];
    buttonsRef.current.get(first)?.focus();
  };

  const focusLast = () => {
    const list = focusList();
    const last = list[list.length - 1];
    buttonsRef.current.get(last)?.focus();
  };

  const isOpen = (id: string) => {
    if (!currentValue) return false;
    if (type === 'single') return String(currentValue) === id;
    return Array.isArray(currentValue) && currentValue.includes(id);
  };

  const toggle = (id: string) => {
    if (type === 'single') {
      const next = isOpen(id) ? undefined : id;
      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
    } else {
      const arr = Array.isArray(currentValue) ? [...currentValue] : [];
      const idx = arr.indexOf(id);
      if (idx === -1) arr.push(id);
      else arr.splice(idx, 1);
      if (!isControlled) setInternalValue(arr);
      onValueChange?.(arr);
    }
  };

  const ctx: ContextValue = {
    type,
    value: currentValue,
    toggle,
    isOpen,
    register,
    focusNext,
    focusPrev,
    focusFirst,
    focusLast,
  };

  return (
    <AccordionContext.Provider value={ctx}>
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
});

Accordion.displayName = 'Accordion';

export type AccordionItemProps = React.HTMLAttributes<HTMLDivElement> & {
  id: string;
  title?: React.ReactNode;
  disabled?: boolean;
};

export const AccordionItem: React.FC<AccordionItemProps> = ({ id, title, disabled = false, children, className, ...props }) => {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) throw new Error('AccordionItem must be used within an Accordion');

  const { register, isOpen, toggle, focusNext, focusPrev, focusFirst, focusLast } = ctx;

  const btnRef = React.useRef<HTMLButtonElement | null>(null);
  React.useEffect(() => register(id, btnRef.current), [id, register]);

  const open = isOpen(id);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusNext(id);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusPrev(id);
    } else if (e.key === 'Home') {
      e.preventDefault();
      focusFirst();
    } else if (e.key === 'End') {
      e.preventDefault();
      focusLast();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!disabled) toggle(id);
    }
  };

  return (
    <div {...props} className={cn('rounded-md border border-white/6 p-2', className)}>
      <h3 className="mb-2">
        <button
          ref={btnRef}
          id={`accordion-trigger-${id}`}
          aria-controls={`accordion-content-${id}`}
          aria-expanded={open}
          disabled={disabled}
          onKeyDown={handleKeyDown}
          onClick={() => !disabled && toggle(id)}
          className={cn('w-full text-left font-medium text-white', disabled ? 'opacity-50 cursor-not-allowed' : 'hover:underline')}
        >
          <span className="flex items-center justify-between gap-2">
            <span>{title}</span>
            <svg className={cn('h-4 w-4 transition-transform', open ? 'rotate-180' : 'rotate-0')} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
          </span>
        </button>
      </h3>
      <div
        id={`accordion-content-${id}`}
        role="region"
        aria-labelledby={`accordion-trigger-${id}`}
        hidden={!open}
        className="text-sm text-gray-300"
      >
        {open ? children : null}
      </div>
    </div>
  );
};

export default Accordion;
