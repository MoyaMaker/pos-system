import { z } from "zod";
import { ProductSchema } from "./product-schema";

export const InventorySchema = z.object({
  id: z.number(),
  quantity: z.number(),
  // product: ProductSchema,
  product_id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});
