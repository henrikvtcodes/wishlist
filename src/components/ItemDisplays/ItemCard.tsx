import clsx from "clsx";
import currency from "currency.js";
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

export const ItemCard = ({
  item,
  sizingOverride = false,
}: {
  item: ItemPick;
  sizingOverride?: boolean;
}) => {
  return (
    <div
      className={clsx(
        "flex h-fit w-full flex-col rounded-lg bg-gray-200 p-4 ",
        sizingOverride ? "w-full" : "sm:w-1/3"
      )}
    >
      <div className=" relative h-80 w-full overflow-hidden rounded-t-lg">
        <Image
          src={item.imgUrl}
          alt={`Image of ${item.name}`}
          className="object-contain"
          fill
        />
      </div>
      <div className="mt-4 flex flex-col text-base font-medium text-gray-900">
        <h3>{item.name}</h3>
        <p className="my-1 w-min rounded bg-blue-200 p-1">
          {currency(item.priceCents, { fromCents: true }).format()}
        </p>
      </div>
      <p className="mt-1 text-sm italic text-gray-600">{item.description}</p>
      <span className="mt-auto flex flex-col justify-evenly pt-2">
        <a
          href={item.itemUrl}
          className="btn-2nd "
          target={"_blank"}
          rel="noreferrer"
        >
          <span className="mx-auto">
            {item.vendor === "Other"
              ? "Go to item"
              : `See item at ${item.vendor}`}
          </span>
        </a>
      </span>
    </div>
  );
};
