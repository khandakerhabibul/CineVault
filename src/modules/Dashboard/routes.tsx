import { Suspense, lazy } from 'react';
import type { ModuleRouteType } from '../../common/common.types';
import { dashboardPath } from './moduleInfo';
import Loader from '../../components/Loader/Loader';

const Dashboard = lazy(() => import('./Dashboard'));

export const routes: ModuleRouteType = {
  name: 'dashboardPath',
  path: dashboardPath,
  element: () => (
    <Suspense fallback={<Loader />}>
      <Dashboard />
    </Suspense>
  ),
  title: 'Dashboard',
  subTitle: 'Check your dashboard here',
  isProtected: true,
};
