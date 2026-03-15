import { Suspense, lazy } from 'react';
import type { ModuleRouteType } from '../../common/common.types';
import {
  movieListPath,
  movieListViewPath,
  allMoviesListPath,
  movieSearchPath,
} from './moduleInfo';
import Loader from '../../components/Loader/Loader';

const ContentList = lazy(() => import('./MovieList'));
const ContentView = lazy(() => import('./MovieView/MovieView'));
const AllMovies = lazy(() => import('./AllMovies/AllMovies'));
const ContentSearch = lazy(() => import('./MovieSearch/MovieSearch'));

export const routes: ModuleRouteType = {
  name: 'movieListPath',
  path: movieListPath,
  element: () => (
    <Suspense fallback={<Loader />}>
      <ContentList />
    </Suspense>
  ),
  title: 'All Contents',
  subTitle: 'Browse all the contents here',
  isProtected: false,
  subRoutes: [
    {
      name: 'movieListViewPath',
      path: movieListViewPath,
      element: () => (
        <Suspense fallback={<Loader />}>
          <ContentView />
        </Suspense>
      ),
      isProtected: false,
    },
    {
      name: 'movieSearchPath',
      path: movieSearchPath,
      element: () => (
        <Suspense fallback={<Loader />}>
          <ContentSearch />
        </Suspense>
      ),
      isProtected: false,
    },
    {
      name: 'allMoviesListPath',
      path: allMoviesListPath,
      element: () => (
        <Suspense fallback={<Loader />}>
          <AllMovies />
        </Suspense>
      ),
      isProtected: false,
    },
  ],
};
