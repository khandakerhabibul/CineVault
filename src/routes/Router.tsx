import { Suspense, lazy } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import { allRoutes } from './allRoutes';
import AuthLayout from 'src/Auth/AuthLayout';
import RequiredAuth from 'src/Auth/RequiredAuth';
import Layout from 'src/Layout/Layout';
import Loader from 'components/Loader/Loader';
import { LOGIN_PATH, SIGNUP_PATH } from 'src/common/constant';
import PublicOnlyAuth from 'src/Auth/PublicOnlyAuth';

const FallBackError = lazy(
  () => import('components/FallBackError/FallBackError'),
);

const Login = lazy(() => import('src/Auth/Login'));
const Signup = lazy(() => import('src/Auth/SignUp'));
const PageNotFound = lazy(() => import('components/PageNotFound/PageNotFound'));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Auth pages */}
      <Route
        errorElement={
          <Suspense fallback={<div></div>}>
            <FallBackError />
          </Suspense>
        }
        element={<AuthLayout />}
      >
        <Route
          path={LOGIN_PATH}
          element={
            <Suspense fallback={<Loader />}>
              <PublicOnlyAuth>
                <Login />
              </PublicOnlyAuth>
            </Suspense>
          }
        />
        <Route
          path={SIGNUP_PATH}
          element={
            <Suspense fallback={<Loader />}>
              <PublicOnlyAuth>
                <Signup />
              </PublicOnlyAuth>
            </Suspense>
          }
        />

        <Route
          errorElement={
            <Suspense fallback={<div></div>}>
              <FallBackError />
            </Suspense>
          }
          path='/'
          element={<Layout />}
        >
          {allRoutes.map(
            ({ name, path, element: Element, subRoutes, isProtected }) => {
              return (
                <Route
                  errorElement={
                    <Suspense fallback={<div></div>}>
                      <FallBackError />
                    </Suspense>
                  }
                  key={name}
                  path={path}
                >
                  <Route
                    errorElement={
                      <Suspense fallback={<div></div>}>
                        <FallBackError />
                      </Suspense>
                    }
                    index
                    element={
                      <Suspense fallback={<div></div>}>
                        {isProtected ? (
                          <RequiredAuth>
                            <Element />
                          </RequiredAuth>
                        ) : (
                          <Element />
                        )}
                      </Suspense>
                    }
                  />
                  {subRoutes &&
                    subRoutes.map(
                      ({ element: SubRouteElement, ...subRoute }) => {
                        return (
                          <Route
                            errorElement={
                              <Suspense fallback={<div></div>}>
                                <FallBackError />
                              </Suspense>
                            }
                            key={subRoute.name}
                            path={subRoute.path}
                            element={
                              <Suspense fallback={<div></div>}>
                                {isProtected ? (
                                  <RequiredAuth>
                                    <SubRouteElement />
                                  </RequiredAuth>
                                ) : (
                                  <SubRouteElement />
                                )}
                              </Suspense>
                            }
                          />
                        );
                      },
                    )}
                </Route>
              );
            },
          )}
        </Route>
      </Route>

      <Route
        path='*'
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <PageNotFound />
          </Suspense>
        }
      />
    </>,
  ),
);
