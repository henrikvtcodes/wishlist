import { createItemSchema, updateItemSchema } from "schemas/item";
import { ItemCategory, ItemType, Prisma } from "server/db/generated";
import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { requestRevalidate } from "server/common/makeRevalidateRequest";

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

  all: protectedProcedure.query(async ({ ctx }) => {
    const items = await ctx.prisma.item.findMany();

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

  one: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const item = await ctx.prisma.item.findFirstOrThrow({
        where: {
          id: input.id,
        },
        select: { ...prismaItemSelect, type: true, category: true },
      });

      return item;
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

      await requestRevalidate(input.category);
    }),

  update: protectedProcedure
    .input(z.object({ itemId: z.string().cuid(), data: updateItemSchema }))
    .mutation(async ({ ctx, input }) => {
      const newItem = await ctx.prisma.item.update({
        where: {
          id: input.itemId,
        },
        data: {
          name: input.data.name,
          description: input.data.description,
          imgUrl: input.data.imgUrl,
          itemUrl: input.data.itemUrl,
          priceCents: input.data.price ? input.data.price * 100 : undefined,
          vendor: input.data.vendor,
          category: input.data.category,
          type: input.data.type,
        },
      });

      await requestRevalidate(newItem.category);
    }),

  delete: protectedProcedure
    .input(z.object({ itemId: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const deleted = await ctx.prisma.item.delete({
        where: {
          id: input.itemId,
        },
      });

      await requestRevalidate(deleted.category);
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
