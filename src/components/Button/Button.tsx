import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';
// import Spinner from '../Spinner/Spinner';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  isLoading = false,
  className,
  ...props
}: ButtonProps) => {
  const baseClasses =
    'font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center gap-2';

  const sizeClasses: Record<string, string> = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-5 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
  };

  const variantClasses: Record<string, string> = {
    primary: `bg-[var(--color-primary)] text-[var(--text-primary)] hover:bg-[var(--color-primary-hover)] focus:ring-[var(--color-primary)]`,
    secondary: `bg-[var(--color-secondary)] text-[var(--text-primary)] hover:brightness-90 focus:ring-[var(--color-secondary)]`,
    success: `bg-[var(--success)] text-[var(--text-primary)] hover:brightness-90 focus:ring-[var(--success)]`,
    danger: `bg-[var(--danger)] text-[var(--text-primary)] hover:brightness-90 focus:ring-[var(--danger)]`,
    outline: `bg-transparent border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--text-primary)] focus:ring-[var(--color-primary)]`,
  };

  const widthClass = fullWidth ? 'w-full flex' : 'inline-flex';

  const combinedClasses = clsx(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    widthClass,
    (disabled || isLoading) && 'opacity-50 cursor-not-allowed',
    className,
  );

  return (
    <button
      className={combinedClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
