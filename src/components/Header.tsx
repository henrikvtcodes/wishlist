import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";

import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useStoredUser } from "stores/storedUser";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const HeaderBarLink = ({ title, href }: { title: string; href: string }) => {
  const router = useRouter();
  const category = router.query.category as string;

  return (
    <NextLink
      href={href}
      className={classNames(
        "text-base font-medium",
        href.includes(category)
          ? "text-blue-500 "
          : "text-gray-500 hover:text-gray-900"
      )}
    >
      {title}
    </NextLink>
  );
};

export const Header = () => {
  const userName = useStoredUser((state) => state.user?.name);
  return (
    <Popover className="relative bg-white">
      <div
        className="pointer-events-none absolute inset-0 z-30 shadow"
        aria-hidden="true"
      />
      <div className="relative z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 sm:py-4 md:justify-start md:space-x-10 lg:px-8">
          <div>
            <NextLink href="/" className="flex">
              <Image
                src={"/undergroundhenrik-round.png"}
                width={56}
                height={56}
                alt="Underground Henrik Logo"
              />
            </NextLink>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
            <nav className="flex space-x-10">
              <HeaderBarLink title="Techology" href="/tech" />
              <HeaderBarLink title="Tools" href="/tools" />
              <HeaderBarLink title="Lego" href="/legos" />
              <HeaderBarLink title="Clothing" href="/clothing" />
            </nav>
            <div className="flex items-center md:ml-12">
              <span className="text-base font-medium text-gray-600 ">
                Hi
                <span className="font-semibold">
                  {userName ? ` ${userName}` : " there"}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 z-30 origin-top-right transform p-2 transition md:hidden"
        >
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pt-5 pb-6 sm:pb-8">
              <div className="flex items-center justify-between">
                <div>
                  <NextLink href="#" className="flex">
                    <Image
                      src={"/undergroundhenrik-round.png"}
                      width={56}
                      height={56}
                      alt="Underground Henrik Logo"
                    />
                  </NextLink>
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="py-6 px-5">
              <div className="grid grid-cols-2 gap-4">
                <NextLink
                  href="/tech"
                  className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Technology
                </NextLink>
                <NextLink
                  href="/tools"
                  className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Tools
                </NextLink>
                <NextLink
                  href="/legos"
                  className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Legos
                </NextLink>
                <NextLink
                  href="/clothing"
                  className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Clothing
                </NextLink>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
