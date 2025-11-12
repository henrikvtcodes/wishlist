<script lang="ts">
	import { useAuth } from '@mmailaender/convex-auth-svelte/sveltekit';
	import type { PageProps } from './$types';
	import { useConvexClient, useQuery } from 'convex-svelte';
	import { api } from '../../convex/_generated/api';

	let { data }: PageProps = $props();

	// Make an authenticated query
	// The initial data comes from the server for faster rendering
	const viewer = useQuery(api.users.viewer, {}, () => ({
		// initialData: data.viewer
	}));
</script>

Hello {viewer.data?.email}
