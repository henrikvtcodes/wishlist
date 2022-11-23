import { ItemCard } from "components/ItemDisplays/ItemCard";
import { LargeItemDisplay } from "components/ItemDisplays/LargeItemDisplay";
import { MediumItemDisplay } from "components/ItemDisplays/MediumItemDisplay";
import { CategoryLayout } from "layouts/Category";
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { ItemCategory } from "server/db/generated";
import { ssgHelpers } from "server/trpc/ssg";
import { trpc } from "utils/trpc";
import { categoryToTitleMap } from "utils/constants";
import { NextSeo } from "next-seo";

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  category,
  title,
}) => {
  const { data: items } = trpc.items.byCategory.useQuery({ category });

  return (
    <CategoryLayout>
      <NextSeo title={title} />
      <h1 className="my-8 text-4xl font-semibold">{title}</h1>
      <LargeItemDisplay items={items?.large} />

      <MediumItemDisplay items={items?.medium} />

      <section>
        {items?.small.map((item) => (
          <ItemCard item={item} key={item.id} />
        ))}
      </section>
    </CategoryLayout>
  );
};

export const getStaticProps = async (
  ctx: GetStaticPropsContext<{ category: string }>
) => {
  const category = ctx.params?.category as ItemCategory;

  await ssgHelpers.items.byCategory.prefetch({ category });

  const title = categoryToTitleMap[category];

  return {
    props: {
      trpcState: ssgHelpers.dehydrate(),
      category,
      title,
    },
    revalidate: 3600,
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = Object.keys(ItemCategory).map((category) => ({
    params: { category },
  }));
  return {
    paths,
    fallback: false,
  };
};

export default Page;
