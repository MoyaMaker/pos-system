import { z } from "zod";

import { ProductSchema } from "./product-schema";

export const SaleSchema = z.object({
  id: z.number(),
  total: z.number(),
  // product: ProductSchema,
  created_at: z.string(),
  updated_at: z.string(),
});
