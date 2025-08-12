import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  TrendingUp,
  DollarSign,
  Target,
  Brain,
  BarChart3,
  Eye,
  ArrowRight
} from 'lucide-react';
import { 
  mockMDDashboardStats, 
  mockProjectMonitoring,
  mockPaymentMonitoring,
  mockProjectedExpenditure,
  mockSalaryDistribution 
} from '../mockdata';

const DashboardPage = () => {
  const navigate = useNavigate();

  // Mock client and revenue data for quick stats
  const clientStats = {
    totalClients: 15,
    activeLeads: 8,
    totalRevenue: 18500000,
    monthlyGrowth: 12.5
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Executive Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/managing-director/analytics')}>
            <Brain className="h-4 w-4 mr-2" />
            Advanced Analytics
          </Button>
          <Button onClick={() => navigate('/managing-director/approvals')}>
            <Target className="h-4 w-4 mr-2" />
            Pending Approvals
          </Button>
        </div>
      </div>
      
      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMDDashboardStats.projectStats.total}</div>
            <div className="text-xs text-muted-foreground">
              Active: {mockMDDashboardStats.projectStats.active} | 
              Completed: {mockMDDashboardStats.projectStats.completed}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${mockMDDashboardStats.financialStats.totalBudget.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">
              Spent: ${mockMDDashboardStats.financialStats.totalSpent.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMDDashboardStats.totalEmployees}</div>
            <div className="text-xs text-muted-foreground">
              Total Salaries: ${mockMDDashboardStats.totalSalaries.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientStats.totalClients}</div>
            <div className="text-xs text-muted-foreground">
              {clientStats.activeLeads} active leads
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${(clientStats.totalRevenue / 1000000).toFixed(1)}M
            </div>
            <div className="text-xs text-muted-foreground">
              +{clientStats.monthlyGrowth}% growth
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMDDashboardStats.approvalStats.pendingPayments + 
              mockMDDashboardStats.approvalStats.pendingRequests}</div>
            <div className="text-xs text-muted-foreground">
              Payments: {mockMDDashboardStats.approvalStats.pendingPayments} | 
              Requests: {mockMDDashboardStats.approvalStats.pendingRequests}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/managing-director/clients')}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Client Management</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage clients and track leads
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/managing-director/revenue')}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Revenue Tracking</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Monitor income and revenue streams
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/managing-director/analytics')}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  <span className="font-medium">Predictive Analytics</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  AI-powered insights and forecasts
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/managing-director/approvals')}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-orange-600" />
                  <span className="font-medium">Approvals Center</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Review pending decisions
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Main Content Tabs */}
      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList>
          <TabsTrigger value="projects">Projects Overview</TabsTrigger>
          <TabsTrigger value="financial">Financial Insights</TabsTrigger>
          <TabsTrigger value="workforce">Workforce & Salaries</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Month</TabsTrigger>
        </TabsList>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {mockProjectMonitoring.map(project => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <div className="flex justify-between items-center">
                    <Badge>{project.status}</Badge>
                    <span className="text-sm">Progress: {project.progress}%</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Progress value={project.progress} />
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Budget</p>
                        <p className="font-medium">${project.budget.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Spent</p>
                        <p className="font-medium">${project.spent.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-medium">Milestones</p>
                      <div className="text-xs grid grid-cols-4 gap-1">
                        <div>Completed: {project.milestones.completed}</div>
                        <div>In Progress: {project.milestones.inProgress}</div>
                        <div>Pending: {project.milestones.pending}</div>
                        <div>Delayed: {project.milestones.delayed}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Financial Insights Tab */}
        <TabsContent value="financial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Count</TableHead>
                    <TableHead>Total Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(mockPaymentMonitoring).map(([key, data]) => (
                    <TableRow key={key}>
                      <TableCell className="font-medium capitalize">{key}</TableCell>
                      <TableCell>{data.count}</TableCell>
                      <TableCell>${data.totalAmount.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Workforce & Salaries Tab */}
        <TabsContent value="workforce" className="space-y-4">
          {mockSalaryDistribution.map(dept => (
            <Card key={dept.departmentId}>
              <CardHeader>
                <CardTitle>{dept.departmentName} Department</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Employees</p>
                      <p className="text-lg font-bold">{dept.employeeCount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Salary</p>
                      <p className="text-lg font-bold">${dept.totalSalary.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Average Salary</p>
                      <p className="text-lg font-bold">${dept.averageSalary.toLocaleString()}</p>
                    </div>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Salary Range</TableHead>
                        <TableHead>Employee Count</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dept.salaryRanges.map(range => (
                        <TableRow key={range.range}>
                          <TableCell>{range.range}</TableCell>
                          <TableCell>{range.count}</TableCell>
                          <TableCell>${range.total.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Upcoming Month Tab */}
        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Projected Expenditure - {mockProjectedExpenditure.month}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Projected</p>
                    <p className="text-lg font-bold">
                      ${mockProjectedExpenditure.total.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Salaries</p>
                    <p className="text-lg font-bold">
                      ${mockProjectedExpenditure.salaries.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Procurement</p>
                    <p className="text-lg font-bold">
                      ${mockProjectedExpenditure.procurement.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Operational</p>
                    <p className="text-lg font-bold">
                      ${mockProjectedExpenditure.operational.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Project-wise Breakdown</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Project</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockProjectedExpenditure.projects.map(project => (
                        <TableRow key={project.projectId}>
                          <TableCell>{project.projectName}</TableCell>
                          <TableCell>{project.category}</TableCell>
                          <TableCell>${project.amount.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardPage; 