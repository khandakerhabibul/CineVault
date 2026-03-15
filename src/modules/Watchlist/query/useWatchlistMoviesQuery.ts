import { useQueries } from '@tanstack/react-query';
import { fetch } from 'src/utils/apiClient';
import { moduleName } from '../moduleInfo';
import { type Movie } from 'src/modules/MovieList/query/contentQuery.types';
import { movieDetailApi } from 'src/utils/contentListApis';

export const useWatchlistMoviesQuery = (movieIds: number[]) => {
  const results = useQueries({
    queries: movieIds.map((id) => ({
      queryKey: [moduleName, 'movie-detail', id], // Reuse the same query key pattern as individual details
      queryFn: () => fetch<Movie>(movieDetailApi(id)),
      staleTime: 1000 * 60 * 5, // 5 minutes
    })),
  });

  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);
  const data = results
    .map((result) => result.data)
    .filter((movie): movie is Movie => !!movie);

  return {
    data,
    isLoading,
    isError,
  };
};
