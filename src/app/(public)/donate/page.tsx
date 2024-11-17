import Image from "next/image";

import { LinkButton } from "~/components/ui/button-link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function Page() {
  return (
    <div className="flex w-full justify-center px-4 pb-24 pt-4 md:px-0">
      <main className="flex max-w-md flex-col items-center gap-y-4">
        <h1 className="text-4xl font-bold">Donate to Charity</h1>
        <p className="text-base ">
          If you would like, instead of purchasing me a thing for Christmas, I
          would highly appreciate a donation to the charity below. <br /> Please
          let me know if you do this!
        </p>
        <MSFCard />
      </main>
    </div>
  );
}

export const dynamic = "force-static";

const MSFCard = () => (
  <Card className="w-full">
    <CardContent className="pt-6">
      <Image
        src={"https://www.doctorswithoutborders.org/themes/custom/msf/logo.svg"}
        className="!relative rounded-md"
        fill
        alt="MSF Logo"
      />
    </CardContent>
    <CardHeader>
      <CardTitle>Doctors Without Borders</CardTitle>
      <CardDescription>
        I remain a big fan of Doctors Without Borders. They&apos;re well known
        for the lifesaving work they do in wartorn and exploited regions around
        the world.
      </CardDescription>
    </CardHeader>
    <CardFooter>
      <LinkButton
        href="https://donate.doctorswithoutborders.org/secure/rr-donate-web"
        className="w-full"
        target="_blank"
      >
        Donate
      </LinkButton>
    </CardFooter>
  </Card>
);
