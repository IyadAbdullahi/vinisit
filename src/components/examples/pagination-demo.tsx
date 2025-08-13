import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ClientSideTableExample } from './client-side-table'
import { ServerSideTableExample } from './server-side-table'

/**
 * Demo page showcasing both client-side and server-side pagination
 */
export function PaginationDemo() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Pagination System Demo</h1>
        <p className="text-muted-foreground">
          Complete pagination system with shadcn/ui DataTable components
        </p>
      </div>

      <Tabs defaultValue="client-side" className="space-y-4">
        <TabsList>
          <TabsTrigger value="client-side">Client-Side Pagination</TabsTrigger>
          <TabsTrigger value="server-side">Server-Side Pagination</TabsTrigger>
        </TabsList>

        <TabsContent value="client-side" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Client-Side Pagination Example</CardTitle>
              <p className="text-sm text-muted-foreground">
                All data is loaded at once and pagination is handled in the browser.
                Best for smaller datasets ({"<"} 1000 records).
              </p>
            </CardHeader>
            <CardContent>
              <ClientSideTableExample />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="server-side" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Server-Side Pagination Example</CardTitle>
              <p className="text-sm text-muted-foreground">
                Data is fetched from the server based on pagination parameters.
                Best for larger datasets ({">"} 1000 records).
              </p>
            </CardHeader>
            <CardContent>
              <ServerSideTableExample />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Usage Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Client-Side Pagination</h3>
            <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
{`import { PaginatedDataTable, useClientSidePagination } from '@/components/ui/data-table'

function MyTable() {
  const { pagination, paginationHandlers } = useClientSidePagination(data, 10)
  
  return (
    <PaginatedDataTable
      columns={columns}
      data={data}
      pagination={pagination}
      paginationHandlers={paginationHandlers}
      enableGlobalSearch
      enableColumnFilters
    />
  )
}`}
            </pre>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Server-Side Pagination</h3>
            <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
{`import { PaginatedDataTable } from '@/components/ui/data-table'
import { useServerPagination } from '@/hooks/use-pagination'

function MyTable() {
  const {
    data,
    isLoading,
    error,
    pagination,
    paginationHandlers,
    globalFilter,
    setGlobalFilter,
  } = useServerPagination(fetchDataFunction)
  
  return (
    <PaginatedDataTable
      columns={columns}
      data={data}
      pagination={pagination}
      paginationHandlers={paginationHandlers}
      isLoading={isLoading}
      error={error}
      serverSide
      searchValue={globalFilter}
      onSearchChange={setGlobalFilter}
    />
  )
}`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}