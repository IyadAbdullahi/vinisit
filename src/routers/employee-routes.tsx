import React from 'react';
import type { RouteObject } from 'react-router-dom';

// Employee Pages (to be created)
const EmployeeDashboard = React.lazy(() => import('@/pages/employee/dashboard'));
const MyTasks = React.lazy(() => import('@/pages/employee/my-tasks'));
const MyProfile = React.lazy(() => import('@/pages/employee/profile'));
const LeaveRequests = React.lazy(() => import('@/pages/employee/leave'));
const MyPayslips = React.lazy(() => import('@/pages/employee/payslips'));
const MyRequestForms = React.lazy(() => import('@/pages/employee/request-forms'));
const MyTimesheet = React.lazy(() => import('@/pages/employee/timesheet'));

export const employeeRoutes: RouteObject[] = [
  {
    path: '/employee',
    children: [
      {
        path: '',
        element: <EmployeeDashboard />,
      },
      {
        path: 'dashboard',
        element: <EmployeeDashboard />,
      },
      {
        path: 'tasks',
        element: <MyTasks />,
      },
      {
        path: 'tasks/:taskId',
        element: <MyTasks />,
      },
      {
        path: 'profile',
        element: <MyProfile />,
      },
      {
        path: 'profile/edit',
        element: <MyProfile />,
      },
      {
        path: 'leave',
        element: <LeaveRequests />,
      },
      {
        path: 'leave/request',
        element: <LeaveRequests />,
      },
      {
        path: 'leave/:requestId',
        element: <LeaveRequests />,
      },
      {
        path: 'payslips',
        element: <MyPayslips />,
      },
      {
        path: 'payslips/:payslipId',
        element: <MyPayslips />,
      },
      {
        path: 'request-forms',
        element: <MyRequestForms />,
      },
      {
        path: 'request-forms/create',
        element: <MyRequestForms />,
      },
      {
        path: 'request-forms/:formId',
        element: <MyRequestForms />,
      },
      {
        path: 'timesheet',
        element: <MyTimesheet />,
      },
    ],
  },
]; 