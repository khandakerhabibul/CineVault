import { Suspense, lazy } from 'react';
import type { ModuleRouteType } from '../../common/common.types';
import { watchlistPath } from './moduleInfo';
import Loader from '../../components/Loader/Loader';

const Watchlist = lazy(() => import('./Watchlist'));

export const routes: ModuleRouteType = {
  name: 'watchlistPath',
  path: watchlistPath,
  element: () => (
    <Suspense fallback={<Loader />}>
      <Watchlist />
    </Suspense>
  ),
  title: 'All Watchlist',
  subTitle: 'Check your watchlist here',
  isProtected: true,
};
