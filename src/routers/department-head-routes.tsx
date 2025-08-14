import React from 'react';
import type { RouteObject } from 'react-router-dom';

// Department Head Pages
const DashboardPage = React.lazy(() => import('@/pages/department-head/dashboard'));
const ProjectsPage = React.lazy(() => import('@/pages/department-head/projects'));
const NewProjectPage = React.lazy(() => import('@/pages/department-head/projects/new-project'));
const ProjectDetailsPage = React.lazy(() => import('@/pages/department-head/projects/project-details'));
const TeamPage = React.lazy(() => import('@/pages/department-head/team'));
const RequestFormsPage = React.lazy(() => import('@/pages/department-head/request-forms'));
const BudgetPage = React.lazy(() => import('@/pages/department-head/budget'));
const ReportsPage = React.lazy(() => import('@/pages/department-head/reports'));
const ApprovalsPage = React.lazy(() => import('@/pages/department-head/approvals'));
const ProcurementPage = React.lazy(() => import('@/pages/department-head/procurement'));

export const departmentHeadRoutes: RouteObject[] = [
  {
    path: '/department-head',
    children: [
      {
        path: '',
        element: <DashboardPage />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'projects',
        element: <ProjectsPage />,
      },
      {
        path: 'projects/new',
        element: <NewProjectPage />,
      },
      {
        path: 'projects/:projectId',
        element: <ProjectDetailsPage />,
      },
      {
        path: 'team',
        element: <TeamPage />,
      },
      {
        path: 'team/:employeeId',
        element: <TeamPage />,
      },
      {
        path: 'procurement',
        element: <ProcurementPage />,
      },
      {
        path: 'request-forms',
        element: <RequestFormsPage />,
      },
      {
        path: 'approvals',
        element: <ApprovalsPage />,
      },
      {
        path: 'approvals/requests',
        element: <ApprovalsPage />,
      },
      {
        path: 'approvals/leave',
        element: <ApprovalsPage />,
      },
      {
        path: 'budget',
        element: <BudgetPage />,
      },
      {
        path: 'reports',
        element: <ReportsPage />,
      },
    ],
  },
]; 