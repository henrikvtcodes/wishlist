import type { ItemPick } from "components/ItemDisplays/ItemCard";
import currency from "currency.js";
import type { UseFormWatch } from "react-hook-form";
import type { CreateItemType, UpdateItemType } from "schemas/item";

export const itemData: (
  item: ItemPick,
  watch: UseFormWatch<CreateItemType | UpdateItemType>
) => ItemPick = (item, watch) => {
  return {
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
  };
};
