"use client";

import { signIn } from "next-auth/react";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export function SignInCard() {
  return (
    <Card>
      <CardHeader className="flex justify-center">
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant={"default"} onClick={() => signIn("google")}>
          Sign In with Google
        </Button>
      </CardContent>
    </Card>
  );
}
