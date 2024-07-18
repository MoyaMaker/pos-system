"use client";

import { useProducts } from "@/lib/providers/products-provider";
import { TableLoading } from "@/lib/components/table-loading";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export function TableProducts() {
  const { data, isLoading } = useProducts();

  return (
    <section className="p-4">
      <header>
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
        <DataTable columns={columns} data={data!.products} />
      )}
    </section>
  );
}
