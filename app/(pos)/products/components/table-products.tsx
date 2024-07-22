"use client";

import { useProducts } from "@/lib/providers/products-provider";
import { TableLoading } from "@/lib/components/table-loading";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Product } from "@/lib/schema/product-schema";
import { Row } from "@tanstack/react-table";
import { dateFormat } from "@/lib/utils/date-format";

export function TableProducts() {
  const { data, isLoading } = useProducts();

  return (
    <section className="p-4">
      <header className="w-full">
        <h1 className="text-xl font-medium">
          Productos{" "}
          {data && data.products && (
            <span className="text-base text-muted-foreground">
              ({data.products.length})
            </span>
          )}
        </h1>
      </header>

      {isLoading && !data && <TableLoading />}
      {!isLoading && data && (
        <DataTable
          columns={columns}
          data={data!.products}
          renderSubComponent={renderSubComponent}
          getRowCanExpand={() => true}
        />
      )}
    </section>
  );
}

const renderSubComponent = ({ row }: { row: Row<Product> }) => {
  return (
    <div className="flex gap-6">
      <div className="grid">
        <span className="text-xs text-muted-foreground">Fecha de creación</span>
        <span className="text-sm">{dateFormat(row.original.created_at)}</span>
      </div>

      <div className="grid">
        <span className="text-xs text-muted-foreground">
          Fecha de actualización
        </span>
        <span className="text-sm">{dateFormat(row.original.updated_at)}</span>
      </div>
    </div>
  );
};
