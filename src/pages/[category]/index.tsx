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

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  category,
}) => {
  const { data: items } = trpc.items.byCategory.useQuery({ category });

  return <CategoryLayout></CategoryLayout>;
};

export const getStaticProps = async (
  ctx: GetStaticPropsContext<{ category: string }>
) => {
  const category = ctx.params?.category as ItemCategory;

  await ssgHelpers.items.byCategory.prefetch({ category });

  return {
    props: {
      trpcState: ssgHelpers.dehydrate(),
      category,
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
