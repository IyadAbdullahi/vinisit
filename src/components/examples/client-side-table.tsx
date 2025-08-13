import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { PaginatedDataTable, useClientSidePagination } from '@/components/ui/data-table'
import { SortableHeader } from '@/components/ui/sortable-header'
import { ColumnFilter } from '@/components/ui/column-filter'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Example data type
interface Employee {
  id: string
  name: string
  email: string
  department: string
  position: string
  salary: number
  status: 'active' | 'inactive' | 'terminated'
  hireDate: string
}

// Mock data
const mockEmployees: Employee[] = Array.from({ length: 100 }, (_, i) => ({
  id: `emp-${i + 1}`,
  name: `Employee ${i + 1}`,
  email: `employee${i + 1}@company.com`,
  department: ['Engineering', 'HR', 'Finance', 'Marketing'][i % 4],
  position: ['Developer', 'Manager', 'Analyst', 'Specialist'][i % 4],
  salary: 50000 + (i * 1000),
  status: ['active', 'inactive', 'terminated'][i % 3] as Employee['status'],
  hireDate: new Date(2020 + (i % 4), i % 12, (i % 28) + 1).toISOString().split('T')[0],
}))

/**
 * Example of client-side paginated data table
 */
export function ClientSideTableExample() {
  const { pagination, paginationHandlers } = useClientSidePagination(mockEmployees, 10)

  // Define columns
  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <SortableHeader column={column} title="Name" />
      ),
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <SortableHeader column={column} title="Email" />
      ),
      cell: ({ row }) => (
        <div className="text-muted-foreground">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "department",
      header: ({ column }) => (
        <div className="flex items-center space-x-2">
          <SortableHeader column={column} title="Department" />
          <ColumnFilter
            column={column}
            title="Department"
            options={[
              { label: "Engineering", value: "Engineering" },
              { label: "HR", value: "HR" },
              { label: "Finance", value: "Finance" },
              { label: "Marketing", value: "Marketing" },
            ]}
          />
        </div>
      ),
      cell: ({ row }) => (
        <Badge variant="outline">{row.getValue("department")}</Badge>
      ),
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "position",
      header: ({ column }) => (
        <SortableHeader column={column} title="Position" />
      ),
    },
    {
      accessorKey: "salary",
      header: ({ column }) => (
        <SortableHeader column={column} title="Salary" />
      ),
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("salary"))
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)
        return <div className="font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <div className="flex items-center space-x-2">
          <SortableHeader column={column} title="Status" />
          <ColumnFilter
            column={column}
            title="Status"
            options={[
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
              { label: "Terminated", value: "terminated" },
            ]}
          />
        </div>
      ),
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge 
            variant={status === "active" ? "default" : status === "inactive" ? "secondary" : "destructive"}
          >
            {status}
          </Badge>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "hireDate",
      header: ({ column }) => (
        <SortableHeader column={column} title="Hire Date" />
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue("hireDate"))
        return <div>{date.toLocaleDateString()}</div>
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const employee = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(employee.id)}>
                Copy employee ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                View details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit employee
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete employee
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const handleRowClick = (employee: Employee) => {
    console.log('Row clicked:', employee)
    // Navigate to employee details or open modal
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Employee Directory</h2>
        <p className="text-muted-foreground">
          Manage your employee records with client-side pagination
        </p>
      </div>
      
      <PaginatedDataTable
        columns={columns}
        data={mockEmployees}
        pagination={pagination}
        paginationHandlers={paginationHandlers}
        enableGlobalSearch
        searchPlaceholder="Search employees..."
        enableColumnFilters
        enableColumnVisibility
        onRowClick={handleRowClick}
        emptyMessage="No employees found."
      />
    </div>
  )
}