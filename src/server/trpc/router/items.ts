import { ItemCategory, ItemType, Prisma } from "server/db/generated";
import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

const prismaItemSelect = Prisma.validator<Prisma.ItemSelect>()({
  name: true,
  description: true,
  imgUrl: true,
  isClaimed: true,
  priceCents: true,
  vendor: true,
  itemUrl: true,
});

export const itemsRouter = router({
  some: publicProcedure
    .input(
      z.object({
        type: z.nativeEnum(ItemType),
        category: z.nativeEnum(ItemCategory),
        take: z.number().min(1).default(3),
      })
    )
    .query(async ({ ctx, input }) => {
      const items = await ctx.prisma.item.findMany({
        where: {
          category: input.category,
          type: input.type,
        },
        take: input.take,
        select: prismaItemSelect,
      });

      return items;
    }),

  byCategory: publicProcedure
    .input(
      z.object({
        category: z.nativeEnum(ItemCategory),
      })
    )
    .query(async ({ ctx, input }) => {
      const [large, medium, small] = await Promise.all([
        ctx.prisma.item.findMany({
          where: {
            category: input.category,
            type: ItemType.LARGE,
          },
          take: 2,
          select: { ...prismaItemSelect, type: true },
        }),
        ctx.prisma.item.findMany({
          where: {
            category: input.category,
            type: ItemType.MEDIUM,
          },
          take: 3,
          select: { ...prismaItemSelect, type: true },
        }),
        ctx.prisma.item.findMany({
          where: {
            category: input.category,
            type: ItemType.SMALL,
          },
          take: 3,
          select: { ...prismaItemSelect, type: true },
        }),
      ]);

      return { large, medium, small };
    }),
});
