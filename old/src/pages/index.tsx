import { Header } from "components/Header";
import { type NextPage } from "next";
import { NextSeo } from "next-seo";
import NextLink from "next/link";

const Home: NextPage = () => {
  return (
    <div className="homeBgImg flex h-screen w-screen flex-col justify-start bg-gray-100 backdrop-blur-lg">
      <Header />
      <NextSeo title="Wishlist Home" />
      <main className="flex w-screen shrink-0 grow flex-col items-center justify-start">
        <div className=" mt-4 max-w-xl flex-col items-center justify-start rounded-md px-10 backdrop-blur-lg backdrop-brightness-50">
          <h1 className=" my-8 bg-gradient-to-br from-blue-300 via-blue-700 to-blue-900 bg-clip-text text-6xl font-bold text-transparent">
            Henrik&apos;s Wishlist
          </h1>
          <p className="mb-4 text-gray-50">
            Hi! This is my birthday and Christmas wish list. I have created it
            in this format to place more meaning behind my requests. Thanks for
            stopping by!
          </p>
        </div>
        <div className="mt-4 rounded-md p-4 backdrop-blur-lg backdrop-brightness-50">
          <h3 className="mb-2 text-center font-medium text-white">
            {" "}
            Check out the categories!{" "}
          </h3>
          <nav className="flex justify-evenly gap-x-2 ">
            <NextLink href={"/tech"} className={"btn flex-initial basis-1/4"}>
              {" "}
              Tech{" "}
            </NextLink>
            <NextLink href={"/tools"} className={"btn flex-initial basis-1/4"}>
              {" "}
              Tools{" "}
            </NextLink>
            <NextLink href={"/legos"} className={"btn flex-initial basis-1/4"}>
              {" "}
              Legos{" "}
            </NextLink>
            <NextLink
              href={"/clothing"}
              className={"btn flex-initial basis-1/4"}
            >
              {" "}
              Clothes{" "}
            </NextLink>
          </nav>
        </div>
      </main>
    </div>
  );
};

export default Home;
