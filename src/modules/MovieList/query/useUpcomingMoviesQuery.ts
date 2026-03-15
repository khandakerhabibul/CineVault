import { useQuery } from '@tanstack/react-query';
import { fetch } from 'src/utils/apiClient';
import { upcomingMoviesApi } from 'src/utils/contentListApis';
import { type ListResponse, type Movie } from './contentQuery.types';
import { moduleName } from '../moduleInfo';
import { API_RETRY_COUNT } from 'src/common/constant';

const fetchUpcomingMovies = (page: number) =>
  fetch<ListResponse<Movie>>(upcomingMoviesApi(), { queryParam: { page } });

type Props = {
  page?: number;
};

export const useUpcomingMoviesQuery = ({ page = 1 }: Props) => {
  const query = useQuery({
    queryKey: [moduleName, 'upcoming', 'movies', page],
    queryFn: () => fetchUpcomingMovies(page),
    retry: API_RETRY_COUNT,
  });
  return { ...query };
};
