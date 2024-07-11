-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SaleDetail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "unit_price" REAL NOT NULL,
    "quantity" REAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "sale_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SaleDetail_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SaleDetail_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "Sales" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SaleDetail" ("created_at", "id", "product_id", "quantity", "sale_id", "unit_price", "updated_at") SELECT "created_at", "id", "product_id", "quantity", "sale_id", "unit_price", "updated_at" FROM "SaleDetail";
DROP TABLE "SaleDetail";
ALTER TABLE "new_SaleDetail" RENAME TO "SaleDetail";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
