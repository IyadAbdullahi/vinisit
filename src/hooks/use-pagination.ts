import { useState, useEffect, useCallback } from 'react'
import type { SortingState, ColumnFiltersState } from '@tanstack/react-table'

/**
 * Configuration for pagination behavior
 */
export interface PaginationOptions {
  /** Initial page size */
  initialPageSize?: number
  /** Whether to reset to first page when data changes */
  resetOnDataChange?: boolean
  /** Whether to reset to first page when filters change */
  resetOnFilterChange?: boolean
}

/**
 * Server-side pagination parameters for API calls
 */
export interface ServerPaginationParams {
  page: number
  pageSize: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  filters?: Record<string, any>
  search?: string
}

/**
 * Server-side pagination response structure
 */
export interface ServerPaginationResponse<T> {
  data: T[]
  totalRecords: number
  totalPages: number
  currentPage: number
  pageSize: number
}

/**
 * Hook for managing server-side pagination with API integration
 */
export function useServerPagination<T>(
  fetchFunction: (params: ServerPaginationParams) => Promise<ServerPaginationResponse<T>>,
  options: PaginationOptions = {}
) {
  const {
    initialPageSize = 10,
    resetOnDataChange = true,
    resetOnFilterChange = true,
  } = options

  const [data, setData] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totalRecords, setTotalRecords] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: initialPageSize,
  })
  
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  /**
   * Fetch data from server with current pagination parameters
   */
  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const params: ServerPaginationParams = {
        page: pagination.pageIndex + 1, // Convert to 1-based indexing
        pageSize: pagination.pageSize,
        search: globalFilter || undefined,
        filters: columnFilters.reduce((acc, filter) => {
          acc[filter.id] = filter.value
          return acc
        }, {} as Record<string, any>),
      }

      // Add sorting parameters
      if (sorting.length > 0) {
        const sort = sorting[0]
        params.sortBy = sort.id
        params.sortOrder = sort.desc ? 'desc' : 'asc'
      }

      const response = await fetchFunction(params)
      
      setData(response.data)
      setTotalRecords(response.totalRecords)
      setTotalPages(response.totalPages)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setData([])
      setTotalRecords(0)
      setTotalPages(0)
    } finally {
      setIsLoading(false)
    }
  }, [pagination, sorting, columnFilters, globalFilter, fetchFunction])

  // Fetch data when dependencies change
  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Reset to first page when filters change
  useEffect(() => {
    if (resetOnFilterChange && (columnFilters.length > 0 || globalFilter)) {
      setPagination(prev => ({ ...prev, pageIndex: 0 }))
    }
  }, [columnFilters, globalFilter, resetOnFilterChange])

  /**
   * Pagination handlers
   */
  const paginationHandlers = {
    onPageChange: (pageIndex: number) => {
      setPagination(prev => ({ ...prev, pageIndex }))
    },
    onPageSizeChange: (pageSize: number) => {
      setPagination(prev => ({ 
        ...prev, 
        pageSize, 
        pageIndex: 0 
      }))
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
  }

  /**
   * Pagination configuration
   */
  const paginationConfig = {
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    totalRecords,
    pageCount: totalPages,
  }

  /**
   * Refresh data manually
   */
  const refresh = useCallback(() => {
    fetchData()
  }, [fetchData])

  /**
   * Reset pagination to initial state
   */
  const reset = useCallback(() => {
    setPagination({ pageIndex: 0, pageSize: initialPageSize })
    setSorting([])
    setColumnFilters([])
    setGlobalFilter('')
  }, [initialPageSize])

  return {
    // Data
    data,
    isLoading,
    error,
    
    // Pagination
    pagination: paginationConfig,
    paginationHandlers,
    
    // Filtering and sorting
    sorting,
    columnFilters,
    globalFilter,
    setGlobalFilter,
    
    // Actions
    refresh,
    reset,
    
    // Metadata
    totalRecords,
    totalPages,
  }
}

/**
 * Hook for managing client-side pagination with local data
 */
export function useClientPagination<T>(
  data: T[],
  options: PaginationOptions = {}
) {
  const {
    initialPageSize = 10,
    resetOnDataChange = true,
  } = options

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: initialPageSize,
  })

  // Reset to first page when data changes
  useEffect(() => {
    if (resetOnDataChange) {
      setPagination(prev => ({ ...prev, pageIndex: 0 }))
    }
  }, [data.length, resetOnDataChange])

  const paginationHandlers = {
    onPageChange: (pageIndex: number) => {
      setPagination(prev => ({ ...prev, pageIndex }))
    },
    onPageSizeChange: (pageSize: number) => {
      setPagination(prev => ({ 
        ...prev, 
        pageSize, 
        pageIndex: 0 
      }))
    },
  }

  const paginationConfig = {
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    totalRecords: data.length,
  }

  return {
    pagination: paginationConfig,
    paginationHandlers,
  }
}

/**
 * Utility function to create server pagination parameters
 */
export function createPaginationParams(
  pagination: { pageIndex: number; pageSize: number },
  sorting: SortingState = [],
  columnFilters: ColumnFiltersState = [],
  globalFilter: string = ''
): ServerPaginationParams {
  const params: ServerPaginationParams = {
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
  }

  if (globalFilter) {
    params.search = globalFilter
  }

  if (columnFilters.length > 0) {
    params.filters = columnFilters.reduce((acc, filter) => {
      acc[filter.id] = filter.value
      return acc
    }, {} as Record<string, any>)
  }

  if (sorting.length > 0) {
    const sort = sorting[0]
    params.sortBy = sort.id
    params.sortOrder = sort.desc ? 'desc' : 'asc'
  }

  return params
}