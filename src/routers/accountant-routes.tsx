import React from 'react';
import type { RouteObject } from 'react-router-dom';

// Accountant Pages (to be created)
const AccountantDashboard = React.lazy(() => import('@/pages/accountant/dashboard'));
const PayrollManagement = React.lazy(() => import('@/pages/accountant/payroll'));
const ProcurementPayments = React.lazy(() => import('@/pages/accountant/procurement-payments'));
const FinancialReports = React.lazy(() => import('@/pages/accountant/reports'));
const PaymentReconciliation = React.lazy(() => import('@/pages/accountant/reconciliation'));
const GeneratePayments = React.lazy(() => import('@/pages/accountant/payments'));

export const accountantRoutes: RouteObject[] = [
  {
    path: '/accountant',
    children: [
      {
        path: '',
        element: <AccountantDashboard />,
      },
      {
        path: 'dashboard',
        element: <AccountantDashboard />,
      },
      {
        path: 'payroll',
        element: <PayrollManagement />,
      },
      {
        path: 'payroll/process',
        element: <PayrollManagement />,
      },
      {
        path: 'payroll/:payrollId',
        element: <PayrollManagement />,
      },
      {
        path: 'procurement-payments',
        element: <ProcurementPayments />,
      },
      {
        path: 'procurement-payments/:requestId',
        element: <ProcurementPayments />,
      },
      {
        path: 'reports',
        element: <FinancialReports />,
      },
      {
        path: 'reports/balance-sheet',
        element: <FinancialReports />,
      },
      {
        path: 'reports/income-statement',
        element: <FinancialReports />,
      },
      {
        path: 'reports/custom',
        element: <FinancialReports />,
      },
      {
        path: 'reconciliation',
        element: <PaymentReconciliation />,
      },
      {
        path: 'reconciliation/:paymentId',
        element: <PaymentReconciliation />,
      },
      {
        path: 'payments',
        element: <GeneratePayments />,
      },
      {
        path: 'payments/generate',
        element: <GeneratePayments />,
      },
      {
        path: 'payments/from-request/:requestId',
        element: <GeneratePayments />,
      },
    ],
  },
]; 