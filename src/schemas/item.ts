import currency from "currency.js";
import { z } from "zod";

import {
  itemCategory,
  itemType,
  itemVendor,
  type ItemCategory,
  type ItemType,
} from "~/server/db/schema";

export const createItemSchema = z.object({
  name: z.string().max(64),
  description: z
    .string()
    .max(512 + 256)
    .default(""),
  imgUrl: z.string().url(),
  itemUrl: z.string().url(),
  price: z.preprocess(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    (price) => currency(String(price)).value,
    z.number().nonnegative(),
  ),
  vendor: z.enum(itemVendor.enumValues),
  category: z.enum(itemCategory.enumValues),
  type: z.enum(itemType.enumValues),
  isClaimable: z.coerce.boolean(),
  show: z.coerce.boolean().default(true),
});

export type CreateItemType = z.infer<typeof createItemSchema>;

export type Item = Omit<CreateItemType, "price"> & {
  priceCents: number;
  isClaimed: boolean;
  id: string;
  type: ItemType;
  category: ItemCategory;
};

export const updateItemSchema = createItemSchema.partial();

export type UpdateItemType = z.infer<typeof updateItemSchema>;
