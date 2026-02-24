"use client";
import React from 'react';
import { cn } from '@/src/lib/utils/utils';

export type FormValues = Record<string, FormDataEntryValue | FormDataEntryValue[]>;

export type FormProps = Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> & {
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  preventDefault?: boolean;
  onSubmitValues?: (values: FormValues) => void | Promise<void>;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
};

export type FormSectionProps = React.HTMLAttributes<HTMLElement> & {
  title?: React.ReactNode;
  description?: React.ReactNode;
  accent?: 'default' | 'subtle';
};

export type FormActionsProps = React.HTMLAttributes<HTMLDivElement> & {
  align?: 'start' | 'center' | 'end';
};

type FormStatus = {
  disabled: boolean;
  busy: boolean;
};

const FormStatusContext = React.createContext<FormStatus | null>(null);

export function useFormStatus() {
  const context = React.useContext(FormStatusContext);
  if (!context) {
    throw new Error('useFormStatus must be used inside a <Form>.');
  }
  return context;
}

const formDataToObject = (formData: FormData): FormValues => {
  const entries: FormValues = {};
  formData.forEach((value, key) => {
    if (!(key in entries)) {
      entries[key] = value;
      return;
    }
    const current = entries[key];
    entries[key] = Array.isArray(current) ? [...current, value] : [current, value];
  });
  return entries;
};

const FormBase = React.forwardRef<HTMLFormElement, FormProps>(({ className, children, preventDefault = true, onSubmitValues, header, footer, loading = false, disabled = false, onSubmit, ...rest }, ref) => {
  const [submitting, setSubmitting] = React.useState(false);
  const busy = loading || submitting;
  const mergedDisabled = disabled || busy;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (preventDefault) event.preventDefault();
    onSubmit?.(event);
    if (!onSubmitValues || busy) return;
    setSubmitting(true);
    try {
      const values = formDataToObject(new FormData(event.currentTarget));
      await onSubmitValues(values);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormStatusContext.Provider value={{ disabled: mergedDisabled, busy }}>
      <form ref={ref} {...rest} onSubmit={handleSubmit} aria-busy={busy} className={cn('flex flex-col gap-6 rounded-2xl border border-white/10 bg-gradient-to-b from-slate-950/70 via-slate-950/40 to-slate-950/20 p-6 text-sm text-gray-100 shadow-xl backdrop-blur', className)}>
        {header ? <div className="space-y-1 border-b border-white/10 pb-4">{header}</div> : null}
        <div className="space-y-4">{children}</div>
        {footer ? <div className="border-t border-white/10 pt-4">{footer}</div> : null}
      </form>
    </FormStatusContext.Provider>
  );
});

FormBase.displayName = 'Form';

const FormSection = ({ className, title, description, accent = 'default', children, ...props }: FormSectionProps) => {
  return (
    <section {...props} className={cn('space-y-3 rounded-xl border p-4 transition-colors', accent === 'subtle' ? 'border-white/5 bg-transparent' : 'border-white/10 bg-white/5', className)}>
      {title ? <div className="text-base font-semibold text-white">{title}</div> : null}
      {description ? <p className="text-xs text-gray-400">{description}</p> : null}
      <div className="space-y-4">{children}</div>
    </section>
  );
};

const FormActions = React.forwardRef<HTMLDivElement, FormActionsProps>(({ className, align = 'end', children, ...props }, ref) => {
  const { busy } = useFormStatus();
  const alignment = align === 'start' ? 'justify-start' : align === 'center' ? 'justify-center' : 'justify-end';
  return (
    <div ref={ref} {...props} className={cn('flex flex-wrap gap-3 border-t border-white/10 pt-4', alignment, className)}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        const element = child as React.ReactElement<{ disabled?: boolean }>;
        const childProps = (element.props as { disabled?: boolean } & Record<string, unknown>) ?? {};
        if ('disabled' in childProps) {
          return React.cloneElement(element, { disabled: Boolean(childProps.disabled) || busy });
        }
        return child;
      })}
    </div>
  );
});

FormActions.displayName = 'FormActions';

type FormComponent = typeof FormBase & {
  Section: typeof FormSection;
  Actions: typeof FormActions;
  useStatus: typeof useFormStatus;
};

const Form = FormBase as FormComponent;
Form.Section = FormSection;
Form.Actions = FormActions;
Form.useStatus = useFormStatus;

export default Form;
