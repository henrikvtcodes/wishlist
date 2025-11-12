<script lang="ts">
	import { Card, CardHeader, CardTitle, CardDescription } from '$lib/components/ui/card';
	import type { PageProps } from './$types';
	import CardContent from '$lib/components/ui/card/card-content.svelte';

	let { data }: PageProps = $props();
</script>

<div class="flex min-h-72 w-screen items-center justify-center">
	<Card class=" h-min">
		<CardContent>
			<CardTitle>henrik's wishlist</CardTitle>
			<CardDescription>Welcome to my wishlist for 2025!</CardDescription>
		</CardContent>
	</Card>
</div>

<svelte:head>
	<title>henrik's wishlist</title>
</svelte:head>
