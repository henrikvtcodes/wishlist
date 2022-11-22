import { ItemCategory, ItemType, ItemVendor } from "server/db/generated";
import { z } from "zod";

export const createItemSchema = z.object({
  name: z.string().max(48),
  description: z.string().max(256),
  imgUrl: z.string().url(),
  itemUrl: z.string().url(),
  price: z.number().nonnegative(),
  vendor: z.nativeEnum(ItemVendor),
  category: z.nativeEnum(ItemCategory),
  type: z.nativeEnum(ItemType),
});

export type CreateItemType = z.infer<typeof createItemSchema>;
