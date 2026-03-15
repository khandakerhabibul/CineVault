export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  media_type?: 'movie';
}

export interface ListResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export type TrendingMoviesResp = ListResponse<Movie>;
export type PopularMoviesResp = ListResponse<Movie>;
export type SearchMoviesResp = ListResponse<Movie>;
export type MovieDetailResp = Movie & {
  genres: { id: number; name: string }[];
  runtime: number;
  status: string;
  tagline: string;
};

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface MovieCreditsResp {
  id: number;
  cast: Cast[];
}
