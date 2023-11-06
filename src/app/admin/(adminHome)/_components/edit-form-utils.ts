import currency from "currency.js";
import { type UseFormWatch } from "react-hook-form";

import {
  type CreateItemType,
  type Item,
  type UpdateItemType,
} from "~/schemas/item";

export const itemData: (
  item: Item,
  watch: UseFormWatch<CreateItemType | UpdateItemType>,
) => Item = (item, watch) => ({
  id: item.id,
  name: watch("name") ?? item.name,
  description: watch("description") ?? item.description,
  imgUrl: watch("imgUrl") ?? item.imgUrl,
  itemUrl: watch("itemUrl") ?? item.itemUrl,
  priceCents:
    watch("price") !== undefined
      ? currency(watch("price") ?? "0").intValue
      : currency(item.priceCents, { fromCents: true }).intValue,
  isClaimed: item.isClaimed,
  vendor: watch("vendor") ?? item.vendor,
  isClaimable: watch("isClaimable") ?? item.isClaimable,
  category: watch("category") ?? item.category,
  type: watch("type") ?? item.type,
});
