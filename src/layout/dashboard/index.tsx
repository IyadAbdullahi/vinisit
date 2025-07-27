import React from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardHeader } from './header';
import { DashboardSidebar } from './sidenav';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import type { User, UserRole } from '@/types';

interface DashboardLayoutProps {
  user: User | null;
  userRole: UserRole;
  onLogout: () => void;
  children?: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  user, 
  userRole, 
  onLogout 
}) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background w-full">
        {/* Sidebar */}
        <DashboardSidebar userRole={userRole} user={user} />
        
        {/* Main Content Area */}
        <SidebarInset>
          <div className="flex flex-col h-full">
            {/* Header */}
            <DashboardHeader user={user} onLogout={onLogout} />
            
            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-muted/30">
              <div className="mx-auto p-6 space-y-8 max-w-5xl">
                <Outlet />
              </div>
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
