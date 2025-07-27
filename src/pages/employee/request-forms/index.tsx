import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MyRequestForms: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Request Forms</h1>
        <p className="text-muted-foreground">
          Initiate and view the status of your submitted request forms
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Request Forms</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Request forms interface coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyRequestForms; 