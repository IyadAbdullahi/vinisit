import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Target,
  Calendar,
  DollarSign,
  Clock,
  AlertTriangle,
  CheckCircle,
  Download,
  Filter,
  Zap,
  Brain,
  Gauge
} from 'lucide-react';

const AdvancedAnalyticsPage = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  // Mock predictive analytics data
  const projectTimelinePredictions = [
    {
      projectId: 'PRJ001',
      projectName: 'City Center Complex',
      currentProgress: 65,
      predictedCompletion: '2025-11-15',
      originalDeadline: '2025-12-31',
      riskLevel: 'low',
      confidenceScore: 92,
      delayRisk: 5,
      factors: ['Weather delays possible', 'Resource availability good', 'Budget on track']
    },
    {
      projectId: 'PRJ002',
      projectName: 'Infrastructure Upgrade',
      currentProgress: 25,
      predictedCompletion: '2026-04-20',
      originalDeadline: '2026-02-28',
      riskLevel: 'high',
      confidenceScore: 78,
      delayRisk: 35,
      factors: ['Permit delays likely', 'Resource constraints', 'Budget pressure']
    },
    {
      projectId: 'PRJ004',
      projectName: 'Coastal Road Expansion',
      currentProgress: 40,
      predictedCompletion: '2025-09-10',
      originalDeadline: '2025-08-30',
      riskLevel: 'medium',
      confidenceScore: 85,
      delayRisk: 15,
      factors: ['Environmental reviews pending', 'Good team performance', 'Adequate budget']
    }
  ];

  const budgetPredictions = [
    {
      projectId: 'PRJ001',
      projectName: 'City Center Complex',
      originalBudget: 5000000,
      currentSpent: 3250000,
      predictedTotal: 4950000,
      overrunRisk: 2,
      confidenceScore: 94,
      factors: ['Material costs stable', 'Labor costs controlled', 'No major scope changes']
    },
    {
      projectId: 'PRJ002',
      projectName: 'Infrastructure Upgrade',
      originalBudget: 8500000,
      currentSpent: 2125000,
      predictedTotal: 9200000,
      overrunRisk: 25,
      confidenceScore: 82,
      factors: ['Material price volatility', 'Extended timeline costs', 'Additional permits required']
    },
    {
      projectId: 'PRJ004',
      projectName: 'Coastal Road Expansion',
      originalBudget: 12000000,
      currentSpent: 4800000,
      predictedTotal: 12500000,
      overrunRisk: 15,
      confidenceScore: 88,
      factors: ['Environmental mitigation costs', 'Good progress rate', 'Stable vendor pricing']
    }
  ];

  // Department performance comparison data
  const departmentPerformance = [
    {
      department: 'Engineering',
      projectsCompleted: 8,
      onTimeDelivery: 87,
      budgetAdherence: 92,
      clientSatisfaction: 94,
      resourceUtilization: 85,
      revenueGenerated: 12500000,
      profitMargin: 18.5
    },
    {
      department: 'Construction',
      projectsCompleted: 12,
      onTimeDelivery: 78,
      budgetAdherence: 88,
      clientSatisfaction: 91,
      resourceUtilization: 92,
      revenueGenerated: 18200000,
      profitMargin: 16.2
    },
    {
      department: 'Infrastructure',
      projectsCompleted: 6,
      onTimeDelivery: 83,
      budgetAdherence: 85,
      clientSatisfaction: 89,
      resourceUtilization: 88,
      revenueGenerated: 9800000,
      profitMargin: 15.8
    }
  ];

  // Financial forecasting data
  const financialForecast = [
    { month: 'Feb 2024', revenue: 4200000, expenses: 2800000, profit: 1400000, confidence: 95 },
    { month: 'Mar 2024', revenue: 4500000, expenses: 3000000, profit: 1500000, confidence: 92 },
    { month: 'Apr 2024', revenue: 4800000, expenses: 3200000, profit: 1600000, confidence: 88 },
    { month: 'May 2024', revenue: 5100000, expenses: 3400000, profit: 1700000, confidence: 85 },
    { month: 'Jun 2024', revenue: 5400000, expenses: 3600000, profit: 1800000, confidence: 82 },
    { month: 'Jul 2024', revenue: 5700000, expenses: 3800000, profit: 1900000, confidence: 78 }
  ];

  // Risk assessment data
  const riskAssessment = [
    {
      category: 'Budget Overrun',
      currentRisk: 15,
      trend: 'decreasing',
      impact: 'high',
      projects: ['PRJ002', 'PRJ004']
    },
    {
      category: 'Timeline Delays',
      currentRisk: 22,
      trend: 'stable',
      impact: 'medium',
      projects: ['PRJ002', 'PRJ005']
    },
    {
      category: 'Resource Constraints',
      currentRisk: 8,
      trend: 'decreasing',
      impact: 'medium',
      projects: ['PRJ001']
    },
    {
      category: 'Client Satisfaction',
      currentRisk: 5,
      trend: 'stable',
      impact: 'high',
      projects: []
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'decreasing': return <TrendingDown className="h-4 w-4 text-green-500" />;
      case 'stable': return <Activity className="h-4 w-4 text-blue-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Advanced Analytics</h1>
          <p className="text-muted-foreground">
            Predictive insights, performance analysis, and financial forecasting
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
              <SelectItem value="2years">2 Years</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Analytics
          </Button>
        </div>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Brain className="h-4 w-4 mr-2" />
              AI Confidence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <div className="text-xs text-muted-foreground">
              Prediction accuracy
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Target className="h-4 w-4 mr-2" />
              Projects at Risk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">3</div>
            <div className="text-xs text-muted-foreground">
              Require attention
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Revenue Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+15.2%</div>
            <div className="text-xs text-muted-foreground">
              Next quarter growth
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Gauge className="h-4 w-4 mr-2" />
              Performance Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.7/10</div>
            <div className="text-xs text-muted-foreground">
              Overall company performance
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics */}
      <Tabs defaultValue="predictive" className="space-y-4">
        <TabsList>
          <TabsTrigger value="predictive">Predictive Analytics</TabsTrigger>
          <TabsTrigger value="performance">Performance Comparison</TabsTrigger>
          <TabsTrigger value="forecasting">Financial Forecasting</TabsTrigger>
          <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
        </TabsList>

        {/* Predictive Analytics Tab */}
        <TabsContent value="predictive" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Project Timeline Predictions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projectTimelinePredictions.map((prediction) => (
                    <div key={prediction.projectId} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{prediction.projectName}</h4>
                          <p className="text-sm text-muted-foreground">
                            Current Progress: {prediction.currentProgress}%
                          </p>
                        </div>
                        <Badge className={getRiskColor(prediction.riskLevel)}>
                          {prediction.riskLevel} risk
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Predicted Completion:</span>
                          <div className="font-medium">{new Date(prediction.predictedCompletion).toLocaleDateString()}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Original Deadline:</span>
                          <div className="font-medium">{new Date(prediction.originalDeadline).toLocaleDateString()}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Confidence Score</span>
                          <span>{prediction.confidenceScore}%</span>
                        </div>
                        <Progress value={prediction.confidenceScore} className="h-2" />
                      </div>
                      
                      <div className="space-y-1">
                        <span className="text-sm font-medium">Key Factors:</span>
                        {prediction.factors.map((factor, index) => (
                          <div key={index} className="text-xs text-muted-foreground">
                            • {factor}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Budget Predictions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {budgetPredictions.map((prediction) => (
                    <div key={prediction.projectId} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{prediction.projectName}</h4>
                          <p className="text-sm text-muted-foreground">
                            Spent: {formatCurrency(prediction.currentSpent)} / {formatCurrency(prediction.originalBudget)}
                          </p>
                        </div>
                        <Badge className={prediction.overrunRisk > 20 ? 'bg-red-100 text-red-800' : 
                                        prediction.overrunRisk > 10 ? 'bg-yellow-100 text-yellow-800' : 
                                        'bg-green-100 text-green-800'}>
                          {prediction.overrunRisk}% overrun risk
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Predicted Total:</span>
                          <div className="font-medium">{formatCurrency(prediction.predictedTotal)}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Variance:</span>
                          <div className={`font-medium ${prediction.predictedTotal > prediction.originalBudget ? 'text-red-600' : 'text-green-600'}`}>
                            {formatCurrency(prediction.predictedTotal - prediction.originalBudget)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Confidence Score</span>
                          <span>{prediction.confidenceScore}%</span>
                        </div>
                        <Progress value={prediction.confidenceScore} className="h-2" />
                      </div>
                      
                      <div className="space-y-1">
                        <span className="text-sm font-medium">Key Factors:</span>
                        {prediction.factors.map((factor, index) => (
                          <div key={index} className="text-xs text-muted-foreground">
                            • {factor}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Comparison Tab */}
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Department Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={departmentPerformance}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="department" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="On-Time Delivery" dataKey="onTimeDelivery" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                    <Radar name="Budget Adherence" dataKey="budgetAdherence" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                    <Radar name="Client Satisfaction" dataKey="clientSatisfaction" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Department</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={departmentPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="department" />
                      <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                      <Tooltip formatter={(value: number) => [formatCurrency(value), 'Revenue']} />
                      <Bar dataKey="revenueGenerated" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profit Margin Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentPerformance.map((dept) => (
                    <div key={dept.department} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{dept.department}</span>
                        <span className="text-sm font-bold">{dept.profitMargin}%</span>
                      </div>
                      <Progress value={dept.profitMargin} className="h-2" />
                      <div className="text-xs text-muted-foreground">
                        Revenue: {formatCurrency(dept.revenueGenerated)} • Projects: {dept.projectsCompleted}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Department Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead>Projects Completed</TableHead>
                    <TableHead>On-Time Delivery</TableHead>
                    <TableHead>Budget Adherence</TableHead>
                    <TableHead>Client Satisfaction</TableHead>
                    <TableHead>Resource Utilization</TableHead>
                    <TableHead>Profit Margin</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departmentPerformance.map((dept) => (
                    <TableRow key={dept.department}>
                      <TableCell className="font-medium">{dept.department}</TableCell>
                      <TableCell>{dept.projectsCompleted}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span>{dept.onTimeDelivery}%</span>
                          <Progress value={dept.onTimeDelivery} className="w-16 h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span>{dept.budgetAdherence}%</span>
                          <Progress value={dept.budgetAdherence} className="w-16 h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span>{dept.clientSatisfaction}%</span>
                          <Progress value={dept.clientSatisfaction} className="w-16 h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span>{dept.resourceUtilization}%</span>
                          <Progress value={dept.resourceUtilization} className="w-16 h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-green-600">{dept.profitMargin}%</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Financial Forecasting Tab */}
        <TabsContent value="forecasting" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>6-Month Financial Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={financialForecast}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                    <Tooltip formatter={(value: number) => [formatCurrency(value), '']} />
                    <Legend />
                    <Area type="monotone" dataKey="revenue" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.8} name="Projected Revenue" />
                    <Area type="monotone" dataKey="expenses" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.8} name="Projected Expenses" />
                    <Line type="monotone" dataKey="profit" stroke="#3b82f6" strokeWidth={3} name="Projected Profit" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Forecast Confidence Levels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {financialForecast.map((forecast, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{forecast.month}</span>
                        <span className="text-sm">{forecast.confidence}% confidence</span>
                      </div>
                      <Progress value={forecast.confidence} className="h-2" />
                      <div className="text-xs text-muted-foreground">
                        Projected Profit: {formatCurrency(forecast.profit)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Financial Indicators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Revenue Growth Rate</div>
                      <div className="text-sm text-muted-foreground">Month over month</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">+12.5%</div>
                      <TrendingUp className="h-4 w-4 text-green-600 ml-auto" />
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Profit Margin Trend</div>
                      <div className="text-sm text-muted-foreground">6-month average</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-blue-600">28.3%</div>
                      <TrendingUp className="h-4 w-4 text-blue-600 ml-auto" />
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Cash Flow Projection</div>
                      <div className="text-sm text-muted-foreground">Next quarter</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">{formatCurrency(4800000)}</div>
                      <TrendingUp className="h-4 w-4 text-green-600 ml-auto" />
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Break-even Point</div>
                      <div className="text-sm text-muted-foreground">Monthly target</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{formatCurrency(2800000)}</div>
                      <CheckCircle className="h-4 w-4 text-green-600 ml-auto" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Risk Assessment Tab */}
        <TabsContent value="risk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Risk Assessment Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {riskAssessment.map((risk, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{risk.category}</h4>
                        <p className="text-sm text-muted-foreground">
                          Impact: {risk.impact}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getTrendIcon(risk.trend)}
                        <Badge className={risk.currentRisk > 20 ? 'bg-red-100 text-red-800' : 
                                        risk.currentRisk > 10 ? 'bg-yellow-100 text-yellow-800' : 
                                        'bg-green-100 text-green-800'}>
                          {risk.currentRisk}%
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Risk Level</span>
                        <span>{risk.currentRisk}%</span>
                      </div>
                      <Progress value={risk.currentRisk} className="h-2" />
                    </div>
                    
                    {risk.projects.length > 0 && (
                      <div>
                        <span className="text-sm font-medium">Affected Projects:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {risk.projects.map((projectId) => (
                            <Badge key={projectId} variant="outline" className="text-xs">
                              {projectId}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Risk Mitigation Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 bg-red-50 p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span className="font-medium text-red-800">High Priority</span>
                  </div>
                  <p className="text-sm text-red-700">
                    Infrastructure Upgrade project shows 25% budget overrun risk. 
                    Recommend immediate cost review and scope adjustment.
                  </p>
                </div>
                
                <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Medium Priority</span>
                  </div>
                  <p className="text-sm text-yellow-700">
                    Timeline delays detected across 2 projects. Consider resource reallocation 
                    and schedule optimization.
                  </p>
                </div>
                
                <div className="border-l-4 border-green-500 bg-green-50 p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-800">Good Performance</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Client satisfaction remains high across all departments. 
                    Continue current quality standards.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedAnalyticsPage;