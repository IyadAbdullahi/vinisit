import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
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
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Users,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { mockProjects } from '../../super-admin/mockdata';
import { mockDepartments, mockEmployees } from '../../super-admin/mockdata';

const ProjectDetailsPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  // Find the project
  const project = mockProjects.find(p => p.id === projectId);
  
  if (!project) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
        <Button onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Back
        </Button>
      </div>
    );
  }

  // Find related data
  const department = mockDepartments.find(d => d.id === project.departmentId);
  const manager = mockEmployees.find(e => e.id === project.managerId);

  const handleProjectApproval = (action: 'approve' | 'reject') => {
    console.log(`${action} project ${project.id}`);
    // In real app, this would update the project approval status
    navigate('/managing-director/approvals');
  };
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{project.name}</h1>
          <p className="text-muted-foreground">Project Code: {project.code}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          {project.approvalStatus === 'pending' && (
            <>
              <Button 
                variant="outline" 
                className="text-red-600 hover:text-red-700"
                onClick={() => handleProjectApproval('reject')}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject Project
              </Button>
              <Button onClick={() => handleProjectApproval('approve')}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve Project
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Project Approval Status */}
      {project.approvalStatus && (
        <Card className={
          project.approvalStatus === 'pending' ? 'border-yellow-200 bg-yellow-50' :
          project.approvalStatus === 'approved' ? 'border-green-200 bg-green-50' :
          'border-red-200 bg-red-50'
        }>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {project.approvalStatus === 'pending' && <Clock className="h-5 w-5 text-yellow-600" />}
                {project.approvalStatus === 'approved' && <CheckCircle className="h-5 w-5 text-green-600" />}
                {project.approvalStatus === 'rejected' && <XCircle className="h-5 w-5 text-red-600" />}
                <span className="font-medium">
                  Project Approval Status: {project.approvalStatus.charAt(0).toUpperCase() + project.approvalStatus.slice(1)}
                </span>
              </div>
              {project.approvalStatus === 'pending' && (
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                  Requires Your Approval
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}
      {/* Project Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Project Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Status</span>
                <Badge>{project.status}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Priority</span>
                <Badge variant={
                  project.priority === 'high' ? 'destructive' :
                  project.priority === 'medium' ? 'default' :
                  'secondary'
                }>{project.priority}</Badge>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project References</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <span className="text-muted-foreground">Department:</span>
                <p>{department?.name} (ID: {project.departmentId})</p>
              </div>
              <div>
                <span className="text-muted-foreground">Project Manager:</span>
                <p>{manager?.firstName} {manager?.lastName} (ID: {project.managerId})</p>
              </div>
              <div>
                <span className="text-muted-foreground">Client:</span>
                <p>{project.clientName || 'N/A'}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Timeline:</span>
                <p className="text-sm">
                  {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Financial Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <span className="text-muted-foreground">Total Budget:</span>
                <p className="text-xl font-bold">${project.budget.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Spent:</span>
                <p className="text-xl font-bold">${project.spent.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Remaining:</span>
                <p className="text-xl font-bold text-green-600">
                  ${(project.budget - project.spent).toLocaleString()}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Budget Utilization</span>
                  <span>{((project.spent / project.budget) * 100).toFixed(1)}%</span>
                </div>
                <Progress value={(project.spent / project.budget) * 100} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Milestones */}
      <Card>
        <CardHeader>
          <CardTitle>Milestones</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Spent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {project.milestones.map(milestone => (
                <TableRow key={milestone.id}>
                  <TableCell className="font-mono">{milestone.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{milestone.name}</p>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>{milestone.dueDate}</TableCell>
                  <TableCell>
                    <Badge>{milestone.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>{milestone.progress}%</span>
                      </div>
                      <Progress value={milestone.progress} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>${milestone.budget?.toLocaleString() || 'N/A'}</TableCell>
                  <TableCell>${milestone.spent?.toLocaleString() || 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Tasks */}
      <Card>
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Milestone</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Hours</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {project.tasks.map(task => {
                const milestone = project.milestones.find(m => m.id === task.milestoneId);
                const assignee = mockEmployees.find(e => e.id === task.assigneeId);
                
                return (
                  <TableRow key={task.id}>
                    <TableCell className="font-mono">{task.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{task.name}</p>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {milestone ? (
                        <div className="text-sm">
                          <p>{milestone.name}</p>
                          <p className="text-muted-foreground">ID: {task.milestoneId}</p>
                        </div>
                      ) : 'N/A'}
                    </TableCell>
                    <TableCell>
                      {assignee ? (
                        <div className="text-sm">
                          <p>{assignee.firstName} {assignee.lastName}</p>
                          <p className="text-muted-foreground">ID: {task.assigneeId}</p>
                        </div>
                      ) : 'Unassigned'}
                    </TableCell>
                    <TableCell>
                      <Badge>{task.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        task.priority === 'high' ? 'destructive' :
                        task.priority === 'medium' ? 'default' :
                        'secondary'
                      }>{task.priority}</Badge>
                    </TableCell>
                    <TableCell>
                      {task.estimatedHours ? (
                        <div className="text-sm">
                          <p>Est: {task.estimatedHours}h</p>
                          {task.actualHours && <p>Actual: {task.actualHours}h</p>}
                        </div>
                      ) : 'N/A'}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectDetailsPage; 