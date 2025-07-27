import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RequestFormsManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Request Forms Management</h1>
        <p className="text-muted-foreground">
          Create, edit, and manage company-wide request form templates and instances
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Request Forms</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Request forms management interface coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RequestFormsManagement; 