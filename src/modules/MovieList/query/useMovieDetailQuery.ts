import { useQuery } from '@tanstack/react-query';
import { fetch } from 'src/utils/apiClient';
import { movieDetailApi } from 'src/utils/contentListApis';
import { type MovieDetailResp } from './contentQuery.types';
import { moduleName } from '../moduleInfo';
import { API_RETRY_COUNT } from 'src/common/constant';

const fetchMovieDetail = (id: string | number) =>
  fetch<MovieDetailResp>(movieDetailApi(id));

type Props = {
  id: string | number;
};

export const useMovieDetailQuery = ({ id }: Props) => {
  const query = useQuery({
    queryKey: [moduleName, 'detail', 'movie', id],
    queryFn: () => fetchMovieDetail(id),
    retry: API_RETRY_COUNT,
    enabled: !!id,
  });
  return { ...query };
};
