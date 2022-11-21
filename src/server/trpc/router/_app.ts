import { router } from "../trpc";
import { authRouter } from "./auth";
import { refsRouter } from "./refs";

export const appRouter = router({
  auth: authRouter,
  refs: refsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
