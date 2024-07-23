"use client";
import { Fragment, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { FormProduct } from "./form-product";
import { Input } from "@/lib/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/lib/components/ui/select";
import { Separator } from "@/lib/components/ui/separator";
import { Button } from "@/lib/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/lib/schema/product-schema";

interface DataTableProps {
  columns: ColumnDef<Product>[];
  data: Product[];
  renderSubComponent: (props: { row: Row<Product> }) => React.ReactElement;
  getRowCanExpand: (row: Row<Product>) => boolean;
}

export function DataTable({
  columns,
  data,
  renderSubComponent,
  getRowCanExpand,
}: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "created_at",
      desc: true,
    },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getRowCanExpand,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center gap-2 py-4">
        <Input
          placeholder="Buscar"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <FormProduct />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
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
          <TableBody>
            {table.getRowModel().rows?.length ? (
              <>
                {table.getRowModel().rows.map((row) => (
                  <Fragment key={row.id}>
                    <TableRow data-state={row.getIsSelected() && "selected"}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>

                    {row.getIsExpanded() && (
                      <TableRow>
                        <TableCell
                          colSpan={row.getVisibleCells().length}
                          className="p-0"
                        >
                          {renderSubComponent({ row })}
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                ))}
                {/* Empty rows for sizing table */}
                {Array.from(
                  {
                    length:
                      table.getState().pagination.pageSize -
                      table.getPaginationRowModel().rows.length,
                  },
                  () =>
                    table.getPaginationRowModel().rows[
                      table.getPaginationRowModel().rows.length - 1
                    ]
                ).map((row, index) => (
                  <TableRow key={`template_row_${index}`}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        <div className="pointer-events-none opacity-0 h-8"></div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sin resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end flex-wrap gap-4 py-4">
        <div className="text-sm text-muted-foreground">
          Productos registrados: {table.getFilteredRowModel().rows.length}
        </div>
        <Separator orientation="vertical" className="h-6 max-md:hidden" />
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <label
            htmlFor="rows-per-page"
            className="text-sm text-muted-foreground"
          >
            Filas por página
          </label>
          <Select
            defaultValue={table.getState().pagination.pageSize.toString()}
            onValueChange={(pageSize) => table.setPageSize(+pageSize)}
          >
            <SelectTrigger id="rows-per-page" className="w-20 h-8">
              <SelectValue placeholder="Registros por página" />
            </SelectTrigger>

            <SelectContent>
              {[5, 10, 25, 50, 100].map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground">
            {/* Number of first row in list */}
            {1 +
              table.getState().pagination.pageSize *
                table.getState().pagination.pageIndex}{" "}
            {/* Number of last row in list */}-{" "}
            {table.getPaginationRowModel().rows.length +
              table.getState().pagination.pageSize *
                table.getState().pagination.pageIndex}{" "}
            {/* Count of total rows */}
            de {table.getFilteredRowModel().rows.length}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>
          <Button variant="outline" size="sm" disabled>
            {table.getState().pagination.pageIndex + 1}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
