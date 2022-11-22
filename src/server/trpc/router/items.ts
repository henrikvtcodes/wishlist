import { createItemSchema } from "schemas/item";
import { ItemCategory, ItemType, Prisma } from "server/db/generated";
import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

const prismaItemSelect = Prisma.validator<Prisma.ItemSelect>()({
  id: true,
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
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
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
          orderBy: [
            {
              createdAt: "desc",
            },
          ],
          take: 2,
          select: { ...prismaItemSelect, type: true },
        }),
        ctx.prisma.item.findMany({
          where: {
            category: input.category,
            type: ItemType.MEDIUM,
          },
          orderBy: [
            {
              createdAt: "desc",
            },
          ],
          take: 3,
          select: { ...prismaItemSelect, type: true },
        }),
        ctx.prisma.item.findMany({
          where: {
            category: input.category,
            type: ItemType.SMALL,
          },
          orderBy: [
            {
              createdAt: "desc",
            },
          ],
          take: 3,
          select: { ...prismaItemSelect, type: true },
        }),
      ]);

      return { large, medium, small };
    }),

  create: protectedProcedure
    .input(createItemSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.item.create({
        data: {
          name: input.name,
          description: input.description,
          imgUrl: input.imgUrl,
          itemUrl: input.itemUrl,
          priceCents: input.price * 100,
          vendor: input.vendor,
          category: input.category,
          type: input.type,

          createdAt: new Date(),
        },
      });
    }),

  claim: publicProcedure
    .input(z.object({ id: z.string().cuid(), refId: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.item.update({
        where: {
          id: input.id,
        },
        data: {
          isClaimed: true,
          claimer: {
            connect: {
              id: input.refId,
            },
          },
        },
      });
    }),
});
