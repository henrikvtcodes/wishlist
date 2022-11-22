import Image from "next/image";
import type { Item } from "server/db/generated";

export type ItemPick = Pick<
  Item,
  | "id"
  | "name"
  | "description"
  | "imgUrl"
  | "isClaimed"
  | "priceCents"
  | "vendor"
  | "itemUrl"
>;

export const ItemCard = ({ item }: { item: ItemPick }) => {
  return (
    <div className="flex h-fit w-full flex-col rounded-lg bg-gray-200 p-4 sm:w-1/2 lg:w-5/12">
      <div className=" relative h-80 w-full overflow-hidden rounded-t-lg">
        <Image
          src={item.imgUrl}
          alt={"Image of " + item.name}
          className="object-cover"
          fill
        />
      </div>
      <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
        <h3>{item.name}</h3>
        <p>{item.priceCents / 100}</p>
      </div>
      <p className="mt-1 text-sm italic text-gray-500">{item.description}</p>
    </div>
  );
};
