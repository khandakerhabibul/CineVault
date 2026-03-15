export type FetchApiMethodsType = 'get' | 'post' | 'put' | 'delete';

export interface Pagination {
  current_page: number;
  total_pages: number;
  total_results: number;
}

export interface InfiniteScrollResponse<T> extends Pagination {
  results: T[];
}
