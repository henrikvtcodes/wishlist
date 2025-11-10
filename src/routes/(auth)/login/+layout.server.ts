// src/routes/profile/+page.server.ts
import { createConvexAuthHandlers } from '@mmailaender/convex-auth-svelte/sveltekit/server';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

// Create auth handlers
const { isAuthenticated } = createConvexAuthHandlers();

// Protect routes at the page level
export const load: LayoutServerLoad = async (event) => {
	// Check if user is authenticated
	if (await isAuthenticated(event)) {
		// Redirect to signin if not authenticated
		throw redirect(302, `/`);
	}
};
