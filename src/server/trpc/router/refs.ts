import { z } from "zod";
import { router, publicProcedure } from "../trpc";

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
});
