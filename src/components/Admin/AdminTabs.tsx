import clsx from "clsx";
import NextLink from "next/link";
import { useRouter } from "next/router";

export const AdminTabs = () => {
  const router = useRouter();
  return (
    <nav className="my-4 ml-8 flex space-x-4" aria-label="Tabs">
      <NextLink
        href={"/admin/home"}
        className={clsx(
          router.asPath === "/admin/home"
            ? "bg-gray-300 text-gray-800"
            : " text-gray-600 hover:text-gray-800",
          "rounded-md px-3 py-2 text-sm font-medium"
        )}
        aria-current={router.asPath === "/admin/home" ? "page" : undefined}
      >
        Items
      </NextLink>
      <NextLink
        href={"/admin/home/refs"}
        className={clsx(
          router.asPath === "/admin/home/refs"
            ? "bg-gray-300 text-gray-800"
            : "text-gray-600 hover:text-gray-800",
          "rounded-md px-3 py-2 text-sm font-medium"
        )}
        aria-current={router.asPath === "/admin/home/refs" ? "page" : undefined}
      >
        Refs
      </NextLink>
    </nav>
  );
};
