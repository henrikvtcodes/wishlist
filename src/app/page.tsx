"use client";

import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { HeaderBar } from "./(public)/header-bar";
import { UserWatcher } from "./(public)/user-watcher";

import "./home.css";

import { LinkButton, NextLinkButton } from "~/components/ui/button-link";

export default function Page() {
  return (
    <div className="homeBgImg h-screen w-screen">
      <UserWatcher />
      <HeaderBar />

      <Card className="mx-4 mt-8 md:mx-auto md:w-2/3 lg:w-1/2">
        <CardHeader>
          <CardTitle>{"Henrik's Wishlist"}</CardTitle>
          <CardDescription>
            {`Welcome to my wishlist for 2024! It's a bit smaller this year but still contains the same charity recommendation as last year. Gifts are wants not needs!`}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col gap-y-2 sm:flex-row  sm:gap-x-1 sm:gap-y-0">
          <NextLinkButton className="w-full sm:basis-1/5" href={"/tech"}>
            Tech
          </NextLinkButton>
          <NextLinkButton className="w-full sm:basis-1/5" href={"/tools"}>
            Tools
          </NextLinkButton>
          <NextLinkButton className="w-full sm:basis-1/5" href={"/clothing"}>
            Clothing
          </NextLinkButton>
          <NextLinkButton className="w-full sm:basis-1/5" href={"/misc"}>
            Misc
          </NextLinkButton>
          <NextLinkButton className="w-full sm:basis-1/5" href={"/donate"}>
            Charity
          </NextLinkButton>
        </CardFooter>
      </Card>
    </div>
  );
}
