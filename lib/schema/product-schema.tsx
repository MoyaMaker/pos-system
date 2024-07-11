import { z } from "zod";

import { CategorySchema } from "./category-schema";

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
  unit_price: z.number(),
  available: z.boolean().default(true),
  category: CategorySchema,
  category_id: z.number(),
  // sale_detail: SaleDetailSchema,
  // inventory: z.object({}),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Product = z.infer<typeof ProductSchema>;

export const ProductCreateSchema = ProductSchema.pick({
  name: true,
  description: true,
  unit_price: true,
  available: true,
  category_id: true,
});

export type ProductCreate = z.infer<typeof ProductCreateSchema>;
