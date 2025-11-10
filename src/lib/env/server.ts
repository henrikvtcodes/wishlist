import { building } from '$app/environment';
import { env as privateEnv } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';

import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const serverEnv = createEnv({
	server: {
		CONVEX_DEPLOYMENT: z.string().nonempty()
	},
	client: {},
	clientPrefix: 'PUBLIC_',
	runtimeEnv: { ...privateEnv, ...publicEnv },
	emptyStringAsUndefined: true,
	skipValidation: building
});

export { serverEnv as env };
