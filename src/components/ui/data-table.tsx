import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  PaginationState,
} from "@tanstack/react-table"
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

/**
 * Pagination configuration interface
 */
export interface PaginationConfig {
  /** Current page number (0-indexed) */
  pageIndex: number
  /** Number of items per page */
  pageSize: number
  /** Total number of records */
  totalRecords?: number
  /** Total number of pages (for server-side pagination) */
  pageCount?: number
}

/**
 * Pagination event handlers interface
 */
export interface PaginationHandlers {
  /** Called when page changes */
  onPageChange: (pageIndex: number) => void
  /** Called when page size changes */
  onPageSizeChange: (pageSize: number) => void
  /** Called when sorting changes (for server-side) */
  onSortingChange?: (sorting: SortingState) => void
  /** Called when column filters change (for server-side) */
  onColumnFiltersChange?: (filters: ColumnFiltersState) => void
}

/**
 * Data table props interface
 */
export interface DataTableProps<TData, TValue> {
  /** Column definitions */
  columns: ColumnDef<TData, TValue>[]
  /** Table data */
  data: TData[]
  /** Pagination configuration */
  pagination: PaginationConfig
  /** Pagination event handlers */
  paginationHandlers: PaginationHandlers
  /** Loading state */
  isLoading?: boolean
  /** Error state */
  error?: string | null
  /** Enable server-side pagination */
  serverSide?: boolean
  /** Enable column filtering */
  enableColumnFilters?: boolean
  /** Enable column visibility toggle */
  enableColumnVisibility?: boolean
  /** Enable global search */
  enableGlobalSearch?: boolean
  /** Global search placeholder */
  searchPlaceholder?: string
  /** Custom search value (for controlled search) */
  searchValue?: string
  /** Search change handler */
  onSearchChange?: (value: string) => void
  /** Page size options */
  pageSizeOptions?: number[]
  /** Custom empty state message */
  emptyMessage?: string
  /** Custom loading message */
  loadingMessage?: string
  /** Additional table props */
  tableProps?: React.ComponentProps<typeof Table>
  /** Custom row click handler */
  onRowClick?: (row: TData) => void
}

/**
 * Pagination controls component
 */
interface PaginationControlsProps {
  pagination: PaginationConfig
  paginationHandlers: PaginationHandlers
  isLoading?: boolean
  pageSizeOptions?: number[]
  serverSide?: boolean
  totalRecords?: number
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  pagination,
  paginationHandlers,
  isLoading = false,
  pageSizeOptions = [10, 20, 30, 40, 50],
  serverSide = false,
  totalRecords
}) => {
  const { pageIndex, pageSize, pageCount } = pagination
  const { onPageChange, onPageSizeChange } = paginationHandlers

  // Calculate pagination info
  const totalPages = serverSide ? (pageCount || 0) : Math.ceil((totalRecords || 0) / pageSize)
  const currentPage = pageIndex + 1
  const startRecord = pageIndex * pageSize + 1
  const endRecord = Math.min((pageIndex + 1) * pageSize, totalRecords || 0)

  const canGoPrevious = pageIndex > 0
  const canGoNext = serverSide ? currentPage < totalPages : pageIndex < totalPages - 1

  return (
    <div className="flex items-center justify-between px-2 py-4">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Rows per page</p>
        <Select
          value={`${pageSize}`}
          onValueChange={(value) => {
            onPageSizeChange(Number(value))
          }}
          disabled={isLoading}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {pageSizeOptions.map((size) => (
              <SelectItem key={size} value={`${size}`}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">
            {totalRecords ? (
              <>
                Showing {startRecord} to {endRecord} of {totalRecords} results
              </>
            ) : (
              `Page ${currentPage} of ${totalPages}`
            )}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => onPageChange(0)}
            disabled={!canGoPrevious || isLoading}
            aria-label="Go to first page"
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(pageIndex - 1)}
            disabled={!canGoPrevious || isLoading}
            aria-label="Go to previous page"
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Page number input for direct navigation */}
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Page</p>
            <Input
              className="h-8 w-12 text-center"
              type="number"
              min={1}
              max={totalPages}
              value={currentPage}
              onChange={(e) => {
                const page = parseInt(e.target.value) - 1
                if (page >= 0 && page < totalPages) {
                  onPageChange(page)
                }
              }}
              disabled={isLoading}
              aria-label="Current page number"
            />
            <p className="text-sm font-medium">of {totalPages}</p>
          </div>

          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={!canGoNext || isLoading}
            aria-label="Go to next page"
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => onPageChange(totalPages - 1)}
            disabled={!canGoNext || isLoading}
            aria-label="Go to last page"
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

/**
 * Loading skeleton for table rows
 */
const TableSkeleton: React.FC<{ columns: number; rows?: number }> = ({ 
  columns, 
  rows = 5 
}) => (
  <>
    {Array.from({ length: rows }).map((_, index) => (
      <TableRow key={index}>
        {Array.from({ length: columns }).map((_, cellIndex) => (
          <TableCell key={cellIndex}>
            <div className="h-4 bg-muted animate-pulse rounded" />
          </TableCell>
        ))}
      </TableRow>
    ))}
  </>
)

/**
 * Main paginated data table component
 * 
 * @template TData - The type of data being displayed
 * @template TValue - The type of cell values
 */
export function PaginatedDataTable<TData, TValue>({
  columns,
  data,
  pagination,
  paginationHandlers,
  isLoading = false,
  error = null,
  serverSide = false,
  enableColumnFilters = true,
  enableColumnVisibility = true,
  enableGlobalSearch = true,
  searchPlaceholder = "Search...",
  searchValue,
  onSearchChange,
  pageSizeOptions = [10, 20, 30, 40, 50],
  emptyMessage = "No results found.",
  loadingMessage = "Loading...",
  tableProps,
  onRowClick,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [globalFilter, setGlobalFilter] = React.useState("")

  // Handle controlled search
  const searchInputValue = searchValue !== undefined ? searchValue : globalFilter
  const handleSearchChange = React.useCallback((value: string) => {
    if (onSearchChange) {
      onSearchChange(value)
    } else {
      setGlobalFilter(value)
    }
  }, [onSearchChange])

  // Create table instance
  const table = useReactTable({
    data,
    columns,
    onSortingChange: (updater) => {
      const newSorting = typeof updater === 'function' ? updater(sorting) : updater
      setSorting(newSorting)
      if (serverSide && paginationHandlers.onSortingChange) {
        paginationHandlers.onSortingChange(newSorting)
      }
    },
    onColumnFiltersChange: (updater) => {
      const newFilters = typeof updater === 'function' ? updater(columnFilters) : updater
      setColumnFilters(newFilters)
      if (serverSide && paginationHandlers.onColumnFiltersChange) {
        paginationHandlers.onColumnFiltersChange(newFilters)
      }
    },
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: serverSide ? undefined : setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: serverSide ? undefined : getPaginationRowModel(),
    getSortedRowModel: serverSide ? undefined : getSortedRowModel(),
    getFilteredRowModel: serverSide ? undefined : getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter: searchInputValue,
      pagination: serverSide ? {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      } : undefined,
    },
    // Server-side pagination configuration
    ...(serverSide && {
      manualPagination: true,
      manualSorting: true,
      manualFiltering: true,
      pageCount: pagination.pageCount || Math.ceil((pagination.totalRecords || 0) / pagination.pageSize),
    }),
  })

  // Error state
  if (error) {
    return (
      <div className="w-full">
        <div className="rounded-md border">
          <div className="p-8 text-center">
            <div className="text-destructive text-sm font-medium mb-2">Error</div>
            <div className="text-sm text-muted-foreground">{error}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          {enableGlobalSearch && (
            <Input
              placeholder={searchPlaceholder}
              value={searchInputValue}
              onChange={(event) => handleSearchChange(event.target.value)}
              className="h-8 w-[150px] lg:w-[250px]"
              disabled={isLoading}
            />
          )}
        </div>
        
        {enableColumnVisibility && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="ml-auto hidden h-8 lg:flex"
                disabled={isLoading}
              >
                <ChevronDown className="ml-2 h-4 w-4" />
                View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[150px]">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table {...tableProps}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="h-12">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableSkeleton columns={columns.length} rows={pagination.pageSize} />
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(
                    onRowClick && "cursor-pointer hover:bg-muted/50",
                    "transition-colors"
                  )}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="text-muted-foreground">{emptyMessage}</div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <PaginationControls
        pagination={pagination}
        paginationHandlers={paginationHandlers}
        isLoading={isLoading}
        pageSizeOptions={pageSizeOptions}
        serverSide={serverSide}
        totalRecords={pagination.totalRecords}
      />
    </div>
  )
}

/**
 * Hook for managing client-side pagination state
 */
export function useClientSidePagination<TData>(
  data: TData[],
  initialPageSize: number = 10
) {
  const [pagination, setPagination] = React.useState<PaginationConfig>({
    pageIndex: 0,
    pageSize: initialPageSize,
    totalRecords: data.length,
  })

  // Update total records when data changes
  React.useEffect(() => {
    setPagination(prev => ({
      ...prev,
      totalRecords: data.length,
      pageIndex: 0, // Reset to first page when data changes
    }))
  }, [data.length])

  const paginationHandlers: PaginationHandlers = {
    onPageChange: (pageIndex: number) => {
      setPagination(prev => ({ ...prev, pageIndex }))
    },
    onPageSizeChange: (pageSize: number) => {
      setPagination(prev => ({ 
        ...prev, 
        pageSize, 
        pageIndex: 0 // Reset to first page when page size changes
      }))
    },
  }

  return {
    pagination,
    paginationHandlers,
    setPagination,
  }
}

/**
 * Hook for managing server-side pagination state
 */
export function useServerSidePagination(
  initialPageSize: number = 10,
  totalRecords?: number,
  pageCount?: number
) {
  const [pagination, setPagination] = React.useState<PaginationConfig>({
    pageIndex: 0,
    pageSize: initialPageSize,
    totalRecords,
    pageCount,
  })

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  // Update pagination when external data changes
  React.useEffect(() => {
    setPagination(prev => ({
      ...prev,
      totalRecords,
      pageCount,
    }))
  }, [totalRecords, pageCount])

  const paginationHandlers: PaginationHandlers = {
    onPageChange: (pageIndex: number) => {
      setPagination(prev => ({ ...prev, pageIndex }))
    },
    onPageSizeChange: (pageSize: number) => {
      setPagination(prev => ({ 
        ...prev, 
        pageSize, 
        pageIndex: 0 // Reset to first page when page size changes
      }))
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
  }

  return {
    pagination,
    paginationHandlers,
    sorting,
    columnFilters,
    setPagination,
  }
}

export { PaginationControls }