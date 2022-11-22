import { type ItemPick } from "./ItemCard";
import { ItemCard } from "./ItemCard";

export const MediumItemDisplay = ({
  items,
}: {
  items: ItemPick[] | undefined;
}) => {
  return (
    <section className="flex flex-col items-center justify-evenly py-4 sm:flex-row">
      {items?.map((item) => (
        <ItemCard item={item} key={item.id} />
      ))}
    </section>
  );
};
