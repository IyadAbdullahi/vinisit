import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Building2, 
  Plus, 
  Search, 
  Users, 
  Edit,
  Trash2,
  MoreHorizontal,
  UserCheck,
  Briefcase,
  Settings,
  FolderTree
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockDepartments, mockUsers } from '../mockdata';
import type { Department, DepartmentUnit, Sector, User } from '@/types';

const DepartmentManagement: React.FC = () => {
  const [departments, setDepartments] = useState(mockDepartments);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDeptOpen, setIsAddDeptOpen] = useState(false);
  const [isAddUnitOpen, setIsAddUnitOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [isEditDeptOpen, setIsEditDeptOpen] = useState(false);

  // Form state for new/edit department
  const [deptFormData, setDeptFormData] = useState({
    name: '',
    code: '',
    sector: 'administration' as Sector,
    description: '',
    headId: 'none',
    isActive: true
  });

  // Form state for new unit
  const [unitFormData, setUnitFormData] = useState({
    name: '',
    departmentId: '',
    managerId: 'none',
    isActive: true
  });

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const availableUsers = mockUsers.filter(user => user.isActive);

  const getSectorBadgeColor = (sector: Sector) => {
    const colors = {
      construction: 'bg-orange-100 text-orange-800 border-orange-200',
      engineering: 'bg-blue-100 text-blue-800 border-blue-200',
      legal: 'bg-purple-100 text-purple-800 border-purple-200',
      administration: 'bg-green-100 text-green-800 border-green-200',
      consulting: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      other: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[sector] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getDepartmentHead = (headId?: string) => {
    return availableUsers.find(user => user.id === headId);
  };

  const getUnitManager = (managerId?: string) => {
    return availableUsers.find(user => user.id === managerId);
  };

  const handleAddDepartment = () => {
    const newDepartment: Department = {
      id: `dept_${Date.now()}`,
      ...deptFormData,
      headId: deptFormData.headId === 'none' ? undefined : deptFormData.headId,
      units: []
    };
    
    setDepartments([...departments, newDepartment]);
    resetDeptForm();
    setIsAddDeptOpen(false);
  };

  const handleEditDepartment = () => {
    if (!selectedDepartment) return;
    
    const updatedDepartments = departments.map(dept => 
      dept.id === selectedDepartment.id 
        ? { 
            ...dept, 
            ...deptFormData,
            headId: deptFormData.headId === 'none' ? undefined : deptFormData.headId
          }
        : dept
    );
    
    setDepartments(updatedDepartments);
    setIsEditDeptOpen(false);
    setSelectedDepartment(null);
    resetDeptForm();
  };

  const handleDeleteDepartment = (deptId: string) => {
    setDepartments(departments.filter(dept => dept.id !== deptId));
  };

  const handleAddUnit = () => {
    const newUnit: DepartmentUnit = {
      id: `unit_${Date.now()}`,
      ...unitFormData,
      managerId: unitFormData.managerId === 'none' ? undefined : unitFormData.managerId
    };
    
    const updatedDepartments = departments.map(dept => 
      dept.id === unitFormData.departmentId
        ? { ...dept, units: [...dept.units, newUnit] }
        : dept
    );
    
    setDepartments(updatedDepartments);
    resetUnitForm();
    setIsAddUnitOpen(false);
  };

  const handleDeleteUnit = (deptId: string, unitId: string) => {
    const updatedDepartments = departments.map(dept => 
      dept.id === deptId
        ? { ...dept, units: dept.units.filter(unit => unit.id !== unitId) }
        : dept
    );
    setDepartments(updatedDepartments);
  };

  const openEditDialog = (department: Department) => {
    setSelectedDepartment(department);
    setDeptFormData({
      name: department.name,
      code: department.code,
      sector: department.sector,
      description: department.description || '',
      headId: department.headId || 'none',
      isActive: department.isActive
    });
    setIsEditDeptOpen(true);
  };

  const resetDeptForm = () => {
    setDeptFormData({
      name: '',
      code: '',
      sector: 'administration' as Sector,
      description: '',
      headId: 'none',
      isActive: true
    });
  };

  const resetUnitForm = () => {
    setUnitFormData({
      name: '',
      departmentId: '',
      managerId: 'none',
      isActive: true
    });
  };

  const DepartmentForm = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="deptName">Department Name</Label>
          <Input
            id="deptName"
            value={deptFormData.name}
            onChange={(e) => setDeptFormData({ ...deptFormData, name: e.target.value })}
            placeholder="Enter department name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="deptCode">Department Code</Label>
          <Input
            id="deptCode"
            value={deptFormData.code}
            onChange={(e) => setDeptFormData({ ...deptFormData, code: e.target.value.toUpperCase() })}
            placeholder="Enter code (e.g., ENG)"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="sector">Sector</Label>
          <Select 
            value={deptFormData.sector} 
            onValueChange={(value: Sector) => setDeptFormData({ ...deptFormData, sector: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select sector" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="construction">Construction</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="legal">Legal</SelectItem>
              <SelectItem value="administration">Administration</SelectItem>
              <SelectItem value="consulting">Consulting</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="head">Department Head</Label>
          <Select 
            value={deptFormData.headId} 
            onValueChange={(value) => setDeptFormData({ ...deptFormData, headId: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select department head" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No Head Assigned</SelectItem>
              {availableUsers.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name} - {user.role.replace('_', ' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={deptFormData.description}
          onChange={(e) => setDeptFormData({ ...deptFormData, description: e.target.value })}
          placeholder="Enter department description"
          rows={3}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          id="deptActive"
          checked={deptFormData.isActive}
          onCheckedChange={(checked) => setDeptFormData({ ...deptFormData, isActive: checked })}
        />
        <Label htmlFor="deptActive">Active Department</Label>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button
          variant="outline"
          onClick={() => {
            if (isEdit) {
              setIsEditDeptOpen(false);
              setSelectedDepartment(null);
            } else {
              setIsAddDeptOpen(false);
            }
            resetDeptForm();
          }}
        >
          Cancel
        </Button>
        <Button onClick={isEdit ? handleEditDepartment : handleAddDepartment}>
          {isEdit ? 'Update Department' : 'Add Department'}
        </Button>
      </div>
    </div>
  );

  const UnitForm = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="unitName">Unit Name</Label>
        <Input
          id="unitName"
          value={unitFormData.name}
          onChange={(e) => setUnitFormData({ ...unitFormData, name: e.target.value })}
          placeholder="Enter unit name"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="parentDept">Parent Department</Label>
          <Select 
            value={unitFormData.departmentId} 
            onValueChange={(value) => setUnitFormData({ ...unitFormData, departmentId: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {departments.filter(d => d.isActive).map((dept) => (
                <SelectItem key={dept.id} value={dept.id}>
                  {dept.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="unitManager">Unit Manager</Label>
          <Select 
            value={unitFormData.managerId} 
            onValueChange={(value) => setUnitFormData({ ...unitFormData, managerId: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select manager" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No Manager Assigned</SelectItem>
              {availableUsers.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name} - {user.role.replace('_', ' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          id="unitActive"
          checked={unitFormData.isActive}
          onCheckedChange={(checked) => setUnitFormData({ ...unitFormData, isActive: checked })}
        />
        <Label htmlFor="unitActive">Active Unit</Label>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button
          variant="outline"
          onClick={() => {
            setIsAddUnitOpen(false);
            resetUnitForm();
          }}
        >
          Cancel
        </Button>
        <Button onClick={handleAddUnit}>
          Add Unit
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 p-6 bg-gray-50/50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Department Management</h1>
          <p className="text-gray-600 mt-1">Manage organizational structure and departments</p>
        </div>
        
        <div className="flex space-x-2">
          <Dialog open={isAddUnitOpen} onOpenChange={setIsAddUnitOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={resetUnitForm}>
                <FolderTree className="h-4 w-4 mr-2" />
                Add Unit
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Unit</DialogTitle>
                <DialogDescription>
                  Create a new unit within a department.
                </DialogDescription>
              </DialogHeader>
              <UnitForm />
            </DialogContent>
          </Dialog>
          
          <Dialog open={isAddDeptOpen} onOpenChange={setIsAddDeptOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetDeptForm}>
                <Plus className="h-4 w-4 mr-2" />
                Add Department
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Add New Department</DialogTitle>
                <DialogDescription>
                  Create a new department with organizational details.
                </DialogDescription>
              </DialogHeader>
              <DepartmentForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Departments</p>
                <p className="text-2xl font-bold text-gray-900">{departments.length}</p>
              </div>
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Departments</p>
                <p className="text-2xl font-bold text-green-700">{departments.filter(d => d.isActive).length}</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Units</p>
                <p className="text-2xl font-bold text-purple-700">
                  {departments.reduce((sum, dept) => sum + dept.units.length, 0)}
                </p>
              </div>
              <FolderTree className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
      <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Department Heads</p>
                <p className="text-2xl font-bold text-orange-700">
                  {departments.filter(d => d.headId).length}
                </p>
              </div>
              <Briefcase className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Search and Departments */}
      <Card>
        <CardHeader>
          <CardTitle>Department Directory</CardTitle>
          <CardDescription>Organizational structure and department units</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search departments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Departments Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredDepartments.map((department) => {
              const head = getDepartmentHead(department.headId);
              
              return (
                <Card key={department.id} className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <Building2 className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{department.name}</CardTitle>
                          <p className="text-sm text-gray-600">{department.code}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className={getSectorBadgeColor(department.sector)}>
                          {department.sector}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => openEditDialog(department)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Department
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleDeleteDepartment(department.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Department
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    
                    {department.description && (
                      <p className="text-sm text-gray-600 mt-2">{department.description}</p>
                    )}
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    {/* Department Head */}
                    <div className="flex items-center space-x-2 mb-4">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Head:</span>
                      {head ? (
                        <span className="text-sm font-medium">{head.name}</span>
                      ) : (
                        <span className="text-sm text-gray-500">No head assigned</span>
                      )}
                    </div>
                    
                    {/* Units */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900">
                          Units ({department.units.length})
                        </h4>
                      </div>
                      
                      {department.units.length > 0 ? (
                        <div className="space-y-2">
                          {department.units.map((unit) => {
                            const manager = getUnitManager(unit.managerId);
                            
                            return (
                              <div key={unit.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-2">
                                  <FolderTree className="h-3 w-3 text-gray-500" />
                                  <span className="text-sm font-medium">{unit.name}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {manager && (
                                    <span className="text-xs text-gray-600">
                                      {manager.name}
                                    </span>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDeleteUnit(department.id, unit.id)}
                                    className="h-6 w-6 p-0 text-red-600 hover:text-red-800"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 text-center py-2">No units in this department</p>
                      )}
                    </div>
                    
                    {/* Status */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t">
                      <Badge variant={department.isActive ? "default" : "secondary"}>
                        {department.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {department.units.filter(u => u.isActive).length} active units
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {filteredDepartments.length === 0 && (
            <div className="text-center py-8">
              <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No departments found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Department Dialog */}
      <Dialog open={isEditDeptOpen} onOpenChange={setIsEditDeptOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Department</DialogTitle>
            <DialogDescription>
              Update department information and settings.
            </DialogDescription>
          </DialogHeader>
          <DepartmentForm isEdit={true} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DepartmentManagement; 