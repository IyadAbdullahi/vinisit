# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Pagination System

This project includes a complete pagination system built with shadcn/ui DataTable components that supports both client-side and server-side pagination.

### Features

- **Complete pagination controls**: first, previous, next, last, page numbers, and page size selection
- **Client-side pagination**: For small datasets (< 1000 records)
- **Server-side pagination**: For large datasets (> 1000 records) with API integration
- **Advanced filtering**: Column filters, global search, and sorting
- **Accessibility**: Full ARIA support and keyboard navigation
- **Responsive design**: Mobile-friendly pagination controls
- **TypeScript**: Full type safety with comprehensive interfaces
- **Loading states**: Built-in loading and error handling
- **Customizable**: Flexible configuration options

### Quick Start

#### Client-Side Pagination
```tsx
import { PaginatedDataTable, useClientSidePagination } from '@/components/ui/data-table'

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
}
```

#### Server-Side Pagination
```tsx
import { PaginatedDataTable } from '@/components/ui/data-table'
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
}
```

### Demo

Visit `/pagination-demo` to see both client-side and server-side pagination examples in action.

### Components

- `PaginatedDataTable`: Main table component with pagination
- `SortableHeader`: Sortable column header component
- `ColumnFilter`: Multi-select column filter component
- `useClientSidePagination`: Hook for client-side pagination state
- `useServerPagination`: Hook for server-side pagination with API integration

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
