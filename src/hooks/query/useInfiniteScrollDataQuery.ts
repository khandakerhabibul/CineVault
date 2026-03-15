import { type QueryKey, useInfiniteQuery } from '@tanstack/react-query';
import { fetch } from 'src/utils/apiClient';
import type {
  InfiniteScrollResponse,
  FetchApiMethodsType,
} from 'modules/MovieList/MovieSearch/types';
import { API_RETRY_COUNT } from 'src/common/constant';

export const ViewInfiniteQueryKey = 'movie-infinite-scroll-data';

interface FetchViewDataProps {
  apiBase: string;
  pageParam: number;
  queryParams?: Record<string, any>;
  methods?: FetchApiMethodsType;
}

export const fetchViewData = async <T extends Record<string, any>>({
  apiBase,
  pageParam = 1,
  queryParams,
  methods = 'get',
}: FetchViewDataProps): Promise<InfiniteScrollResponse<T>> => {
  const res = await fetch<T>(apiBase, {
    method: methods,
    queryParam: {
      page: pageParam,
      ...queryParams,
    },
  });

  return {
    results: res.results as T[],
    current_page: res.page,
    total_pages: res.total_pages,
    total_results: res.total_results,
  };
};

interface UseInfiniteScrollDataQueryProps {
  moduleName: string;
  apiBase: string;
  queryParams?: Record<string, any>;
  queryKeyPrefix?: QueryKey;
  enabled?: boolean;
  staleTime?: number;
  methods?: FetchApiMethodsType;
}

/**
 * Reusable infinite scroll query hook.
 */
export const useInfiniteScrollDataQuery = <T extends Record<string, any>>({
  moduleName,
  apiBase,
  queryParams,
  queryKeyPrefix,
  enabled = true,
  staleTime,
  methods = 'get',
}: UseInfiniteScrollDataQueryProps) => {
  return useInfiniteQuery({
    queryKey: queryKeyPrefix
      ? [...queryKeyPrefix, apiBase, JSON.stringify(queryParams)]
      : [
          moduleName,
          ViewInfiniteQueryKey,
          apiBase,
          JSON.stringify(queryParams),
        ],
    queryFn: ({ pageParam = 1 }) =>
      fetchViewData<T>({
        apiBase,
        pageParam: pageParam as number,
        queryParams,
        methods,
      }),
    getNextPageParam: (lastPage) => {
      const current_page = lastPage?.current_page ?? 1;
      const total_pages = lastPage?.total_pages;
      const nextPageNumber = current_page + 1;

      if (current_page && total_pages && current_page < total_pages) {
        return nextPageNumber;
      }

      return undefined;
    },
    initialPageParam: 1,
    retry: API_RETRY_COUNT,
    enabled,
    staleTime,
  });
};
