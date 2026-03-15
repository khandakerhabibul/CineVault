import React, {
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  forwardRef,
} from 'react';
import clsx from 'clsx';

type IconRender =
  | React.ReactNode
  | ((props: { className?: string }) => React.ReactNode);

type BaseProps = {
  label?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'secondary';
  fullWidth?: boolean;
  prefix?: IconRender;
  suffix?: IconRender;
};

type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'prefix' | 'suffix' | 'size'
>;
type TextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'prefix' | 'suffix' | 'size'
>;

type CombinedProps = BaseProps &
  ((InputProps & { textarea?: false }) | (TextareaProps & { textarea: true }));

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, CombinedProps>(
  (
    {
      label,
      error,
      size = 'md',
      variant = 'default',
      fullWidth = false,
      textarea = false,
      prefix,
      suffix,
      className,
      ...props
    },
    ref,
  ) => {
    const { ...htmlProps } = props;
    const baseClasses =
      'rounded-lg border focus:outline-none focus:ring-2 transition-all duration-300 placeholder:text-(--text-muted)';

    const sizeClasses: Record<string, string> = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-5 py-4 text-lg',
    };

    const variantClasses: Record<string, string> = {
      default:
        'bg-(--bg-secondary) text-(--text-primary) border-(--border-color) focus:ring-(--color-primary)',
      outline:
        'bg-transparent text-(--text-primary) border-(--color-primary) focus:ring-(--color-primary)',
      secondary:
        'bg-(--bg-tertiary) text-(--text-primary) border-(--border-color) focus:ring-(--color-secondary)',
    };

    const widthClass = fullWidth ? 'w-full' : 'inline-block';
    const errorClass = error ? 'border-red-500 focus:ring-red-500' : '';

    const inputClasses = clsx(
      baseClasses,
      sizeClasses[size],
      variantClasses[variant],
      widthClass,
      errorClass,
      prefix && 'pl-12!',
      suffix && 'pr-12!',
      className,
    );

    const renderIcon = (icon?: IconRender) => {
      if (!icon) return null;
      return typeof icon === 'function' ? icon({}) : icon;
    };

    return (
      <div className='flex flex-col w-full'>
        {label && (
          <label className='mb-2 text-(--text-secondary) font-medium'>
            {label}
          </label>
        )}

        <div className='relative w-full'>
          {prefix && (
            <div className='absolute left-5 top-1/2 -translate-y-1/2 text-(--text-muted)'>
              {renderIcon(prefix)}
            </div>
          )}

          {textarea ? (
            <textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              className={inputClasses}
              {...(htmlProps as TextareaProps)}
            />
          ) : (
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              className={inputClasses}
              {...(htmlProps as InputProps)}
            />
          )}

          {suffix && (
            <div className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-(--text-muted)'>
              {renderIcon(suffix)}
            </div>
          )}
        </div>

        {error && <span className='mt-1 text-red-500 text-sm'>{error}</span>}
      </div>
    );
  },
);

Input.displayName = 'Input';
export default Input;
