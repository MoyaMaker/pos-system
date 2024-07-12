import type { Metadata } from "next";

import { CategoriesProvider } from "@/lib/providers/category-provider";
import { TableCategories } from "./components/table-categories";

export const metadata: Metadata = {
  title: "Categorías - POS System",
};

export default function CategoriesPage() {
  return (
    <CategoriesProvider>
      <TableCategories />
    </CategoriesProvider>
  );
}
