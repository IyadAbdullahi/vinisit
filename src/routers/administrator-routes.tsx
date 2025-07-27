import React from 'react';
import type { RouteObject } from 'react-router-dom';

// Administrator Pages (to be created)
const AdministratorDashboard = React.lazy(() => import('@/pages/administrator/dashboard'));
const RequestFormsManagement = React.lazy(() => import('@/pages/administrator/request-forms'));
const SharedResources = React.lazy(() => import('@/pages/administrator/resources'));
const UserSupport = React.lazy(() => import('@/pages/administrator/support'));
const AdministratorApprovals = React.lazy(() => import('@/pages/administrator/approvals'));

export const administratorRoutes: RouteObject[] = [
  {
    path: '/administrator',
    children: [
      {
        path: '',
        element: <AdministratorDashboard />,
      },
      {
        path: 'dashboard',
        element: <AdministratorDashboard />,
      },
      {
        path: 'request-forms',
        element: <RequestFormsManagement />,
      },
      {
        path: 'request-forms/create',
        element: <RequestFormsManagement />,
      },
      {
        path: 'request-forms/templates',
        element: <RequestFormsManagement />,
      },
      {
        path: 'request-forms/:formId',
        element: <RequestFormsManagement />,
      },
      {
        path: 'resources',
        element: <SharedResources />,
      },
      {
        path: 'resources/vehicles',
        element: <SharedResources />,
      },
      {
        path: 'resources/equipment',
        element: <SharedResources />,
      },
      {
        path: 'resources/:resourceId',
        element: <SharedResources />,
      },
      {
        path: 'support',
        element: <UserSupport />,
      },
      {
        path: 'support/tickets',
        element: <UserSupport />,
      },
      {
        path: 'support/password-resets',
        element: <UserSupport />,
      },
      {
        path: 'approvals',
        element: <AdministratorApprovals />,
      },
      {
        path: 'approvals/request-forms',
        element: <AdministratorApprovals />,
      },
      {
        path: 'approvals/:requestId',
        element: <AdministratorApprovals />,
      },
    ],
  },
]; 