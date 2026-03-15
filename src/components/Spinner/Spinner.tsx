type SpinnerProps = {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'tertiary';
};

function Spinner({ size = 'md', color = 'primary' }: SpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-[3px]',
    lg: 'w-10 h-10 border-4',
  };

  const colorClasses = {
    primary: 'border-(--color-primary)',
    secondary: 'border-(--color-secondary)',
    tertiary: 'border-(--color-tertiary)',
  };

  return (
    <div className='flex items-center justify-center'>
      <div
        className={`animate-spin rounded-full border-t-transparent ${colorClasses[color]} ${sizeClasses[size]}`}
      />
    </div>
  );
}

export default Spinner;
