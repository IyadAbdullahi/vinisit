import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Users, 
  Settings, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Zap,
  BarChart3,
  Calendar,
  Briefcase,
  Award
} from 'lucide-react';

interface ResourceAllocation {
  employeeId: string;
  employeeName: string;
  position: string;
  totalCapacity: number; // hours per week
  allocatedHours: number;
  availableHours: number;
  utilizationRate: number;
  projects: {
    projectId: string;
    projectName: string;
    allocation: number; // hours
    role: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
  }[];
  skills: string[];
  efficiency: number;
  overloadRisk: 'low' | 'medium' | 'high';
}

interface OptimizationSuggestion {
  type: 'rebalance' | 'reassign' | 'hire' | 'training';
  priority: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  impact: string;
  effort: string;
  employeeIds?: string[];
  projectIds?: string[];
}

interface ResourceAllocationProps {
  departmentId: string;
  onAllocationUpdate?: (allocation: ResourceAllocation) => void;
  onOptimizationApply?: (suggestion: OptimizationSuggestion) => void;
}

export const ResourceAllocation: React.FC<ResourceAllocationProps> = ({
  departmentId,
  onAllocationUpdate,
  onOptimizationApply
}) => {
  const [allocations, setAllocations] = useState<ResourceAllocation[]>([
    {
      employeeId: 'EMP001',
      employeeName: 'John Doe',
      position: 'Senior Engineer',
      totalCapacity: 40,
      allocatedHours: 35,
      availableHours: 5,
      utilizationRate: 87.5,
      projects: [
        {
          projectId: 'PRJ001',
          projectName: 'City Center Complex',
          allocation: 20,
          role: 'Project Lead',
          priority: 'high'
        },
        {
          projectId: 'PRJ003',
          projectName: 'Green Energy Campus',
          allocation: 15,
          role: 'Technical Advisor',
          priority: 'medium'
        }
      ],
      skills: ['Project Management', 'Structural Design', 'Team Leadership'],
      efficiency: 94,
      overloadRisk: 'low'
    },
    {
      employeeId: 'EMP002',
      employeeName: 'Fatima Ibrahim',
      position: 'Civil Engineer',
      totalCapacity: 40,
      allocatedHours: 32,
      availableHours: 8,
      utilizationRate: 80,
      projects: [
        {
          projectId: 'PRJ002',
          projectName: 'Infrastructure Upgrade',
          allocation: 25,
          role: 'Site Engineer',
          priority: 'high'
        },
        {
          projectId: 'PRJ004',
          projectName: 'Coastal Road',
          allocation: 7,
          role: 'Quality Controller',
          priority: 'medium'
        }
      ],
      skills: ['Civil Engineering', 'Site Supervision', 'Quality Control'],
      efficiency: 89,
      overloadRisk: 'low'
    },
    {
      employeeId: 'EMP003',
      employeeName: 'Ahmed Suleiman',
      position: 'Electrical Engineer',
      totalCapacity: 40,
      allocatedHours: 42,
      availableHours: -2,
      utilizationRate: 105,
      projects: [
        {
          projectId: 'PRJ001',
          projectName: 'City Center Complex',
          allocation: 18,
          role: 'Electrical Lead',
          priority: 'high'
        },
        {
          projectId: 'PRJ002',
          projectName: 'Infrastructure Upgrade',
          allocation: 12,
          role: 'Systems Engineer',
          priority: 'high'
        },
        {
          projectId: 'PRJ005',
          projectName: 'Solar Installation',
          allocation: 12,
          role: 'Solar Specialist',
          priority: 'critical'
        }
      ],
      skills: ['Electrical Systems', 'Solar Installation', 'Power Systems'],
      efficiency: 96,
      overloadRisk: 'high'
    }
  ]);

  const [optimizationSuggestions, setOptimizationSuggestions] = useState<OptimizationSuggestion[]>([
    {
      type: 'rebalance',
      priority: 'high',
      description: 'Ahmed Suleiman is overallocated (105% capacity). Consider redistributing 10 hours to available team members.',
      impact: 'Reduce burnout risk, improve quality',
      effort: 'Low - reassign existing tasks',
      employeeIds: ['EMP003', 'EMP002', 'EMP004'],
      projectIds: ['PRJ001', 'PRJ002', 'PRJ005']
    },
    {
      type: 'hire',
      priority: 'medium',
      description: 'Department capacity utilization is at 91%. Consider hiring 1 additional engineer for upcoming projects.',
      impact: 'Increase capacity, reduce overload risk',
      effort: 'High - recruitment and onboarding',
      employeeIds: []
    },
    {
      type: 'training',
      priority: 'medium',
      description: 'Cross-train Khadija Abdullahi in electrical systems to provide backup for Ahmed Suleiman.',
      impact: 'Improve flexibility, reduce single points of failure',
      effort: 'Medium - 2-3 months training',
      employeeIds: ['EMP004', 'EMP003']
    }
  ]);

  const [selectedAllocation, setSelectedAllocation] = useState<ResourceAllocation | null>(null);
  const [isOptimizeDialogOpen, setIsOptimizeDialogOpen] = useState(false);

  const getUtilizationColor = (rate: number) => {
    if (rate > 100) return 'text-red-600';
    if (rate > 90) return 'text-yellow-600';
    if (rate > 70) return 'text-green-600';
    return 'text-blue-600';
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'rebalance': return <Settings className="h-4 w-4" />;
      case 'reassign': return <Users className="h-4 w-4" />;
      case 'hire': return <Users className="h-4 w-4" />;
      case 'training': return <Award className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Calculate department statistics
  const departmentStats = {
    totalCapacity: allocations.reduce((sum, a) => sum + a.totalCapacity, 0),
    totalAllocated: allocations.reduce((sum, a) => sum + a.allocatedHours, 0),
    avgUtilization: allocations.reduce((sum, a) => sum + a.utilizationRate, 0) / allocations.length,
    overloadedMembers: allocations.filter(a => a.utilizationRate > 100).length,
    underutilizedMembers: allocations.filter(a => a.utilizationRate < 70).length,
    highRiskMembers: allocations.filter(a => a.overloadRisk === 'high').length
  };

  // Prepare chart data
  const utilizationData = allocations.map(allocation => ({
    name: allocation.employeeName.split(' ')[0],
    utilization: allocation.utilizationRate,
    capacity: allocation.totalCapacity,
    allocated: allocation.allocatedHours,
    available: allocation.availableHours
  }));

  const projectDistribution = allocations.flatMap(a => a.projects).reduce((acc, project) => {
    const existing = acc.find(p => p.projectId === project.projectId);
    if (existing) {
      existing.totalHours += project.allocation;
      existing.memberCount += 1;
    } else {
      acc.push({
        projectId: project.projectId,
        projectName: project.projectName,
        totalHours: project.allocation,
        memberCount: 1
      });
    }
    return acc;
  }, [] as { projectId: string; projectName: string; totalHours: number; memberCount: number }[]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Resource Allocation</h2>
          <p className="text-muted-foreground">Optimize team resource distribution and workload</p>
        </div>
        <Button onClick={() => setIsOptimizeDialogOpen(true)}>
          <Zap className="h-4 w-4 mr-2" />
          Optimize Allocation
        </Button>
      </div>

      {/* Department Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{departmentStats.avgUtilization.toFixed(0)}%</div>
                <div className="text-sm text-muted-foreground">Avg Utilization</div>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">{departmentStats.overloadedMembers}</div>
                <div className="text-sm text-muted-foreground">Overloaded</div>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{departmentStats.underutilizedMembers}</div>
                <div className="text-sm text-muted-foreground">Underutilized</div>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{departmentStats.totalCapacity}h</div>
                <div className="text-sm text-muted-foreground">Total Capacity</div>
              </div>
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resource Allocation Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Team Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={utilizationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="capacity" fill="#e5e7eb" name="Capacity" />
                  <Bar dataKey="allocated" fill="#3b82f6" name="Allocated" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Resource Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={projectDistribution}
                    dataKey="totalHours"
                    nameKey="projectName"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, value }) => `${name}: ${value}h`}
                  >
                    {projectDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 60%)`} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Allocation Table */}
      <Card>
        <CardHeader>
          <CardTitle>Resource Allocation Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Allocated</TableHead>
                <TableHead>Available</TableHead>
                <TableHead>Utilization</TableHead>
                <TableHead>Projects</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allocations.map((allocation) => (
                <TableRow key={allocation.employeeId}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>
                          {getInitials(allocation.employeeName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{allocation.employeeName}</div>
                        <div className="text-sm text-muted-foreground">{allocation.position}</div>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="font-medium">{allocation.totalCapacity}h/week</div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="font-medium">{allocation.allocatedHours}h</div>
                  </TableCell>
                  
                  <TableCell>
                    <div className={`font-medium ${
                      allocation.availableHours < 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {allocation.availableHours}h
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className={`text-sm font-medium ${getUtilizationColor(allocation.utilizationRate)}`}>
                          {allocation.utilizationRate.toFixed(0)}%
                        </span>
                      </div>
                      <Progress 
                        value={Math.min(allocation.utilizationRate, 100)} 
                        className="h-2"
                      />
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1">
                      {allocation.projects.map((project) => (
                        <div key={project.projectId} className="flex items-center justify-between">
                          <span className="text-xs">{project.projectName}</span>
                          <div className="flex items-center space-x-1">
                            <Badge variant="outline" className={getPriorityColor(project.priority)}>
                              {project.priority}
                            </Badge>
                            <span className="text-xs">{project.allocation}h</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge className={getRiskColor(allocation.overloadRisk)}>
                      {allocation.overloadRisk} risk
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedAllocation(allocation)}
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Optimization Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5" />
            <span>Optimization Suggestions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {optimizationSuggestions.map((suggestion, index) => (
              <Card key={index} className={`border-l-4 ${
                suggestion.priority === 'critical' ? 'border-l-red-500' :
                suggestion.priority === 'high' ? 'border-l-orange-500' :
                suggestion.priority === 'medium' ? 'border-l-yellow-500' :
                'border-l-green-500'
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${
                        suggestion.priority === 'critical' ? 'bg-red-100' :
                        suggestion.priority === 'high' ? 'bg-orange-100' :
                        suggestion.priority === 'medium' ? 'bg-yellow-100' :
                        'bg-green-100'
                      }`}>
                        {getSuggestionIcon(suggestion.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={getPriorityColor(suggestion.priority)}>
                            {suggestion.priority} priority
                          </Badge>
                          <Badge variant="outline">
                            {suggestion.type}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium mb-1">{suggestion.description}</p>
                        <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                          <div>
                            <span className="font-medium">Impact:</span> {suggestion.impact}
                          </div>
                          <div>
                            <span className="font-medium">Effort:</span> {suggestion.effort}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => on OptimizationApply?.(suggestion)}
                      >
                        Apply
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Target className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Optimization Dialog */}
      <Dialog open={isOptimizeDialogOpen} onOpenChange={setIsOptimizeDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Resource Optimization</DialogTitle>
            <DialogDescription>
              AI-powered suggestions to optimize team resource allocation
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">91%</div>
                  <div className="text-sm text-muted-foreground">Current Efficiency</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">96%</div>
                  <div className="text-sm text-muted-foreground">Optimized Efficiency</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">+5%</div>
                  <div className="text-sm text-muted-foreground">Improvement</div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                Apply optimization suggestions to improve team efficiency and reduce overload risks.
              </p>
              <div className="flex justify-center space-x-2">
                <Button variant="outline" onClick={() => setIsOptimizeDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsOptimizeDialogOpen(false)}>
                  Apply Optimization
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};