import { convexAuth } from '@convex-dev/auth/server';
import Resend from '@auth/core/providers/resend';
import { env } from './env';

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
	providers: [
		Resend({
			apiKey: env.RESEND_KEY,
			from: env.EMAIL_FROM
		})
	]
});
