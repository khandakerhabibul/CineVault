import { useQuery } from '@tanstack/react-query';
import { fetch } from 'src/utils/apiClient';
import { movieCreditsApi } from 'src/utils/contentListApis';
import { type MovieCreditsResp } from './contentQuery.types';
import { moduleName } from '../moduleInfo';
import { API_RETRY_COUNT } from 'src/common/constant';

const fetchMovieCredits = (id: string | number) =>
  fetch<MovieCreditsResp>(movieCreditsApi(id));

type Props = {
  id: string | number;
};

export const useMovieCreditsQuery = ({ id }: Props) => {
  const query = useQuery({
    queryKey: [moduleName, 'credits', 'movie', id],
    queryFn: () => fetchMovieCredits(id),
    retry: API_RETRY_COUNT,
    enabled: !!id,
  });
  return { ...query };
};
