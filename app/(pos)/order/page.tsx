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
import { ScrollArea } from "@/lib/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/lib/components/ui/dialog";
import { Product } from "@/lib/schema/product-schema";

export default function OrderPage() {
  const { data, isLoading } = useGetCategoriesProducts();

  const [selectedCat, setSelectedCat] = useState<Category | undefined>();

  useEffect(() => {
    if (data && data.categories.length) {
      setSelectedCat(data.categories[0]);
    }
  }, [data]);

  return (
    <section className="p-4">
      <div className="flex gap-0.5">
        <ScrollArea>
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
        </ScrollArea>
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

      <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
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
            <DialogProduct key={prod.id} product={prod} />
          ))}
        {selectedCat && selectedCat.product.length === 0 && (
          <div className="text-muted-foreground text-sm">
            No se encontraron productos
          </div>
        )}
      </div>
    </section>
  );
}

function DialogProduct({ product }: { product: Product }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{product.name}</CardTitle>
          </CardHeader>
          <CardContent>{currencyFormat(product.unit_price)}</CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Añadir producto</DialogTitle>
        </DialogHeader>

        <div>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
          accusantium iusto consequuntur voluptatem unde earum ratione quibusdam
          nam, quae voluptatum ut ad, quod ex, exercitationem labore quos vero
          pariatur. At.
        </div>
      </DialogContent>
    </Dialog>
  );
}
