import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";
import { type RouteType } from "next/dist/lib/load-custom-routes";
import Link, { type LinkProps } from "next/link";
import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import { cn } from "~/lib/utils";
import { buttonVariants } from "./button";

export interface NextLinkButtonProps
  extends VariantProps<typeof buttonVariants> {
  href: LinkProps<RouteType>["href"];
  as?: LinkProps<RouteType>["as"];
  replace?: LinkProps<RouteType>["replace"];
  scroll?: LinkProps<RouteType>["scroll"];
  shallow?: LinkProps<RouteType>["shallow"];
  prefetch?: LinkProps<RouteType>["prefetch"];
  locale?: LinkProps<RouteType>["locale"];
  className?: string;
  children?: ReactNode;
}

const NextLinkButton = forwardRef<HTMLAnchorElement, NextLinkButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <Link
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Link>
    );
  },
);
NextLinkButton.displayName = "NextLinkButton";

export interface LinkButtonProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "a";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
LinkButton.displayName = "LinkButton";

export { NextLinkButton, LinkButton };
