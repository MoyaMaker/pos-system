import { z } from "zod";
import { ProductSchema } from "./product-schema";
import { SaleSchema } from "./sale-schema";

export const SaleDetailSchema = z.object({
  id: z.number(),
  unit_price: z.number(),
  quantity: z.number(),
  // product: ProductSchema,
  product_id: z.number(),
  sale: SaleSchema,
  sale_id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});
