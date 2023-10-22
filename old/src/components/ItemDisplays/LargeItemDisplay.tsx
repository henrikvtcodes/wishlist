import { type ItemPick } from "./ItemCard";
import { LargeItemCard } from "./LargeItemCard";

export const LargeItemDisplay = ({
  items,
}: {
  items: ItemPick[] | undefined;
}) => {
  return (
    <section className="flex flex-col items-stretch justify-evenly gap-y-2 py-4 px-2 sm:flex-row sm:gap-x-2 sm:gap-y-0">
      {items?.map((item) => (
        <LargeItemCard item={item} key={item.id} />
      ))}
    </section>
  );
};
