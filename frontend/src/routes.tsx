
import React from 'react';


const DynamicHome = React.lazy(() => import('./pages\Home'));
const DynamicQ1 = React.lazy(() => import('./pages\Q1'));
const DynamicQ2 = React.lazy(() => import('./pages\Q2'));
const DynamicQ3 = React.lazy(() => import('./pages\Q3'));
const DynamicQ41 = React.lazy(() => import('./pages\Q41'));
const DynamicQ42 = React.lazy(() => import('./pages\Q42'));
const DynamicQ43 = React.lazy(() => import('./pages\Q43'));
const DynamicQ5 = React.lazy(() => import('./pages\Q5'));
const DynamicQ6 = React.lazy(() => import('./pages\Q6'));
const DynamicWrapper = React.lazy(() => import('./pages\Wrapper'));


export const routes = [
  {
    path: '/',
    element: <Outlet />,
    children: [
      { path: 'D:\Home', element: <DynamicHome />, },
      { path: 'D:\Q1', element: <DynamicQ1 />, },
      { path: 'D:\Q2', element: <DynamicQ2 />, },
      { path: 'D:\Q3', element: <DynamicQ3 />, },
      { path: 'D:\Q41', element: <DynamicQ41 />, },
      { path: 'D:\Q42', element: <DynamicQ42 />, },
      { path: 'D:\Q43', element: <DynamicQ43 />, },
      { path: 'D:\Q5', element: <DynamicQ5 />, },
      { path: 'D:\Q6', element: <DynamicQ6 />, },
      { path: 'D:\Wrapper', element: <DynamicWrapper />, },
    ]
  }
]

export const pages = [
  { route: 'D:\Home' },
  { route: 'D:\Q1' },
  { route: 'D:\Q2' },
  { route: 'D:\Q3' },
  { route: 'D:\Q41' },
  { route: 'D:\Q42' },
  { route: 'D:\Q43' },
  { route: 'D:\Q5' },
  { route: 'D:\Q6' },
  { route: 'D:\Wrapper' },
]
