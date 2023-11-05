import { param } from "drizzle-orm";
import { notFound } from "next/navigation";
import { categoryToTitleMap } from "~/constants";
import { itemCategory, type ItemCategory } from "~/server/db/schema";
import { ItemCardRow } from "./_components/item-card-row";

export default function Page({ params }: { params: Params }) {
  if (!itemCategory.enumValues.includes(params.category as ItemCategory))
    notFound();

  const categoryTitle = categoryToTitleMap.get(params.category as ItemCategory);

  return (
    <main className="flex w-full flex-col items-center justify-start divide-y-2 divide-gray-300 overflow-y-scroll ">
      <h1 className="my-8 text-4xl font-semibold">{categoryTitle}</h1>
      <ItemCardRow category={params.category as ItemCategory} itemType="high" />
      <ItemCardRow
        category={params.category as ItemCategory}
        itemType="medium"
      />
      <ItemCardRow category={params.category as ItemCategory} itemType="base" />
    </main>
  );
}

type StringIntersector = string & { __never__: never };

type Params = {
  category: ItemCategory | StringIntersector;
  // category: ItemCategory;
};

export function generateStaticParams(): Params[] {
  const categories = itemCategory.enumValues.map((c) => ({ category: c }));
  return categories;
}

export function generateMetadata({ params }: { params: Params }) {
  // if (!itemCategory.enumValues.includes(params.category as ItemCategory))
  //   return {
  //     title: "404 | henrik's wishlist ",
  //   };

  const categoryTitle = categoryToTitleMap.get(params.category as ItemCategory);

  if (!categoryTitle)
    return {
      title: "404 | henrik's wishlist ",
    };

  return {
    title: `${categoryTitle} | henrik's wishlist `,
  };
}

export const dynamic = "force-dynamic";
