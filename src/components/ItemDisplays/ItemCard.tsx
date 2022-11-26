import clsx from "clsx";
import currency from "currency.js";
import dynamic from "next/dynamic";
import Image from "next/image";
import type { Item } from "server/db/generated";

const ClaimButton = dynamic(
  () =>
    import("components/ItemDisplays/ClaimButton").then(
      (value) => value.ClaimButton
    ),
  {
    ssr: true,
  }
);

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
  | "isClaimable"
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
        "relative flex w-full flex-col rounded-lg bg-gray-200 p-4",
        sizingOverride ? "w-full" : "sm:w-1/3"
      )}
    >
      <Image
        src={item.imgUrl}
        alt={`Image of ${item.name}`}
        className="!relative rounded-md" // Override weird next/image styles
        fill
      />
      <div className=" mt-4 flex flex-col text-base font-medium text-gray-900">
        <h3>{item.name}</h3>
        <p className="my-1 w-min rounded bg-blue-200 p-1">
          {currency(item.priceCents, { fromCents: true }).format()}
        </p>
      </div>
      <p className=" mt-1 text-sm italic text-gray-600">{item.description}</p>
      <span className=" mt-auto flex flex-col justify-evenly gap-y-2 pt-2">
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
        <ClaimButton
          id={item.id}
          isClaimed={item.isClaimed}
          claimable={item.isClaimable}
        />
      </span>
    </div>
  );
};
