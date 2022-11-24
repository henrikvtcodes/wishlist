import Image from "next/image";
import type { ItemPick } from "./ItemCard";
import clsx from "clsx";
import currency from "currency.js";
import { ClaimButton } from "./ClaimButton";

export const LargeItemCard = ({
  item,
  sizingOverride = false,
}: {
  item: ItemPick;
  sizingOverride?: boolean;
}) => {
  return (
    <div
      className={clsx(
        "flex w-full flex-col rounded-lg bg-gray-200 p-4",
        sizingOverride ? "w-full" : "sm:w-1/2 sm:self-stretch lg:w-5/12"
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
        </p>{" "}
      </div>
      <p className="mt-1 text-sm italic text-gray-600">{item.description}</p>
      <span className="mt-auto flex flex-col justify-evenly  gap-y-2 pt-2 md:flex-row md:gap-x-2 ">
        <a
          href={item.itemUrl}
          className="btn-2nd w-full md:w-1/2 "
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
          className="w-full md:w-1/2"
          id={item.id}
          isClaimed={item.isClaimed}
          claimable={item.isClaimable}
        />
      </span>
    </div>
  );
};
