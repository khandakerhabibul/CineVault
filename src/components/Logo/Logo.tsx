import { Link } from 'react-router-dom';
import { movieListFullPath } from 'modules/MovieList/moduleInfo';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ className = '', size = 'md' }: LogoProps) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl md:text-3xl',
    lg: 'text-4xl md:text-5xl',
  };

  return (
    <Link
      to={movieListFullPath}
      className={`flex items-center gap-2 group ${className}`}
    >
      <h1
        className={`${sizeClasses[size]} font-black tracking-tighter text-white`}
      >
        Cine
        <span className='text-(--color-primary) group-hover:text-(--color-secondary) transition-colors'>
          Vault
        </span>
      </h1>
    </Link>
  );
};

export default Logo;
