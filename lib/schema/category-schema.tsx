import { z } from "zod";

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Category = z.infer<typeof CategorySchema>;

export const CategoryCreateSchema = CategorySchema.pick({
  name: true,
});

export type CategoryCreate = z.infer<typeof CategoryCreateSchema>;
