"use client";

import { TrackClick } from "@loglib/tracker/react";
import currency from "currency.js";
import Image from "next/image";

import { Badge } from "~/components/ui/badge";
import { LinkButton } from "~/components/ui/button-link";
import { vendorToTitleMap } from "~/constants";
import { type Item } from "~/schemas/item";
import * as Card from "~/ui/card";
import ClaimButton from "./claim";

type Props = {
  item: Item;
};

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
        <Badge className="my-2" variant={"outline"}>
          {currency(item.priceCents, { fromCents: true }).format()}
        </Badge>
        <Card.CardDescription
          className="prose max-h-[141px] overflow-y-scroll rounded-md border border-input bg-background px-3 py-2"
          dangerouslySetInnerHTML={{ __html: item.description }}
        ></Card.CardDescription>
      </Card.CardContent>
      <Card.CardFooter className="flex flex-col gap-y-2">
        <TrackClick
          name={"item.viewButton"}
          payload={{ itemUrl: item.itemUrl, itemName: item.name }}
        >
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
        </TrackClick>
        <ClaimButton item={item} />
      </Card.CardFooter>
    </Card.Card>
  );
}
