import { z } from "zod";

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

export type Category = z.infer<typeof CategorySchema>;

export const CategoryCreateSchema = CategorySchema.pick({
  name: true,
});

export type CategoryCreate = z.infer<typeof CategoryCreateSchema>;
