import { useWatchlistContext } from 'src/context/WatchlistContext';

export const useWatchlist = () => {
  const { watchlistIds, toggleWatchlist, isLoading, isWatchlisted } = useWatchlistContext();

  return {
    watchlistIds,
    toggleWatchlist,
    isLoading,
    isWatchlisted,
  };
};
