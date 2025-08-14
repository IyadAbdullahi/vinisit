import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { 
  TrendingUp, 
  Award, 
  Target, 
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  BarChart3,
  Calendar,
  Download,
  Filter
} from 'lucide-react';

interface PerformanceMetrics {
  employeeId: string;
  employeeName: string;
  position: string;
  tasksCompleted: number;
  tasksOnTime: number;
  totalTasks: number;
  averageTaskTime: number; // in hours
  qualityScore: number;
  collaborationScore: number;
  innovationScore: number;
  overallScore: number;
  projectsInvolved: number;
  hoursLogged: number;
  efficiency: number;
  lastReviewDate: string;
  goals: {
    target: string;
    progress: number;
    dueDate: string;
    status: 'on_track' | 'at_risk' | 'completed' | 'overdue';
  }[];
}

interface TeamPerformanceData {
  month: string;
  productivity: number;
  quality: number;
  efficiency: number;
  satisfaction: number;
}

interface PerformanceDashboardProps {
  departmentId: string;
  onPerformanceUpdate?: (metrics: PerformanceMetrics) => void;
}

export const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({
  departmentId,
  onPerformanceUpdate
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedEmployee, setSelectedEmployee] = useState<string>('all');

  const [performanceData, setPerformanceData] = useState<PerformanceMetrics[]>([
    {
      employeeId: 'EMP001',
      employeeName: 'John Doe',
      position: 'Senior Engineer',
      tasksCompleted: 24,
      tasksOnTime: 22,
      totalTasks: 26,
      averageTaskTime: 18.5,
      qualityScore: 92,
      collaborationScore: 88,
      innovationScore: 85,
      overallScore: 88,
      projectsInvolved: 3,
      hoursLogged: 168,
      efficiency: 94,
      lastReviewDate: '2024-01-15',
      goals: [
        {
          target: 'Complete structural design certification',
          progress: 75,
          dueDate: '2024-03-31',
          status: 'on_track'
        },
        {
          target: 'Mentor 2 junior engineers',
          progress: 50,
          dueDate: '2024-06-30',
          status: 'on_track'
        }
      ]
    },
    {
      employeeId: 'EMP002',
      employeeName: 'Fatima Ibrahim',
      position: 'Civil Engineer',
      tasksCompleted: 18,
      tasksOnTime: 16,
      totalTasks: 20,
      averageTaskTime: 22.3,
      qualityScore: 87,
      collaborationScore: 91,
      innovationScore: 78,
      overallScore: 85,
      projectsInvolved: 2,
      hoursLogged: 152,
      efficiency: 89,
      lastReviewDate: '2024-01-10',
      goals: [
        {
          target: 'Lead site supervision training',
          progress: 90,
          dueDate: '2024-02-28',
          status: 'on_track'
        },
        {
          target: 'Implement new quality control process',
          progress: 30,
          dueDate: '2024-04-30',
          status: 'at_risk'
        }
      ]
    },
    {
      employeeId: 'EMP003',
      employeeName: 'Ahmed Suleiman',
      position: 'Electrical Engineer',
      tasksCompleted: 32,
      tasksOnTime: 28,
      totalTasks: 35,
      averageTaskTime: 15.8,
      qualityScore: 94,
      collaborationScore: 82,
      innovationScore: 92,
      overallScore: 89,
      projectsInvolved: 4,
      hoursLogged: 180,
      efficiency: 96,
      lastReviewDate: '2024-01-05',
      goals: [
        {
          target: 'Solar installation certification',
          progress: 100,
          dueDate: '2024-01-31',
          status: 'completed'
        },
        {
          target: 'Develop electrical standards guide',
          progress: 60,
          dueDate: '2024-05-31',
          status: 'on_track'
        }
      ]
    }
  ]);

  const [teamTrends, setTeamTrends] = useState<TeamPerformanceData[]>([
    { month: 'Aug', productivity: 85, quality: 88, efficiency: 82, satisfaction: 87 },
    { month: 'Sep', productivity: 87, quality: 90, efficiency: 85, satisfaction: 89 },
    { month: 'Oct', productivity: 89, quality: 92, efficiency: 88, satisfaction: 91 },
    { month: 'Nov', productivity: 91, quality: 89, efficiency: 90, satisfaction: 88 },
    { month: 'Dec', productivity: 88, quality: 91, efficiency: 87, satisfaction: 90 },
    { month: 'Jan', productivity: 92, quality: 94, efficiency: 91, satisfaction: 93 }
  ]);

  const filteredPerformanceData = selectedEmployee === 'all' 
    ? performanceData 
    : performanceData.filter(p => p.employeeId === selectedEmployee);

  const getGoalStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'on_track': return 'bg-blue-100 text-blue-800';
      case 'at_risk': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const teamStats = {
    avgProductivity: teamTrends[teamTrends.length - 1]?.productivity || 0,
    avgQuality: teamTrends[teamTrends.length - 1]?.quality || 0,
    avgEfficiency: teamTrends[teamTrends.length - 1]?.efficiency || 0,
    avgSatisfaction: teamTrends[teamTrends.length - 1]?.satisfaction || 0,
    totalTasksCompleted: performanceData.reduce((sum, p) => sum + p.tasksCompleted, 0),
    onTimeDelivery: performanceData.reduce((sum, p) => sum + (p.tasksOnTime / p.totalTasks * 100), 0) / performanceData.length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Performance Dashboard</h2>
          <p className="text-muted-foreground">Monitor team performance and productivity</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Employees</SelectItem>
              {performanceData.map((employee) => (
                <SelectItem key={employee.employeeId} value={employee.employeeId}>
                  {employee.employeeName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{teamStats.avgProductivity.toFixed(0)}</div>
                <div className="text-sm text-muted-foreground">Avg Productivity</div>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{teamStats.avgQuality.toFixed(0)}</div>
                <div className="text-sm text-muted-foreground">Avg Quality</div>
              </div>
              <Award className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{teamStats.onTimeDelivery.toFixed(0)}%</div>
                <div className="text-sm text-muted-foreground">On-Time Delivery</div>
              </div>
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{teamStats.totalTasksCompleted}</div>
                <div className="text-sm text-muted-foreground">Tasks Completed</div>
              </div>
              <CheckCircle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Team Overview</TabsTrigger>
          <TabsTrigger value="individual">Individual Performance</TabsTrigger>
          <TabsTrigger value="trends">Performance Trends</TabsTrigger>
          <TabsTrigger value="goals">Goals & Objectives</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={teamTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="productivity" stroke="#3b82f6" name="Productivity" />
                      <Line type="monotone" dataKey="quality" stroke="#10b981" name="Quality" />
                      <Line type="monotone" dataKey="efficiency" stroke="#f59e0b" name="Efficiency" />
                      <Line type="monotone" dataKey="satisfaction" stroke="#8b5cf6" name="Satisfaction" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="employeeName" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="overallScore" fill="#3b82f6" name="Overall Score" />
                      <Bar dataKey="efficiency" fill="#10b981" name="Efficiency" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="individual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Individual Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Tasks</TableHead>
                    <TableHead>On-Time Rate</TableHead>
                    <TableHead>Quality Score</TableHead>
                    <TableHead>Efficiency</TableHead>
                    <TableHead>Overall Score</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPerformanceData.map((employee) => (
                    <TableRow key={employee.employeeId}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>
                              {getInitials(employee.employeeName)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{employee.employeeName}</div>
                            <div className="text-sm text-muted-foreground">{employee.position}</div>
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div>
                          <div className="font-medium">{employee.tasksCompleted}/{employee.totalTasks}</div>
                          <div className="text-xs text-muted-foreground">
                            {employee.projectsInvolved} projects
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">
                              {((employee.tasksOnTime / employee.totalTasks) * 100).toFixed(0)}%
                            </span>
                          </div>
                          <Progress value={(employee.tasksOnTime / employee.totalTasks) * 100} className="h-2" />
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className={`text-sm font-medium ${getScoreColor(employee.qualityScore)}`}>
                              {employee.qualityScore}
                            </span>
                          </div>
                          <Progress value={employee.qualityScore} className="h-2" />
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className={`text-sm font-medium ${getScoreColor(employee.efficiency)}`}>
                              {employee.efficiency}%
                            </span>
                          </div>
                          <Progress value={employee.efficiency} className="h-2" />
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className={`text-sm font-medium ${getScoreColor(employee.overallScore)}`}>
                              {employee.overallScore}
                            </span>
                          </div>
                          <Progress value={employee.overallScore} className="h-2" />
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Target className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Radar Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={performanceData.map(p => ({
                    name: p.employeeName.split(' ')[0],
                    Quality: p.qualityScore,
                    Collaboration: p.collaborationScore,
                    Innovation: p.innovationScore,
                    Efficiency: p.efficiency,
                    Overall: p.overallScore
                  }))}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Quality" dataKey="Quality" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                    <Radar name="Efficiency" dataKey="Efficiency" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                    <Radar name="Innovation" dataKey="Innovation" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {performanceData.map((employee) => (
              <Card key={employee.employeeId}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-sm">
                        {getInitials(employee.employeeName)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{employee.employeeName}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {employee.goals.map((goal, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="font-medium text-sm">{goal.target}</div>
                            <div className="text-xs text-muted-foreground">
                              Due: {formatDate(goal.dueDate)}
                            </div>
                          </div>
                          <Badge className={getGoalStatusColor(goal.status)}>
                            {goal.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{goal.progress}%</span>
                          </div>
                          <Progress value={goal.progress} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};