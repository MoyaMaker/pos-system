import type { Metadata } from "next";

import { ProductsProvider } from "@/lib/providers/products-provider";
import { TableProducts } from "./components/table-products";

export const metadata: Metadata = {
  title: "Productos - POS System",
};

export default function ProductsPage() {
  return (
    <ProductsProvider>
      <TableProducts />
    </ProductsProvider>
  );
}
