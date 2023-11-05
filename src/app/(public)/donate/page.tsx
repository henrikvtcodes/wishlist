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
    <div className="w-full flex justify-center pt-4 pb-24 px-4 md:px-0">
      <main className="flex flex-col items-center max-w-md gap-y-4">
        <h1 className="text-4xl font-bold">Donate to Charity</h1>
        <p className="text-base ">
          Given that I am now in college, have a part time job, and may be
          outgrowing the gifts thing, I figured I&apos;d put this here. If you
          would like, instead of purchasing me a thing for Christmas, I would
          highly appreciate a donation to the charity below. <br /> The other
          reason this is here is because I decidedly upped the ante price-wise
          in putting together my list this year, and I don&apos;t want to make
          anyone feel obligated to a lot on me.
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
        As a result of my whole brain surgery thing, I have a newfound respect
        for the medical world and the people who work in it. I&apos;ve decided
        to put MSF here because they&apos;re a noble, well-known charity and
        they&apos;re providing critical aid in the Gaza Strip.
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
