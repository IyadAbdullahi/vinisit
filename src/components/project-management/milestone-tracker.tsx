import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Target, 
  Plus, 
  Calendar, 
  DollarSign, 
  Clock,
  CheckCircle,
  AlertTriangle,
  Edit,
  Trash2,
  Link,
  TrendingUp,
  FileText
} from 'lucide-react';
import type { Project, Milestone } from '@/types';

interface MilestoneTrackerProps {
  project: Project;
  onMilestoneUpdate?: (milestone: Milestone) => void;
  onMilestoneAdd?: (milestone: Omit<Milestone, 'id'>) => void;
  onMilestoneDelete?: (milestoneId: string) => void;
}

interface MilestoneForm {
  name: string;
  description: string;
  dueDate: string;
  budget: number;
  status: Milestone['status'];
  dependencies: string[];
}

export const MilestoneTracker: React.FC<MilestoneTrackerProps> = ({
  project,
  onMilestoneUpdate,
  onMilestoneAdd,
  onMilestoneDelete
}) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [milestoneForm, setMilestoneForm] = useState<MilestoneForm>({
    name: '',
    description: '',
    dueDate: '',
    budget: 0,
    status: 'pending',
    dependencies: []
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in_progress': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'overdue': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Target className="h-4 w-4 text-gray-600" />;
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
      day: 'numeric'
    });
  };

  const calculateMilestoneHealth = (milestone: Milestone) => {
    const today = new Date();
    const dueDate = new Date(milestone.dueDate);
    const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (milestone.status === 'completed') return 'healthy';
    if (daysUntilDue < 0) return 'overdue';
    if (daysUntilDue <= 7 && milestone.progress < 80) return 'at-risk';
    if (milestone.progress >= 80) return 'healthy';
    return 'on-track';
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'healthy': return 'text-green-600';
      case 'on-track': return 'text-blue-600';
      case 'at-risk': return 'text-yellow-600';
      case 'overdue': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const handleAddMilestone = () => {
    if (onMilestoneAdd) {
      const newMilestone: Omit<Milestone, 'id'> = {
        projectId: project.id,
        name: milestoneForm.name,
        description: milestoneForm.description,
        dueDate: milestoneForm.dueDate,
        status: milestoneForm.status,
        progress: 0,
        budget: milestoneForm.budget,
        spent: 0
      };
      onMilestoneAdd(newMilestone);
    }
    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleEditMilestone = () => {
    if (selectedMilestone && onMilestoneUpdate) {
      const updatedMilestone: Milestone = {
        ...selectedMilestone,
        name: milestoneForm.name,
        description: milestoneForm.description,
        dueDate: milestoneForm.dueDate,
        status: milestoneForm.status,
        budget: milestoneForm.budget
      };
      onMilestoneUpdate(updatedMilestone);
    }
    resetForm();
    setIsEditDialogOpen(false);
    setSelectedMilestone(null);
  };

  const openEditDialog = (milestone: Milestone) => {
    setSelectedMilestone(milestone);
    setMilestoneForm({
      name: milestone.name,
      description: milestone.description || '',
      dueDate: milestone.dueDate,
      budget: milestone.budget || 0,
      status: milestone.status,
      dependencies: []
    });
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setMilestoneForm({
      name: '',
      description: '',
      dueDate: '',
      budget: 0,
      status: 'pending',
      dependencies: []
    });
  };

  const milestoneStats = {
    total: project.milestones.length,
    completed: project.milestones.filter(m => m.status === 'completed').length,
    inProgress: project.milestones.filter(m => m.status === 'in_progress').length,
    overdue: project.milestones.filter(m => m.status === 'overdue').length,
    totalBudget: project.milestones.reduce((sum, m) => sum + (m.budget || 0), 0),
    totalSpent: project.milestones.reduce((sum, m) => sum + (m.spent || 0), 0)
  };

  const MilestoneForm = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Milestone Name</Label>
          <Input
            value={milestoneForm.name}
            onChange={(e) => setMilestoneForm({ ...milestoneForm, name: e.target.value })}
            placeholder="Enter milestone name"
          />
        </div>
        <div className="space-y-2">
          <Label>Due Date</Label>
          <Input
            type="date"
            value={milestoneForm.dueDate}
            onChange={(e) => setMilestoneForm({ ...milestoneForm, dueDate: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          value={milestoneForm.description}
          onChange={(e) => setMilestoneForm({ ...milestoneForm, description: e.target.value })}
          placeholder="Enter milestone description"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Budget (₦)</Label>
          <Input
            type="number"
            value={milestoneForm.budget}
            onChange={(e) => setMilestoneForm({ ...milestoneForm, budget: Number(e.target.value) })}
            placeholder="Enter budget"
          />
        </div>
        <div className="space-y-2">
          <Label>Status</Label>
          <Select
            value={milestoneForm.status}
            onValueChange={(value: Milestone['status']) => 
              setMilestoneForm({ ...milestoneForm, status: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          onClick={() => {
            if (isEdit) {
              setIsEditDialogOpen(false);
              setSelectedMilestone(null);
            } else {
              setIsAddDialogOpen(false);
            }
            resetForm();
          }}
        >
          Cancel
        </Button>
        <Button onClick={isEdit ? handleEditMilestone : handleAddMilestone}>
          {isEdit ? 'Update Milestone' : 'Add Milestone'}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Milestone Tracker</h2>
          <p className="text-muted-foreground">Track project milestones and dependencies</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Milestone
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Milestone</DialogTitle>
              <DialogDescription>
                Create a new milestone for the project with timeline and budget information.
              </DialogDescription>
            </DialogHeader>
            <MilestoneForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{milestoneStats.total}</div>
                <div className="text-sm text-muted-foreground">Total Milestones</div>
              </div>
              <Target className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{milestoneStats.completed}</div>
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
                <div className="text-2xl font-bold text-blue-600">{milestoneStats.inProgress}</div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">{milestoneStats.overdue}</div>
                <div className="text-sm text-muted-foreground">Overdue</div>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Milestone Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Milestone Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {project.milestones.map((milestone, index) => {
              const health = calculateMilestoneHealth(milestone);
              const isLast = index === project.milestones.length - 1;
              
              return (
                <div key={milestone.id} className="relative">
                  {/* Timeline Line */}
                  {!isLast && (
                    <div className="absolute left-6 top-12 w-0.5 h-16 bg-muted"></div>
                  )}
                  
                  <div className="flex items-start space-x-4">
                    {/* Timeline Dot */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      milestone.status === 'completed' ? 'bg-green-100' :
                      milestone.status === 'in_progress' ? 'bg-blue-100' :
                      milestone.status === 'overdue' ? 'bg-red-100' :
                      'bg-gray-100'
                    }`}>
                      {getStatusIcon(milestone.status)}
                    </div>

                    {/* Milestone Content */}
                    <div className="flex-1">
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-lg">{milestone.name}</h3>
                              <p className="text-sm text-muted-foreground">{milestone.description}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className={getStatusColor(milestone.status)}>
                                {milestone.status.replace('_', ' ')}
                              </Badge>
                              <div className={`text-xs font-medium ${getHealthColor(health)}`}>
                                {health.replace('-', ' ')}
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openEditDialog(milestone)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                              <div className="flex items-center text-sm text-muted-foreground mb-1">
                                <Calendar className="h-4 w-4 mr-1" />
                                Due Date
                              </div>
                              <div className="font-medium">{formatDate(milestone.dueDate)}</div>
                            </div>

                            <div>
                              <div className="flex items-center text-sm text-muted-foreground mb-1">
                                <DollarSign className="h-4 w-4 mr-1" />
                                Budget
                              </div>
                              <div className="font-medium">{formatCurrency(milestone.budget || 0)}</div>
                            </div>

                            <div>
                              <div className="flex items-center text-sm text-muted-foreground mb-1">
                                <TrendingUp className="h-4 w-4 mr-1" />
                                Progress
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span>{milestone.progress}%</span>
                                </div>
                                <Progress value={milestone.progress} className="h-2" />
                              </div>
                            </div>

                            <div>
                              <div className="flex items-center text-sm text-muted-foreground mb-1">
                                <FileText className="h-4 w-4 mr-1" />
                                Spent
                              </div>
                              <div className="font-medium">{formatCurrency(milestone.spent || 0)}</div>
                              <div className="text-xs text-muted-foreground">
                                of {formatCurrency(milestone.budget || 0)}
                              </div>
                            </div>
                          </div>

                          {/* Dependencies */}
                          {milestone.attachments && milestone.attachments.length > 0 && (
                            <div className="mt-3 pt-3 border-t">
                              <div className="flex items-center text-sm text-muted-foreground mb-2">
                                <Link className="h-4 w-4 mr-1" />
                                Attachments
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {milestone.attachments.map((attachment, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {attachment.split('/').pop()}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              );
            })}

            {project.milestones.length === 0 && (
              <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">No Milestones</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Start by adding your first project milestone
                </p>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Milestone
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Milestone Summary Table */}
      <Card>
        <CardHeader>
          <CardTitle>Milestone Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Milestone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Health</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {project.milestones.map((milestone) => {
                const health = calculateMilestoneHealth(milestone);
                
                return (
                  <TableRow key={milestone.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{milestone.name}</div>
                        <div className="text-sm text-muted-foreground">{milestone.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(milestone.status)}>
                        {milestone.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(milestone.dueDate)}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{milestone.progress}%</span>
                        </div>
                        <Progress value={milestone.progress} className="h-2" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{formatCurrency(milestone.budget || 0)}</div>
                        <div className="text-xs text-muted-foreground">
                          Spent: {formatCurrency(milestone.spent || 0)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`font-medium ${getHealthColor(health)}`}>
                        {health.replace('-', ' ')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(milestone)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onMilestoneDelete?.(milestone.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Milestone Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Milestone</DialogTitle>
            <DialogDescription>
              Update milestone information and timeline.
            </DialogDescription>
          </DialogHeader>
          <MilestoneForm isEdit={true} />
        </DialogContent>
      </Dialog>
    </div>
  );
};