"use client";
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/src/lib/utils';

export type TextareaExtrasProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  maxChars?: number;
  autosize?: boolean;
};

const TextareaExtras = React.forwardRef<HTMLTextAreaElement, TextareaExtrasProps>(({ className, maxChars, autosize = true, ...props }, ref) => {
  const innerRef = useRef<HTMLTextAreaElement | null>(null);
  const isControlled = props.value !== undefined;
  const [internalLength, setInternalLength] = useState<number>(props.defaultValue ? String(props.defaultValue).length : 0);

  const length = isControlled ? String(props.value ?? '').length : internalLength;

  useEffect(() => {
    const el = innerRef.current;
    if (!el || !autosize) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [length, autosize]);

  return (
    <div className={cn('relative', className)}>
      <textarea
        {...props}
        ref={(node) => {
          innerRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
        }}
        className={cn('w-full border rounded px-2 py-1 bg-white/5 resize-none', className)}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          const l = e.currentTarget.value.length;
          if (!isControlled) setInternalLength(l);
          props.onChange?.(e);
        }}
      />
      {maxChars ? (
        <div className="absolute right-1 bottom-1 text-xs text-gray-400">{length}/{maxChars}</div>
      ) : null}
    </div>
  );
});

TextareaExtras.displayName = 'TextareaExtras';

export default TextareaExtras;