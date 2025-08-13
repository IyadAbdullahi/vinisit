import React, { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { PaginatedDataTable } from '@/components/ui/data-table'
import { SortableHeader } from '@/components/ui/sortable-header'
import { ColumnFilter } from '@/components/ui/column-filter'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useServerPagination, type ServerPaginationParams, type ServerPaginationResponse } from '@/hooks/use-pagination'
import { MoreHorizontal, Eye, Edit, Trash2, RefreshCw } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Example data type
interface Project {
  id: string
  name: string
  code: string
  status: 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'critical'
  budget: number
  spent: number
  progress: number
  startDate: string
  endDate: string
  manager: string
  department: string
}

/**
 * Mock API function for server-side pagination
 * In a real application, this would be an actual API call
 */
async function fetchProjects(params: ServerPaginationParams): Promise<ServerPaginationResponse<Project>> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Mock data generation
  const allProjects: Project[] = Array.from({ length: 250 }, (_, i) => ({
    id: `proj-${i + 1}`,
    name: `Project ${i + 1}`,
    code: `PRJ-${String(i + 1).padStart(3, '0')}`,
    status: ['planning', 'active', 'on_hold', 'completed', 'cancelled'][i % 5] as Project['status'],
    priority: ['low', 'medium', 'high', 'critical'][i % 4] as Project['priority'],
    budget: 100000 + (i * 10000),
    spent: 50000 + (i * 5000),
    progress: Math.floor(Math.random() * 100),
    startDate: new Date(2024, i % 12, (i % 28) + 1).toISOString().split('T')[0],
    endDate: new Date(2024 + 1, (i + 6) % 12, (i % 28) + 1).toISOString().split('T')[0],
    manager: `Manager ${(i % 10) + 1}`,
    department: ['Engineering', 'Construction', 'Infrastructure', 'Design'][i % 4],
  }))

  // Apply search filter
  let filteredProjects = allProjects
  if (params.search) {
    const searchTerm = params.search.toLowerCase()
    filteredProjects = allProjects.filter(project =>
      project.name.toLowerCase().includes(searchTerm) ||
      project.code.toLowerCase().includes(searchTerm) ||
      project.manager.toLowerCase().includes(searchTerm)
    )
  }

  // Apply column filters
  if (params.filters) {
    Object.entries(params.filters).forEach(([key, value]) => {
      if (value && Array.isArray(value) && value.length > 0) {
        filteredProjects = filteredProjects.filter(project =>
          value.includes(project[key as keyof Project])
        )
      }
    })
  }

  // Apply sorting
  if (params.sortBy && params.sortOrder) {
    filteredProjects.sort((a, b) => {
      const aValue = a[params.sortBy as keyof Project]
      const bValue = b[params.sortBy as keyof Project]
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue)
        return params.sortOrder === 'desc' ? -comparison : comparison
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        const comparison = aValue - bValue
        return params.sortOrder === 'desc' ? -comparison : comparison
      }
      
      return 0
    })
  }

  // Apply pagination
  const totalRecords = filteredProjects.length
  const totalPages = Math.ceil(totalRecords / params.pageSize)
  const startIndex = (params.page - 1) * params.pageSize
  const endIndex = startIndex + params.pageSize
  const paginatedData = filteredProjects.slice(startIndex, endIndex)

  return {
    data: paginatedData,
    totalRecords,
    totalPages,
    currentPage: params.page,
    pageSize: params.pageSize,
  }
}

/**
 * Example of server-side paginated data table
 */
export function ServerSideTableExample() {
  const {
    data,
    isLoading,
    error,
    pagination,
    paginationHandlers,
    sorting,
    columnFilters,
    globalFilter,
    setGlobalFilter,
    refresh,
    reset,
    totalRecords,
  } = useServerPagination(fetchProjects, {
    initialPageSize: 20,
    resetOnFilterChange: true,
  })

  // Define columns
  const columns: ColumnDef<Project>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <SortableHeader column={column} title="Project Name" />
      ),
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.getValue("name")}</div>
          <div className="text-sm text-muted-foreground">{row.original.code}</div>
        </div>
      ),
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
              { label: "Planning", value: "planning" },
              { label: "Active", value: "active" },
              { label: "On Hold", value: "on_hold" },
              { label: "Completed", value: "completed" },
              { label: "Cancelled", value: "cancelled" },
            ]}
          />
        </div>
      ),
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        const statusColors = {
          planning: "bg-blue-100 text-blue-800",
          active: "bg-green-100 text-green-800",
          on_hold: "bg-yellow-100 text-yellow-800",
          completed: "bg-emerald-100 text-emerald-800",
          cancelled: "bg-red-100 text-red-800",
        }
        return (
          <Badge className={statusColors[status as keyof typeof statusColors]}>
            {status.replace('_', ' ')}
          </Badge>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "priority",
      header: ({ column }) => (
        <div className="flex items-center space-x-2">
          <SortableHeader column={column} title="Priority" />
          <ColumnFilter
            column={column}
            title="Priority"
            options={[
              { label: "Low", value: "low" },
              { label: "Medium", value: "medium" },
              { label: "High", value: "high" },
              { label: "Critical", value: "critical" },
            ]}
          />
        </div>
      ),
      cell: ({ row }) => {
        const priority = row.getValue("priority") as string
        const priorityColors = {
          low: "bg-gray-100 text-gray-800",
          medium: "bg-blue-100 text-blue-800",
          high: "bg-orange-100 text-orange-800",
          critical: "bg-red-100 text-red-800",
        }
        return (
          <Badge className={priorityColors[priority as keyof typeof priorityColors]}>
            {priority}
          </Badge>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
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
              { label: "Construction", value: "Construction" },
              { label: "Infrastructure", value: "Infrastructure" },
              { label: "Design", value: "Design" },
            ]}
          />
        </div>
      ),
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "budget",
      header: ({ column }) => (
        <SortableHeader column={column} title="Budget" />
      ),
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("budget"))
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)
        return <div className="font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "progress",
      header: ({ column }) => (
        <SortableHeader column={column} title="Progress" />
      ),
      cell: ({ row }) => {
        const progress = row.getValue("progress") as number
        return (
          <div className="flex items-center space-x-2">
            <div className="w-16 bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
        )
      },
    },
    {
      accessorKey: "manager",
      header: ({ column }) => (
        <SortableHeader column={column} title="Manager" />
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const project = row.original

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
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(project.id)}>
                Copy project ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                View details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit project
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const handleRowClick = (project: Project) => {
    console.log('Project clicked:', project)
    // Navigate to project details
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Project Management</h2>
          <p className="text-muted-foreground">
            Manage your projects with server-side pagination
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={refresh}
            disabled={isLoading}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={reset}
            disabled={isLoading}
          >
            Reset Filters
          </Button>
        </div>
      </div>
      
      <PaginatedDataTable
        columns={columns}
        data={data}
        pagination={pagination}
        paginationHandlers={paginationHandlers}
        isLoading={isLoading}
        error={error}
        serverSide
        enableGlobalSearch
        searchPlaceholder="Search projects..."
        searchValue={globalFilter}
        onSearchChange={setGlobalFilter}
        enableColumnFilters
        enableColumnVisibility
        onRowClick={handleRowClick}
        pageSizeOptions={[10, 20, 50, 100]}
        emptyMessage="No projects found."
        loadingMessage="Loading projects..."
      />
    </div>
  )
}