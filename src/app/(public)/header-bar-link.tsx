"use client";

import NextLink from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { twMerge } from "tailwind-merge";

type Props = {
  title: string;
  href: string;
  className?: string;
};

export function HeaderBarLink({ title, href, className }: Props) {
  const selectedSegment = useSelectedLayoutSegment();
  return (
    <NextLink
      prefetch
      data-active={selectedSegment === href.slice(1)}
      className={twMerge(
        "text-base font-medium text-zinc-900 hover:text-secondary-foreground data-[active=true]:text-primary",
        className,
      )}
      href={{
        pathname: href,
      }}
    >
      {title}
    </NextLink>
  );
}
