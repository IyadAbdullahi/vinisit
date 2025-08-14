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
  Package, 
  Plus, 
  Search, 
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  ShoppingCart,
  TrendingUp,
  DollarSign,
  Boxes,
  AlertTriangle,
  CheckCircle,
  Building
} from 'lucide-react';
import type { Item } from '@/types';

interface CatalogItem extends Item {
  category: 'materials' | 'equipment' | 'tools' | 'supplies' | 'services';
  unit: string;
  minOrderQuantity: number;
  maxOrderQuantity?: number;
  leadTime: number; // in days
  status: 'available' | 'limited' | 'out_of_stock' | 'discontinued';
  preferredVendorId?: string;
  preferredVendorName?: string;
  alternativeVendors: string[];
  lastOrderDate?: string;
  averagePrice: number;
  priceHistory: { date: string; price: number; vendorId: string }[];
  stockLevel?: number;
  reorderLevel?: number;
  tags: string[];
}

interface ItemCatalogProps {
  onItemSelect?: (item: CatalogItem) => void;
  onItemUpdate?: (item: CatalogItem) => void;
  onCreateOrder?: (items: CatalogItem[]) => void;
}

export const ItemCatalog: React.FC<ItemCatalogProps> = ({
  onItemSelect,
  onItemUpdate,
  onCreateOrder
}) => {
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>([
    {
      id: 'ITEM001',
      name: 'Portland Cement',
      description: 'High-grade Portland cement for construction',
      vendorId: 'V001',
      quantity: 1000,
      unitPrice: 5000,
      totalPrice: 5000000,
      category: 'materials',
      unit: 'bags',
      minOrderQuantity: 100,
      maxOrderQuantity: 5000,
      leadTime: 7,
      status: 'available',
      preferredVendorId: 'V001',
      preferredVendorName: 'Northern Construction Supplies',
      alternativeVendors: ['V002', 'V003'],
      lastOrderDate: '2024-01-20',
      averagePrice: 5000,
      priceHistory: [
        { date: '2024-01-01', price: 4800, vendorId: 'V001' },
        { date: '2024-01-15', price: 5000, vendorId: 'V001' }
      ],
      stockLevel: 500,
      reorderLevel: 200,
      tags: ['construction', 'cement', 'building'],
      specifications: 'Grade 42.5N, meets Nigerian standards'
    },
    {
      id: 'ITEM002',
      name: 'Steel Reinforcement Bars',
      description: '16mm steel reinforcement bars',
      vendorId: 'V002',
      quantity: 500,
      unitPrice: 12000,
      totalPrice: 6000000,
      category: 'materials',
      unit: 'pieces',
      minOrderQuantity: 50,
      maxOrderQuantity: 2000,
      leadTime: 14,
      status: 'available',
      preferredVendorId: 'V002',
      preferredVendorName: 'Steel Works Nigeria',
      alternativeVendors: ['V001', 'V004'],
      lastOrderDate: '2024-01-18',
      averagePrice: 12000,
      priceHistory: [
        { date: '2023-12-01', price: 11500, vendorId: 'V002' },
        { date: '2024-01-01', price: 12000, vendorId: 'V002' }
      ],
      stockLevel: 150,
      reorderLevel: 100,
      tags: ['steel', 'reinforcement', 'construction'],
      specifications: '16mm diameter, Grade 60 steel'
    },
    {
      id: 'ITEM003',
      name: 'Solar Panels',
      description: '500W Monocrystalline Solar Panels',
      vendorId: 'V003',
      quantity: 100,
      unitPrice: 150000,
      totalPrice: 15000000,
      category: 'equipment',
      unit: 'units',
      minOrderQuantity: 10,
      maxOrderQuantity: 1000,
      leadTime: 21,
      status: 'limited',
      preferredVendorId: 'V003',
      preferredVendorName: 'Kaduna Solar Technologies',
      alternativeVendors: ['V005'],
      lastOrderDate: '2024-01-10',
      averagePrice: 150000,
      priceHistory: [
        { date: '2023-11-01', price: 145000, vendorId: 'V003' },
        { date: '2024-01-01', price: 150000, vendorId: 'V003' }
      ],
      stockLevel: 25,
      reorderLevel: 50,
      tags: ['solar', 'renewable', 'energy'],
      specifications: '500W, Monocrystalline, 25-year warranty'
    },
    {
      id: 'ITEM004',
      name: 'Excavator Rental',
      description: 'Heavy-duty excavator rental service',
      vendorId: 'V004',
      quantity: 1,
      unitPrice: 75000,
      totalPrice: 75000,
      category: 'equipment',
      unit: 'days',
      minOrderQuantity: 1,
      maxOrderQuantity: 30,
      leadTime: 3,
      status: 'available',
      preferredVendorId: 'V004',
      preferredVendorName: 'Jos Equipment Rental',
      alternativeVendors: ['V006'],
      lastOrderDate: '2024-01-22',
      averagePrice: 75000,
      priceHistory: [
        { date: '2023-12-01', price: 70000, vendorId: 'V004' },
        { date: '2024-01-01', price: 75000, vendorId: 'V004' }
      ],
      tags: ['excavator', 'rental', 'heavy-equipment'],
      specifications: 'CAT 320D or equivalent, with operator'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedItems, setSelectedItems] = useState<CatalogItem[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CatalogItem | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const [itemForm, setItemForm] = useState({
    name: '',
    description: '',
    category: 'materials' as CatalogItem['category'],
    unit: '',
    unitPrice: 0,
    minOrderQuantity: 1,
    maxOrderQuantity: 1000,
    leadTime: 7,
    preferredVendorId: '',
    specifications: '',
    tags: [] as string[],
    reorderLevel: 0
  });

  const filteredItems = catalogItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'limited': return 'bg-yellow-100 text-yellow-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      case 'discontinued': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'materials': return 'bg-blue-100 text-blue-800';
      case 'equipment': return 'bg-purple-100 text-purple-800';
      case 'tools': return 'bg-orange-100 text-orange-800';
      case 'supplies': return 'bg-green-100 text-green-800';
      case 'services': return 'bg-cyan-100 text-cyan-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockIcon = (item: CatalogItem) => {
    if (!item.stockLevel || !item.reorderLevel) return null;
    
    if (item.stockLevel <= item.reorderLevel) {
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
    return <CheckCircle className="h-4 w-4 text-green-500" />;
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

  const handleItemSelect = (item: CatalogItem) => {
    const isSelected = selectedItems.some(selected => selected.id === item.id);
    if (isSelected) {
      setSelectedItems(selectedItems.filter(selected => selected.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleAddItem = () => {
    const newItem: CatalogItem = {
      id: `ITEM${Date.now()}`,
      ...itemForm,
      vendorId: itemForm.preferredVendorId,
      quantity: itemForm.minOrderQuantity,
      totalPrice: itemForm.minOrderQuantity * itemForm.unitPrice,
      status: 'available',
      preferredVendorName: 'TBD',
      alternativeVendors: [],
      averagePrice: itemForm.unitPrice,
      priceHistory: [
        { date: new Date().toISOString(), price: itemForm.unitPrice, vendorId: itemForm.preferredVendorId }
      ]
    };
    
    setCatalogItems([...catalogItems, newItem]);
    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleEditItem = () => {
    if (!selectedItem) return;
    
    const updatedItems = catalogItems.map(item =>
      item.id === selectedItem.id
        ? { ...item, ...itemForm }
        : item
    );
    
    setCatalogItems(updatedItems);
    setIsEditDialogOpen(false);
    setSelectedItem(null);
    resetForm();
  };

  const openEditDialog = (item: CatalogItem) => {
    setSelectedItem(item);
    setItemForm({
      name: item.name,
      description: item.description || '',
      category: item.category,
      unit: item.unit,
      unitPrice: item.unitPrice,
      minOrderQuantity: item.minOrderQuantity,
      maxOrderQuantity: item.maxOrderQuantity || 1000,
      leadTime: item.leadTime,
      preferredVendorId: item.preferredVendorId || '',
      specifications: item.specifications || '',
      tags: item.tags,
      reorderLevel: item.reorderLevel || 0
    });
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setItemForm({
      name: '',
      description: '',
      category: 'materials',
      unit: '',
      unitPrice: 0,
      minOrderQuantity: 1,
      maxOrderQuantity: 1000,
      leadTime: 7,
      preferredVendorId: '',
      specifications: '',
      tags: [],
      reorderLevel: 0
    });
  };

  const catalogStats = {
    total: catalogItems.length,
    available: catalogItems.filter(i => i.status === 'available').length,
    lowStock: catalogItems.filter(i => i.stockLevel && i.reorderLevel && i.stockLevel <= i.reorderLevel).length,
    totalValue: catalogItems.reduce((sum, i) => sum + (i.stockLevel || 0) * i.unitPrice, 0)
  };

  const ItemForm = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Item Name</Label>
          <Input
            value={itemForm.name}
            onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
            placeholder="Enter item name"
          />
        </div>
        <div className="space-y-2">
          <Label>Category</Label>
          <Select
            value={itemForm.category}
            onValueChange={(value: CatalogItem['category']) => 
              setItemForm({ ...itemForm, category: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="materials">Materials</SelectItem>
              <SelectItem value="equipment">Equipment</SelectItem>
              <SelectItem value="tools">Tools</SelectItem>
              <SelectItem value="supplies">Supplies</SelectItem>
              <SelectItem value="services">Services</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          value={itemForm.description}
          onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })}
          placeholder="Enter item description"
          rows={2}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Unit</Label>
          <Input
            value={itemForm.unit}
            onChange={(e) => setItemForm({ ...itemForm, unit: e.target.value })}
            placeholder="e.g., bags, pieces, kg"
          />
        </div>
        <div className="space-y-2">
          <Label>Unit Price (₦)</Label>
          <Input
            type="number"
            value={itemForm.unitPrice}
            onChange={(e) => setItemForm({ ...itemForm, unitPrice: Number(e.target.value) })}
            placeholder="Price per unit"
          />
        </div>
        <div className="space-y-2">
          <Label>Lead Time (days)</Label>
          <Input
            type="number"
            value={itemForm.leadTime}
            onChange={(e) => setItemForm({ ...itemForm, leadTime: Number(e.target.value) })}
            placeholder="Delivery time"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Min Order Qty</Label>
          <Input
            type="number"
            value={itemForm.minOrderQuantity}
            onChange={(e) => setItemForm({ ...itemForm, minOrderQuantity: Number(e.target.value) })}
            placeholder="Minimum quantity"
          />
        </div>
        <div className="space-y-2">
          <Label>Max Order Qty</Label>
          <Input
            type="number"
            value={itemForm.maxOrderQuantity}
            onChange={(e) => setItemForm({ ...itemForm, maxOrderQuantity: Number(e.target.value) })}
            placeholder="Maximum quantity"
          />
        </div>
        <div className="space-y-2">
          <Label>Reorder Level</Label>
          <Input
            type="number"
            value={itemForm.reorderLevel}
            onChange={(e) => setItemForm({ ...itemForm, reorderLevel: Number(e.target.value) })}
            placeholder="Reorder threshold"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Specifications</Label>
        <Textarea
          value={itemForm.specifications}
          onChange={(e) => setItemForm({ ...itemForm, specifications: e.target.value })}
          placeholder="Technical specifications and requirements"
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          onClick={() => {
            if (isEdit) {
              setIsEditDialogOpen(false);
              setSelectedItem(null);
            } else {
              setIsAddDialogOpen(false);
            }
            resetForm();
          }}
        >
          Cancel
        </Button>
        <Button onClick={isEdit ? handleEditItem : handleAddItem}>
          {isEdit ? 'Update Item' : 'Add Item'}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Item Catalog</h2>
          <p className="text-muted-foreground">Manage procurement items and inventory</p>
        </div>
        <div className="flex items-center space-x-2">
          {selectedItems.length > 0 && (
            <Button variant="outline" onClick={() => onCreateOrder?.(selectedItems)}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Create Order ({selectedItems.length})
            </Button>
          )}
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Catalog Item</DialogTitle>
                <DialogDescription>
                  Add a new item to the procurement catalog with vendor information.
                </DialogDescription>
              </DialogHeader>
              <ItemForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{catalogStats.total}</div>
                <div className="text-sm text-muted-foreground">Total Items</div>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{catalogStats.available}</div>
                <div className="text-sm text-muted-foreground">Available</div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">{catalogStats.lowStock}</div>
                <div className="text-sm text-muted-foreground">Low Stock</div>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{formatCurrency(catalogStats.totalValue)}</div>
                <div className="text-sm text-muted-foreground">Inventory Value</div>
              </div>
              <DollarSign className="h-8 w-8 text-purple-500" />
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
                  placeholder="Search catalog items..."
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
                <SelectItem value="tools">Tools</SelectItem>
                <SelectItem value="supplies">Supplies</SelectItem>
                <SelectItem value="services">Services</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="limited">Limited Stock</SelectItem>
                <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                <SelectItem value="discontinued">Discontinued</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Items Table */}
      <Card>
        <CardHeader>
          <CardTitle>Catalog Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedItems(filteredItems);
                      } else {
                        setSelectedItems([]);
                      }
                    }}
                    checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                  />
                </TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Lead Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedItems.some(selected => selected.id === item.id)}
                      onChange={() => handleItemSelect(item)}
                    />
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">{item.description}</div>
                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {item.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{item.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge variant="outline" className={getCategoryColor(item.category)}>
                      {item.category}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <div>
                      <div className="font-medium">{formatCurrency(item.unitPrice)}</div>
                      <div className="text-xs text-muted-foreground">per {item.unit}</div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStockIcon(item)}
                      <div>
                        <div className="font-medium">{item.stockLevel || 'N/A'}</div>
                        <div className="text-xs text-muted-foreground">
                          Reorder: {item.reorderLevel || 'N/A'}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div>
                      <div className="font-medium text-sm">{item.preferredVendorName}</div>
                      <div className="text-xs text-muted-foreground">
                        +{item.alternativeVendors.length} alternatives
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="text-sm">{item.leadTime} days</div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status.replace('_', ' ')}
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
                          setSelectedItem(item);
                          setIsDetailDialogOpen(true);
                        }}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openEditDialog(item)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Item
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onItemSelect?.(item)}>
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Order
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Item
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

      {/* Item Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Item Details</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-muted rounded-lg">
                  <Package className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{selectedItem.name}</h3>
                  <p className="text-muted-foreground">{selectedItem.description}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge className={getStatusColor(selectedItem.status)}>
                      {selectedItem.status.replace('_', ' ')}
                    </Badge>
                    <Badge variant="outline" className={getCategoryColor(selectedItem.category)}>
                      {selectedItem.category}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Pricing Information</label>
                    <div className="space-y-2 mt-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Unit Price:</span>
                        <span className="text-sm font-medium">{formatCurrency(selectedItem.unitPrice)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Average Price:</span>
                        <span className="text-sm font-medium">{formatCurrency(selectedItem.averagePrice)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Unit:</span>
                        <span className="text-sm font-medium">{selectedItem.unit}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Order Information</label>
                    <div className="space-y-2 mt-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Min Order:</span>
                        <span className="text-sm font-medium">{selectedItem.minOrderQuantity} {selectedItem.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Max Order:</span>
                        <span className="text-sm font-medium">{selectedItem.maxOrderQuantity} {selectedItem.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Lead Time:</span>
                        <span className="text-sm font-medium">{selectedItem.leadTime} days</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Vendor Information</label>
                    <div className="space-y-2 mt-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Preferred Vendor:</span>
                        <span className="text-sm font-medium">{selectedItem.preferredVendorName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Alternatives:</span>
                        <span className="text-sm font-medium">{selectedItem.alternativeVendors.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Last Order:</span>
                        <span className="text-sm font-medium">{formatDate(selectedItem.lastOrderDate)}</span>
                      </div>
                    </div>
                  </div>

                  {selectedItem.stockLevel && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Inventory</label>
                      <div className="space-y-2 mt-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Current Stock:</span>
                          <span className="text-sm font-medium">{selectedItem.stockLevel} {selectedItem.unit}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Reorder Level:</span>
                          <span className="text-sm font-medium">{selectedItem.reorderLevel} {selectedItem.unit}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {selectedItem.specifications && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Specifications</label>
                  <div className="bg-muted p-3 rounded-md text-sm mt-2">
                    {selectedItem.specifications}
                  </div>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-muted-foreground">Tags</label>
                <div className="flex flex-wrap gap-1 mt-2">
                  {selectedItem.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
                  Close
                </Button>
                <Button onClick={() => openEditDialog(selectedItem)}>
                  Edit Item
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Item Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Catalog Item</DialogTitle>
            <DialogDescription>
              Update item information and specifications.
            </DialogDescription>
          </DialogHeader>
          <ItemForm isEdit={true} />
        </DialogContent>
      </Dialog>
    </div>
  );
};