import { ItemCategory, ItemType, ItemVendor } from "server/db/generated";
import { z } from "zod";
import currency from "currency.js";

export const createItemSchema = z.object({
  name: z.string().max(64),
  description: z.string().max(512).default(""),
  imgUrl: z.string().url(),
  itemUrl: z.string().url(),
  price: z.preprocess(
    (price) => currency(String(price)).value,
    z.number().nonnegative()
  ),
  vendor: z.nativeEnum(ItemVendor),
  category: z.nativeEnum(ItemCategory),
  type: z.nativeEnum(ItemType),
});

export type CreateItemType = z.infer<typeof createItemSchema>;

export const updateItemSchema = createItemSchema.partial();

export type UpdateItemType = z.infer<typeof updateItemSchema>;
