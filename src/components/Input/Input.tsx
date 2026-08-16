import { type InputHTMLAttributes, forwardRef, useId } from "react";
import { cn } from "../../lib/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-text-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "h-10 rounded-md border border-border-strong bg-surface-0 px-3 text-sm text-text-1 placeholder:text-text-3 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-primary/20 focus-visible:border-brand-primary disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-status-danger focus-visible:ring-status-danger/20",
            className,
          )}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-status-danger">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
