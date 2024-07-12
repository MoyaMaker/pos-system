import { z } from "zod";

import { CategorySchema } from "./category-schema";

export const ProductSchema = z.object({
  id: z.number(),
  name: z
    .string({
      required_error: "Este campo es obligatorio",
    })
    .min(3, {
      message: "El nombre debe contener al menos 3 caracteres.",
    })
    .describe("El nombre debe ser único y no debe existir previamente."),
  description: z.string().optional(),
  unit_price: z.coerce.number().min(0.01, {
    message: "El valor no puede ser menor a 0.01",
  }),
  available: z.boolean().default(true),
  category: CategorySchema,
  category_id: z.number().optional(),
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
