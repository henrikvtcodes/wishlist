<script lang="ts">
	import { useAuth } from '@mmailaender/convex-auth-svelte/sveltekit';
	import { useConvexClient, useQuery } from 'convex-svelte';
	import { api } from '../../convex/_generated/api';
	import Button from './ui/button/button.svelte';

	const viewer = useQuery(api.users.viewer);
	const isAuthenticated = $derived(useAuth().isAuthenticated);

	const { signOut } = useAuth();

	// vhlkjh8
</script>

{#if !viewer.isLoading}
	{#if isAuthenticated}
		Hi {viewer.data?.name}
		<Button size="sm" onclick={signOut}>Log out</Button>
	{:else}
		<Button size="sm" href="/login">Log in</Button>
	{/if}
{/if}
