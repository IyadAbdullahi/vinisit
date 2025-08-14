import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VendorManagement } from '@/components/procurement/vendor-management';
import { ItemCatalog } from '@/components/procurement/item-catalog';
import { ProcurementWorkflow } from '@/components/procurement/procurement-workflow';
import { 
  Building, 
  Package, 
  Workflow,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle
} from 'lucide-react';

const ProcurementPage = () => {
  const [activeTab, setActiveTab] = useState('vendors');

  // Mock procurement statistics
  const procurementStats = {
    totalVendors: 15,
    activeVendors: 12,
    totalCatalogItems: 250,
    activeWorkflows: 8,
    completedWorkflows: 45,
    totalProcurementValue: 125000000,
    avgProcessingTime: 12,
    onTimeDelivery: 87
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Procurement Management</h1>
          <p className="text-muted-foreground">
            Manage vendors, catalog items, and procurement workflows
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{procurementStats.activeVendors}</div>
                <div className="text-sm text-muted-foreground">Active Vendors</div>
              </div>
              <Building className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{procurementStats.totalCatalogItems}</div>
                <div className="text-sm text-muted-foreground">Catalog Items</div>
              </div>
              <Package className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{procurementStats.activeWorkflows}</div>
                <div className="text-sm text-muted-foreground">Active Workflows</div>
              </div>
              <Workflow className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{formatCurrency(procurementStats.totalProcurementValue)}</div>
                <div className="text-sm text-muted-foreground">Total Value</div>
              </div>
              <DollarSign className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{procurementStats.avgProcessingTime}</div>
                <div className="text-sm text-muted-foreground">Avg Processing Time (days)</div>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{procurementStats.onTimeDelivery}%</div>
                <div className="text-sm text-muted-foreground">On-Time Delivery</div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{procurementStats.completedWorkflows}</div>
                <div className="text-sm text-muted-foreground">Completed Workflows</div>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="vendors">Vendor Management</TabsTrigger>
          <TabsTrigger value="catalog">Item Catalog</TabsTrigger>
          <TabsTrigger value="workflow">Procurement Workflow</TabsTrigger>
        </TabsList>

        <TabsContent value="vendors">
          <VendorManagement
            onVendorSelect={(vendor) => console.log('Select vendor:', vendor)}
            onVendorUpdate={(vendor) => console.log('Update vendor:', vendor)}
          />
        </TabsContent>

        <TabsContent value="catalog">
          <ItemCatalog
            onItemSelect={(item) => console.log('Select item:', item)}
            onItemUpdate={(item) => console.log('Update item:', item)}
            onCreateOrder={(items) => console.log('Create order:', items)}
          />
        </TabsContent>

        <TabsContent value="workflow">
          <ProcurementWorkflow
            onWorkflowUpdate={(workflow) => console.log('Update workflow:', workflow)}
            onStepComplete={(workflowId, stepId) => console.log('Complete step:', workflowId, stepId)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProcurementPage;