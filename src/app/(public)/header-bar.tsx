import Image from "next/image";
import NextLink from "next/link";

import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { HeaderBarLink } from "./header-bar-link";
import { HeaderBarUser } from "./header-bar-user";

export function HeaderBar() {
  return (
    <section className="w-full bg-white px-6 py-4 shadow-md dark:bg-zinc-800 sm:px-0">
      <div className="container flex w-full items-center justify-between">
        <div className="flex w-full items-center space-x-4">
          <NextLink href="/" className="flex">
            <Image
              src={"/undergroundhenrik-round.png"}
              width={56}
              height={56}
              alt="Underground Henrik Logo"
            />
          </NextLink>
          <nav id="large" className="hidden space-x-10 pl-7 sm:flex">
            <HeaderBarLink title="Techology" href="/tech" />
            <HeaderBarLink title="Tools" href="/tools" />
            <HeaderBarLink title="Lego" href="/legos" />
            <HeaderBarLink title="Clothing" href="/clothing" />
            <HeaderBarLink title="Misc" href="/misc" />
            <HeaderBarLink title="Charity Donation" href="/donate" />
          </nav>
          <div className="justify-self-end"></div>
        </div>
        <HeaderBarUser />
        <Sheet>
          <SheetTrigger asChild>
            <Button
              id="small"
              className="sm:hidden"
              size="icon"
              variant="outline"
            >
              <svg
                className=" h-6 w-6"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="grid gap-2 py-6">
              <HeaderBarLink
                title="Techology"
                href="/tech"
                className="flex w-full items-center py-2 text-lg font-semibold"
              />
              <HeaderBarLink
                title="Tools"
                href="/tools"
                className="flex w-full items-center py-2 text-lg font-semibold"
              />
              <HeaderBarLink
                title="Lego"
                href="/legos"
                className="flex w-full items-center py-2 text-lg font-semibold"
              />
              <HeaderBarLink
                title="Clothing"
                href="/clothing"
                className="flex w-full items-center py-2 text-lg font-semibold"
              />
              <HeaderBarLink
                title="Charity Donation"
                href="/donate"
                className="flex w-full items-center py-2 text-lg font-semibold"
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </section>
  );
}
