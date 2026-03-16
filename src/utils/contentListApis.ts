export const trendingMoviesApi = () => '/trending/movie/day';
export const popularMoviesApi = () => '/movie/popular';
export const topRatedMoviesApi = () => '/movie/top_rated';
export const upcomingMoviesApi = () => '/movie/upcoming';
export const searchMovieApi = () => '/search/movie';
export const movieDetailApi = (id: string | number) => `/movie/${id}`;
export const movieCreditsApi = (id: string | number) => `/movie/${id}/credits`;
export const movieVideosApi = (id: string | number) => `/movie/${id}/videos`;
