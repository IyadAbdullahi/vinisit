import EmailPage from '@/pages/globals/mails';
import React from 'react';
import type { RouteObject } from 'react-router-dom';

// HR Manager Pages
const HRDashboard = React.lazy(() => import('@/pages/hr-manager/dashboard'));
const EmployeeDirectory = React.lazy(() => import('@/pages/hr-manager/employee-directory'));
const PayrollAndLeaveManagement = React.lazy(() => import('@/pages/hr-manager/performance-reviews'));

export const hrManagerRoutes: RouteObject[] = [
  {
    path: '/hr-manager',
    children: [
      {
        path: '',
        element: <HRDashboard />,
      },
      {
        path: 'dashboard',
        element: <HRDashboard />,
      },
      {
        path: 'mail',
        element: <EmailPage />,
      },
      {
        path: 'employees',
        element: <EmployeeDirectory />,
      },
      {
        path: 'employees/create',
        element: <EmployeeDirectory />,
      },
      {
        path: 'employees/:employeeId',
        element: <EmployeeDirectory />,
      },
      {
        path: 'payroll-leave',
        element: <PayrollAndLeaveManagement />,
      },
      {
        path: 'payroll',
        element: <PayrollAndLeaveManagement />,
      },
      {
        path: 'leave',
        element: <PayrollAndLeaveManagement />,
      },
      {
        path: 'payroll/process',
        element: <PayrollAndLeaveManagement />,
      },
      {
        path: 'payroll/:payrollId',
        element: <PayrollAndLeaveManagement />,
      },
      {
        path: 'leave/:requestId',
        element: <PayrollAndLeaveManagement />,
      }
    ],
  },
]; 