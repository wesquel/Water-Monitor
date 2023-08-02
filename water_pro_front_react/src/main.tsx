import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import type { Router as RemixRouter } from '@remix-run/router';
import './main.css';
import {loginRoutes} from './modules/login/routes';
import {GlobalProvider} from './shared/hooks/useGlobalContext';
import {registryRoutes} from './modules/registry/routes';
import {dashboardRoutes} from './modules/dashboard/routes';
import {homeRoutes} from './modules/home/routes';

const router : RemixRouter = createBrowserRouter([...homeRoutes, ...loginRoutes, ...registryRoutes, ...dashboardRoutes]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  </React.StrictMode>,
)
