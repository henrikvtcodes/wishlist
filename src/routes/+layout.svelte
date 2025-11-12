<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Toaster } from '$lib/components/ui/sonner';
	import { env } from '$lib/env/client';

	import { setupConvex } from 'convex-svelte';
	import { setupConvexAuth } from '@mmailaender/convex-auth-svelte/sveltekit';

	const { children, data } = $props();

	setupConvex(env.PUBLIC_CONVEX_URL);
	setupConvexAuth({ getServerState: () => data.authState });
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Toaster />
{@render children()}
