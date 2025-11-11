<script lang="ts">
	import type { PageProps } from './$types';

	let { data, params }: PageProps = $props();
	import { useQuery } from 'convex-svelte';
	import { api } from '../../../convex/_generated/api';
	import ItemRenderedViewCard from '@/components/item/ItemRenderedViewCard.svelte';

	const category = useQuery(api.categories.one, () => ({ slug: params.slug }));
	const items = useQuery(api.items.allPublicInCategory, () => ({ categorySlug: params.slug }));
</script>

<div class="grid min-h-32 w-screen place-content-center border-b-2 border-b-zinc-200">
	<h1 class="text-4xl">{category.data?.name}</h1>
</div>

<div class="flex flex-wrap gap-x-4 gap-y-4 px-8 pt-2">
	{#each items.data as item}
		<div class="sm:shrink-0 sm:grow-0 sm:basis-1/3 md:basis-1/4">
			<ItemRenderedViewCard {item} />
		</div>
	{/each}
</div>
