"use client";

import * as React from "react";

import {
  Table,
  ColumnDef,
  ColumnFiltersState,
  OnChangeFn,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  TableBody,
  TableCell,
  Table as TableComponent,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import clsx from "clsx";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DataTableProps<TData, TValue> {
  isLoading: boolean;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount?: number;
  pageIndex?: number;
  pageSize?: number;
  setPagination?: OnChangeFn<PaginationState>;
}

type DataTablePaginationProps<TData> = {
  table: Table<TData>;
  className: string;
};

type DataTableRenderProps<TData> = {
  table: Table<TData>;
  isLoading: boolean;
};

export function DataTablePagination<TData>({
  table,
  className,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-end px-2">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div
          className={clsx(
            "flex w-[100px] items-center justify-center text-sm font-medium",
            className
          )}
        >
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            disabled={!table.getCanPreviousPage()}
            onClick={() => {
              table.previousPage();
            }}
          >
            <ChevronLeft height={20} width={20} />
          </Button>
          <Button
            disabled={!table.getCanNextPage()}
            onClick={() => {
              table.nextPage();
            }}
          >
            <ChevronRight height={20} width={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ContentTable<TData>({
  isLoading,
  table,
}: DataTableRenderProps<TData>) {
  if (isLoading) {
    return (
      <div className="w-full h-32 flex justify-center items-center">
        <Loader className="text-green-0 h-12 w-12 animate-spin " />
      </div>
    );
  }
  if (!isLoading && !table.getRowModel().rows?.length) {
    <TableComponent>No results.</TableComponent>;
  }
  return (
    <TableComponent>
      <TableHeader className="text-white-0">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody className="text-white-0">
        {table.getRowModel().rows.map((row) => (
          <TableRow data-state={row.getIsSelected() && "selected"} key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </TableComponent>
  );
}

export function Table<TData, TValue>({
  isLoading = false,
  columns,
  data,
  pageCount = 0,
  pageIndex,
  pageSize = 15,
  setPagination,
}: DataTableProps<TData, TValue>): JSX.Element {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination: {
        pageIndex: pageIndex || 0,
        pageSize,
      },
    },
    onPaginationChange: setPagination,
    manualPagination: true,
    pageCount,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full max-h-[500px] border-b-gray-4 rounded-t-md overflow-y-auto">
        <ContentTable isLoading={isLoading} table={table} />
      </div>
      {pageIndex && (
        <div className="flex w-full border-gray-0 justify-end border border-t-0 p-2 rounded-b-md">
          <DataTablePagination className="text-white-0" table={table} />
        </div>
      )}
    </div>
  );
}
