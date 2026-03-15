import React from 'react';
import { Heart } from 'lucide-react';
import { useWatchlist } from 'src/hooks/useWatchlist';
import clsx from 'clsx';
import Button from '../Button/Button';

interface WatchlistButtonProps {
  movieId: number;
  variant?: 'icon' | 'text' | 'hero';
  className?: string;
  size?: number;
  fullWidth?: boolean;
}

const WatchlistButton = ({
  movieId,
  variant = 'icon',
  className,
  size = 16,
  fullWidth = false,
}: WatchlistButtonProps) => {
  const { isWatchlisted, toggleWatchlist } = useWatchlist();
  const watchlisted = isWatchlisted(movieId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWatchlist(movieId);
  };

  if (variant === 'hero') {
    return (
      <button
        onClick={handleClick}
        className={clsx(
          'p-3 rounded-xl border transition-all duration-300 flex items-center gap-2 font-bold cursor-pointer group/watchlist-heart',
          watchlisted
            ? 'bg-(--success)/20 border-(--success)/50 text-(--success)'
            : 'bg-white/10 border-white/20 text-white hover:bg-white/20',
          className,
        )}
      >
        <Heart
          size={size || 20}
          fill={watchlisted ? 'currentColor' : 'none'}
          className={clsx(
            'transition-transform duration-300 group-hover/watchlist-heart:scale-110',
            watchlisted && 'animate-pulse',
          )}
        />
        <span>{watchlisted ? 'In Watchlist' : 'Add to Watchlist'}</span>
      </button>
    );
  }

  if (variant === 'text') {
    return (
      <Button
        variant={watchlisted ? 'success' : 'outline'}
        fullWidth={fullWidth}
        className={clsx('h-14 font-bold border-2', className)}
        onClick={handleClick}
      >
        <Heart
          size={size || 20}
          fill={watchlisted ? 'currentColor' : 'none'}
          className={clsx(watchlisted && 'animate-pulse')}
        />
        <span>
          {watchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
        </span>
      </Button>
    );
  }

  // Icon variant (default)
  return (
    <button
      onClick={handleClick}
      className={clsx(
        'shrink-0 flex items-center justify-center rounded-lg border transition-all duration-300',
        watchlisted
          ? 'bg-(--success) border-(--success) text-white'
          : 'bg-white/10 border-white/20 text-white hover:bg-white/20',
        className,
      )}
      style={{ width: size * 2, height: size * 2 }}
    >
      <Heart size={size} fill={watchlisted ? 'currentColor' : 'none'} />
    </button>
  );
};

export default WatchlistButton;
