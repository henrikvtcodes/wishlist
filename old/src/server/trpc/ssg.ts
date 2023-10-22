import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import superjson from "superjson";
import { appRouter } from "./router/_app";
import { prisma } from "server/db/client";

export const ssgHelpers = createProxySSGHelpers({
  router: appRouter,
  transformer: superjson,
  ctx: { prisma, session: null },
});
