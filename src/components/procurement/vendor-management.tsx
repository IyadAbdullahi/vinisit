import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
import { 
  Building, 
  Plus, 
  Search, 
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Star,
  StarOff,
  TrendingUp,
  DollarSign,
  Package,
  Calendar,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import type { Vendor } from '@/types';

interface ExtendedVendor extends Vendor {
  category: 'materials' | 'equipment' | 'services' | 'subcontractor' | 'other';
  rating: number;
  status: 'active' | 'inactive' | 'blacklisted';
  paymentTerms: string;
  deliveryTime: number; // in days
  totalOrders: number;
  totalValue: number;
  lastOrderDate?: string;
  notes?: string;
  certifications: string[];
  contactPerson?: string;
  website?: string;
}

interface VendorManagementProps {
  onVendorSelect?: (vendor: ExtendedVendor) => void;
  onVendorUpdate?: (vendor: ExtendedVendor) => void;
}

export const VendorManagement: React.FC<VendorManagementProps> = ({
  onVendorSelect,
  onVendorUpdate
}) => {
  const [vendors, setVendors] = useState<ExtendedVendor[]>([
    {
      id: 'V001',
      name: 'Northern Construction Supplies',
      email: 'orders@northernconstruction.ng',
      phone: '+234-803-123-4567',
      address: 'Plot 45, Industrial Estate, Kano, Nigeria',
      category: 'materials',
      rating: 4.5,
      status: 'active',
      paymentTerms: '30 days',
      deliveryTime: 7,
      totalOrders: 25,
      totalValue: 15000000,
      lastOrderDate: '2024-01-20',
      notes: 'Reliable supplier for cement and steel. Good quality and timely delivery.',
      certifications: ['ISO 9001', 'SONCAP'],
      contactPerson: 'Musa Ibrahim',
      website: 'www.northernconstruction.ng'
    },
    {
      id: 'V002',
      name: 'Kaduna Solar Technologies',
      email: 'info@kadunasolr.com',
      phone: '+234-806-987-6543',
      address: '12 Ahmadu Bello Way, Kaduna, Nigeria',
      category: 'equipment',
      rating: 4.8,
      status: 'active',
      paymentTerms: '45 days',
      deliveryTime: 14,
      totalOrders: 8,
      totalValue: 45000000,
      lastOrderDate: '2024-01-25',
      notes: 'Specialized in solar panels and renewable energy equipment.',
      certifications: ['IEC 61215', 'CE Marking'],
      contactPerson: 'Fatima Abdullahi',
      website: 'www.kadunasolar.com'
    },
    {
      id: 'V003',
      name: 'Arewa Engineering Services',
      email: 'contracts@arewaeng.ng',
      phone: '+234-802-555-7890',
      address: '78 Zaria Road, Kano, Nigeria',
      category: 'subcontractor',
      rating: 4.2,
      status: 'active',
      paymentTerms: '21 days',
      deliveryTime: 5,
      totalOrders: 12,
      totalValue: 8500000,
      lastOrderDate: '2024-01-18',
      notes: 'Electrical and plumbing subcontractor. Good workmanship.',
      certifications: ['COREN', 'Safety Certification'],
      contactPerson: 'Ahmed Suleiman'
    },
    {
      id: 'V004',
      name: 'Jos Equipment Rental',
      email: 'rentals@josequipment.ng',
      phone: '+234-805-444-3210',
      address: '23 Bauchi Road, Jos, Nigeria',
      category: 'equipment',
      rating: 3.8,
      status: 'inactive',
      paymentTerms: '15 days',
      deliveryTime: 3,
      totalOrders: 5,
      totalValue: 2800000,
      lastOrderDate: '2023-12-15',
      notes: 'Heavy equipment rental. Some delivery delays in the past.',
      certifications: ['Equipment Safety'],
      contactPerson: 'Peter Danjuma'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [ratingFilter, setRatingFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<ExtendedVendor | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const [vendorForm, setVendorForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    category: 'materials' as ExtendedVendor['category'],
    paymentTerms: '',
    deliveryTime: 0,
    contactPerson: '',
    website: '',
    notes: '',
    certifications: [] as string[]
  });

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.contactPerson?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || vendor.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || vendor.status === statusFilter;
    const matchesRating = ratingFilter === 'all' || 
                         (ratingFilter === '4+' && vendor.rating >= 4) ||
                         (ratingFilter === '3+' && vendor.rating >= 3);
    
    return matchesSearch && matchesCategory && matchesStatus && matchesRating;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'blacklisted': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'materials': return 'bg-blue-100 text-blue-800';
      case 'equipment': return 'bg-purple-100 text-purple-800';
      case 'services': return 'bg-green-100 text-green-800';
      case 'subcontractor': return 'bg-orange-100 text-orange-800';
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

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleAddVendor = () => {
    const newVendor: ExtendedVendor = {
      id: `V${Date.now()}`,
      ...vendorForm,
      rating: 0,
      status: 'active',
      totalOrders: 0,
      totalValue: 0
    };
    
    setVendors([...vendors, newVendor]);
    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleEditVendor = () => {
    if (!selectedVendor) return;
    
    const updatedVendors = vendors.map(vendor =>
      vendor.id === selectedVendor.id
        ? { ...vendor, ...vendorForm }
        : vendor
    );
    
    setVendors(updatedVendors);
    setIsEditDialogOpen(false);
    setSelectedVendor(null);
    resetForm();
  };

  const openEditDialog = (vendor: ExtendedVendor) => {
    setSelectedVendor(vendor);
    setVendorForm({
      name: vendor.name,
      email: vendor.email,
      phone: vendor.phone,
      address: vendor.address,
      category: vendor.category,
      paymentTerms: vendor.paymentTerms,
      deliveryTime: vendor.deliveryTime,
      contactPerson: vendor.contactPerson || '',
      website: vendor.website || '',
      notes: vendor.notes || '',
      certifications: vendor.certifications
    });
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setVendorForm({
      name: '',
      email: '',
      phone: '',
      address: '',
      category: 'materials',
      paymentTerms: '',
      deliveryTime: 0,
      contactPerson: '',
      website: '',
      notes: '',
      certifications: []
    });
  };

  const vendorStats = {
    total: vendors.length,
    active: vendors.filter(v => v.status === 'active').length,
    totalValue: vendors.reduce((sum, v) => sum + v.totalValue, 0),
    avgRating: vendors.reduce((sum, v) => sum + v.rating, 0) / vendors.length,
    avgDeliveryTime: vendors.reduce((sum, v) => sum + v.deliveryTime, 0) / vendors.length
  };

  const VendorForm = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Vendor Name</Label>
          <Input
            value={vendorForm.name}
            onChange={(e) => setVendorForm({ ...vendorForm, name: e.target.value })}
            placeholder="Enter vendor name"
          />
        </div>
        <div className="space-y-2">
          <Label>Category</Label>
          <Select
            value={vendorForm.category}
            onValueChange={(value: ExtendedVendor['category']) => 
              setVendorForm({ ...vendorForm, category: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="materials">Materials</SelectItem>
              <SelectItem value="equipment">Equipment</SelectItem>
              <SelectItem value="services">Services</SelectItem>
              <SelectItem value="subcontractor">Subcontractor</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            type="email"
            value={vendorForm.email}
            onChange={(e) => setVendorForm({ ...vendorForm, email: e.target.value })}
            placeholder="vendor@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label>Phone</Label>
          <Input
            value={vendorForm.phone}
            onChange={(e) => setVendorForm({ ...vendorForm, phone: e.target.value })}
            placeholder="+234-XXX-XXX-XXXX"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Address</Label>
        <Textarea
          value={vendorForm.address}
          onChange={(e) => setVendorForm({ ...vendorForm, address: e.target.value })}
          placeholder="Enter vendor address"
          rows={2}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Contact Person</Label>
          <Input
            value={vendorForm.contactPerson}
            onChange={(e) => setVendorForm({ ...vendorForm, contactPerson: e.target.value })}
            placeholder="Primary contact name"
          />
        </div>
        <div className="space-y-2">
          <Label>Website</Label>
          <Input
            value={vendorForm.website}
            onChange={(e) => setVendorForm({ ...vendorForm, website: e.target.value })}
            placeholder="www.vendor.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Payment Terms</Label>
          <Input
            value={vendorForm.paymentTerms}
            onChange={(e) => setVendorForm({ ...vendorForm, paymentTerms: e.target.value })}
            placeholder="e.g., 30 days"
          />
        </div>
        <div className="space-y-2">
          <Label>Delivery Time (days)</Label>
          <Input
            type="number"
            value={vendorForm.deliveryTime}
            onChange={(e) => setVendorForm({ ...vendorForm, deliveryTime: Number(e.target.value) })}
            placeholder="Average delivery time"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Notes</Label>
        <Textarea
          value={vendorForm.notes}
          onChange={(e) => setVendorForm({ ...vendorForm, notes: e.target.value })}
          placeholder="Additional notes about the vendor"
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          onClick={() => {
            if (isEdit) {
              setIsEditDialogOpen(false);
              setSelectedVendor(null);
            } else {
              setIsAddDialogOpen(false);
            }
            resetForm();
          }}
        >
          Cancel
        </Button>
        <Button onClick={isEdit ? handleEditVendor : handleAddVendor}>
          {isEdit ? 'Update Vendor' : 'Add Vendor'}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Vendor Management</h2>
          <p className="text-muted-foreground">Manage suppliers and service providers</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Vendor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Vendor</DialogTitle>
              <DialogDescription>
                Register a new vendor for procurement activities.
              </DialogDescription>
            </DialogHeader>
            <VendorForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{vendorStats.total}</div>
              <div className="text-sm text-muted-foreground">Total Vendors</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{vendorStats.active}</div>
              <div className="text-sm text-muted-foreground">Active Vendors</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{formatCurrency(vendorStats.totalValue)}</div>
              <div className="text-sm text-muted-foreground">Total Value</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{vendorStats.avgRating.toFixed(1)}</div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{Math.round(vendorStats.avgDeliveryTime)}</div>
              <div className="text-sm text-muted-foreground">Avg Delivery (days)</div>
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
                  placeholder="Search vendors..."
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
                <SelectItem value="materials">Materials</SelectItem>
                <SelectItem value="equipment">Equipment</SelectItem>
                <SelectItem value="services">Services</SelectItem>
                <SelectItem value="subcontractor">Subcontractor</SelectItem>
                <SelectItem value="other">Other</SelectItem>
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
                <SelectItem value="blacklisted">Blacklisted</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={ratingFilter} onValueChange={setRatingFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="4+">4+ Stars</SelectItem>
                <SelectItem value="3+">3+ Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Vendors Table */}
      <Card>
        <CardHeader>
          <CardTitle>Vendor Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-muted rounded">
                        <Building className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium">{vendor.name}</div>
                        <div className="text-sm text-muted-foreground">{vendor.contactPerson}</div>
                        <div className="text-xs text-muted-foreground">
                          Delivery: {vendor.deliveryTime} days • Terms: {vendor.paymentTerms}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge variant="outline" className={getCategoryColor(vendor.category)}>
                      {vendor.category}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                        {vendor.email}
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                        {vendor.phone}
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      {renderStars(vendor.rating)}
                      <span className="text-sm font-medium ml-2">{vendor.rating}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div>
                      <div className="font-medium">{vendor.totalOrders}</div>
                      <div className="text-xs text-muted-foreground">
                        Last: {formatDate(vendor.lastOrderDate)}
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="font-medium">{formatCurrency(vendor.totalValue)}</div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge className={getStatusColor(vendor.status)}>
                      {vendor.status}
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
                          setSelectedVendor(vendor);
                          setIsDetailDialogOpen(true);
                        }}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openEditDialog(vendor)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Vendor
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onVendorSelect?.(vendor)}>
                          <Package className="h-4 w-4 mr-2" />
                          Create Order
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Vendor
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

      {/* Vendor Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Vendor Details</DialogTitle>
          </DialogHeader>
          {selectedVendor && (
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-muted rounded-lg">
                  <Building className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{selectedVendor.name}</h3>
                  <p className="text-muted-foreground">{selectedVendor.contactPerson}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge className={getStatusColor(selectedVendor.status)}>
                      {selectedVendor.status}
                    </Badge>
                    <Badge variant="outline" className={getCategoryColor(selectedVendor.category)}>
                      {selectedVendor.category}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      {renderStars(selectedVendor.rating)}
                      <span className="text-sm font-medium">{selectedVendor.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Contact Information</label>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedVendor.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedVendor.phone}</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span className="text-sm">{selectedVendor.address}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Business Terms</label>
                    <div className="space-y-2 mt-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Payment Terms:</span>
                        <span className="text-sm font-medium">{selectedVendor.paymentTerms}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Delivery Time:</span>
                        <span className="text-sm font-medium">{selectedVendor.deliveryTime} days</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Performance Metrics</label>
                    <div className="space-y-2 mt-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Total Orders:</span>
                        <span className="text-sm font-medium">{selectedVendor.totalOrders}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Total Value:</span>
                        <span className="text-sm font-medium">{formatCurrency(selectedVendor.totalValue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Last Order:</span>
                        <span className="text-sm font-medium">{formatDate(selectedVendor.lastOrderDate)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Certifications</label>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selectedVendor.certifications.map((cert) => (
                        <Badge key={cert} variant="outline" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {selectedVendor.notes && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Notes</label>
                  <div className="bg-muted p-3 rounded-md text-sm mt-2">
                    {selectedVendor.notes}
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
                  Close
                </Button>
                <Button onClick={() => openEditDialog(selectedVendor)}>
                  Edit Vendor
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Vendor Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Vendor</DialogTitle>
            <DialogDescription>
              Update vendor information and business terms.
            </DialogDescription>
          </DialogHeader>
          <VendorForm isEdit={true} />
        </DialogContent>
      </Dialog>
    </div>
  );
};