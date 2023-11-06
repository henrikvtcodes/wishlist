import { router } from "~/server/api/trpc";
import { itemsRouter } from "./routers/items";
import { refsRouter } from "./routers/refs";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = router({
  items: itemsRouter,
  refs: refsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
