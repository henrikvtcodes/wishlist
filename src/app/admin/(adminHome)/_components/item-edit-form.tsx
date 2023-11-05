"use client";

import { ItemCard } from "~/app/(public)/[category]/_components/item-card";
import { type Item } from "~/schemas/item";

type Props = {
  item: Item;
};

export function ItemEditForm({ item: initialItemData }: Props) {
  return (
    <main className="w-5/6 grid grid-cols-2">
      <section className="p-4 col-start-1 col-span-1 flex justify-center px-10 pb-10">
        <ItemCard item={initialItemData} />
      </section>
      <section className="col-start-2 col-span-1 flex justify-center px-4"></section>
    </main>
  );
}
