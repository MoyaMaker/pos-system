"use client";

import { useCategories } from "@/lib/providers/category-provider";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { TableLoading } from "./table-loading";

export function TableCategories() {
  const { data, isLoading } = useCategories();

  return (
    <section className="p-4">
      <header>
        <h1 className="text-xl font-medium">
          Categorías{" "}
          {data && data.categories && (
            <span className="text-base text-muted-foreground">
              ({data.categories.length})
            </span>
          )}
        </h1>
      </header>

      {isLoading && !data && <TableLoading />}
      {!isLoading && data && (
        <DataTable columns={columns} data={data!.categories} />
      )}
    </section>
  );
}
