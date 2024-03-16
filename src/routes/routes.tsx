import {Paper, Proposals, Treasury} from '@pages';

import {HOME_PATH} from './name';
import {Navigate, RouteObject, createBrowserRouter} from 'react-router-dom';
import Layout from '@layout/index';

const routes: RouteObject[] = [
  {
    path: HOME_PATH,
    element: <Navigate to="/paper" replace />,
  },
  {
    path: HOME_PATH,
    element: <Layout />,
    children: [
      {
        path: 'paper',
        element: <Paper />,
      },
      {
        path: 'proposals',
        element: <Proposals />,
      },
      {
        path: 'treasury',
        element: <Treasury />,
      },
    ],
  },
];

export default createBrowserRouter(routes);
