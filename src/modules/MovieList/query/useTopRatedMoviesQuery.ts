import { useQuery } from '@tanstack/react-query';
import { fetch } from 'src/utils/apiClient';
import { topRatedMoviesApi } from 'src/utils/contentListApis';
import { type ListResponse, type Movie } from './contentQuery.types';
import { moduleName } from '../moduleInfo';
import { API_RETRY_COUNT } from 'src/common/constant';

const fetchTopRatedMovies = (page: number) =>
  fetch<ListResponse<Movie>>(topRatedMoviesApi(), { queryParam: { page } });

type Props = {
  page?: number;
};

export const useTopRatedMoviesQuery = ({ page = 1 }: Props) => {
  const query = useQuery({
    queryKey: [moduleName, 'top-rated', 'movies', page],
    queryFn: () => fetchTopRatedMovies(page),
    retry: API_RETRY_COUNT,
  });
  return { ...query };
};
