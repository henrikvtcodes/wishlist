<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Toaster } from '@/components/ui/sonner';
	import { env } from '@/env/client';

	import { setupConvex } from 'convex-svelte';

	const { children } = $props();
	setupConvex(env.PUBLIC_CONVEX_URL);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Toaster />
{@render children()}
