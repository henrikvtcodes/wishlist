import { serverEnvFactory } from '$lib/env/serverEnvSchema';

export const env = serverEnvFactory(process.env, false);
