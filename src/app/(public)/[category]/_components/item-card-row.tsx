import { marked } from "marked";

import { cn } from "~/lib/utils";
import { type ItemCategory, type ItemType } from "~/server/db/schema";
import { api } from "~/trpc/server";
import { ItemCard } from "./item-card";

type Props = {
  category: ItemCategory;
  itemType: ItemType;
};

export async function ItemCardRow({ category, itemType }: Props) {
  const items = await api.items.some.query({
    category,
    type: itemType,
    take: itemType === "high" ? 2 : 3,
  });

  for (const item of items) {
    item.description = await marked(item.description);
  }

  return (
    <section className="overflow-y-scroll">
      <ul className="flex flex-col flex-nowrap justify-evenly sm:flex-row">
        {items.map((item) => (
          <li
            key={item.id}
            className={cn(
              itemType === "high" ? "md:basis-1/2" : "md:basis-1/3",
              "grow-0 p-4",
            )}
          >
            <ItemCard item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}
