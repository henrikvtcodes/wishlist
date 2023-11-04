import { TRPCError } from "@trpc/server";
import currency from "currency.js";
import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";

import { requestRevalidate } from "~/lib/revalidate";
import { createItemSchema, updateItemSchema } from "~/schemas/item";
import { db } from "~/server/db";
import { item, itemCategory, itemType } from "~/server/db/schema";
import { protectedProcedure, publicProcedure, router } from "../trpc";

const itemSelect = {
  id: true,
  name: true,
  description: true,
  imgUrl: true,
  isClaimed: true,
  priceCents: true,
  vendor: true,
  itemUrl: true,
};

export const itemsRouter = router({
  some: publicProcedure
    .input(
      z.object({
        type: z.enum(itemType.enumValues),
        category: z.enum(itemCategory.enumValues),
        take: z.number().min(1).default(3),
      }),
    )
    .query(async ({ input }) => {
      const items = await db.query.item.findMany({
        where: (item) =>
          and(eq(item.category, input.category), eq(item.type, input.type)),
        orderBy: (item) => [desc(item.createdAt)],
        limit: input.take,
        with: itemSelect,
      });

      return items;
    }),

  all: protectedProcedure.query(async ({}) => {
    const items = await db.query.item.findMany();

    return items;
  }),

  byCategory: publicProcedure
    .input(
      z.object({
        category: z.enum(itemCategory.enumValues),
      }),
    )
    .query(async ({ input }) => {
      const [large, medium, small] = await Promise.all([
        db.query.item.findMany({
          where: (item) =>
            and(eq(item.category, input.category), eq(item.type, "high")),
          orderBy: (item) => [desc(item.createdAt)],
          limit: 2,
          with: { ...itemSelect, type: true, isClaimable: true },
        }),
        db.query.item.findMany({
          where: (item) =>
            and(eq(item.category, input.category), eq(item.type, "medium")),
          orderBy: (item) => [desc(item.createdAt)],
          limit: 3,
          with: { ...itemSelect, type: true, isClaimable: true },
        }),
        db.query.item.findMany({
          where: (item) =>
            and(eq(item.category, input.category), eq(item.type, "base")),
          orderBy: (item) => [desc(item.createdAt)],
          limit: 3,
          with: { ...itemSelect, type: true, isClaimable: true },
        }),
      ]);

      return { large, medium, small };
    }),

  one: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const item = await db.query.item.findFirst({
        where: (item) => eq(item.id, input.id),
        with: { ...itemSelect, type: true, category: true, isClaimable: true },
      });

      return item;
    }),

  create: protectedProcedure
    .input(createItemSchema)
    .mutation(async ({ input }) => {
      console.log("create item", { input });

      await db.insert(item).values({
        name: input.name,
        description: input.description,
        imgUrl: input.imgUrl,
        itemUrl: input.itemUrl,
        priceCents: currency(input.price).intValue,
        vendor: input.vendor,
        category: input.category,
        type: input.type,
        createdAt: new Date(),
      });

      requestRevalidate(input.category);
    }),

  update: protectedProcedure
    .input(
      z.object({
        itemId: z.string().cuid(),
        data: updateItemSchema,
      }),
    )
    .mutation(async ({ input }) => {
      console.log("update item", { input });

      const updatedItem = await db
        .update(item)
        .set({
          name: input.data.name,
          description: input.data.description,
          imgUrl: input.data.imgUrl,
          itemUrl: input.data.itemUrl,
          priceCents: input.data.price
            ? currency(input.data.price).intValue
            : undefined,
          vendor: input.data.vendor,
          category: input.data.category,
          type: input.data.type,
        })
        .where(eq(item.id, input.itemId))
        .returning({ category: item.category });

      /* Drizzle's ORM only supports "getting" so updates must be done using the query builder, where they could possibly affect multiple records - and that is why we need this guard */
      if (updatedItem[0]?.category) requestRevalidate(updatedItem[0].category);
    }),

  delete: protectedProcedure
    .input(z.object({ itemId: z.string().cuid() }))
    .mutation(async ({ input }) => {
      const deleted = await db
        .delete(item)
        .where(eq(item.id, input.itemId))
        .returning({ category: item.category });

      /* Drizzle's ORM only supports "getting" so updates must be done using the query builder, where they could possibly affect multiple records - and that is why we need this guard */
      if (deleted[0]?.category) requestRevalidate(deleted[0].category);
    }),

  claim: publicProcedure
    .input(z.object({ id: z.string().cuid(), refId: z.string().cuid() }))
    .mutation(async ({ input }) => {
      const itemData = await db.query.item.findFirst({
        where: (item) => eq(item.id, input.id),
      });

      if (!itemData) {
        throw new TRPCError({ message: "Item not found", code: "NOT_FOUND" });
      }

      if (!itemData.isClaimable) {
        throw new TRPCError({
          message: "Item is not claimable",
          code: "BAD_REQUEST",
        });
      }

      if (itemData.isClaimed) {
        throw new TRPCError({
          message: "Item already claimed",
          code: "BAD_REQUEST",
        });
      }

      await db
        .update(item)
        .set({
          isClaimed: true,
          claimedAt: new Date(),
          claimerId: input.refId,
        })
        .where(eq(item.id, input.id));
    }),
});
