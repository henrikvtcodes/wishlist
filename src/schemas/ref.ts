import { z } from "zod";

export const createRefSchema = z.object({
  ref: z.string().min(1).max(32),
  name: z.string().min(1).max(32),
});

export type CreateRefType = z.infer<typeof createRefSchema>;

export const updateRefSchema = createRefSchema.partial();

export type UpdateRefType = z.infer<typeof updateRefSchema>;
