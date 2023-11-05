"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { LinkButton } from "~/components/ui/button-link";
import { vendorToTitleMap } from "~/constants";
import { type Item } from "~/schemas/item";
import * as Card from "~/ui/card";
import ClaimButton from "./claim-button";

type Props = {
  item: Item;
};

const ScrollArea = dynamic(
  () => import("~/components/ui/scroll-area").then((e) => e.ScrollArea),
  { ssr: false },
);

export function ItemCard({ item }: Props) {
  return (
    <Card.Card>
      <Card.CardHeader>
        <Card.CardTitle>{item.name}</Card.CardTitle>
      </Card.CardHeader>
      <Card.CardContent>
        <Image
          src={item.imgUrl}
          alt={`Image of ${item.name}`}
          className="!relative rounded-md" // Override weird next/image styles
          fill
        />
        <Card.CardDescription>
          <ScrollArea>{item.description}</ScrollArea>
        </Card.CardDescription>
      </Card.CardContent>
      <Card.CardFooter className="flex flex-col gap-y-2">
        <LinkButton
          variant={"outline"}
          className="w-full"
          size={"lg"}
          href={item.itemUrl}
          target="_blank"
        >
          {item.vendor === "Other"
            ? "Go to item"
            : `See item at ${vendorToTitleMap.get(item.vendor)}`}
        </LinkButton>
        <ClaimButton item={item} />
      </Card.CardFooter>
    </Card.Card>
  );
}
