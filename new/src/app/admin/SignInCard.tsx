"use client";

import { Card, CardContent, CardTitle, CardHeader } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { signIn } from "next-auth/react";

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
