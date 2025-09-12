import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { appRouter } from './router';
import { t } from './shared';

export type AppRouter = typeof appRouter;

export const trpcCreateCaller = t.createCallerFactory(appRouter);

export type RouterInputs = inferRouterInputs<AppRouter>;

export type RouterOutputs = inferRouterOutputs<AppRouter>;
