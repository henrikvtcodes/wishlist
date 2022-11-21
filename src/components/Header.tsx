import Image from "next/image";
import NextLink from "next/link";

export const Header = () => {
  return (
    <header className="sticky top-0 left-0 flex w-screen items-center gap-x-1 border-b-2 border-blue-500 bg-blue-200 px-2 py-3">
      <span className="flex-1 first:mr-auto">
        <h1 className="text-lg font-bold text-cyan-900 first:mr-auto md:text-2xl">
          {" "}
          Henrik&apos;s Wishlist
        </h1>
      </span>
      <nav className="flex justify-evenly gap-x-2 font-medium">
        <NextLink
          href={`/tools`}
          className={`rounded bg-blue-300 p-0 hover:bg-blue-400 sm:px-2 sm:py-1`}
        >
          {" "}
          Tools{" "}
        </NextLink>
        <NextLink
          href={`/tech`}
          className={`rounded bg-blue-300 p-0 hover:bg-blue-400 sm:px-2 sm:py-1`}
        >
          {" "}
          Electronics{" "}
        </NextLink>
        <NextLink
          href={`/legos`}
          className={`rounded bg-blue-300 p-0 hover:bg-blue-400 sm:px-2 sm:py-1`}
        >
          {" "}
          Lego{" "}
        </NextLink>
        <NextLink
          href={`/clothing`}
          className={`rounded bg-blue-300 p-0 hover:bg-blue-400 sm:px-3 sm:py-2`}
        >
          {" "}
          Clothing{" "}
        </NextLink>
      </nav>

      <span className="flex-1 text-right last:ml-auto"> No User</span>
    </header>
  );
};
