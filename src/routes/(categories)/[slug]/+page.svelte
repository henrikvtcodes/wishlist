<script lang="ts">
	import type { PageProps } from './$types';

	let { params }: PageProps = $props();
	import { useQuery } from 'convex-svelte';
	import { api } from '../../../convex/_generated/api';
	import ItemRenderedViewCard from '$lib/components/item/ItemRenderedViewCard.svelte';

	const category = useQuery(api.categories.one, () => ({ slug: params.slug }));
	const items = useQuery(api.items.allPublicInCategory, () => ({ categorySlug: params.slug }));
</script>

<div class="grid min-h-32 place-content-center">
	<h1 class="text-4xl">{category.data?.name}</h1>
</div>

<div class="mt-2 flex flex-wrap gap-x-2 gap-y-2">
	{#each items.data as item}
		<ItemRenderedViewCard clsx={'grow md:basis-1/2 lg:basis-1/4'} {item} />
	{/each}
</div>

<svelte:head>
	<title>{category.data?.name} | henrik's wishlist</title>
</svelte:head>
