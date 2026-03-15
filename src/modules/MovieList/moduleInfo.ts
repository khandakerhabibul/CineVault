export const moduleName = 'movies' as const;

export const movieListPath = `${moduleName}` as const;
export const movieListFullPath = `/${movieListPath}` as const;

export const movieListViewPath = ':id' as const;
export const movieListViewPathFull =
  `/${movieListPath}/${movieListViewPath}` as const;

export const movieSearchPath = 'search' as const;
export const movieSearchPathFull =
  `/${movieListPath}/${movieSearchPath}` as const;

export const allMoviesListPath = 'all-movies' as const;
export const allMoviesListPathFull =
  `/${movieListPath}/${allMoviesListPath}` as const;
