import { serverEnvFactory } from '@/env/serverEnvSchema';

export const env = serverEnvFactory(process.env, false);
