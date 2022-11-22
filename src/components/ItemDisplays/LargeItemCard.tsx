import Image from "next/image";
import type { ItemPick } from "./ItemCard";

export const LargeItemCard = ({ item }: { item: ItemPick }) => {
  return (
    <div className="flex w-full flex-col rounded-lg bg-gray-200 p-4 sm:w-1/2 sm:self-stretch lg:w-5/12">
      <div className=" relative h-80 w-full overflow-hidden rounded-t-lg">
        <Image
          src={item.imgUrl}
          alt={"Image of " + item.name}
          className="object-contain"
          fill
        />
      </div>
      <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
        <h3>{item.name}</h3>
        <p>
          <span className="font-bold">$</span>
          {item.priceCents / 100}
        </p>
      </div>
      <p className="mt-1 text-sm italic text-gray-600">{item.description}</p>
      <span className="mt-auto flex flex-col justify-evenly  pt-2 md:flex-row">
        <a href={item.itemUrl} className="btn-2nd md:w-1/2">
          <span className="mx-auto">
            {item.vendor === "Other"
              ? `Go to item`
              : `See item at ${item.vendor}`}
          </span>
        </a>
      </span>
    </div>
  );
};
