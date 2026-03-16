import { useQuery } from '@tanstack/react-query';
import { fetch } from 'src/utils/apiClient';
import { movieVideosApi } from 'src/utils/contentListApis';
import { type MovieVideosResp } from './contentQuery.types';
import { moduleName } from '../moduleInfo';
import { API_RETRY_COUNT } from 'src/common/constant';

const fetchMovieVideos = (id: string | number) =>
  fetch<MovieVideosResp>(movieVideosApi(id));

type Props = {
  id: string | number;
};

export const useMovieVideosQuery = ({ id }: Props) => {
  const query = useQuery({
    queryKey: [moduleName, 'videos', 'movie', id?.toString()],
    queryFn: () => fetchMovieVideos(id),
    retry: API_RETRY_COUNT,
    enabled: !!id,
  });
  return { ...query };
};
