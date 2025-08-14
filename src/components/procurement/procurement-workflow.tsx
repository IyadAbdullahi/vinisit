import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  Workflow, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  User,
  Calendar,
  DollarSign,
  Package,
  FileText,
  ArrowRight,
  Eye,
  Edit
} from 'lucide-react';
import type { RequestForm, Payment } from '@/types';

interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  assignee: string;
  dueDate?: string;
  completedAt?: string;
  comments?: string;
  order: number;
}

interface ProcurementWorkflow {
  id: string;
  requestFormId: string;
  requestForm: RequestForm;
  currentStep: number;
  status: 'pending' | 'in_progress' | 'approved' | 'rejected' | 'completed';
  steps: WorkflowStep[];
  createdAt: string;
  updatedAt: string;
  estimatedCompletion?: string;
  actualCompletion?: string;
  totalValue: number;
  urgency: 'low' | 'medium' | 'high' | 'critical';
}

interface ProcurementWorkflowProps {
  onWorkflowUpdate?: (workflow: ProcurementWorkflow) => void;
  onStepComplete?: (workflowId: string, stepId: string) => void;
}

export const ProcurementWorkflow: React.FC<ProcurementWorkflowProps> = ({
  onWorkflowUpdate,
  onStepComplete
}) => {
  const [workflows, setWorkflows] = useState<ProcurementWorkflow[]>([
    {
      id: 'WF001',
      requestFormId: 'REQ001',
      requestForm: {
        id: 'REQ001',
        name: 'Construction Materials for Kano Market',
        description: 'Bulk order for construction materials',
        requestedBy: '106',
        departmentId: '2',
        type: 'equipment',
        currentStatus: 'pending_dept_head',
        requestDate: '2024-02-15',
        items: [],
        totalAmount: 11000000,
        priority: 'high',
        comments: []
      },
      currentStep: 2,
      status: 'in_progress',
      steps: [
        {
          id: 'STEP001',
          name: 'Request Submission',
          description: 'Employee submits procurement request',
          status: 'completed',
          assignee: 'Maria Rodriguez',
          completedAt: '2024-02-15T10:00:00Z',
          order: 1
        },
        {
          id: 'STEP002',
          name: 'Department Head Review',
          description: 'Department head reviews and approves request',
          status: 'in_progress',
          assignee: 'Mike Wilson',
          dueDate: '2024-02-20T17:00:00Z',
          order: 2
        },
        {
          id: 'STEP003',
          name: 'Administrator Approval',
          description: 'Administrator reviews and approves request',
          status: 'pending',
          assignee: 'Robert Taylor',
          order: 3
        },
        {
          id: 'STEP004',
          name: 'Vendor Selection',
          description: 'Select vendors and obtain quotations',
          status: 'pending',
          assignee: 'Procurement Team',
          order: 4
        },
        {
          id: 'STEP005',
          name: 'Payment Processing',
          description: 'Generate and process payment',
          status: 'pending',
          assignee: 'Lisa Garcia',
          order: 5
        },
        {
          id: 'STEP006',
          name: 'Order Fulfillment',
          description: 'Vendor delivers items',
          status: 'pending',
          assignee: 'Vendor',
          order: 6
        }
      ],
      createdAt: '2024-02-15T10:00:00Z',
      updatedAt: '2024-02-18T14:30:00Z',
      estimatedCompletion: '2024-03-01T17:00:00Z',
      totalValue: 11000000,
      urgency: 'high'
    },
    {
      id: 'WF002',
      requestFormId: 'REQ002',
      requestForm: {
        id: 'REQ002',
        name: 'Solar Panels for Kaduna Farm',
        description: 'Solar panels and mounting equipment',
        requestedBy: '107',
        departmentId: '2',
        type: 'equipment',
        currentStatus: 'approved',
        requestDate: '2024-02-16',
        items: [],
        totalAmount: 300000000,
        priority: 'high',
        comments: []
      },
      currentStep: 5,
      status: 'in_progress',
      steps: [
        {
          id: 'STEP007',
          name: 'Request Submission',
          description: 'Employee submits procurement request',
          status: 'completed',
          assignee: 'Ahmed Hassan',
          completedAt: '2024-02-16T09:00:00Z',
          order: 1
        },
        {
          id: 'STEP008',
          name: 'Department Head Review',
          description: 'Department head reviews and approves request',
          status: 'completed',
          assignee: 'Mike Wilson',
          completedAt: '2024-02-17T11:00:00Z',
          order: 2
        },
        {
          id: 'STEP009',
          name: 'Administrator Approval',
          description: 'Administrator reviews and approves request',
          status: 'completed',
          assignee: 'Robert Taylor',
          completedAt: '2024-02-18T15:00:00Z',
          order: 3
        },
        {
          id: 'STEP010',
          name: 'Vendor Selection',
          description: 'Select vendors and obtain quotations',
          status: 'completed',
          assignee: 'Procurement Team',
          completedAt: '2024-02-19T16:00:00Z',
          order: 4
        },
        {
          id: 'STEP011',
          name: 'Payment Processing',
          description: 'Generate and process payment',
          status: 'in_progress',
          assignee: 'Lisa Garcia',
          dueDate: '2024-02-25T17:00:00Z',
          order: 5
        },
        {
          id: 'STEP012',
          name: 'Order Fulfillment',
          description: 'Vendor delivers items',
          status: 'pending',
          assignee: 'Kaduna Solar Technologies',
          order: 6
        }
      ],
      createdAt: '2024-02-16T09:00:00Z',
      updatedAt: '2024-02-20T10:15:00Z',
      estimatedCompletion: '2024-03-15T17:00:00Z',
      totalValue: 300000000,
      urgency: 'high'
    }
  ]);

  const [selectedWorkflow, setSelectedWorkflow] = useState<ProcurementWorkflow | null>(null);
  const [activeTab, setActiveTab] = useState('active');

  const getStepStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in_progress': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'rejected': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <div className="h-4 w-4 rounded-full border-2 border-gray-300" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getWorkflowStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateProgress = (workflow: ProcurementWorkflow) => {
    const completedSteps = workflow.steps.filter(step => step.status === 'completed').length;
    return (completedSteps / workflow.steps.length) * 100;
  };

  const getActiveWorkflows = () => workflows.filter(w => w.status === 'in_progress' || w.status === 'pending');
  const getCompletedWorkflows = () => workflows.filter(w => w.status === 'completed' || w.status === 'approved');
  const getRejectedWorkflows = () => workflows.filter(w => w.status === 'rejected');

  const workflowStats = {
    total: workflows.length,
    active: getActiveWorkflows().length,
    completed: getCompletedWorkflows().length,
    rejected: getRejectedWorkflows().length,
    totalValue: workflows.reduce((sum, w) => sum + w.totalValue, 0),
    avgCompletionTime: 12 // Mock data
  };

  const WorkflowTimeline: React.FC<{ workflow: ProcurementWorkflow }> = ({ workflow }) => (
    <div className="space-y-4">
      {workflow.steps.map((step, index) => {
        const isLast = index === workflow.steps.length - 1;
        const isActive = workflow.currentStep === step.order;
        
        return (
          <div key={step.id} className="relative">
            {/* Timeline Line */}
            {!isLast && (
              <div className="absolute left-6 top-12 w-0.5 h-16 bg-muted"></div>
            )}
            
            <div className="flex items-start space-x-4">
              {/* Step Icon */}
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                step.status === 'completed' ? 'bg-green-100' :
                step.status === 'in_progress' ? 'bg-blue-100' :
                step.status === 'rejected' ? 'bg-red-100' :
                'bg-gray-100'
              } ${isActive ? 'ring-2 ring-blue-500' : ''}`}>
                {getStepStatusIcon(step.status)}
              </div>

              {/* Step Content */}
              <div className="flex-1">
                <Card className={`${isActive ? 'ring-2 ring-blue-500' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{step.name}</h4>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                      <Badge className={
                        step.status === 'completed' ? 'bg-green-100 text-green-800' :
                        step.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                        step.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }>
                        {step.status.replace('_', ' ')}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Assignee:</span>
                        <div className="font-medium">{step.assignee}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          {step.status === 'completed' ? 'Completed:' : 'Due:'}
                        </span>
                        <div className="font-medium">
                          {step.status === 'completed' && step.completedAt
                            ? formatDate(step.completedAt)
                            : step.dueDate
                            ? formatDate(step.dueDate)
                            : 'No deadline'
                          }
                        </div>
                      </div>
                    </div>

                    {step.comments && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-sm text-muted-foreground">{step.comments}</p>
                      </div>
                    )}

                    {step.status === 'in_progress' && (
                      <div className="mt-3 pt-3 border-t">
                        <Button size="sm" onClick={() => onStepComplete?.(workflow.id, step.id)}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark Complete
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Procurement Workflow</h2>
          <p className="text-muted-foreground">Track and manage procurement processes</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{workflowStats.total}</div>
                <div className="text-sm text-muted-foreground">Total Workflows</div>
              </div>
              <Workflow className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-600">{workflowStats.active}</div>
                <div className="text-sm text-muted-foreground">Active</div>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{workflowStats.completed}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{formatCurrency(workflowStats.totalValue)}</div>
                <div className="text-sm text-muted-foreground">Total Value</div>
              </div>
              <DollarSign className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Workflows</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Procurement Workflows</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getActiveWorkflows().map((workflow) => (
                  <Card key={workflow.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{workflow.requestForm.name}</h3>
                          <p className="text-sm text-muted-foreground">{workflow.requestForm.description}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge className={getWorkflowStatusColor(workflow.status)}>
                              {workflow.status.replace('_', ' ')}
                            </Badge>
                            <Badge variant="outline" className={getUrgencyColor(workflow.urgency)}>
                              {workflow.urgency} priority
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              ID: {workflow.id}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">{formatCurrency(workflow.totalValue)}</div>
                          <div className="text-sm text-muted-foreground">Total Value</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm">{calculateProgress(workflow).toFixed(0)}% Complete</span>
                        </div>
                        <Progress value={calculateProgress(workflow)} className="h-2" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Current Step</div>
                          <div className="font-medium">
                            {workflow.steps.find(s => s.order === workflow.currentStep)?.name || 'Unknown'}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Assignee</div>
                          <div className="font-medium">
                            {workflow.steps.find(s => s.order === workflow.currentStep)?.assignee || 'Unassigned'}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Est. Completion</div>
                          <div className="font-medium">
                            {workflow.estimatedCompletion ? formatDate(workflow.estimatedCompletion) : 'TBD'}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedWorkflow(workflow)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Timeline
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Workflows</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Completion Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getCompletedWorkflows().map((workflow) => (
                    <TableRow key={workflow.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{workflow.requestForm.name}</div>
                          <div className="text-sm text-muted-foreground">ID: {workflow.id}</div>
                        </div>
                      </TableCell>
                      <TableCell>{formatCurrency(workflow.totalValue)}</TableCell>
                      <TableCell>
                        {workflow.actualCompletion ? (
                          Math.ceil(
                            (new Date(workflow.actualCompletion).getTime() - 
                             new Date(workflow.createdAt).getTime()) / (1000 * 60 * 60 * 24)
                          ) + ' days'
                        ) : 'N/A'}
                      </TableCell>
                      <TableCell>
                        {workflow.actualCompletion ? formatDate(workflow.actualCompletion) : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <Badge className={getWorkflowStatusColor(workflow.status)}>
                          {workflow.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedWorkflow(workflow)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Workflow Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Completion Time</span>
                    <span className="font-medium">{workflowStats.avgCompletionTime} days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Success Rate</span>
                    <span className="font-medium">
                      {((workflowStats.completed / workflowStats.total) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">On-Time Delivery</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Cost Efficiency</span>
                    <span className="font-medium">92%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bottlenecks Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span className="text-sm font-medium">Vendor Selection</span>
                    </div>
                    <span className="text-sm text-red-600">Avg: 5.2 days</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm font-medium">Payment Processing</span>
                    </div>
                    <span className="text-sm text-yellow-600">Avg: 3.8 days</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Approval Process</span>
                    </div>
                    <span className="text-sm text-green-600">Avg: 1.5 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Workflow Detail Dialog */}
      {selectedWorkflow && (
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Workflow Timeline - {selectedWorkflow.requestForm.name}</CardTitle>
              <Button variant="outline" onClick={() => setSelectedWorkflow(null)}>
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <WorkflowTimeline workflow={selectedWorkflow} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};