import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Area
} from 'recharts';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Plus,
  Calendar,
  Building,
  FileText,
  Download,
  Filter,
  Search,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Target,
  PieChart as PieChartIcon,
  BarChart3,
  Activity
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Revenue {
  id: string;
  projectId?: string;
  projectName?: string;
  clientId?: string;
  clientName?: string;
  amount: number;
  date: string;
  description: string;
  category: 'project_completion' | 'milestone_payment' | 'retainer' | 'consulting' | 'other';
  status: 'pending' | 'received' | 'overdue';
  invoiceNumber?: string;
  paymentMethod?: 'bank_transfer' | 'check' | 'cash' | 'credit_card';
  receivedDate?: string;
  notes?: string;
}

const RevenueManagementPage = () => {
  const [revenues, setRevenues] = useState<Revenue[]>([
    {
      id: 'REV001',
      projectId: 'PRJ001',
      projectName: 'City Center Complex',
      clientId: 'CL001',
      clientName: 'Urban Development Corp',
      amount: 1250000,
      date: '2024-01-15',
      description: 'Phase 1 completion payment',
      category: 'milestone_payment',
      status: 'received',
      invoiceNumber: 'INV-2024-001',
      paymentMethod: 'bank_transfer',
      receivedDate: '2024-01-20',
      notes: 'Payment received on time. Excellent client relationship.'
    },
    {
      id: 'REV002',
      projectId: 'PRJ003',
      projectName: 'Green Energy Campus',
      clientId: 'CL002',
      clientName: 'EcoTech Solutions',
      amount: 3200000,
      date: '2024-01-10',
      description: 'Project completion payment',
      category: 'project_completion',
      status: 'received',
      invoiceNumber: 'INV-2024-002',
      paymentMethod: 'bank_transfer',
      receivedDate: '2024-01-12',
      notes: 'Final payment for completed green energy project.'
    },
    {
      id: 'REV003',
      projectId: 'PRJ002',
      projectName: 'Infrastructure Upgrade',
      clientId: 'CL003',
      clientName: 'City Municipality',
      amount: 850000,
      date: '2024-02-01',
      description: 'Monthly progress payment',
      category: 'milestone_payment',
      status: 'pending',
      invoiceNumber: 'INV-2024-003',
      notes: 'Awaiting approval from city council.'
    },
    {
      id: 'REV004',
      clientId: 'CL001',
      clientName: 'Urban Development Corp',
      amount: 150000,
      date: '2024-01-05',
      description: 'Consulting services - Q1 2024',
      category: 'consulting',
      status: 'received',
      invoiceNumber: 'INV-2024-004',
      paymentMethod: 'bank_transfer',
      receivedDate: '2024-01-08',
      notes: 'Quarterly consulting retainer.'
    },
    {
      id: 'REV005',
      projectId: 'PRJ004',
      projectName: 'Coastal Road Expansion',
      clientId: 'CL004',
      clientName: 'State Highway Department',
      amount: 2400000,
      date: '2024-01-25',
      description: 'Initial project payment',
      category: 'milestone_payment',
      status: 'overdue',
      invoiceNumber: 'INV-2024-005',
      notes: 'Payment delayed due to budget approval process.'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedRevenue, setSelectedRevenue] = useState<Revenue | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [revenueForm, setRevenueForm] = useState({
    projectId: '',
    projectName: '',
    clientId: '',
    clientName: '',
    amount: '',
    date: '',
    description: '',
    category: 'milestone_payment' as Revenue['category'],
    status: 'pending' as Revenue['status'],
    invoiceNumber: '',
    paymentMethod: 'bank_transfer' as Revenue['paymentMethod'],
    notes: ''
  });

  const filteredRevenues = revenues.filter(revenue => {
    const matchesSearch = revenue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         revenue.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         revenue.projectName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         revenue.invoiceNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || revenue.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || revenue.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'received': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'project_completion': return 'bg-blue-100 text-blue-800';
      case 'milestone_payment': return 'bg-purple-100 text-purple-800';
      case 'retainer': return 'bg-green-100 text-green-800';
      case 'consulting': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Calculate revenue statistics
  const revenueStats = {
    totalRevenue: revenues.reduce((sum, r) => sum + r.amount, 0),
    receivedRevenue: revenues.filter(r => r.status === 'received').reduce((sum, r) => sum + r.amount, 0),
    pendingRevenue: revenues.filter(r => r.status === 'pending').reduce((sum, r) => sum + r.amount, 0),
    overdueRevenue: revenues.filter(r => r.status === 'overdue').reduce((sum, r) => sum + r.amount, 0),
    monthlyGrowth: 12.5, // Mock data
    avgDealSize: revenues.length > 0 ? revenues.reduce((sum, r) => sum + r.amount, 0) / revenues.length : 0
  };

  // Prepare chart data
  const monthlyRevenueData = [
    { month: 'Jan', revenue: 4200000, expenses: 2800000, profit: 1400000 },
    { month: 'Feb', revenue: 3800000, expenses: 2600000, profit: 1200000 },
    { month: 'Mar', revenue: 4500000, expenses: 3100000, profit: 1400000 },
    { month: 'Apr', revenue: 5200000, expenses: 3400000, profit: 1800000 },
    { month: 'May', revenue: 4800000, expenses: 3200000, profit: 1600000 },
    { month: 'Jun', revenue: 5500000, expenses: 3600000, profit: 1900000 }
  ];

  const revenueByCategory = [
    { name: 'Project Completion', value: 8650000, color: '#3b82f6' },
    { name: 'Milestone Payments', value: 4200000, color: '#8b5cf6' },
    { name: 'Consulting', value: 1800000, color: '#f59e0b' },
    { name: 'Retainer', value: 950000, color: '#10b981' },
    { name: 'Other', value: 400000, color: '#6b7280' }
  ];

  const revenueByClient = [
    { name: 'Urban Development Corp', value: 5200000, projects: 3 },
    { name: 'EcoTech Solutions', value: 3200000, projects: 1 },
    { name: 'City Municipality', value: 2800000, projects: 2 },
    { name: 'State Highway Dept', value: 2400000, projects: 1 },
    { name: 'Others', value: 2400000, projects: 5 }
  ];

  const incomeVsExpenseData = [
    { month: 'Jan', income: 4200000, expenses: 2800000, netIncome: 1400000 },
    { month: 'Feb', income: 3800000, expenses: 2600000, netIncome: 1200000 },
    { month: 'Mar', income: 4500000, expenses: 3100000, netIncome: 1400000 },
    { month: 'Apr', income: 5200000, expenses: 3400000, netIncome: 1800000 },
    { month: 'May', income: 4800000, expenses: 3200000, netIncome: 1600000 },
    { month: 'Jun', income: 5500000, expenses: 3600000, netIncome: 1900000 }
  ];

  const handleAddRevenue = () => {
    const newRevenue: Revenue = {
      id: `REV${Date.now()}`,
      ...revenueForm,
      amount: parseFloat(revenueForm.amount),
    };
    
    setRevenues([...revenues, newRevenue]);
    resetForm();
    setIsAddOpen(false);
  };

  const handleEditRevenue = () => {
    if (!selectedRevenue) return;
    
    const updatedRevenues = revenues.map(revenue =>
      revenue.id === selectedRevenue.id
        ? { ...revenue, ...revenueForm, amount: parseFloat(revenueForm.amount) }
        : revenue
    );
    
    setRevenues(updatedRevenues);
    setIsEditOpen(false);
    setSelectedRevenue(null);
    resetForm();
  };

  const handleDeleteRevenue = (revenueId: string) => {
    setRevenues(revenues.filter(revenue => revenue.id !== revenueId));
  };

  const openEditDialog = (revenue: Revenue) => {
    setSelectedRevenue(revenue);
    setRevenueForm({
      projectId: revenue.projectId || '',
      projectName: revenue.projectName || '',
      clientId: revenue.clientId || '',
      clientName: revenue.clientName || '',
      amount: revenue.amount.toString(),
      date: revenue.date,
      description: revenue.description,
      category: revenue.category,
      status: revenue.status,
      invoiceNumber: revenue.invoiceNumber || '',
      paymentMethod: revenue.paymentMethod || 'bank_transfer',
      notes: revenue.notes || ''
    });
    setIsEditOpen(true);
  };

  const resetForm = () => {
    setRevenueForm({
      projectId: '',
      projectName: '',
      clientId: '',
      clientName: '',
      amount: '',
      date: '',
      description: '',
      category: 'milestone_payment',
      status: 'pending',
      invoiceNumber: '',
      paymentMethod: 'bank_transfer',
      notes: ''
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Revenue Management</h1>
          <p className="text-muted-foreground">
            Track income, analyze revenue streams, and monitor financial performance
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Record Revenue
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Record New Revenue</DialogTitle>
                <DialogDescription>
                  Add a new revenue entry to the system
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Client Name</Label>
                    <Input
                      value={revenueForm.clientName}
                      onChange={(e) => setRevenueForm({...revenueForm, clientName: e.target.value})}
                      placeholder="Client name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Project Name (Optional)</Label>
                    <Input
                      value={revenueForm.projectName}
                      onChange={(e) => setRevenueForm({...revenueForm, projectName: e.target.value})}
                      placeholder="Associated project"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Amount</Label>
                    <Input
                      type="number"
                      value={revenueForm.amount}
                      onChange={(e) => setRevenueForm({...revenueForm, amount: e.target.value})}
                      placeholder="Revenue amount"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input
                      type="date"
                      value={revenueForm.date}
                      onChange={(e) => setRevenueForm({...revenueForm, date: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={revenueForm.category} onValueChange={(value: any) => setRevenueForm({...revenueForm, category: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="project_completion">Project Completion</SelectItem>
                        <SelectItem value="milestone_payment">Milestone Payment</SelectItem>
                        <SelectItem value="retainer">Retainer</SelectItem>
                        <SelectItem value="consulting">Consulting</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={revenueForm.status} onValueChange={(value: any) => setRevenueForm({...revenueForm, status: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="received">Received</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Invoice Number</Label>
                    <Input
                      value={revenueForm.invoiceNumber}
                      onChange={(e) => setRevenueForm({...revenueForm, invoiceNumber: e.target.value})}
                      placeholder="INV-2024-XXX"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Payment Method</Label>
                    <Select value={revenueForm.paymentMethod} onValueChange={(value: any) => setRevenueForm({...revenueForm, paymentMethod: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                        <SelectItem value="check">Check</SelectItem>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="credit_card">Credit Card</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={revenueForm.description}
                    onChange={(e) => setRevenueForm({...revenueForm, description: e.target.value})}
                    placeholder="Revenue description"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea
                    value={revenueForm.notes}
                    onChange={(e) => setRevenueForm({...revenueForm, notes: e.target.value})}
                    placeholder="Additional notes"
                    rows={2}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddRevenue}>
                    Record Revenue
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Revenue Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(revenueStats.totalRevenue)}
            </div>
            <div className="text-xs text-muted-foreground">
              All time
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Received</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(revenueStats.receivedRevenue)}
            </div>
            <div className="text-xs text-muted-foreground">
              Confirmed payments
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {formatCurrency(revenueStats.pendingRevenue)}
            </div>
            <div className="text-xs text-muted-foreground">
              Awaiting payment
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(revenueStats.overdueRevenue)}
            </div>
            <div className="text-xs text-muted-foreground">
              Requires follow-up
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              +{revenueStats.monthlyGrowth}%
            </div>
            <div className="text-xs text-muted-foreground">
              vs last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Deal Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(revenueStats.avgDealSize)}
            </div>
            <div className="text-xs text-muted-foreground">
              Per transaction
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Revenue Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="records">Revenue Records</TabsTrigger>
          <TabsTrigger value="clients">Client Revenue</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyRevenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                      <Tooltip formatter={(value: number) => [formatCurrency(value), '']} />
                      <Legend />
                      <Area type="monotone" dataKey="revenue" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} name="Revenue" />
                      <Area type="monotone" dataKey="expenses" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} name="Expenses" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={revenueByCategory}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {revenueByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => [formatCurrency(value), 'Revenue']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Income vs Expense Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={incomeVsExpenseData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                      <Tooltip formatter={(value: number) => [formatCurrency(value), '']} />
                      <Legend />
                      <Line type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={3} name="Income" />
                      <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={3} name="Expenses" />
                      <Line type="monotone" dataKey="netIncome" stroke="#3b82f6" strokeWidth={3} name="Net Income" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue by Client</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueByClient} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                      <YAxis dataKey="name" type="category" width={120} />
                      <Tooltip formatter={(value: number) => [formatCurrency(value), 'Revenue']} />
                      <Bar dataKey="value" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Financial Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {((revenueStats.receivedRevenue - 12000000) / 12000000 * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Profit Margin</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">
                    {(revenueStats.receivedRevenue / revenueStats.totalRevenue * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Collection Rate</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">
                    {revenues.filter(r => r.status === 'received').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Completed Transactions</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">
                    {revenues.filter(r => r.status === 'overdue').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Overdue Payments</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Records Tab */}
        <TabsContent value="records" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Records</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search revenue records..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="project_completion">Project Completion</SelectItem>
                    <SelectItem value="milestone_payment">Milestone Payment</SelectItem>
                    <SelectItem value="retainer">Retainer</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="received">Received</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Client/Project</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRevenues.map((revenue) => (
                    <TableRow key={revenue.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          {formatDate(revenue.date)}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div>
                          <div className="font-medium">{revenue.clientName}</div>
                          {revenue.projectName && (
                            <div className="text-sm text-muted-foreground">{revenue.projectName}</div>
                          )}
                          {revenue.invoiceNumber && (
                            <div className="text-xs text-muted-foreground">{revenue.invoiceNumber}</div>
                          )}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="max-w-xs truncate">{revenue.description}</div>
                      </TableCell>
                      
                      <TableCell>
                        <Badge variant="outline" className={getCategoryColor(revenue.category)}>
                          {revenue.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Badge>
                      </TableCell>
                      
                      <TableCell>
                        <div className="font-medium">{formatCurrency(revenue.amount)}</div>
                      </TableCell>
                      
                      <TableCell>
                        <Badge className={getStatusColor(revenue.status)}>
                          {revenue.status}
                        </Badge>
                      </TableCell>
                      
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => {
                              setSelectedRevenue(revenue);
                              setIsDetailOpen(true);
                            }}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openEditDialog(revenue)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleDeleteRevenue(revenue.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Client Revenue Tab */}
        <TabsContent value="clients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Client Revenue Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Total Revenue</TableHead>
                    <TableHead>Projects</TableHead>
                    <TableHead>Avg per Project</TableHead>
                    <TableHead>Last Payment</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {revenueByClient.map((client) => (
                    <TableRow key={client.name}>
                      <TableCell className="font-medium">{client.name}</TableCell>
                      <TableCell>
                        <div className="font-bold text-green-600">
                          {formatCurrency(client.value)}
                        </div>
                      </TableCell>
                      <TableCell>{client.projects}</TableCell>
                      <TableCell>
                        {formatCurrency(client.value / client.projects)}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">Jan 20, 2024</div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Revenue Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Revenue Details</DialogTitle>
          </DialogHeader>
          {selectedRevenue && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Client</Label>
                  <div className="font-medium">{selectedRevenue.clientName}</div>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Amount</Label>
                  <div className="font-bold text-lg">{formatCurrency(selectedRevenue.amount)}</div>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Date</Label>
                  <div>{formatDate(selectedRevenue.date)}</div>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Status</Label>
                  <Badge className={getStatusColor(selectedRevenue.status)}>
                    {selectedRevenue.status}
                  </Badge>
                </div>
              </div>

              {selectedRevenue.projectName && (
                <div>
                  <Label className="text-sm text-muted-foreground">Project</Label>
                  <div className="font-medium">{selectedRevenue.projectName}</div>
                </div>
              )}

              <div>
                <Label className="text-sm text-muted-foreground">Description</Label>
                <div className="bg-muted p-3 rounded-md text-sm">{selectedRevenue.description}</div>
              </div>

              {selectedRevenue.notes && (
                <div>
                  <Label className="text-sm text-muted-foreground">Notes</Label>
                  <div className="bg-muted p-3 rounded-md text-sm">{selectedRevenue.notes}</div>
                </div>
              )}

              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Revenue Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Revenue Record</DialogTitle>
            <DialogDescription>
              Update revenue information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Client Name</Label>
                <Input
                  value={revenueForm.clientName}
                  onChange={(e) => setRevenueForm({...revenueForm, clientName: e.target.value})}
                  placeholder="Client name"
                />
              </div>
              <div className="space-y-2">
                <Label>Amount</Label>
                <Input
                  type="number"
                  value={revenueForm.amount}
                  onChange={(e) => setRevenueForm({...revenueForm, amount: e.target.value})}
                  placeholder="Revenue amount"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={revenueForm.category} onValueChange={(value: any) => setRevenueForm({...revenueForm, category: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="project_completion">Project Completion</SelectItem>
                    <SelectItem value="milestone_payment">Milestone Payment</SelectItem>
                    <SelectItem value="retainer">Retainer</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={revenueForm.status} onValueChange={(value: any) => setRevenueForm({...revenueForm, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="received">Received</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={revenueForm.description}
                onChange={(e) => setRevenueForm({...revenueForm, description: e.target.value})}
                placeholder="Revenue description"
                rows={2}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditRevenue}>
                Update Revenue
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RevenueManagementPage;