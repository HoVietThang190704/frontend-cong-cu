"use client";
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { cn } from '@/src/lib/utils/utils';

type Toast = { id: string; message: React.ReactNode; duration?: number };

type ToastContextValue = { show: (message: React.ReactNode, duration?: number) => void };

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = useCallback((message: React.ReactNode, duration = 3000) => {
    const id = String(Date.now()) + Math.random().toString(36).slice(2, 9);
    setToasts((t) => [...t, { id, message, duration }]);
  }, []);

  useEffect(() => {
    if (!toasts.length) return;
    const timers = toasts.map((t) =>
      window.setTimeout(() => setToasts((cur) => cur.filter((x) => x.id !== t.id)), t.duration)
    );
    return () => timers.forEach((id) => clearTimeout(id));
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div key={t.id} className={cn('bg-black text-white px-3 py-2 rounded shadow')}>{t.message}</div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export type ToastProviderProps = React.ComponentProps<typeof ToastProvider>;

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
}

export default ToastProvider;
