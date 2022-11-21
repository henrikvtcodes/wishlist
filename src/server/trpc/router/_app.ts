import { router } from "../trpc";
import { authRouter } from "./auth";
import { itemsRouter } from "./items";
import { refsRouter } from "./refs";

export const appRouter = router({
  auth: authRouter,
  refs: refsRouter,
  items: itemsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
