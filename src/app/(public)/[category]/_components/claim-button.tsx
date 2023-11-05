"use client";

import { Button } from "~/components/ui/button";
import { type Item } from "~/schemas/item";

type Props = {
  item: Item;
};

export default function ClaimButton({ item }: Props) {
  const isDisabled = !item.isClaimable || item.isClaimed;

  return (
    <Button
      variant={"default"}
      className="w-full"
      size={"lg"}
      disabled={isDisabled}
      aria-disabled={isDisabled}
    >
      {item.isClaimable
        ? item.isClaimed
          ? "Item Claimed"
          : "Claim item"
        : "Item not claimable"}
    </Button>
  );
}
