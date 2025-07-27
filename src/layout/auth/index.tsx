import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Company Name */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-xl mb-4">
            <span className="text-2xl font-bold text-primary-foreground">P</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">ProMano</h1>
          <p className="text-muted-foreground mt-2">Construction & Engineering Management</p>
        </div>

        {/* Auth Form Container */}
        <div className="bg-card rounded-2xl shadow-xl p-8 border">
          <Outlet />
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>&copy; 2024 ProMano. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
