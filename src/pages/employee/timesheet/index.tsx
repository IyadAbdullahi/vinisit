import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MyTimesheet: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">My Timesheet</h1>
      <Card>
        <CardHeader><CardTitle>Time Tracking</CardTitle></CardHeader>
        <CardContent><p className="text-muted-foreground">Time tracking and attendance management</p></CardContent>
      </Card>
    </div>
  );
};

export default MyTimesheet; 