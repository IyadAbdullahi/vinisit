import React from 'react';
import type { RouteObject } from 'react-router-dom';

// Super Admin Pages (to be created)
const SuperAdminDashboard = React.lazy(() => import('@/pages/super-admin/dashboard'));
const DepartmentManagement = React.lazy(() => import('@/pages/super-admin/departments'));
const SystemSettings = React.lazy(() => import('@/pages/super-admin/system-settings'));
const AllProjects = React.lazy(() => import('@/pages/super-admin/all-projects'));
const AllEmployees = React.lazy(() => import('@/pages/super-admin/all-employees'));
// const SystemReports = React.lazy(() => import('@/pages/super-admin/reports'));
// const BillingManagement = React.lazy(() => import('@/pages/super-admin/billing'));
const AuditLogs = React.lazy(() => import('@/pages/super-admin/audit-logs'));

export const superAdminRoutes: RouteObject[] = [
  {
    path: '/super-admin',
    children: [
      {
        path: '',
        element: <SuperAdminDashboard />,
      },
      {
        path: 'dashboard',
        element: <SuperAdminDashboard />,
      },
      {
        path: 'departments',
        element: <DepartmentManagement />,
      },
      {
        path: 'departments/create',
        element: <DepartmentManagement />,
      },
      {
        path: 'departments/:departmentId',
        element: <DepartmentManagement />,
      },
      {
        path: 'system-settings',
        element: <SystemSettings />,
      },
      {
        path: 'projects',
        element: <AllProjects />,
      },
      {
        path: 'projects/:projectId',
        element: <AllProjects />, // Will handle project details
      },
      {
        path: 'employees',
        element: <AllEmployees />,
      },
      {
        path: 'employees/:employeeId',
        element: <AllEmployees />,
      },
      // {
      //   path: 'reports',
      //   element: <SystemReports />,
      // },
      // {
      //   path: 'billing',
      //   element: <BillingManagement />,
      // },
      {
        path: 'audit-logs',
        element: <AuditLogs />,
      },
    ],
  },
]; 