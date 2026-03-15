import { useQuery } from '@tanstack/react-query';
import { fetch } from 'src/utils/apiClient';
import { popularMoviesApi } from 'src/utils/contentListApis';
import { type PopularMoviesResp } from './contentQuery.types';
import { moduleName } from '../moduleInfo';
import { API_RETRY_COUNT } from 'src/common/constant';

const fetchPopularMovies = (page: number) =>
  fetch<PopularMoviesResp>(popularMoviesApi(), { queryParam: { page } });

type Props = {
  page?: number;
};

export const usePopularMoviesQuery = ({ page = 1 }: Props) => {
  const query = useQuery({
    queryKey: [moduleName, 'popular', 'movies', page],
    queryFn: () => fetchPopularMovies(page),
    retry: API_RETRY_COUNT,
  });
  return { ...query };
};
