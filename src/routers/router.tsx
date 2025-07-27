import React, { Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { DashboardLayout } from '@/layout/dashboard';
import AuthLayout from '@/layout/auth';
import { superAdminRoutes } from './super-admin-routes';
import { managingDirectorRoutes } from './managing-director-routes';
import { departmentHeadRoutes } from './department-head-routes';
import { hrManagerRoutes } from './hr-manager-routes';
import { accountantRoutes } from './accountant-routes';
import { administratorRoutes } from './administrator-routes';
import { employeeRoutes } from './employee-routes';
import { getRoleBaseDashboard } from '@/lib/navigation';
import type { User, UserRole } from '@/types';

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

// Error Boundary Component
const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-destructive">Something went wrong</h2>
        <p className="text-muted-foreground">Please try refreshing the page</p>
      </div>
    </div>
  );
};

// Authentication wrapper component
interface AuthWrapperProps {
  user: User | null;
  userRole: UserRole;
  onLogout: () => void;
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ 
  user, 
  userRole, 
  onLogout, 
  children 
}) => {
  return (
    <DashboardLayout user={user} userRole={userRole} onLogout={onLogout} />
  );
};

// Role-based redirect component
interface RoleRedirectProps {
  userRole: UserRole;
}

const RoleRedirect: React.FC<RoleRedirectProps> = ({ userRole }) => {
  const dashboardPath = getRoleBaseDashboard(userRole);
  return <Navigate to={dashboardPath} replace />;
};

// Create router function that accepts auth props
export const createAppRouter = (
  user: User | null,
  userRole: UserRole,
  onLogout: () => void,
  isAuthenticated: boolean
) => {
  // Wrap route elements with auth context
  const wrapWithAuth = (element: React.ReactElement) => (
    <AuthWrapper user={user} userRole={userRole} onLogout={onLogout}>
      {element}
    </AuthWrapper>
  );

  // Transform route configurations to include auth wrapper
  const transformRoutes = (routes: any[]) => {
    return routes.map(route => ({
      ...route,
      element: wrapWithAuth(<div />), // DashboardLayout will handle Outlet
      children: route.children,
    }));
  };

  return createBrowserRouter([
    {
      path: '/',
      element: isAuthenticated ? (
        <RoleRedirect userRole={userRole} />
      ) : (
        <Navigate to="/auth/login" replace />
      ),
    },
    {
      path: '/auth',
      element: <AuthLayout />,
      children: [
        {
          path: '',
          element: <Navigate to="/auth/login" replace />,
        },
        {
          path: 'login',
          element: (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <h2 className="text-2xl font-bold">Login</h2>
                <p className="text-muted-foreground">Login page placeholder</p>
              </div>
            </div>
          ),
        },
        {
          path: 'register',
          element: (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <h2 className="text-2xl font-bold">Register</h2>
                <p className="text-muted-foreground">Register page placeholder</p>
              </div>
            </div>
          ),
        },
      ],
    },
    // Protected routes based on user role
    ...(isAuthenticated ? [
      ...transformRoutes(superAdminRoutes),
      ...transformRoutes(managingDirectorRoutes),
      ...transformRoutes(departmentHeadRoutes),
      ...transformRoutes(hrManagerRoutes),
      ...transformRoutes(accountantRoutes),
      ...transformRoutes(administratorRoutes),
      ...transformRoutes(employeeRoutes),
    ] : []),
    // Catch all route
    {
      path: '*',
      element: isAuthenticated ? (
        <RoleRedirect userRole={userRole} />
      ) : (
        <Navigate to="/auth/login" replace />
      ),
    },
  ]);
};

// Hook to use the router with current auth state
export const useAppRouter = () => {
  // Mock auth state - in real app this would come from auth context/store
  const mockUser: User = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@promano.com',
    role: 'managing_director',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const mockUserRole: UserRole = 'hr_manager';
  const mockIsAuthenticated = true;
  
  const handleLogout = () => {
    // Mock logout function
    console.log('Logging out...');
  };

  return createAppRouter(
    mockUser,
    mockUserRole,
    handleLogout,
    mockIsAuthenticated
  );
};