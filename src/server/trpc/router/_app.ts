import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { refsRouter } from "./refs";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  refs: refsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
