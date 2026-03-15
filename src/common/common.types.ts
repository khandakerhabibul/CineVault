import type React from 'react';

export type ModuleRouteType = {
  subRoutes?: SubModuleRouteType[];
  title?: string;
  subTitle?: string;
  isProtected: boolean;
} & SubModuleRouteType;

export type SubModuleRouteType = {
  name: string;
  path: string;
  element: () => React.JSX.Element;
  isProtected: boolean;
};
