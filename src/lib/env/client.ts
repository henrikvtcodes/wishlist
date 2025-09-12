import { building } from '$app/environment';
import { env as runtimeEnv } from '$env/dynamic/public';
import { createEnv } from '@t3-oss/env-core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { z } from 'zod';

export const clientEnv = createEnv({
	client: {},
	clientPrefix: 'PUBLIC_',
	runtimeEnv,
	emptyStringAsUndefined: true,
	skipValidation: building
});

export { clientEnv as env };
