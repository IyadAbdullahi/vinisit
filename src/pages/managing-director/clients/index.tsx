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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Building,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
  FileText,
  Star,
  StarOff,
  Target,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { mockProjectMonitoring } from '../mockdata';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  industry: string;
  status: 'active' | 'inactive' | 'prospect';
  type: 'client' | 'lead';
  source: 'referral' | 'website' | 'cold_call' | 'marketing' | 'other';
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string;
  createdAt: string;
  lastContact?: string;
  nextFollowUp?: string;
  notes?: string;
  revenue?: number;
  projectCount?: number;
  conversionDate?: string;
  tags?: string[];
}

interface ClientProject {
  id: string;
  name: string;
  status: string;
  budget: number;
  revenue: number;
  startDate: string;
  endDate: string;
}

const ClientsAndLeadsPage = () => {
  const [clients, setClients] = useState<Client[]>([
    {
      id: 'CL001',
      name: 'Urban Development Corp',
      email: 'contact@urbandev.com',
      phone: '+1-555-0101',
      address: '123 Business District, Downtown City',
      industry: 'Real Estate Development',
      status: 'active',
      type: 'client',
      source: 'referral',
      priority: 'high',
      assignedTo: 'Sarah Johnson',
      createdAt: '2023-06-15',
      lastContact: '2024-01-20',
      nextFollowUp: '2024-02-15',
      notes: 'Major client with multiple ongoing projects. Excellent payment history.',
      revenue: 5200000,
      projectCount: 3,
      conversionDate: '2023-07-01',
      tags: ['VIP', 'Multi-Project', 'High-Value']
    },
    {
      id: 'CL002',
      name: 'EcoTech Solutions',
      email: 'info@ecotech.com',
      phone: '+1-555-0102',
      address: '456 Green Valley, Eco City',
      industry: 'Renewable Energy',
      status: 'active',
      type: 'client',
      source: 'website',
      priority: 'high',
      assignedTo: 'Mike Wilson',
      createdAt: '2023-01-10',
      lastContact: '2024-01-18',
      nextFollowUp: '2024-02-10',
      notes: 'Sustainable energy projects. Focus on green building certifications.',
      revenue: 3200000,
      projectCount: 1,
      conversionDate: '2023-01-15',
      tags: ['Green', 'Sustainable', 'Innovation']
    },
    {
      id: 'LD001',
      name: 'Metro Infrastructure Ltd',
      email: 'projects@metroinfra.com',
      phone: '+1-555-0201',
      address: '789 Industrial Park, Metro City',
      industry: 'Infrastructure',
      status: 'active',
      type: 'lead',
      source: 'marketing',
      priority: 'high',
      assignedTo: 'Emily Chen',
      createdAt: '2024-01-05',
      lastContact: '2024-01-22',
      nextFollowUp: '2024-02-05',
      notes: 'Interested in highway expansion project. Budget confirmed at $12M.',
      tags: ['Infrastructure', 'Government', 'Large-Scale']
    },
    {
      id: 'LD002',
      name: 'Coastal Properties Inc',
      email: 'development@coastal.com',
      phone: '+1-555-0202',
      address: '321 Oceanview Drive, Coastal City',
      industry: 'Property Development',
      status: 'active',
      type: 'lead',
      source: 'referral',
      priority: 'medium',
      assignedTo: 'David Brown',
      createdAt: '2024-01-10',
      lastContact: '2024-01-25',
      nextFollowUp: '2024-02-08',
      notes: 'Considering waterfront development. Waiting for environmental permits.',
      tags: ['Waterfront', 'Luxury', 'Environmental']
    },
    {
      id: 'LD003',
      name: 'Smart City Innovations',
      email: 'contact@smartcity.com',
      phone: '+1-555-0203',
      address: '654 Tech Boulevard, Innovation District',
      industry: 'Technology',
      status: 'active',
      type: 'lead',
      source: 'cold_call',
      priority: 'medium',
      assignedTo: 'Lisa Garcia',
      createdAt: '2024-01-12',
      lastContact: '2024-01-24',
      nextFollowUp: '2024-02-12',
      notes: 'IoT infrastructure for smart city project. Technical evaluation in progress.',
      tags: ['Technology', 'IoT', 'Smart-City']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const [clientForm, setClientForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    industry: '',
    type: 'lead' as 'client' | 'lead',
    source: 'website' as 'referral' | 'website' | 'cold_call' | 'marketing' | 'other',
    priority: 'medium' as 'low' | 'medium' | 'high',
    assignedTo: '',
    notes: '',
    nextFollowUp: '',
    tags: [] as string[]
  });

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.industry.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || client.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || client.priority === priorityFilter;
    
    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'prospect': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'client' ? <Building className="h-4 w-4" /> : <Target className="h-4 w-4" />;
  };

  const handleAddClient = () => {
    const newClient: Client = {
      id: `${clientForm.type.toUpperCase()}${Date.now()}`,
      ...clientForm,
      status: clientForm.type === 'client' ? 'active' : 'prospect',
      createdAt: new Date().toISOString().split('T')[0],
      lastContact: new Date().toISOString().split('T')[0],
    };
    
    setClients([...clients, newClient]);
    resetForm();
    setIsAddOpen(false);
  };

  const handleEditClient = () => {
    if (!selectedClient) return;
    
    const updatedClients = clients.map(client =>
      client.id === selectedClient.id
        ? { ...client, ...clientForm }
        : client
    );
    
    setClients(updatedClients);
    setIsEditOpen(false);
    setSelectedClient(null);
    resetForm();
  };

  const handleDeleteClient = (clientId: string) => {
    setClients(clients.filter(client => client.id !== clientId));
  };

  const handleConvertLead = (leadId: string) => {
    const updatedClients = clients.map(client =>
      client.id === leadId
        ? { 
            ...client, 
            type: 'client' as const, 
            status: 'active' as const,
            conversionDate: new Date().toISOString().split('T')[0]
          }
        : client
    );
    
    setClients(updatedClients);
  };

  const openEditDialog = (client: Client) => {
    setSelectedClient(client);
    setClientForm({
      name: client.name,
      email: client.email,
      phone: client.phone,
      address: client.address,
      industry: client.industry,
      type: client.type,
      source: client.source,
      priority: client.priority,
      assignedTo: client.assignedTo || '',
      notes: client.notes || '',
      nextFollowUp: client.nextFollowUp || '',
      tags: client.tags || []
    });
    setIsEditOpen(true);
  };

  const resetForm = () => {
    setClientForm({
      name: '',
      email: '',
      phone: '',
      address: '',
      industry: '',
      type: 'lead',
      source: 'website',
      priority: 'medium',
      assignedTo: '',
      notes: '',
      nextFollowUp: '',
      tags: []
    });
  };

  const getClientProjects = (clientId: string): ClientProject[] => {
    // Mock data - in real app, filter projects by client
    if (clientId === 'CL001') {
      return [
        {
          id: 'PRJ001',
          name: 'City Center Complex',
          status: 'active',
          budget: 5000000,
          revenue: 5200000,
          startDate: '2024-01-15',
          endDate: '2025-12-31'
        }
      ];
    }
    if (clientId === 'CL002') {
      return [
        {
          id: 'PRJ003',
          name: 'Green Energy Campus',
          status: 'completed',
          budget: 3200000,
          revenue: 3200000,
          startDate: '2023-01-10',
          endDate: '2024-01-10'
        }
      ];
    }
    return [];
  };

  const clientStats = {
    totalClients: clients.filter(c => c.type === 'client').length,
    totalLeads: clients.filter(c => c.type === 'lead').length,
    activeClients: clients.filter(c => c.type === 'client' && c.status === 'active').length,
    totalRevenue: clients.filter(c => c.type === 'client').reduce((sum, c) => sum + (c.revenue || 0), 0),
    conversionRate: clients.filter(c => c.type === 'lead').length > 0 
      ? (clients.filter(c => c.conversionDate).length / clients.filter(c => c.type === 'lead').length) * 100 
      : 0,
    avgDealSize: clients.filter(c => c.revenue).length > 0
      ? clients.filter(c => c.revenue).reduce((sum, c) => sum + (c.revenue || 0), 0) / clients.filter(c => c.revenue).length
      : 0
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Client & Leads Management</h1>
          <p className="text-muted-foreground">
            Manage client relationships and track lead conversion
          </p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Client/Lead
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Client/Lead</DialogTitle>
              <DialogDescription>
                Create a new client record or lead for tracking
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    value={clientForm.name}
                    onChange={(e) => setClientForm({...clientForm, name: e.target.value})}
                    placeholder="Company/Client name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select value={clientForm.type} onValueChange={(value: 'client' | 'lead') => setClientForm({...clientForm, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lead">Lead</SelectItem>
                      <SelectItem value="client">Client</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={clientForm.email}
                    onChange={(e) => setClientForm({...clientForm, email: e.target.value})}
                    placeholder="contact@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    value={clientForm.phone}
                    onChange={(e) => setClientForm({...clientForm, phone: e.target.value})}
                    placeholder="+1-555-0000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Address</Label>
                <Textarea
                  value={clientForm.address}
                  onChange={(e) => setClientForm({...clientForm, address: e.target.value})}
                  placeholder="Full address"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Industry</Label>
                  <Input
                    value={clientForm.industry}
                    onChange={(e) => setClientForm({...clientForm, industry: e.target.value})}
                    placeholder="Industry sector"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Source</Label>
                  <Select value={clientForm.source} onValueChange={(value: any) => setClientForm({...clientForm, source: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="referral">Referral</SelectItem>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="cold_call">Cold Call</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select value={clientForm.priority} onValueChange={(value: any) => setClientForm({...clientForm, priority: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Assigned To</Label>
                  <Input
                    value={clientForm.assignedTo}
                    onChange={(e) => setClientForm({...clientForm, assignedTo: e.target.value})}
                    placeholder="Team member name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea
                  value={clientForm.notes}
                  onChange={(e) => setClientForm({...clientForm, notes: e.target.value})}
                  placeholder="Additional notes and comments"
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddClient}>
                  Add {clientForm.type === 'client' ? 'Client' : 'Lead'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientStats.totalClients}</div>
            <div className="text-xs text-muted-foreground">
              {clientStats.activeClients} active
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientStats.totalLeads}</div>
            <div className="text-xs text-muted-foreground">
              In pipeline
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(clientStats.totalRevenue / 1000000).toFixed(1)}M
            </div>
            <div className="text-xs text-muted-foreground">
              From clients
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientStats.conversionRate.toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground">
              Lead to client
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Deal Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(clientStats.avgDealSize / 1000000).toFixed(1)}M
            </div>
            <div className="text-xs text-muted-foreground">
              Per project
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Follow-ups Due</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {clients.filter(c => c.nextFollowUp && new Date(c.nextFollowUp) <= new Date()).length}
            </div>
            <div className="text-xs text-muted-foreground">
              This week
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search clients and leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="client">Clients</SelectItem>
                <SelectItem value="lead">Leads</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="prospect">Prospect</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Clients Table */}
      <Card>
        <CardHeader>
          <CardTitle>Clients & Leads Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client/Lead</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Revenue/Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Next Action</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-full">
                        {getTypeIcon(client.type)}
                      </div>
                      <div>
                        <div className="font-medium">{client.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center space-x-2">
                          <Badge variant="outline" className={client.type === 'client' ? 'bg-blue-50' : 'bg-orange-50'}>
                            {client.type}
                          </Badge>
                          <Badge variant="outline" className={getPriorityColor(client.priority)}>
                            {client.priority}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                        {client.email}
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                        {client.phone}
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div>
                      <div className="font-medium">{client.industry}</div>
                      <div className="text-sm text-muted-foreground">
                        {client.assignedTo}
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    {client.revenue ? (
                      <div>
                        <div className="font-medium">${(client.revenue / 1000000).toFixed(1)}M</div>
                        <div className="text-sm text-muted-foreground">
                          {client.projectCount} projects
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">Potential lead</div>
                    )}
                  </TableCell>
                  
                  <TableCell>
                    <Badge className={getStatusColor(client.status)}>
                      {client.status}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    {client.nextFollowUp && (
                      <div className="flex items-center text-sm">
                        <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                        {new Date(client.nextFollowUp).toLocaleDateString()}
                      </div>
                    )}
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
                          setSelectedClient(client);
                          setIsDetailOpen(true);
                        }}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openEditDialog(client)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        {client.type === 'lead' && (
                          <DropdownMenuItem onClick={() => handleConvertLead(client.id)}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Convert to Client
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleDeleteClient(client.id)}
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

      {/* Client Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedClient?.name} - {selectedClient?.type === 'client' ? 'Client' : 'Lead'} Details
            </DialogTitle>
          </DialogHeader>
          {selectedClient && (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedClient.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedClient.phone}</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                        <span className="text-sm">{selectedClient.address}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Business Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label className="text-sm text-muted-foreground">Industry</Label>
                        <div>{selectedClient.industry}</div>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Source</Label>
                        <div className="capitalize">{selectedClient.source.replace('_', ' ')}</div>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Assigned To</Label>
                        <div>{selectedClient.assignedTo}</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {selectedClient.notes && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{selectedClient.notes}</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="projects" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Associated Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedClient.type === 'client' ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Project Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Budget</TableHead>
                            <TableHead>Revenue</TableHead>
                            <TableHead>Timeline</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {getClientProjects(selectedClient.id).map((project) => (
                            <TableRow key={project.id}>
                              <TableCell className="font-medium">{project.name}</TableCell>
                              <TableCell>
                                <Badge>{project.status}</Badge>
                              </TableCell>
                              <TableCell>${project.budget.toLocaleString()}</TableCell>
                              <TableCell>${project.revenue.toLocaleString()}</TableCell>
                              <TableCell>
                                <div className="text-sm">
                                  {new Date(project.startDate).toLocaleDateString()} - 
                                  {new Date(project.endDate).toLocaleDateString()}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No projects yet - this is a lead</p>
                        <p className="text-sm">Convert to client to start projects</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="revenue" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedClient.type === 'client' && selectedClient.revenue ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center p-4 border rounded-lg">
                            <div className="text-2xl font-bold text-green-600">
                              ${(selectedClient.revenue / 1000000).toFixed(1)}M
                            </div>
                            <div className="text-sm text-muted-foreground">Total Revenue</div>
                          </div>
                          <div className="text-center p-4 border rounded-lg">
                            <div className="text-2xl font-bold">
                              {selectedClient.projectCount}
                            </div>
                            <div className="text-sm text-muted-foreground">Projects</div>
                          </div>
                          <div className="text-center p-4 border rounded-lg">
                            <div className="text-2xl font-bold">
                              ${((selectedClient.revenue || 0) / (selectedClient.projectCount || 1) / 1000000).toFixed(1)}M
                            </div>
                            <div className="text-sm text-muted-foreground">Avg per Project</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No revenue data available</p>
                        <p className="text-sm">Revenue will be tracked once projects are completed</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Activity Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4 p-3 border-l-4 border-blue-500 bg-blue-50">
                        <Calendar className="h-4 w-4 text-blue-600 mt-1" />
                        <div>
                          <div className="font-medium">Created</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(selectedClient.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      
                      {selectedClient.lastContact && (
                        <div className="flex items-start space-x-4 p-3 border-l-4 border-green-500 bg-green-50">
                          <Phone className="h-4 w-4 text-green-600 mt-1" />
                          <div>
                            <div className="font-medium">Last Contact</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(selectedClient.lastContact).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {selectedClient.conversionDate && (
                        <div className="flex items-start space-x-4 p-3 border-l-4 border-purple-500 bg-purple-50">
                          <CheckCircle className="h-4 w-4 text-purple-600 mt-1" />
                          <div>
                            <div className="font-medium">Converted to Client</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(selectedClient.conversionDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {selectedClient.nextFollowUp && (
                        <div className="flex items-start space-x-4 p-3 border-l-4 border-orange-500 bg-orange-50">
                          <Clock className="h-4 w-4 text-orange-600 mt-1" />
                          <div>
                            <div className="font-medium">Next Follow-up</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(selectedClient.nextFollowUp).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Client Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit {selectedClient?.type === 'client' ? 'Client' : 'Lead'}</DialogTitle>
            <DialogDescription>
              Update client/lead information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={clientForm.name}
                  onChange={(e) => setClientForm({...clientForm, name: e.target.value})}
                  placeholder="Company/Client name"
                />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={clientForm.type} onValueChange={(value: 'client' | 'lead') => setClientForm({...clientForm, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lead">Lead</SelectItem>
                    <SelectItem value="client">Client</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={clientForm.email}
                  onChange={(e) => setClientForm({...clientForm, email: e.target.value})}
                  placeholder="contact@company.com"
                />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  value={clientForm.phone}
                  onChange={(e) => setClientForm({...clientForm, phone: e.target.value})}
                  placeholder="+1-555-0000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Address</Label>
              <Textarea
                value={clientForm.address}
                onChange={(e) => setClientForm({...clientForm, address: e.target.value})}
                placeholder="Full address"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Industry</Label>
                <Input
                  value={clientForm.industry}
                  onChange={(e) => setClientForm({...clientForm, industry: e.target.value})}
                  placeholder="Industry sector"
                />
              </div>
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select value={clientForm.priority} onValueChange={(value: any) => setClientForm({...clientForm, priority: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea
                value={clientForm.notes}
                onChange={(e) => setClientForm({...clientForm, notes: e.target.value})}
                placeholder="Additional notes and comments"
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditClient}>
                Update {selectedClient?.type === 'client' ? 'Client' : 'Lead'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientsAndLeadsPage;