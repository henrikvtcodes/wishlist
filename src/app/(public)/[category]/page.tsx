import { notFound } from "next/navigation";

import { itemCategory, type ItemCategory } from "~/server/db/schema";

export default function Page({ params }: { params: Params }) {
  if (!itemCategory.enumValues.includes(params.category as ItemCategory))
    notFound();

  return <>Hello {params.category}</>;
}

type Params = {
  category: string;
};

export function generateStaticParams(): Params[] {
  const categories = itemCategory.enumValues.map((c) => ({ category: c }));
  return categories;
}
