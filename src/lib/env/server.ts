import { building } from '$app/environment';
import { env as privateEnv } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import { serverEnvFactory } from './serverEnvSchema';

export const serverEnv = serverEnvFactory({ ...privateEnv, ...publicEnv }, building);

export { serverEnv as env };
