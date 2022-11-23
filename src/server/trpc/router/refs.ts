import { createRefSchema, updateRefSchema } from "schemas/ref";
import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const refsRouter = router({
  getRef: publicProcedure
    .input(z.object({ ref: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.referrers.findUniqueOrThrow({
        where: {
          ref: input.ref,
        },
      });
    }),

  all: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.referrers.findMany();
  }),

  create: protectedProcedure
    .input(createRefSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.referrers.create({
        data: input,
      });
    }),

  update: protectedProcedure
    .input(z.object({ id: z.string(), data: updateRefSchema }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.referrers.update({
        where: {
          id: input.id,
        },
        data: input.data,
      });
    }),
});
