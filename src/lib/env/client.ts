import { building } from '$app/environment';
import { env as runtimeEnv } from '$env/dynamic/public';
import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const clientEnv = createEnv({
	client: {
		PUBLIC_CONVEX_URL: z.url(),
		PUBLIC_CLAIMING_ENABLE: z.coerce.boolean().default(false)
	},
	clientPrefix: 'PUBLIC_',
	runtimeEnv,
	emptyStringAsUndefined: true,
	skipValidation: building
});

export { clientEnv as env };
