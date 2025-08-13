import * as React from "react"
import { Column } from "@tanstack/react-table"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SortableHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

/**
 * Sortable header component for data table columns
 * Provides visual feedback for sorting state and accessibility
 */
export function SortableHeader<TData, TValue>({
  column,
  title,
  className,
  ...props
}: SortableHeaderProps<TData, TValue>) {
  const sortDirection = column.getIsSorted()

  return (
    <div className={cn("flex items-center space-x-2", className)} {...props}>
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8 data-[state=open]:bg-accent"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        aria-label={`Sort by ${title} ${
          sortDirection === "asc" 
            ? "descending" 
            : sortDirection === "desc" 
            ? "ascending" 
            : "ascending"
        }`}
      >
        <span>{title}</span>
        {sortDirection === "asc" ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : sortDirection === "desc" ? (
          <ArrowDown className="ml-2 h-4 w-4" />
        ) : (
          <ArrowUpDown className="ml-2 h-4 w-4" />
        )}
      </Button>
    </div>
  )
}