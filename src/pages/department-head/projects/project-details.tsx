import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Plus,
  Kanban,
  BarChart3,
  Users,
  Package,
  FolderOpen
} from 'lucide-react';
import { mockProjects, mockRequestForms } from '../mockdata';
import { GanttChart } from '@/components/project-management/gantt-chart';
import { KanbanBoard } from '@/components/project-management/kanban-board';
import { MilestoneTracker } from '@/components/project-management/milestone-tracker';
import { DocumentRepository } from '@/components/project-management/document-repository';
import { VendorManagement } from '@/components/procurement/vendor-management';
import { ItemCatalog } from '@/components/procurement/item-catalog';
import { ProcurementWorkflow } from '@/components/procurement/procurement-workflow';
import { TeamAssignment } from '@/components/team-management/team-assignment';
import { PerformanceDashboard } from '@/components/team-management/performance-dashboard';
import { ResourceAllocation } from '@/components/team-management/resource-allocation';
import type { Project, RequestForm } from '@/types';

const ProjectDetailsPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Find the project
  const project = mockProjects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  const getStatusBadgeColor = (status: string) => {
    const colors = {
      planning: 'bg-blue-100 text-blue-800 border-blue-200',
      active: 'bg-green-100 text-green-800 border-green-200',
      on_hold: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      completed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getPriorityBadgeColor = (priority: string) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800 border-gray-200',
      medium: 'bg-blue-100 text-blue-800 border-blue-200',
      high: 'bg-orange-100 text-orange-800 border-orange-200',
      critical: 'bg-red-100 text-red-800 border-red-200',
      urgent: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateProjectHealth = (project: Project) => {
    const progressScore = project.progress;
    const budgetScore = ((project.budget - project.spent) / project.budget) * 100;
    const timeScore = calculateTimeScore(project);
    
    const overallScore = (progressScore + budgetScore + timeScore) / 3;
    
    if (overallScore >= 80) return 'healthy';
    if (overallScore >= 60) return 'warning';
    return 'critical';
  };

  const calculateTimeScore = (project: Project) => {
    const start = new Date(project.startDate);
    const end = new Date(project.endDate);
    const now = new Date();
    
    const totalTime = end.getTime() - start.getTime();
    const elapsedTime = now.getTime() - start.getTime();
    const timeProgress = (elapsedTime / totalTime) * 100;
    
    if (timeProgress > project.progress) {
      return Math.max(0, 100 - (timeProgress - project.progress));
    }
    return 100;
  };

  // Filter request forms for this project
  const projectRequests = mockRequestForms.filter(request => 
    request.items?.some(item => item.description?.includes(project.name))
  );

  const health = calculateProjectHealth(project);
  const budgetUtilization = (project.spent / project.budget) * 100;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{project.name}</h1>
            <p className="text-gray-600">{project.code}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className={getStatusBadgeColor(project.status)}>
            {project.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </Badge>
          <Badge variant="outline" className={getPriorityBadgeColor(project.priority)}>
            {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
          </Badge>
          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            health === 'healthy' ? 'bg-green-100 text-green-800' :
            health === 'warning' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {health === 'healthy' && <CheckCircle2 className="h-3 w-3 mr-1" />}
            {health === 'warning' && <AlertTriangle className="h-3 w-3 mr-1" />}
            {health === 'critical' && <AlertTriangle className="h-3 w-3 mr-1" />}
            {health.charAt(0).toUpperCase() + health.slice(1)}
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="gantt">Gantt Chart</TabsTrigger>
          <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="procurement">Procurement</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Start Date</p>
                    <p className="text-sm">{formatDate(project.startDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">End Date</p>
                    <p className="text-sm">{formatDate(project.endDate)}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Description</p>
                  <p className="text-sm">{project.description}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Budget Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Budget</p>
                    <p className="text-lg font-bold">{formatCurrency(project.budget)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Spent</p>
                    <p className="text-lg font-bold">{formatCurrency(project.spent)}</p>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium text-gray-500">Budget Utilization</p>
                    <p className="text-sm font-medium">{budgetUtilization.toFixed(1)}%</p>
                  </div>
                  <Progress value={budgetUtilization} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="gantt">
          <GanttChart
            project={project}
            onMilestoneEdit={(milestone) => console.log('Edit milestone:', milestone)}
            onTaskEdit={(task) => console.log('Edit task:', task)}
            onAddMilestone={() => console.log('Add milestone')}
            onAddTask={() => console.log('Add task')}
          />
        </TabsContent>

        <TabsContent value="kanban">
          <KanbanBoard
            project={project}
            onTaskEdit={(task) => console.log('Edit task:', task)}
            onTaskMove={(taskId, newStatus) => console.log('Move task:', taskId, newStatus)}
            onAddTask={(status) => console.log('Add task with status:', status)}
          />
        </TabsContent>

        <TabsContent value="milestones">
          <MilestoneTracker
            project={project}
            onMilestoneUpdate={(milestone) => console.log('Update milestone:', milestone)}
            onMilestoneAdd={(milestone) => console.log('Add milestone:', milestone)}
            onMilestoneDelete={(milestoneId) => console.log('Delete milestone:', milestoneId)}
          />
        </TabsContent>

        <TabsContent value="documents">
          <DocumentRepository
            projectId={project.id}
            projectName={project.name}
            onDocumentUpload={(file, metadata) => console.log('Upload document:', file, metadata)}
            onDocumentUpdate={(document) => console.log('Update document:', document)}
            onDocumentDelete={(documentId) => console.log('Delete document:', documentId)}
          />
        </TabsContent>

        <TabsContent value="procurement">
          <Tabs defaultValue="vendors" className="space-y-4">
            <TabsList>
              <TabsTrigger value="vendors">Vendor Management</TabsTrigger>
              <TabsTrigger value="catalog">Item Catalog</TabsTrigger>
              <TabsTrigger value="workflow">Procurement Workflow</TabsTrigger>
            </TabsList>
            
            <TabsContent value="vendors">
              <VendorManagement
                onVendorSelect={(vendor) => console.log('Select vendor:', vendor)}
                onVendorUpdate={(vendor) => console.log('Update vendor:', vendor)}
              />
            </TabsContent>
            
            <TabsContent value="catalog">
              <ItemCatalog
                onItemSelect={(item) => console.log('Select item:', item)}
                onItemUpdate={(item) => console.log('Update item:', item)}
                onCreateOrder={(items) => console.log('Create order:', items)}
              />
            </TabsContent>
            
            <TabsContent value="workflow">
              <ProcurementWorkflow
                onWorkflowUpdate={(workflow) => console.log('Update workflow:', workflow)}
                onStepComplete={(workflowId, stepId) => console.log('Complete step:', workflowId, stepId)}
              />
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="team">
          <Tabs defaultValue="assignment" className="space-y-4">
            <TabsList>
              <TabsTrigger value="assignment">Team Assignment</TabsTrigger>
              <TabsTrigger value="performance">Performance Dashboard</TabsTrigger>
              <TabsTrigger value="allocation">Resource Allocation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="assignment">
              <TeamAssignment
                project={project}
                onAssignmentUpdate={(assignment) => console.log('Update assignment:', assignment)}
                onMemberAssign={(employeeId, projectId, role) => console.log('Assign member:', employeeId, projectId, role)}
              />
            </TabsContent>
            
            <TabsContent value="performance">
              <PerformanceDashboard
                departmentId={project.departmentId}
                onPerformanceUpdate={(metrics) => console.log('Update performance:', metrics)}
              />
            </TabsContent>
            
            <TabsContent value="allocation">
              <ResourceAllocation
                departmentId={project.departmentId}
                onAllocationUpdate={(allocation) => console.log('Update allocation:', allocation)}
                onOptimizationApply={(suggestion) => console.log('Apply optimization:', suggestion)}
              />
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetailsPage; 