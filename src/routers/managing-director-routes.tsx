import React from 'react';
import type { RouteObject } from 'react-router-dom';

// Managing Director Pages
const ManagingDirectorDashboard = React.lazy(() => import('@/pages/managing-director/dashboard'));
const PerformanceOverview = React.lazy(() => import('@/pages/managing-director/performance'));
const FinancialInsights = React.lazy(() => import('@/pages/managing-director/financials'));
const ApprovalsAndDecisions = React.lazy(() => import('@/pages/managing-director/approvals'));
const HistoryPage = React.lazy(() => import('@/pages/managing-director/history'));
const ProjectDetails = React.lazy(() => import('@/pages/managing-director/project-details'));
const PaymentDetails = React.lazy(() => import('@/pages/managing-director/payment-details'));

export const managingDirectorRoutes: RouteObject[] = [
  {
    path: '/managing-director',
    children: [
      {
        path: '',
        element: <ManagingDirectorDashboard />,
      },
      {
        path: 'dashboard',
        element: <ManagingDirectorDashboard />,
      },
      {
        path: 'performance',
        element: <PerformanceOverview />,
      },
      {
        path: 'financials',
        element: <FinancialInsights />,
      },
      {
        path: 'approvals',
        element: <ApprovalsAndDecisions />,
      },
      {
        path: 'history',
        element: <HistoryPage />,
      },
      {
        path: 'project/:projectId',
        element: <ProjectDetails />,
      },
      {
        path: 'payment/:paymentId',
        element: <PaymentDetails />,
      },
    ],
  },
]; 