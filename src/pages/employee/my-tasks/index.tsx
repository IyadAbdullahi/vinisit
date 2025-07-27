import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MyTasks: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">My Tasks</h1>
      <Card>
        <CardHeader><CardTitle>Personal Task Management</CardTitle></CardHeader>
        <CardContent><p className="text-muted-foreground">Personal task management (to-do/Kanban)</p></CardContent>
      </Card>
    </div>
  );
};

export default MyTasks; 