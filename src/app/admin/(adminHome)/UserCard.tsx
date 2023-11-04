"use client";

import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

type Props = {
  session: Session;
};

export function UserCard({ session }: Props) {
  return (
    <Card className="m-4 grid w-fit grid-flow-row grid-cols-3">
      <CardContent className="col-span-1 col-start-1 grid h-full place-content-center p-2">
        <Avatar className="h-16 w-16">
          <AvatarImage
            src={session.user.image ? session.user.image : undefined}
          />
          <AvatarFallback>HVT</AvatarFallback>
        </Avatar>
      </CardContent>
      <CardHeader className="col-span-2 col-start-2 flex flex-col p-2">
        <CardTitle className="text-base">{session.user.name}</CardTitle>
        <CardDescription>
          <span className="text-sm">{session.user.email}</span>
          <Button
            className="px-1"
            size={"sm"}
            variant={"secondary"}
            onClick={() => signOut()}
          >
            Sign Out
          </Button>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
