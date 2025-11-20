import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export function serverEnvFactory(
	runtimeEnv: Record<string, string | number | boolean | undefined>,
	skipValidation = false
) {
	return createEnv({
		server: {
			EMAIL_SERVER: z.url(),
			EMAIL_FROM: z.email(),
			RESEND_KEY: z.string().nonempty()
		},
		client: {
			PUBLIC_CLAIMING_ENABLE: z.boolean().default(false)
		},
		clientPrefix: 'PUBLIC_',
		runtimeEnv,
		emptyStringAsUndefined: true,
		skipValidation
	});
}
