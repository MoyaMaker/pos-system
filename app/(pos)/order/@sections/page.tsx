"use client";
import { useEffect, useState } from "react";

import { Button } from "@/lib/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card";
import { Skeleton } from "@/lib/components/ui/skeleton";
import { Category } from "@/lib/schema/category-schema";
import { useGetCategoriesProducts } from "@/lib/services/category-service";
import { currencyFormat } from "@/lib/utils/currency-format";

export default function SectionsPage() {
  const { data, isLoading } = useGetCategoriesProducts();

  const [selectedCat, setSelectedCat] = useState<Category | undefined>();

  useEffect(() => {
    if (data && data.categories.length) {
      setSelectedCat(data.categories[0]);
    }
  }, [data]);

  return (
    <>
      <div className="flex gap-0.5">
        {data &&
          data.categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCat?.id === cat.id ? "default" : "ghost"}
              onClick={() => setSelectedCat(cat)}
            >
              {cat.name}
            </Button>
          ))}
        {isLoading && (
          <>
            <Skeleton className="w-24 h-10 " />
            <Skeleton className="w-24 h-10 " />
            <Skeleton className="w-28 h-10 " />
            <Skeleton className="w-32 h-10 " />
            <Skeleton className="w-24 h-10 " />
            <Skeleton className="w-24 h-10 " />
            <Skeleton className="w-24 h-10 " />
            <Skeleton className="w-24 h-10 " />
            <Skeleton className="w-24 h-10 " />
          </>
        )}
      </div>

      <div className="flex gap-4 mt-6">
        {isLoading && (
          <>
            <Skeleton className="w-60 h-32" />
            <Skeleton className="w-60 h-32" />
            <Skeleton className="w-60 h-32" />
            <Skeleton className="w-60 h-32" />
            <Skeleton className="w-60 h-32" />
            <Skeleton className="w-60 h-32" />
          </>
        )}
        {selectedCat &&
          selectedCat.product.map((prod) => (
            <Card key={prod.id}>
              <CardHeader>
                <CardTitle>{prod.name}</CardTitle>
              </CardHeader>
              <CardContent>{currencyFormat(prod.unit_price)}</CardContent>
            </Card>
          ))}
        {selectedCat && selectedCat.product.length === 0 && (
          <div className="text-muted-foreground text-sm">
            No se encontraron productos
          </div>
        )}
      </div>
    </>
  );
}
