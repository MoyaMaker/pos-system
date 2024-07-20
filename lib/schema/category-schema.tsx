import { z } from "zod";
import { Product } from "./product-schema";

export const CategorySchema = z.object({
  id: z.number(),
  name: z
    .string({
      required_error: "Este campo es obligatorio",
    })
    .min(3, {
      message: "El nombre debe contener al menos 3 caracteres.",
    })
    .describe("El nombre debe ser único y no debe existir previamente."),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Category = z.infer<typeof CategorySchema> & {
  product: Product[];
};

export const CategoryCreateSchema = CategorySchema.pick({
  name: true,
});

export type CategoryCreate = z.infer<typeof CategoryCreateSchema>;
