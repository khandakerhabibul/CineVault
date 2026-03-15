import { useQuery } from '@tanstack/react-query';
import { fetch } from 'src/utils/apiClient';
import { trendingMoviesApi } from 'src/utils/contentListApis';
import { type TrendingMoviesResp } from './contentQuery.types';
import { moduleName } from '../moduleInfo';
import { API_RETRY_COUNT } from 'src/common/constant';

const fetchTrendingMovies = () =>
  fetch<TrendingMoviesResp>(trendingMoviesApi());

export const useTrendingMoviesQuery = () => {
  const query = useQuery({
    queryKey: [moduleName, 'trending', 'movies'],
    queryFn: fetchTrendingMovies,
    retry: API_RETRY_COUNT,
  });
  return { ...query };
};
