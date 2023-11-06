import { eq } from "drizzle-orm";
import { z } from "zod";
import { createRefSchema, updateRefSchema } from "~/schemas/ref";
import { db } from "~/server/db";
import { referrers } from "~/server/db/schema";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const refsRouter = router({
  getRef: publicProcedure
    .input(z.object({ ref: z.string() }))
    .query(({ input }) => {
      // return ctx.prisma.referrers.findFirst({
      //   where: {
      //     ref: input.ref,
      //   },
      // });

      return db.query.referrers.findFirst({
        where: (ref) => eq(ref.ref, input.ref),
      });
    }),

  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      // return await ctx.prisma.referrers.findUniqueOrThrow({
      //   where: {
      //     id: input.id,
      //   },
      // });
      return db.query.referrers.findFirst({
        where: (ref) => eq(ref.id, input.id),
      });
    }),

  all: protectedProcedure.query(async () => {
    return db.query.referrers.findMany();
  }),

  refExists: protectedProcedure
    .input(z.object({ ref: z.string() }))
    .query(async ({ input }) => {
      // const ref = await ctx.prisma.referrers.findUnique({
      //   where: {
      //     ref: input.ref,
      //   },
      // });

      const ref = await db.query.referrers.findFirst({
        where: (ref) => eq(ref.ref, input.ref),
      });

      return ref !== undefined;
    }),

  create: protectedProcedure
    .input(createRefSchema)
    .mutation(async ({ input }) => {
      // return await ctx.prisma.referrers.create({
      //   data: input,
      // });

      return db.insert(referrers).values({ ...input });
    }),

  update: protectedProcedure
    .input(z.object({ refId: z.string(), data: updateRefSchema }))
    .mutation(async ({ input }) => {
      // return await ctx.prisma.referrers.update({
      //   where: {
      //     id: input.refId,
      //   },
      //   data: input.data,
      // });

      return db
        .update(referrers)
        .set({ ...input.data })
        .where(eq(referrers.id, input.refId));
    }),

  delete: protectedProcedure
    .input(z.object({ refId: z.string() }))
    .mutation(async ({ input }) => {
      // return await ctx.prisma.referrers.delete({
      //   where: {
      //     id: input.refId,
      //   },
      // });

      return db.delete(referrers).where(eq(referrers.id, input.refId));
    }),
});
