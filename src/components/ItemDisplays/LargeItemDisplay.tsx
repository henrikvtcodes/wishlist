import { type ItemPick } from "./ItemCard";
import { LargeItemCard } from "./LargeItemCard";

export const LargeItemDisplay = ({
  items,
}: {
  items: ItemPick[] | undefined;
}) => {
  return (
    <section className="flex flex-col items-center justify-evenly py-4 sm:flex-row">
      {items?.map((item) => (
        <LargeItemCard item={item} key={item.id} />
      ))}
    </section>
  );
};
