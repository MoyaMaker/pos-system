/*
  Warnings:

  - You are about to drop the `SeleDetail` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Categories` will be added. If there are existing duplicate values, this will fail.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "SeleDetail";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "SaleDetail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "unit_price" REAL NOT NULL,
    "quantity" REAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "sale_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SaleDetail_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SaleDetail_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "Sales" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Categories_name_key" ON "Categories"("name");
