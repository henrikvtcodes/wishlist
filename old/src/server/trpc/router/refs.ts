import { createRefSchema, updateRefSchema } from "schemas/ref";
import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const refsRouter = router({
  getRef: publicProcedure
    .input(z.object({ ref: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.referrers.findFirst({
        where: {
          ref: input.ref,
        },
      });
    }),

  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.referrers.findUniqueOrThrow({
        where: {
          id: input.id,
        },
      });
    }),

  all: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.referrers.findMany();
  }),

  refExists: protectedProcedure
    .input(z.object({ ref: z.string() }))
    .query(async ({ ctx, input }) => {
      const ref = await ctx.prisma.referrers.findUnique({
        where: {
          ref: input.ref,
        },
      });

      return ref !== null;
    }),

  create: protectedProcedure
    .input(createRefSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.referrers.create({
        data: input,
      });
    }),

  update: protectedProcedure
    .input(z.object({ refId: z.string(), data: updateRefSchema }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.referrers.update({
        where: {
          id: input.refId,
        },
        data: input.data,
      });
    }),

  delete: protectedProcedure
    .input(z.object({ refId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.referrers.delete({
        where: {
          id: input.refId,
        },
      });
    }),
});
